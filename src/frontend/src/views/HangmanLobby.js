import React, {useState, useEffect} from 'react'

import {List,Button, Select} from 'antd'
import { Error } from './Login'

import { getUnfinishedHangmanGames, getFinishedHangmanGames,
        getUsersHangmanPoints, createHangmanGame,
        deleteHangmanGame } from '../endpointUtils'
import { renderHangmanGamePage } from '../renderPageUtils'
import { displayCorrectWord, displayGameID,
        displayHangmanLobbyDescription, outcomeOfHangmanGame } from '../displayUtils'


const { Option } = Select;

function HangmanLobby(props) {
    const [hangmanPoints, setPoints] = useState(0)
    const [currentGames, setCurrentGames] = useState()
    const [pastGames, setPastGames] = useState()
    const [difficultyLevel, setDifficultyLevel] = useState()
    const [ errMessage, setErrMessage ] = useState('')
    function onChange(value) {
        setDifficultyLevel(value)
      }
      
    useEffect(() => {
        getUnfinishedHangmanGames().then(data => setCurrentGames(data))
        getFinishedHangmanGames().then(data => setPastGames(data))
        getUsersHangmanPoints().then(data => setPoints(data))
    },[])

    const deleteGame = (game_id) => {
        deleteHangmanGame(game_id)
        setCurrentGames(currentGames.filter((val) => val.game_id !== game_id))
    }

    const createGame = () => {
        if ((difficultyLevel == null) || (difficultyLevel == '')) {
            setErrMessage('Please select a difficulty level')
        } else {
            createHangmanGame(props.history, difficultyLevel)
        }
    }

    return (
        <div>
            <h1 style = {{textAlign: 'center'}}>Play Hangman</h1>
            <h3 style= {{textAlign: 'center'}}>{'Points Earned: ' + hangmanPoints}</h3>
            <div style= {{textAlign: 'center'}}>
            </div>
            <h2 style= {{textAlign: 'center'}}>Current Games</h2>
            <List
                style = {{
                    margin: '10px 10% 50px 10%', 
                    padding: '10px', 
                    border: '2px solid grey',
                    borderRadius:'5px'
                }}
                itemLayout = 'horizontal'
                dataSource = {currentGames}
                renderItem = {(item) => (
                    <List.Item
                    actions={[
                        <Button onClick={() => renderHangmanGamePage(props.history, item)}>Continue Playing</Button>,
                        <Button onClick={() => deleteGame(item.game_id)}>Delete Game</Button> 
                ]}
                    >
                        <List.Item.Meta
                            title = {<p>{displayGameID(item.game_id)}</p>}
                            description = {<p>{displayHangmanLobbyDescription(item)}</p>}
                        />
                    </List.Item>
                )}
            >

            </List>
            <div style= {{textAlign: 'center'}}>
            <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Choose Difficulty Level"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
        <Option value='1'>1</Option>
        <Option value='2'>2</Option>
        <Option value='3'>3</Option>
  </Select>
  <Button onClick={createGame}>Start New Singleplayer Game</Button>
  <p>Multiplayer Functionality Coming Soon!</p>
  <Error errMessage={errMessage}></Error>
  </div>
            <h2 style= {{textAlign: 'center'}}>Past Games</h2>
            <List
                style = {{
                    margin: '10px 10% 50px 10%', 
                    padding: '10px', 
                    border: '2px solid grey',
                    borderRadius:'5px'
                }}
                itemLayout = 'horizontal'
                dataSource = {pastGames}
                renderItem = {(item) => (
                    <List.Item
                    >
                        <List.Item.Meta
                            title = {<p>{displayGameID(item.game_id)}</p>}
                            description = {<p>{displayCorrectWord(item.word)}</p>}
                        />
                        <p>{outcomeOfHangmanGame(item.word_attempt)}</p>
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}
export default HangmanLobby