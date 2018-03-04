import React, { Component } from 'react'
import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  AppState
} from 'react-native'

import TokenService from './TokenService'

import Dashboard from './components/Dashboard'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      appState: AppState.currentState,
      accessToken: null
    }
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
    this._checkLoginStatus()
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this._checkLoginStatus()
    }
    this.setState({appState: nextAppState})
  }

  _setAccessToken = () => {
    TokenService.getAccessToken()
      .then(accessToken => {
        console.log('Access token', accessToken)
        this.setState({
          accessToken: accessToken
        })
      })
      .catch(error => console.log(error))
  }

  _checkLoginStatus = () => {
    TokenService.isLoggedIn()
      .then(isLoggedIn => {
        console.log('Is logged in', isLoggedIn)
        this.setState({
          isLoggedIn: isLoggedIn
        })
        this._setAccessToken()
      })
      .catch(error => console.log(error))
  }

  _onLogin = () => {
    TokenService.login()
      .then(() => {
        this.setState({ isLoggedIn: true })
      })
      .catch(error => console.log(error))
  }

  _loginView = () => {
    return <View style={styles.container}>
      <Text style={styles.header}>Home - Login</Text>
      <Text>
        You are {this.state.isLoggedIn ? '' : 'not '}logged in.
      </Text>
      <Button
        onPress={this._onLogin}
        title={'Log In'}
      />
    </View>
  }

  render() {
    return this.state.isLoggedIn ? <Dashboard accessToken={this.state.accessToken} /> : this._loginView();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('Home', () => Home);
