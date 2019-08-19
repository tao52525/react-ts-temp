import * as React from 'react'
import { Route, Link, RouteComponentProps } from 'react-router-dom'

class List extends React.Component<RouteComponentProps> {
  render () {
    const { match } = this.props
    return (
      <div>
        List
        <hr />
        <Link to={`${match.url}/${+new Date()}`}>List - a </Link>
        <hr />
        <Link to="/">go back</Link>
      </div>
    )
  }
}

export default List
