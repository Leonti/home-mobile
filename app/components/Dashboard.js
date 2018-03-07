import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
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
    return (
      <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: 30
        }}>
        <LastReading
          reading={this.state.lastReading}
        />
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <TouchableOpacity style={{
            backgroundColor: '#2196f3',
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}
            onPress={this._apiAction(coolingOn)}
          >
            <Text style={{
              fontSize: 25,
              color: 'white'
            }}
            >COOLING</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#ff7961',
            width: 150,
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}
            onPress={this._apiAction(acOff)}
          >
            <Text style={{
              fontSize: 25,
              color: 'white'
            }}
            >OFF</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}
