import React from 'react'
import { withRouter } from 'react-router-dom';
import {Row, Col} from 'antd'

function Navbar(props) {
    const accessToken = localStorage.getItem('accessToken')

   const isLoggedIn = () => {
        if (accessToken === '') return false
        return true
    }

    const logout = () => {
        localStorage.setItem('accessToken', '')
        props.history.push('/')
    }

    // style = {{
    //     position: 'fixed', 
    //     right: '25px',
    //     top: '3px'
    //     }}

    const ConditionalLoggedIn = (props) => {
        const isLoggedIn = props.isLoggedIn
        if (isLoggedIn) {
            return (
                <div style = {{
                    margin: '1rem',
                    fontSize: '15px'
                    }}>
                    <Row align='middle'>
      <Col span={8}><a href='/games'>Games</a></Col>
      <Col span={2} offset={14}>
      <a onClick = {logout} >Logout</a>
      </Col>
    </Row>
                
                
            </div>
            )
        }
        else 
        return (
            <div style = {{
                position: 'fixed', 
                right: '25px',
                top: '3px'
                }}>
                {/* <a href = './login'>Login</a>
                <a href = './register'> Register</a> */}
            </div>
        )
    }

    return (
        <div>
            <ConditionalLoggedIn isLoggedIn = {isLoggedIn()}> </ConditionalLoggedIn>
        </div>
        // <nav style = {{
        //     position: 'fixed',
        //     height: '40px',
        //     width: '100%'
        //     }}>
        //     {/* <Menu mode = 'horizontal'> */}
        //         <ConditionalLoggedIn isLoggedIn = {isLoggedIn()}> </ConditionalLoggedIn>
        //     {/* </Menu> */}
        //  </nav>
    )
}

export default withRouter(Navbar)