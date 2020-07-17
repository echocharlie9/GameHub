import React, {useState} from 'react'

import {Form, Input, Button} from 'antd'
import { UserOutlined, LockOutlined} from '@ant-design/icons';

import { register, login } from '../utility'

import {Error} from './Login'

function Register(props) {

    const renderLoginComponent = () => {
        props.switch()
    }
    const [ errMessage, setErrMessage ] = useState('')
    const onRegister = (values) => {
        const {username, password} = values
        register(username, password).then((err) => {
            setErrMessage(err)
            login(props.history, username, password)
        }).catch(error => console.log(error))
    }
    
    return (
        <div style = {{margin: '100px 40% 100px'}}>
            <h1> Registration </h1>
            <Form
            name="normal_register"
            className="register-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onRegister}>
                <Form.Item
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'A username is required',
                    },
                    ]}
                 >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Create Username" />
                </Form.Item>
                <Form.Item
                    name = "password"
                    hasFeedback
                    rules = {[
                    {
                        required: true,
                        message: 'A password is required'
                    },
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" type ='password'/>
                </Form.Item>
                <Form.Item
                    name = "confirmpassword"
                    dependencies = {['password']}
                    hasFeedback
                    rules = {[
                    {
                        required: true,
                        message: 'Re-enter your password'
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject('Error: Passwords do not match')
                        }
                    })
                    ]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" type ='password'/>
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                Register
                </Button>
                </Form.Item>
                 Already have an account?<a onClick={renderLoginComponent}> Login</a>
            </Form>
            <Error errMessage={errMessage}></Error>
        </div>
    )
}

export default Register