from django.contrib.auth.models import (
   AbstractBaseUser, PermissionsMixin,
)
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
   """
   A class that extends basic user fields. It makes the username
   field the id. It also stores the amount of points the user has
   won from playing hangman.
   """
   username = models.CharField(max_length=30, primary_key=True)
   USERNAME_FIELD = 'username'
   hangman_points = models.IntegerField(default=0)