import React from 'react';
import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Navbar from './views/Navbar'
import HangmanLobby from './views/HangmanLobby'
import Game from './views/Game'
import Profile from './views/Profile'
import Landing from './views/Landing'
import Games from './views/Games'

import { landingRoute, gamesRoute, hangmanLobbyRoute,
  hangmanGameRoute, profileRoute } from './renderPageUtils'

/**
 * The base component that attaches to index.html.
 * Consists of a navbar and main content that switches
 * between multiple different routes.
 * @param {props} props
 * @return {component} 
 */
function App(props) {

  return (
    <div className="App">
        <Navbar/>
      <Switch>
        <Route exact path = {landingRoute} component = {Landing}/>
        <Route exact path = {gamesRoute} component = {Games}/>
        <Route exact path = {hangmanLobbyRoute} component = {HangmanLobby} />
        <Route exact path = {hangmanGameRoute} component = {Game} />
        <Route exact path = {profileRoute} component = {Profile} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
