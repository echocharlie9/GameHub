from django.contrib import admin

# Register your models here.

from apps.hangman.main.models import HangmanGame

admin.site.register(HangmanGame)
