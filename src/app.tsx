import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Spin } from 'antd'
import 'normalize.css'
import Home from './containers/Home'

const { Suspense, lazy, Component } = React
// 基于路由的代码分割
const Login = lazy(() => import(/* webpackChunkName: "login" */ './containers/Login'))
const List = lazy(() => import(/* webpackChunkName: "list" */ './containers/List'))
const ErrorPage = lazy(() => import(/* webpackChunkName: "error-page" */ './containers/ErrorPage'))

const App = () => (
  <Router>
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={List} />
        <Route component={ErrorPage} />
      </Switch>
    </Suspense>
  </Router>
)

export default App
