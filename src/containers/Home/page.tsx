import * as React from 'react'
import { Link } from 'react-router-dom'
import { IHomeReducer } from '../../moudles/home'
import Header from '../../components/Header'

interface IProps {
  homeReducer: IHomeReducer,
  modifyName: (t: string) => void,
  getName: () => string
}

class Home extends React.Component<IProps> {
  modifyName(val: string) {
    const { modifyName, getName } = this.props
    modifyName(val)
    getName()
  }
  render() {
    const { homeReducer } = this.props
    const { name } = homeReducer
    return (
      <div>
        <Header />
        Home <a onClick={() => this.modifyName(`${name}2`)}>{name}</a>
        <hr />
        <Link to="/list">List</Link>
        <hr />
        <Link to="/login">Logout</Link>
      </div>
    )
  }
}

export default Home
