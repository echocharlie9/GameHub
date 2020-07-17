import React, {useState} from 'react'

import { Select, Row, Col, Result, Button } from 'antd';
import { Error } from './Login'

import { guessHangmanLetter, renderHangmanLobbyPage,
          displayOutcomeOfHangmanGame, displayOutcomeMessage,
          availableLetters, displayWordAttempt,
          displayGuessedLetters, 
          renderGamesPage} from '../utility'

const { Option } = Select;

function Game(props) {
    function onChange(value) {
        setGuess(value)
      }
      const [ errMessage, setErrMessage ] = useState('')
    const [data, setData] = useState(props.location.state.data)
    const [guess, setGuess] = useState('')
    let available = availableLetters(data.guessed_letters)
    const submitGuess = () => {
      if (guess === '') {
        setErrMessage('Please select a letter to guess')
      } else if (data.guessed_letters.split('').includes(guess)) {
        setErrMessage('Please select a letter you have not guessed')
      } else {
      const game_id = props.location.state.data.game_id
      const letter = guess
      guessHangmanLetter(game_id, letter).then(data => setData(data))
      setErrMessage('')
      }
    }
    if (data.finished === 'no') {
    return (
        <div>
            <h1 style = {{textAlign: 'center'}}>{'Game ' + data.game_id}</h1>
            <div style = {{textAlign: 'center'}}>
            <Row gutter={16}>
            <Col className="gutter-row" span={4} offset={8}>
            <p>{'Guessed Letters: ' + displayGuessedLetters(data.guessed_letters)}</p>
            </Col>
            <Col className="gutter-row" span={4}>
            <h4>{'Lives Left: ' + (6 - data.wrong_moves)}</h4>
            </Col>
            </Row>
            </div>
            <h1 style = {{textAlign: 'center'}}>{displayWordAttempt(data.word_attempt)}</h1>
            <div style = {{textAlign: 'center'}}>
            <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Guess a Letter"
    optionFilterProp="children"
    onChange={onChange}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {available.map((val, index) => {
        return (
            <Option value={val}>{val}</Option>
        )
    })}
  </Select>
  <Button onClick={submitGuess}>Submit Guess</Button>
  <Error errMessage={errMessage}></Error>
  <div style = {{textAlign: 'center', marginTop: '30px'}}>
  <Button onClick={() => renderHangmanLobbyPage(props.history)}>Back to Hangman Lobby</Button>
  </div>
        </div>
        </div>
    )}

    else {
      return (
      <Result
    status={displayOutcomeOfHangmanGame(data.word_attempt)}
    title={displayOutcomeMessage(data.word_attempt)}
    subTitle=""
    extra={[
      <Button onClick={() => renderHangmanLobbyPage(props.history)} type="primary" key="console">
        Return To Lobby
      </Button>,
      <Button onClick={() => renderGamesPage(props.history)}>
        Browse Other Games
      </Button>
    ]}
  ></Result>
      )
    }
}

export default Game