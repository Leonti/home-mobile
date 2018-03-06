import React from 'react';
import {
  Text,
  View
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


const LastReading = props =>
    <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
      <View><Text style={textStyle}><Icon name='thermometer' size={textSize} color={iconColor} />{Math.round(props.reading.temperature * 100) / 100}</Text></View>
      <View><Text style={textStyle}><Icon name='water-percent' size={textSize} color={iconColor} />{Math.round(props.reading.humidity * 100) / 100}%</Text></View>
      <View><Text style={textStyle}><Icon name='periodic-table-co2' size={textSize} color={iconColor} />{props.reading.co2}</Text></View>
    </View>

const textSize = 30
const textStyle = {
  fontSize: textSize
}
const iconColor = '#666'

export default LastReading
