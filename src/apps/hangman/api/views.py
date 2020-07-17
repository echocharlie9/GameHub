from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.hangman.main.algorithms import fillInLetters, isComplete, calculatePointsWon
from apps.hangman.main.serializers import HangmanGameSerializerGet, HangmanGameSerializerFinished, HangmanGameSerializerPost, GuessSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.hangman.main.models import HangmanGame
from rest_framework.permissions import IsAuthenticated

class HangmanGameViewSet(viewsets.ModelViewSet):
    """
    A class that is used for all endpoints for a hangman game.
    All methods are only accessible to authenticated users.
    """
    serializer_class_post = HangmanGameSerializerPost
    serializer_class_get = HangmanGameSerializerGet
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Only returns HangmanGame objects for the user associated
        with the request.
        Returns a queryset.
        """
        user = self.request.user
        queryset = HangmanGame.objects.filter(user = user, finished='no')
        print(queryset)
        return queryset

    def create(self, request, *args, **kwargs):
        """
        The create method was overridden because it needs to serialize
        different data on the request and the response. It serializes
        the difficulty_level on the request and returns all HangmanGame
        fields except the word on the response.
        Returns a response.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        x = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(data=HangmanGameSerializerGet(x).data, status=201, headers=headers)
    
    def perform_create(self, serializer):
        """
        Returns an instance of whatever object the serializer contained.
        """
        x = serializer.save()
        return x

    @action(detail=True, methods=['post'])
    def guessLetter(self, request, pk):
        """
        Serializes the request with the GuessSerializer, then error handles
        to make sure that the user associated with the request can actually
        guess a letter. If the user's guess completes the word, the finished
        field of the HangmanGame object is updated to 'yes'. The response
        is a 404 if any check is not passed. If all checks are passed, the
        response is a serialized HangmanGame using HangmanGameSerializerGet.
        Returns a response.
        """
        game = self.get_object()
        serializer = GuessSerializer(data=request.data)
        if serializer.is_valid():
            letter = serializer.validated_data['letter']
            if game.finished == 'yes':
                return Response(status=404)
            # check if guessed letter is a real letter -> if not, error
            
            if not letter.isalpha():
                # error
                return Response(status=404)
            # check if guessed letter has already been guessed -> if yes, don't do anything but tell them
            if letter in game.guessed_letters:
                # error ish
                return Response(status=404)
            # check guess # bounds -> if bad bound, error
            if not (0 <= game.wrong_moves <= 5):
                # error
                return Response(status=404)
            # increment guess number
            if letter not in game.word:
                game.wrong_moves += 1
                game.save()
                if game.wrong_moves == 6:
                    game.finished = 'yes'
            # add guess letter to guess letters
            game.guessed_letters += letter
            # add guess letter to word if applicable
            game.word_attempt = fillInLetters(word=game.word, letter=letter, word_attempt=game.word_attempt)
            game.save()
            # check if word is complete -> if yes, add points to user's hangman points (points for word length * difficulty level)
            if (isComplete(word=game.word, word_attempt=game.word_attempt)):
                game.finished = 'yes'
                # get user
                user = request.user
                # add points to user
                pointsWon = calculatePointsWon(difficulty_level=game.difficulty_level, word=game.word)
                user.hangman_points += pointsWon
                user.save()
                game.save()
                # return success
                data = self.serializer_class_get(game).data
                return Response(data=data, status=200)
            else:
                data = self.serializer_class_get(game).data
                # return (encrypted word, guessed letter, guess #, list('a','','','','',''))
                return Response(data=data, status=200)
        else:
            return Response(status=404)

    def get_serializer_class(self):
        """
        Post methods return HangmanGameSerializerPost,
        while get methods return HangmanGameSerializerGet.
        Returns a serializer.
        """
        if self.request.method == 'POST':
            return self.serializer_class_post
        elif self.request.method == 'GET':
            return self.serializer_class_get

from rest_framework import permissions

class GetPoints(APIView):
    """
    This view is for getting the points a user has scored in
    hangman. It is only accessible to authenticated users.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Gets the points won in hangman for the user associated with
        the request.
        Returns a number.
        """
        data = request.user.hangman_points
        return Response(data=data)

class GetFinished(APIView):
    """
    This view is for getting the HangmanGames that a user
    has finished. This is a separate class than the HangmanGameViewSet
    because it would conflict with the list method. It is only
    accessible to authenticated users.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        """
        Returns all HangmanGames that are finished for the associated
        user.
        Returns a response.
        """
        user = request.user
        games = HangmanGame.objects.filter(user = user, finished='yes')
        data = HangmanGameSerializerFinished(games, many=True).data
        return Response(data = data)