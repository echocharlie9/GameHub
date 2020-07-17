import React, {useState} from 'react'
import axios from 'axios'
import Login from './Login'
import Register from './Register'

import {Form, Input, Button, message} from 'antd'
import { UserOutlined, LockOutlined} from '@ant-design/icons';

function Landing(props) {

    const [loginShowing, setLoginShowing] = useState(true)

    const switchView = () => {
        console.log('here')
        if (loginShowing === true) {
            console.log('reached')
            setLoginShowing(false)
        } else {
            setLoginShowing(true)
        }
    }

    const login = () => {
        props.history.push('/games')
    }

    if (loginShowing) {
        console.log('login showing')
        return <Login login={login} switch={switchView}></Login>
    } else {
        console.log('register showing')
        return <Register login={login} switch={switchView}></Register>
    }
}

export default Landing