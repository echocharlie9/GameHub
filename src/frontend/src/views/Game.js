import React, {useState} from 'react'
import axios from 'axios'
import { Select, Row, Col, Result, Button } from 'antd';
const { Option } = Select;

const alph = 'abcdefghijklmnopqrstuvwxyz'.split('')

function Game(props) {
    const accessToken = localStorage.getItem('accessToken')

    const config = {
        headers: {
            'Authorization': `JWT ${accessToken}`
        }
    }
    function onChange(value) {
        setGuess(value)
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
    const fix = (lett) => {
        const li = lett.split('')
        return alph.filter( ( el ) => !li.includes( el ) );
    }
    const [data, setData] = useState(props.location.state.data)
    const [guess, setGuess] = useState()
    let available = fix(data.guessed_letters)
    const back = () => {
        props.history.push('/hangmanLobby')
    }
    const calcStatus = () => {
      if (data.word_attempt.includes('')) {
        return 'error'
      } else {
        return 'success'
      }
    }
    const calcTitle = () => {
      if (data.word_attempt.includes('')) {
        return 'You should read a dictionary :('
      } else {
        return 'Congratulations...nerd'
      }
    }
    const submitGuess = () => {
        const game_id = props.location.state.data.game_id
        axios.post(`http://127.0.0.1:8000/hangman/${game_id}/guessLetter/`, {letter: guess},config).then(response => {
            console.log(response.data)
            setData(response.data)
        }).catch(err => console.log(err))
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
    const displayGuessedLetters = (guessed_letters) => {
      return guessed_letters.split('').join(', ')
    }
    if (data.finished === 'no') {
      console.log('no')
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
            <h1 style = {{textAlign: 'center'}}>{displayAttempt(data.word_attempt)}</h1>
            <div style = {{textAlign: 'center'}}>
            <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Guess a Letter"
    optionFilterProp="children"
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    onSearch={onSearch}
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
  <div style = {{textAlign: 'center', marginTop: '30px'}}>
  <Button onClick={back}>Back to Hangman Lobby</Button>
  </div>
        </div>
        </div>
    )}

    else {
      console.log('yes')
      return (
      <Result
    status={calcStatus()}
    title={calcTitle()}
    subTitle=""
    extra={[
      <Button onClick={() => props.history.push('/hangmanLobby')} type="primary" key="console">
        Return To Lobby
      </Button>,
      <Button onClick={() => props.history.push('/games')}>
        Browse Other Games
      </Button>
    ]}
  ></Result>
      )
    }
}

export default Game