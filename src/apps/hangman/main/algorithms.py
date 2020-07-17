import re
from random_word import RandomWords
r = RandomWords()

def fillInLetters(word, letter, word_attempt):
    indicesOfLetter = [m.start() for m in re.finditer(letter, word)]
    ret = [letter if i in indicesOfLetter else x for i, x in enumerate(word_attempt)]
    return ret

def isComplete(word, word_attempt):
    ret = ("".join(word_attempt) == word)
    return ret

def calculatePointsWon(difficulty_level, word):
    return difficulty_level * len(word)

def generateWord(difficulty_level):
    ret = r.get_random_word()
    return ret

def initWordAttempt(word):
    return [''] * len(word)