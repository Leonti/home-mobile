import React from 'react';
import {
  Text,
  View
} from 'react-native'

const LastReading = ({temperature, humidity, co2, timestamp}) =>
    <View>
      <View><Text>{Math.round(temperature * 100) / 100}C</Text></View>
      <View><Text>Humidity {Math.round(humidity * 100) / 100}%</Text></View>
      <View><Text>CO2 {co2}</Text></View>
    </View>

export default LastReading
