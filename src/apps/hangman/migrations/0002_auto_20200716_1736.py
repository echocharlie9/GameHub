# Generated by Django 3.0.8 on 2020-07-16 17:36

import apps.hangman.main.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hangman', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hangmangame',
            name='word_attempt',
            field=apps.hangman.main.models.ListField(token=','),
        ),
    ]
