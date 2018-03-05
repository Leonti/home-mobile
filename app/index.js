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
      initializing: true,
      isLoggedIn: false,
      appState: AppState.currentState,
      accessToken: null
    }
  }

  componentDidMount () {
    AppState.addEventListener('change', this._handleAppStateChange)
    this._checkLoginAndGetAccessToken()
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      this._checkLoginAndGetAccessToken()
    }
    this.setState({appState: nextAppState})
  }

  _checkLoginAndGetAccessToken = async () => {
    try {
      this.setState({
        isLoggedIn: await TokenService.isLoggedIn(),
        initializing: false
      })

      if (this.state.isLoggedIn) {
        this.setState({
          accessToken: await TokenService.getAccessToken()
        })
      }
    } catch (e) {
      console.log(e)
    }
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

  _refreshTokenView = () => {
    return <View style={styles.container}>
      <Text>
        Refreshing authentication.
      </Text>
    </View>
  }

  _initView = () => {
    return <View style={styles.container}>
      <Text>
        Initializing.
      </Text>
    </View>
  }

  render() {
    if (this.state.initializing) {
      return this._initView()
    }

    if (this.state.isLoggedIn) {
      return this.state.accessToken ? <Dashboard accessToken={this.state.accessToken} /> : this._refreshTokenView()
    }

    return this._loginView()
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
