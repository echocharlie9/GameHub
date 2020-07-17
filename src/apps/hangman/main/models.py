from django.db import models
import json
from django.core.validators import MaxValueValidator, MinValueValidator

from django.contrib.auth import get_user_model as user_model
User = user_model()

longest_english_word_length = 45
guessed_letters_length = 200
word_attempt_legnth = 200
max_difficulty_level = 3
hangman_move_limit = 6

CURRENT_CHOICES = (
    ("yes", "yes"),
    ("no", "no"),
)

from typing import Iterable

class ListField(models.TextField):
    """
    A custom Django field to represent lists as comma separated strings
    """

    def __init__(self, *args, **kwargs):
        self.token = kwargs.pop('token', ',')
        super().__init__(*args, **kwargs)

    def deconstruct(self):
        name, path, args, kwargs = super().deconstruct()
        kwargs['token'] = self.token
        return name, path, args, kwargs

    def to_python(self, value):

        class SubList(list):
            def __init__(self, token, *args):
                self.token = token
                super().__init__(*args)

        if isinstance(value, list):
            return value
        if value is None:
            return SubList(self.token)
        var = SubList(self.token, value.split(self.token))
        return var

    def from_db_value(self, value, expression, connection):
        return self.to_python(value)

    def get_prep_value(self, value):
        if not value:
            return
        assert(isinstance(value, Iterable))
        return self.token.join(value)

    def value_to_string(self, obj):
        value = self.value_from_object(obj)
        return self.get_prep_value(value)

class HangmanGame(models.Model):
    """
    A class that represents a hangman game. It stores the player
    of the hangman game (user), the difficulty level of the game
    (difficulty_level), the date and time it was created (created),
    whether the game has been finished or is currently ongoing (finished),
    an id (game_id), the word the player is trying to guess (word),
    the letters that the player has guessed (guessed_letters), the
    amount of wrong moves the player has made (wrong_moves), and his
    attempt of the word (word_attempt).
    Word_attempt is represented as a list of strings. It initially
    is a list of empty strings as long as the word (simulating an
    unknown value). As the player guesses correct letters, the
    corresponding indexes are filled in with the correct letter.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    difficulty_level = models.IntegerField(
        default=1,
        validators=[
            MaxValueValidator(max_difficulty_level),
            MinValueValidator(1)
        ]
     )
    created = models.DateTimeField(auto_now_add=True)
    finished = models.CharField(choices=CURRENT_CHOICES, default="no", max_length=3)
    game_id = models.AutoField(primary_key=True)
    word = models.CharField(max_length=longest_english_word_length)
    guessed_letters = models.CharField(max_length=guessed_letters_length, default='')
    word_attempt = ListField()
    wrong_moves = models.IntegerField(
        default=0,
        validators=[
            MaxValueValidator(hangman_move_limit),
            MinValueValidator(0)
        ]
     )

    # def set_guessed_letters(self, val):
    #      self.guessed_letters = json.dumps(val)
    # def get_guessed_letters(self, val):
    #      return json.loads(self.guessed_letters)

    def __str__(self):
        game_id = 'game_id = ' + str(self.game_id)
        word_attempt = ', word_attempt = ' + str(self.word_attempt)
        wrong_moves = ', wrong_moves = ' + str(self.wrong_moves)
        guessed_letters = ', guessed_letters = ' + str(self.guessed_letters)
        difficulty_level = ', difficulty_level = ' + str(self.difficulty_level)
        finished = ', finished = ' + str(self.finished)
        return game_id + word_attempt + wrong_moves + guessed_letters + difficulty_level + finished

