from rest_framework import serializers

from .algorithms import generateWord, initWordAttempt

from .models import HangmanGame

class HangmanGameSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = HangmanGame
        # fields = '__all__'
        fields = ['difficulty_level']
    
    def create(self, validated_data):
        difficulty_level = validated_data['difficulty_level']
        user = self.context['request'].user
        word = generateWord(difficulty_level=difficulty_level)
        word_attempt = initWordAttempt(word=word)
        game = HangmanGame.objects.create(**validated_data,
            user=user, word=word, word_attempt=word_attempt)
        return game

class HangmanGameSerializerFinished(serializers.ModelSerializer):
    word_attempt = serializers.ListField()
    class Meta:
        model = HangmanGame
        fields = ['difficulty_level', 'created', 'word', 'word_attempt','finished', 'game_id', 'guessed_letters', 'wrong_moves']

class HangmanGameSerializerGet(serializers.ModelSerializer):
    word_attempt = serializers.ListField()
    class Meta:
        model = HangmanGame
        fields = ['difficulty_level', 'created', 'word_attempt','finished', 'game_id', 'guessed_letters', 'wrong_moves']

    # def __init__(self, *args, **kwargs):
    #     print('hi')
    #     super(HangmanGameSerializerGet, self).__init__(*args, **kwargs)

class GuessSerializer(serializers.Serializer):
    letter = serializers.CharField(max_length=1)