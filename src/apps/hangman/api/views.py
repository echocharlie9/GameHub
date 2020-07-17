from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.hangman.main.algorithms import fillInLetters, isComplete, calculatePointsWon

# importing serializers
from apps.hangman.main.serializers import HangmanGameSerializerGet, HangmanGameSerializerFinished, HangmanGameSerializerPost, GuessSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# importing models
from apps.hangman.main.models import HangmanGame

from rest_framework.permissions import IsAuthenticated

# lobbies can only be read 
class HangmanGameViewSet(viewsets.ModelViewSet):
    serializer_class_post = HangmanGameSerializerPost
    serializer_class_get = HangmanGameSerializerGet
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = HangmanGame.objects.filter(user = user, finished='no')
        print(queryset)
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        x = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(data=HangmanGameSerializerGet(x).data, status=201, headers=headers)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_create(self, serializer):
        x = serializer.save()
        return x

    @action(detail=True, methods=['post'])
    def guessLetter(self, request, pk):
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
        if self.request.method == 'POST':
            return self.serializer_class_post
        elif self.request.method == 'GET':
            return self.serializer_class_get

from rest_framework import permissions

class GetPoints(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        data = request.user.hangman_points
        return Response(data=data)

class GetFinished(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        print('reached')
        games = HangmanGame.objects.filter(user = user, finished='yes')
        print(games)
        data = HangmanGameSerializerFinished(games, many=True).data
        return Response(data = data)