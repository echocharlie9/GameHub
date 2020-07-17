import React, {useState, useEffect} from 'react'

import {Button, List} from 'antd'

import { getUserInformation } from '../utility'

const data = [{title: 'Hangman', link: '/hangmanLobby'}]

function Games(props) {
    const [username, setUsername] = useState('')
    const [games, setGames] = useState(data)

    useEffect(() => {
        getUserInformation().then(data => setUsername(data.username))
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