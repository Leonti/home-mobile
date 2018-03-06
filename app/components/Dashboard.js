import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  AppState
} from 'react-native'

import LastReading from './LastReading';
import { heatingMedium, heatingHigh, coolingOn, acOff } from '../services/Ac'
import { ledOn, ledOff } from '../services/Led'

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

  _apiAction = func => {
    return () => func(this.props.accessToken)().then(res => console.log(res), e => console.log(e))
  }

  render() {
    const lastReadingView = this.state.lastReading !== null ?
    <LastReading
      reading={this.state.lastReading}
    /> : null;

    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start'
        }}>
        <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <Button
            onPress={this._apiAction(coolingOn)}
            title={'Cooling'}
          />
          <Button
            onPress={this._apiAction(acOff)}
            title={'Off'}
          />
        </View>
        {lastReadingView}
      </View>
    )
  }

}
