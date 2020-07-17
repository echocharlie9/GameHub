export const landingRoute = '/'
export const gamesRoute = '/games'
export const hangmanLobbyRoute = '/hangmanLobby'
export const hangmanGameRoute = '/game'
export const profileRoute = '/profile'

/**
 * Pushes the profile route on the history stack,
 * thereby rendering the profile page.
 * @param {history} history
 * @return {void} 
 */
export const renderProfilePage = (history) => {
    history.push(profileRoute)
}

/**
 * Pushes the hangman lobby route on the history stack,
 * thereby rendering the hangman lobby page.
 * @param {history} history
 * @return {void} 
 */
export const renderHangmanLobbyPage = (history) => {
    history.push(hangmanLobbyRoute)
}

/**
 * Pushes the hangman game route on the history stack,
 * thereby rendering the hangman game page.
 * @param {history} history
 * @param {HangmanGame} hangmanGame
 * @return {void} 
 */
export const renderHangmanGamePage = (history, hangmanGame) => {
    history.push({
        pathname: hangmanGameRoute,
        state: {
            data: hangmanGame
        }
    })
}

/**
 * Pushes the games route on the history stack,
 * thereby rendering the games page.
 * @param {history} history
 * @return {void} 
 */
export const renderGamesPage = (history) => {
    history.push(gamesRoute)
}

/**
 * Pushes the landing route on the history stack,
 * thereby rendering the landing page.
 * @param {history} history
 * @return {void} 
 */
export const renderLandingPage = (history) => {
    history.push(landingRoute)
}

/**
 * Pushes the landing route on the history stack,
 * thereby rendering the landing page. It also deletes
 * the access token from local storage.
 * @param {history} history
 * @return {void} 
 */
export const logout = (history) => {
    localStorage.setItem('accessToken', '')
    renderLandingPage(history)
}