import React from 'react'
import { withRouter } from 'react-router-dom';

import {Row, Col} from 'antd'

import { isLoggedIn, logout, renderGamesPage, renderProfilePage } from '../utility'

function Navbar(props) {

    const history = props.history
        if (isLoggedIn()) {
            return (
                <div style = {{
                    margin: '1rem',
                    fontSize: '15px'
                    }}>
                    <Row align='middle'>
      <Col span={8}><a onClick = {() => renderGamesPage(history)}>Games</a></Col>
      <Col span={2} offset={12}><a onClick = {() => renderProfilePage(history)} >Profile</a></Col>
      <Col span={2}>
      <a onClick = {() => logout(history)} >Logout</a>
      </Col>
    </Row>
                
                
            </div>
            )
        }
        else 
        return (
            <div>
            </div>
        )
    }
export default withRouter(Navbar)