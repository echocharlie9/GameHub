import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {List,Button, Select} from 'antd'
const { Option } = Select;
function HangmanLobby(props) {
    const accessToken = localStorage.getItem('accessToken')
 
    const config = {
        headers: {
            'Authorization': `JWT ${accessToken}`
        }
    }
    const [hangmanPoints, setPoints] = useState(0)
    const [currentGames, setCurrentGames] = useState()
    const [pastGames, setPastGames] = useState()
    const [difficultyLevel, setDifficultyLevel] = useState()
    function onChange(value) {
        setDifficultyLevel(value)
      }
      
      function onBlur() {
        console.log('blur');
      }
      
      function onFocus() {
        console.log('focus');
      }
      
      function onSearch(val) {
        console.log('search:', val);
      }
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/hangman/', config).then(response => {
            console.log(response.data)
            setCurrentGames(response.data)
            // setPastGames(response.data.filter(val => val.finished == 'yes'))
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/hangman/getFinished/', config).then(response => {
            console.log(response.data)
        setPastGames(response.data)
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/hangman/getPoints/', config).then(response => {
                console.log(response.data)
                setPoints(response.data)
            }).catch(error => console.log(error))
    },[])

   
    const join = (item) => {
        props.history.push({
            pathname: '/game',
            state: {
                data: item
            }
        })
    }

    const startNewGame = () => {
        axios.post('http://127.0.0.1:8000/hangman/', {
            difficulty_level: difficultyLevel
        }, config).then(response => {
            console.log(response.data)
            props.history.push({
                pathname: '/game',
                state: {
                    data: response.data
                }
            })
        }).catch(error => console.log(error))
    }

    const outcomeOf = (item) => {
        if (item.word_attempt.includes('')) {
            return 'LOST'
        } else {
            return 'WON'
        }
    }

    const formatGame = (game_id) => {
        return "Game " + game_id
    }

    const displayAttempt = (word_attempt) => {
        const pre = word_attempt.map(val => {
          if (val === '')
            return '_'
          else
            return val
        })
        return pre.join('   ')
      }

    const formatDescription = (item) => {
        const lives = 6 - item.wrong_moves
        const progress = displayAttempt(item.word_attempt)
        return 'Lives Left: ' + lives + ', Progress: ' + progress
    }

    const formatEndDescription = (item) => {
        const word = item.word
        return 'word: ' + word
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
                        <Button onClick={() => join(item)}>Continue Playing</Button>, 
                ]}
                    >
                        <List.Item.Meta
                            title = {<p>{formatGame(item.game_id)}</p>}
                            description = {<p>{formatDescription(item)}</p>}
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
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
        <Option value='1'>1</Option>
        <Option value='2'>2</Option>
        <Option value='3'>3</Option>
  </Select>
  <Button onClick={startNewGame}>Start New Singleplayer Game</Button>
  <p>Multiplayer Functionality Coming Soon!</p>
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
                            title = {<p>{formatGame(item.game_id)}</p>}
                            description = {<p>{formatEndDescription(item)}</p>}
                        />
                        <p>{outcomeOf(item)}</p>
                    </List.Item>
                )}
            >
            </List>
        </div>
    )
}
export default HangmanLobby