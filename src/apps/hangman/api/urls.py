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
