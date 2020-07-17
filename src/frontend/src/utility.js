import axios from 'axios'

import { message } from 'antd';

import { registerEndpoint, loginEndpoint,
        hangmanEndpoint, finishedHangmanGamesEndpoint,
        getUsersHangmanPointsEndpoint,
        userInformationEndpoint,
        landingRoute, gamesRoute,
        hangmanGameRoute, alphabet, hangmanLobbyRoute, profileRoute } from './constants'
import { resolveOnChange } from 'antd/lib/input/Input';

const getGameEndpoint = (game_id) => {
    return `${hangmanEndpoint}${game_id}/`
}

const getGuessLetterEndpoint = (game_id) => {
    return `${getGameEndpoint(game_id)}/guessLetter/`
}

export const register = (username, password) => {
    const credentials = {
        username: username,
        password: password
    }
    return new Promise((resolve, reject) => {axios.post(registerEndpoint, credentials)
        .catch(error => {
            if (error.response.status === 400) {
                return resolve('User already exists.')
            } else {
                return resolve('')
            }
        })})
}

export const login = (history, username, password) => {
    const credentials = {
        username: username,
        password: password
    }
    return new Promise((resolve, reject) => {axios.post(loginEndpoint, credentials).then(response => {
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('isLoggedIn', true)
        renderGamesPage(history)
        message.success('Successfully logged in!')
    }).catch(error => {
        if (error.response.status === 401) {
            return resolve('User does not exist.')
        } else {
            return resolve('')
        }
    })})
}

export const isLoggedIn = () => {
    if (localStorage.getItem('accessToken') === '') {
        return false
    } else {
        return true
    }
}

export const renderLandingPage = (history) => {
    history.push(landingRoute)
}

export const logout = (history) => {
    localStorage.setItem('accessToken', '')
    renderLandingPage(history)
}

export const renderGamesPage = (history) => {
    history.push(gamesRoute)
}

const getConfig = () => {
    const accessToken = localStorage.getItem('accessToken')
    return {
        headers: {
            'Authorization': `JWT ${accessToken}`
        }
    }
}

export const deleteHangmanGame = (game_id) => {
    axios.delete(getGameEndpoint(game_id), getConfig()).catch(err => console.log(err))
}

export const getUnfinishedHangmanGames = () => {
    return new Promise((resolve, reject) => {(axios.get(hangmanEndpoint, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(error => console.log(error)))})
}

export const getFinishedHangmanGames = () => {
    return new Promise((resolve, reject) => {(axios.get(finishedHangmanGamesEndpoint, getConfig()).then(response => {
        return resolve(response.data)
        }).catch(error => console.log(error)))})
}

export const getUsersHangmanPoints = () => {
    return new Promise((resolve, reject) => {(axios.get(getUsersHangmanPointsEndpoint, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(error => console.log(error)))})
}


export const renderHangmanGamePage = (history, hangmanGame) => {
    history.push({
        pathname: hangmanGameRoute,
        state: {
            data: hangmanGame
        }
    })
}

export const createHangmanGame = (history, difficultyLevel) => {
    axios.post(hangmanEndpoint, {
        difficulty_level: difficultyLevel
    }, getConfig()).then(response => {
        renderHangmanGamePage(history, response.data)
    }).catch(error => console.log(error))
}

export const outcomeOfHangmanGame = (word_attempt) => {
    if (word_attempt.includes('')) {
        return 'LOST'
    } else {
        return 'WON'
    }
}

export const displayGameID = (game_id) => {
    return "Game " + game_id
}

export const displayWordAttempt = (word_attempt) => {
    const pre = word_attempt.map(val => {
      if (val === '')
        return '_'
      else
        return val
    })
    return pre.join('   ')
  }

export const displayHangmanLobbyDescription = (item) => {
    const lives = 6 - item.wrong_moves
    const progress = displayWordAttempt(item.word_attempt)
    return 'Lives Left: ' + lives + ', Progress: ' + progress
}

export const displayCorrectWord = (word) => {
    return 'word: ' + word
}

export const getUserInformation = () => {
    return new Promise((resolve, reject) => {(axios.get(userInformationEndpoint, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(error => console.log(error)))})
}

export const guessHangmanLetter = (game_id, letter) => {
    return new Promise((resolve, reject) => {axios.post(getGuessLetterEndpoint(game_id), {letter: letter}, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(err => console.log(err))})
}

export const renderHangmanLobbyPage = (history) => {
    history.push(hangmanLobbyRoute)
}

export const displayOutcomeOfHangmanGame = (word_attempt) => {
    if (word_attempt.includes('')) {
        return 'error'
    } else {
        return 'success'
    }
}

export const displayOutcomeMessage = (word_attempt) => {
    if (word_attempt.includes('')) {
      return 'You should read a dictionary :('
    } else {
      return 'Congratulations...nerd'
    }
  }

export const availableLetters = (guessedLetters) => {
    const li = guessedLetters.split('')
    return alphabet.filter( ( el ) => !li.includes( el ) );
}

export const displayGuessedLetters = (guessed_letters) => {
    return guessed_letters.split('').join(', ')
  }

export const renderProfilePage = (history) => {
    history.push(profileRoute)
}