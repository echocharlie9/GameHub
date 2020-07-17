from rest_framework.test import APIRequestFactory
from apps.hangman.api.views import HangmanGameViewSet
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model as user_model
from apps.hangman.main.serializers import HangmanGameSerializerGet
from rest_framework.test import force_authenticate
import io
from rest_framework.parsers import JSONParser
import json
from apps.hangman.main.models import HangmanGame
from rest_framework.test import APIClient
from apps.hangman.main.algorithms import initWordAttempt, calculatePointsWon
User = user_model()

class HangmanGameViewSetTest(APITestCase):
    """
    A class that tests the model view set for HangmanGame.
    This class tests most endpoints associated with hangman
    functionality.
    """

    def setUp(self):
        """
        Creates a user and a HangmanGame. It also
        authenticates the user.
        """
        # create user
        self.user = User(username='a')
        self.user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        word = 'hello'
        word_attempt = initWordAttempt(word)
        self.game1 = HangmanGame(user=self.user, difficulty_level=1, word=word, word_attempt=word_attempt)
        self.game1.save()

    def tearDown(self):
        """
        Deletes all objects from the test database.
        """
        HangmanGame.objects.all().delete()

    def testCreateGame(self):
        """
        Assertion passes if the post request adds an instance
        of HangmanGame to the database.
        Assertion fails otherwise.
        """
        response = self.client.post('/hangman/', {'difficulty_level': '1'})
        games = HangmanGame.objects.all()
        assert(len(games) == 2)

    def testListGame(self):
        """
        """
        pass
    
    def testRetrieveGame(self):
        """
        Assertion passes if the get request provides the
        correct HangmanGame instance. This is checked with
        the game_id.
        Assertion fails otherwise.
        """
        response = self.client.get('/hangman/1/', {})
        assert(response.data['game_id'] == 1)

    def testDeleteGame(self):
        """
        Assertion passes if the HangmanGame instance is
        deleted. This is check by testing how many items
        are in the test database.
        Assertion fails otherwise.
        """
        response = self.client.delete('/hangman/1/', {})
        games = HangmanGame.objects.all()
        assert(len(games) == 0)

    def testUpdateGame(self):
        """
        """
        # shouldn't be able to update
        pass

    def testGuessWordCorrect(self):
        """
        A simulation hangman game is played, in which the user
        correctly guesses the word with only 1 wrong guess.
        Assertions pass if the wrong_moves is equal to 1,
        if the word_attempt is filled out, if finished equals
        'yes', and if the guessed_letters are all the letters
        that were guessed.
        Assertions fail otherwise.
        """
        response1 = self.client.post('/hangman/1/guessLetter/', {'letter': 'e'})
        assert(response1.status_code == 200)
        response2 = self.client.post('/hangman/1/guessLetter/', {'letter': 'h'})
        assert(response2.status_code == 200)
        response3 = self.client.post('/hangman/1/guessLetter/', {'letter': 'l'})
        assert(response3.status_code == 200)
        response4 = self.client.post('/hangman/1/guessLetter/', {'letter': 'd'})
        assert(response4.status_code == 200)
        response5 = self.client.post('/hangman/1/guessLetter/', {'letter': 'o'})
        assert(response5.status_code == 200)
        game = HangmanGame.objects.get(game_id=1)
        assert(game.finished == 'yes')
        assert(game.guessed_letters == 'ehldo')
        assert(game.wrong_moves == 1)
        assert(game.word_attempt == ['h', 'e', 'l', 'l', 'o'])

    def testGuessWordFalse(self):
        """
        A simulation hangman game is played, in which the user
        does not guess the word.
        Assertions pass if the reponse is a 404 when the user
        tries to guess after he has ran out of lives.
        Assertions fail otherwise.
        """
        response1 = self.client.post('/hangman/1/guessLetter/', {'letter': 'p'})
        assert(response1.status_code == 200)
        response2 = self.client.post('/hangman/1/guessLetter/', {'letter': 'r'})
        assert(response2.status_code == 200)
        response3 = self.client.post('/hangman/1/guessLetter/', {'letter': 't'})
        assert(response3.status_code == 200)
        response4 = self.client.post('/hangman/1/guessLetter/', {'letter': 'd'})
        assert(response4.status_code == 200)
        response5 = self.client.post('/hangman/1/guessLetter/', {'letter': 'u'})
        assert(response5.status_code == 200)
        response6 = self.client.post('/hangman/1/guessLetter/', {'letter': 'w'})
        #lost
        assert(response6.status_code == 200)
        #test next response is invalid
        response7 = self.client.post('/hangman/1/guessLetter/', {'letter': 'x'})
        assert(response7.status_code == 404)

class GetPointsTest(APITestCase):
    def setUp(self):
        """
        Creates a user and two games. The user
        is authenticated.
        """
        self.user = User(username='a')
        self.user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        word = 'hi'
        word_attempt = initWordAttempt(word)
        self.game1 = HangmanGame(user=self.user, difficulty_level=1, word=word, word_attempt=word_attempt)
        self.game1.save()
        word2 = 'me'
        word_attempt2 = initWordAttempt(word)
        self.game2 = HangmanGame(user=self.user, difficulty_level=2, word=word2, word_attempt=word_attempt2)
        self.game2.save()

    def tearDown(self):
        """
        All objects in test database are deleted.
        """
        HangmanGame.objects.all().delete()

    def testBasic(self):
        """
        Simulates two games in which the user wins.
        Assertions pass if after each game, the response
        is the correct amount of points he should have won.
        Assertions fail otherwise.
        """
        response1 = self.client.post('/hangman/1/guessLetter/', {'letter': 'i'})
        response2 = self.client.post('/hangman/1/guessLetter/', {'letter': 'h'})
        response3 = self.client.get('/hangman/getPoints/', {})
        game1Points = calculatePointsWon(self.game1.difficulty_level, self.game1.word)
        assert(response3.data == game1Points)
        response4 = self.client.post('/hangman/2/guessLetter/', {'letter': 'm'})
        response5 = self.client.post('/hangman/2/guessLetter/', {'letter': 'e'})
        response6 = self.client.get('/hangman/getPoints/', {})
        game2Points = calculatePointsWon(self.game2.difficulty_level, self.game2.word)
        assert(response6.data == (game1Points + game2Points))

        