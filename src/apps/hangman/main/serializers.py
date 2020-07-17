from rest_framework import serializers

from .algorithms import generateWord, initWordAttempt

from .models import HangmanGame

class HangmanGameSerializerPost(serializers.ModelSerializer):
    """
    A class that serializers the difficulty level of the
    HangmanGame model. It overrides the create method, in order
    to create a HangmanGame instance with just the difficulty_level.
    This serializer is mainly used in the context of post requests
    with the purpose of creating a HangmanGame
    """
    class Meta:
        model = HangmanGame
        # fields = '__all__'
        fields = ['difficulty_level']
    
    def create(self, validated_data):
        """
        Takes the validated_data from the serializer, which is just
        the difficulty_level. It then uses the context to get the user
        of the request. The appropriate fields are then set. For the
        word field, a random word is generated.
        Returns a HangmanGame instance.
        """
        difficulty_level = validated_data['difficulty_level']
        user = self.context['request'].user
        word = generateWord(difficulty_level=difficulty_level)
        word_attempt = initWordAttempt(word=word)
        game = HangmanGame.objects.create(**validated_data,
            user=user, word=word, word_attempt=word_attempt)
        return game

class HangmanGameSerializerFinished(serializers.ModelSerializer):
    """
    A class that serializes all fields of HangmanGame. Since the
    word field of HangmanGame should remain hidden until the game is
    finished, this serializer is primarily used in the context of get
    requests when a hangman game finishes.
    """
    word_attempt = serializers.ListField()
    class Meta:
        model = HangmanGame
        fields = ['difficulty_level', 'created', 'word', 'word_attempt','finished', 'game_id', 'guessed_letters', 'wrong_moves']

class HangmanGameSerializerGet(serializers.ModelSerializer):
    """
    A class that serializes all fields of HangmanGame except the word
    field since it should remain hidden until the game is finished. This
    serializer is primarily used in the context of get requests for game
    information while the game is being played.
    """
    word_attempt = serializers.ListField()
    class Meta:
        model = HangmanGame
        fields = ['difficulty_level', 'created', 'word_attempt','finished', 'game_id', 'guessed_letters', 'wrong_moves']

class GuessSerializer(serializers.Serializer):
    """
    A class that serializes a letter. This serializer is primarily used
    in the context of post requests for each move of the hangman game. This
    is because the only information needed to send is the guess.
    """
    letter = serializers.CharField(max_length=1)