import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {Button, List} from 'antd'

const data = [{title: 'Hangman', link: '/hangmanLobby'}]

function Games(props) {

    const accessToken = localStorage.getItem('accessToken')
 
    const config = {
        headers: {
            'Authorization': `JWT ${accessToken}`
        }
    }
    const [username, setUsername] = useState()
    const [games, setGames] = useState(data)

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/auth/users/me/', config).then(response => {
            console.log(response.data)
            setUsername(response.data.username)
            // setPastGames(response.data.filter(val => val.finished == 'yes'))
        }).catch(error => console.log(error))
    },[])

    return (
        <div>
            <h1 style= {{textAlign: 'center'}}>{'Welcome ' + username}</h1>
            <h2 style= {{textAlign: 'center'}}>Play some of our games!</h2>
            <List
                style = {{
                    margin: '10px 10% 50px 10%', 
                    padding: '10px', 
                    border: '2px solid grey',
                    borderRadius:'5px'
                }}
                itemLayout = 'horizontal'
                dataSource = {games}
                renderItem = {(item) => (
                    <List.Item
                    actions={[
                        <Button onClick={() => props.history.push(item.link)}>Play</Button>, 
                ]}
                    >
                        <List.Item.Meta
                            title = {<h3>{item.title}</h3>}
                        />
                    </List.Item>
                )}
            >

            </List>
            <p style= {{textAlign: 'center'}}>More games coming soon!</p>
        </div>
    )
}

export default Games