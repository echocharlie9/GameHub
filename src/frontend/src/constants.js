const serverEndpoint = 'http://127.0.0.1:8000/'
export const registerEndpoint = `${serverEndpoint}auth/users/`
export const loginEndpoint = `${serverEndpoint}auth/jwt/create/`
export const hangmanEndpoint = `${serverEndpoint}hangman/`
export const finishedHangmanGamesEndpoint = `${hangmanEndpoint}getFinished/`
export const getUsersHangmanPointsEndpoint = `${hangmanEndpoint}getPoints/`
export const userInformationEndpoint = `${serverEndpoint}auth/users/me/`

export const landingRoute = '/'
export const gamesRoute = '/games'
export const hangmanLobbyRoute = '/hangmanLobby'
export const hangmanGameRoute = '/game'
export const profileRoute = '/profile'

export const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')