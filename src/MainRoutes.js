import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import Alert from 'react-bootstrap/Alert'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Home from './herobuilder/scene/components/Home.js'
import CreateCharacter from './herobuilder/characters/components/CreateCharacter.js'
import Characters from './herobuilder/characters/components/Characters.js'
import Character from './herobuilder/characters/components/Character.js'
import UpdateCharacter from './herobuilder/characters/components/UpdateCharacter.js'

class MainRoutes extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      id: null
    }
  }

  setUser = user => this.setState({ user })

  setCharacterId = id => this.setState({ id })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { user, alerts } = this.state

    return (
      <React.Fragment>
        <Route exact path='/' render={() => (
          <Home user={user} />
        )} />
        <Route path='/sign-up' render={() => (
          <SignUp alert={this.alert} setUser={this.setUser} />
        )} />
        <Route path='/sign-in' render={() => (
          <SignIn alert={this.alert} setUser={this.setUser} />
        )} />
        <AuthenticatedRoute user={user} path='/sign-out' render={() => (
          <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
        )} />
        <AuthenticatedRoute user={user} path='/change-password' render={() => (
          <ChangePassword alert={this.alert} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/characters' render={() => (
          <Characters alert={this.alert} user={user} />
        )} />
        <AuthenticatedRoute user={user} exact path='/characters/:id' render={() => (
          <Character alert={this.alert} user={user} setCharacterId={this.setCharacterId} />
        )} />
        <AuthenticatedRoute user={user} exact path='/characters/:id/update' render={() => (
          <UpdateCharacter alert={this.alert} user={user} setCharacterId={this.setCharacterId} />
        )} />
        <AuthenticatedRoute user={user} exact path='/create-character' render={() => (
          <CreateCharacter alert={this.alert} user={user} />
        )} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
      </React.Fragment>
    )
  }
}

export default withRouter(MainRoutes)
