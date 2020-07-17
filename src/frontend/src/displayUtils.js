const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

/**
 * Returns LOST if the word_attempt includes
 * an empty string, and returns WON otherwise
 * @param {list of string} word_attempt
 * @return {string} 
 */
export const outcomeOfHangmanGame = (word_attempt) => {
    if (word_attempt.includes('')) {
        return 'LOST'
    } else {
        return 'WON'
    }
}

/**
 * Formats a game id for display.
 * @param {number} game_id
 * @return {string} 
 */
export const displayGameID = (game_id) => {
    return "Game " + game_id
}

/**
 * Formats a word_attempt for display by replacing
 * empty strings with underscores and separating each
 * letter with spacing.
 * @param {list of string} word_attempt
 * @return {string} 
 */
export const displayWordAttempt = (word_attempt) => {
    const pre = word_attempt.map(val => {
      if (val === '')
        return '_'
      else
        return val
    })
    return pre.join('   ')
  }

/**
 * Displays the amount of lives the user has left
 * and their current formatted word_attempt.
 * @param {HangmanGame} hangmanGame
 * @return {string} 
 */
export const displayHangmanLobbyDescription = (hangmanGame) => {
    const lives = 6 - hangmanGame.wrong_moves
    const progress = displayWordAttempt(hangmanGame.word_attempt)
    return 'Lives Left: ' + lives + ', Progress: ' + progress
}

/**
 * Displays the word of a HangmanGame.
 * @param {string} word
 * @return {string} 
 */
export const displayCorrectWord = (word) => {
    return 'word: ' + word
}

/**
 * Displays error if word_attempt includes empty string,
 * success otherwise.
 * @param {list of string} word_attempt
 * @return {string} 
 */
export const displayOutcomeOfHangmanGame = (word_attempt) => {
    if (word_attempt.includes('')) {
        return 'error'
    } else {
        return 'success'
    }
}

/**
 * Displays a win/loss message based on whether
 * the user won.
 * @param {list of string} word_attempt
 * @return {string} 
 */
export const displayOutcomeMessage = (word_attempt) => {
    if (word_attempt.includes('')) {
      return 'You should read a dictionary :('
    } else {
      return 'Congratulations...nerd'
    }
  }

/**
 * Filters the alphabet for letters that have not been
 * guessed.
 * @param {string} guessedLetters
 * @return {list of string} 
 */
export const availableLetters = (guessedLetters) => {
    const li = guessedLetters.split('')
    return alphabet.filter( ( el ) => !li.includes( el ) );
}

/**
 * Displays the guessed letters with commas between
 * each letter.
 * @param {list of string} guessed_letters
 * @return {string} 
 */
export const displayGuessedLetters = (guessed_letters) => {
    return guessed_letters.split('').join(', ')
  }