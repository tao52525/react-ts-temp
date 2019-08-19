import * as React from 'react'
import { History } from 'history'

const { Component } = React
interface IProps {
  history: History
}

class ErrorPage extends Component<IProps> {
  back() {
    this.props.history.goBack()
  }
  loader () {
  }
  render() {
    return (
      <div>
        Error
        <hr />
        <a href="#" onClick={() => this.back()}>go back</a>
      </div>
    )
  }
}

export default ErrorPage
