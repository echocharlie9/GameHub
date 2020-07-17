import re
from random_word import RandomWords
r = RandomWords()

def fillInLetters(word, letter, word_attempt):
    """
    Takes in a word_attempt and fills in any blanks with the
    inputted letter.
    Returns List of String.
    """
    indicesOfLetter = [m.start() for m in re.finditer(letter, word)]
    ret = [letter if i in indicesOfLetter else x for i, x in enumerate(word_attempt)]
    return ret

def isComplete(word, word_attempt):
    """
    Returns true if the word_attempt has no blanks.
    Returns false otherwise.
    Returns a boolean.
    """
    ret = ("".join(word_attempt) == word)
    return ret

def calculatePointsWon(difficulty_level, word):
    """
    Returns the difficulty_level multiplied by the length of the word.
    Returns an integer.
    """
    return difficulty_level * len(word)

def generateWord(difficulty_level):
    """
    Uses the random_word library to generate a random english word.
    Returns a string.
    """
    ret = r.get_random_word()
    return ret

def initWordAttempt(word):
    """
    Takes in a word and returns a list of the letters,
    with each letter set to an empty string. This
    is the initial word_attempt.
    Returns a list of strings.
    """
    return [''] * len(word)