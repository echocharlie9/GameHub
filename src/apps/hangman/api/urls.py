from rest_framework import routers
from .views import HangmanGameViewSet, GetPoints, GetFinished

from django.urls import path

# urlpatterns (url paths mapped to views or other urlpatterns)
urlpatterns = [
    path('getPoints/', GetPoints.as_view()),
    path('getFinished/', GetFinished.as_view())
]

router = routers.SimpleRouter()
router.register(r'', HangmanGameViewSet, basename='hangman')
urlpatterns += router.urls


# fuck with creation
# custom guess letter

# 6 guesses
# encrypted word = game id
#  GET get word () -> (encrypted word, list('','','','','',''))
#  POST guess letter (encrypted word, letter) -> (encrypted word, guessed letter, guess #, list('a','','','','',''))
    # check guess # bounds -> if bad bound, error
    # check if guessed letter has already been guessed -> if yes, don't do anything but tell them
    # check if guessed letter is a real letter -> if not, error
    # check if encrypted word is the same -> if not, error
    # check if word is complete -> if yes, add points to user's hangman points (points for word length * difficulty level)

# get current games
# start new game - same as get word, add in difficulty level

# user model
    # store current games
        # current word
        # guessed letters
        # semi completed word list
        # guess number

    # store hangman points

# add ons
    # have multiplayer asynch games
    # have multiplayer asynch comp games