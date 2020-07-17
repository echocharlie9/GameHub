import axios from 'axios'

import { message } from 'antd'

import { renderGamesPage, renderHangmanGamePage } from './renderPageUtils'

const serverEndpoint = 'http://127.0.0.1:8000/'
export const registerEndpoint = `${serverEndpoint}auth/users/`
export const loginEndpoint = `${serverEndpoint}auth/jwt/create/`
export const hangmanEndpoint = `${serverEndpoint}hangman/`
export const finishedHangmanGamesEndpoint = `${hangmanEndpoint}getFinished/`
export const getUsersHangmanPointsEndpoint = `${hangmanEndpoint}getPoints/`
export const userInformationEndpoint = `${serverEndpoint}auth/users/me/`

/**
 * Returns the endpoint to a particular hangman game.
 * @param {number} game_id
 * @return {string} 
 */
const getGameEndpoint = (game_id) => {
    return `${hangmanEndpoint}${game_id}/`
}

/**
 * Returns the endpoint to guess a letter for
 * a particular hangman game.
 * @param {number} game_id
 * @return {string} 
 */
const getGuessLetterEndpoint = (game_id) => {
    return `${getGameEndpoint(game_id)}/guessLetter/`
}

/**
 * Sends a post request to the register endpoint. Returns
 * a promsie of the post request. The promise resolves to
 * an error message if one is received.
 * @param {string} username
 * @param {string} password
 * @return {Promise} 
 */
export const register = (username, password) => {
    const credentials = {
        username: username,
        password: password
    }
    return new Promise((resolve, reject) => {axios.post(registerEndpoint, credentials).then(res => resolve(''))
        .catch(error => {
            if (error.response.status === 400) {
                return resolve('User already exists.')
            } else {
                return resolve('')
            }
        })})
}

/**
 * Sends a post request to the login endpoint. Returns
 * a promsie of the post request. The promise resolves to
 * an error message if one is received. If the post request
 * succeeds, the games page is rendered.
 * @param {history} history
 * @param {string} username
 * @param {string} password
 * @return {Promise} 
 */
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
        return resolve('')
    }).catch(error => {
        if (error.response.status === 401) {
            return resolve('User does not exist.')
        } else {
            return resolve('')
        }
    })})
}

/**
 * Gets the access token from local storage and creates
 * an authorization header.
 * @return {header} 
 */
const getConfig = () => {
    const accessToken = localStorage.getItem('accessToken')
    return {
        headers: {
            'Authorization': `JWT ${accessToken}`
        }
    }
}

/**
 * Sends a delete request to delete the object with the
 * inputted game_id
 * @param {string} game_id
 * @return {void} 
 */
export const deleteHangmanGame = (game_id) => {
    axios.delete(getGameEndpoint(game_id), getConfig()).catch(err => console.log(err))
}

/**
 * Sends a get request to get a list of all
 * hangman games associated with the requesting user.
 * Returns a promise of this request that resolves
 * to the data of the response (a list of Hangman Games).
 * @return {Promise} 
 */
export const getUnfinishedHangmanGames = () => {
    return new Promise((resolve, reject) => {(axios.get(hangmanEndpoint, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(error => console.log(error)))})
}

/**
 * Sends a get request to get a list of all
 * hangman games that are finished associated
 * with the requesting user.
 * Returns a promise of this request that resolves
 * to the data of the response (a list of Hangman Games).
 * @return {Promise} 
 */
export const getFinishedHangmanGames = () => {
    return new Promise((resolve, reject) => {(axios.get(finishedHangmanGamesEndpoint, getConfig()).then(response => {
        return resolve(response.data)
        }).catch(error => console.log(error)))})
}

/**
 * Sends a get request to get the total
 * points a user has achieved from playing hangman.
 * Returns a promise of this request that resolves
 * to the data of the response (the number of points).
 * @return {Promise} 
 */
export const getUsersHangmanPoints = () => {
    return new Promise((resolve, reject) => {(axios.get(getUsersHangmanPointsEndpoint, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(error => console.log(error)))})
}

/**
 * Sends a post request to create a
 * hangman game. If the request succeeds,
 * the page for that hangman game is rendered.
 * @param {history} history
 * @param {number} difficultyLevel
 * @return {void} 
 */
export const createHangmanGame = (history, difficultyLevel) => {
    axios.post(hangmanEndpoint, {
        difficulty_level: difficultyLevel
    }, getConfig()).then(response => {
        renderHangmanGamePage(history, response.data)
    }).catch(error => console.log(error))
}

/**
 * Sends a get request to get information
 * of the user. Returns a promise of the request
 * that resolves to the data of the response.
 * @return {Promise} 
 */
export const getUserInformation = () => {
    return new Promise((resolve, reject) => {(axios.get(userInformationEndpoint, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(error => console.log(error)))})
}

/**
 * Sends a post request to a particular room
 * to guess a letter. Returns a promise of the request
 * that resolves to the data of the response.
 * @param {number} game_id
 * @param {string} letter
 * @return {Promise} 
 */
export const guessHangmanLetter = (game_id, letter) => {
    return new Promise((resolve, reject) => {axios.post(getGuessLetterEndpoint(game_id), {letter: letter}, getConfig()).then(response => {
        return resolve(response.data)
    }).catch(err => console.log(err))})
}