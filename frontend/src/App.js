import React, {useState} from 'react';
import './App.css';

import {Route, Switch} from 'react-router-dom'
import { withRouter } from 'react-router-dom';

import Navbar from './views/Navbar'
import HangmanLobby from './views/HangmanLobby'
import Game from './views/Game'
import Profile from './views/Profile'
import Landing from './views/Landing'
import Games from './views/Games'
function App(props) {

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <Navbar/>
      {/* </header> */}
      <Switch>
        <Route exact path = "/" component = {Landing}/>
        <Route exact path = "/games" component = {Games}/>
        <Route exact path = "/hangmanLobby" component = {HangmanLobby} />
        <Route exact path = "/game" component = {Game} />
        <Route exact path = "/profile" component = {Profile} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
