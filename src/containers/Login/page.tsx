import * as React from 'react'
import { Button, Form, Input } from 'antd'
import { History } from 'history'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import * as styles from './login.styl'

const { Component } = React

interface IProps {
  login: (str: object[], history: History) => void,
  history: History,
  form: WrappedFormUtils
}

class Login extends Component<IProps> {
  login() {
    const { login, history, form } = this.props
    form.validateFields((errs: object[], values: object[]) => {
      if (!errs) {
        login(values, history)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.warp}>
        <Form>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true }]
            })(<Input placeholder="用户名" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true }]
            })(<Input placeholder="密码" type="password" />)}
          </Form.Item>
          <Form.Item>
            <Button onClick={() => this.login()}>Login</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create()(Login)
