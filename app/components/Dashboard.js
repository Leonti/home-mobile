import React, { Component } from 'react'
import {
  Text,
  View,
  AppState
} from 'react-native'

import LastReading from './LastReading';
//import { heatingMedium, heatingHigh, coolingOn, acOff } from '../services/Ac'
//import { ledOn, ledOff } from '../services/Led'

export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lastReading: null,
      appState: AppState.currentState,
    }
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange)
    this._refreshLastReading()
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('Dashboard has come to the foreground!')
      this._refreshLastReading()
    }
    this.setState({appState: nextAppState})
  }

  _refreshLastReading() {
    fetch('https://home.leonti.me/api/last-reading', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${this.props.accessToken}`
      })
    })
    .then(response => response.json())
    .then(lastReading => {
      this.setState({lastReading})
    })
  }

  render() {
    const lastReadingView = this.state.lastReading !== null ?
    <LastReading
      temperature={this.state.lastReading.temperature}
      humidity={this.state.lastReading.humidity}
      co2={this.state.lastReading.co2}
      timestamp={this.state.lastReading.timestamp}
    /> : null;

    return (
      <View>
        <Text>{this.props.accessToken}</Text>
        {lastReadingView}
      </View>
    )
  }

}
