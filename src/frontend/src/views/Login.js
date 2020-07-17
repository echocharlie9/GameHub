import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { login } from '../endpointUtils'

export const Error = (props) => {
  return (
  <p>{props.errMessage}</p>
  )
}

function Login(props) {

  const renderRegisterComponent = () => {
    props.switch()
}
    const [ errMessage, setErrMessage ] = useState('')

    const onLogin = (values) => {
      login(props.history, values.username, values.password).then(
        error => setErrMessage(error)
      )
      }

    return (
        <div style = {{margin: '100px 40% 100px'}}>
        <h1>Login to GameHub</h1>
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onLogin}
        >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a onClick={() => renderRegisterComponent(props.history)}>register now!</a>
      </Form.Item>
    </Form>
    <Error errMessage={errMessage}></Error>
    </div>
    )
}

export default withRouter(Login)