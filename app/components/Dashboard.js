import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'

export default class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
    //  accessToken: props.accessToken
    }
  }

  render() {
    return (
      <View>
        <Text>{this.props.accessToken}</Text>
        <Text>Dashboard</Text>
      </View>
    )
  }

}
