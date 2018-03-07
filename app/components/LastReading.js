import React from 'react';
import {
  Text,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const LastReading = props => {
  const tempText = props.reading ? Math.round(props.reading.temperature * 100) / 100 : '...'
  const humidityText = props.reading ? `${Math.round(props.reading.humidity * 100) / 100}%` : '...'
  const co2Text = props.reading ? props.reading.co2 : '...'
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View><Text style={textStyle}><Icon name='thermometer' size={textSize} color={iconColor} />{tempText}</Text></View>
      <View><Text style={textStyle}><Icon name='water-percent' size={textSize} color={iconColor} />{humidityText}</Text></View>
      <View><Text style={textStyle}><Icon name='periodic-table-co2' size={textSize} color={iconColor} />{co2Text}</Text></View>
    </View>)
}


const textSize = 30
const textStyle = {
  fontSize: textSize
}
const iconColor = '#666'

export default LastReading
