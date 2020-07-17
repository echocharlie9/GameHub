import React, {useState} from 'react'

import Login from './Login'
import Register from './Register'

function Landing(props) {

    const [loginShowing, setLoginShowing] = useState(true)

    const switchView = () => {
        if (loginShowing === true) {
            setLoginShowing(false)
        } else {
            setLoginShowing(true)
        }
    }

    if (loginShowing) {
        return <Login switch={switchView}></Login>
    } else {
        return <Register switch={switchView}></Register>
    }
}

export default Landing