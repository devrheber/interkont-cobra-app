import React from 'react'
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform
} from 'react-native'

const Button = (props) => {
    let TouchablePlatformSpecific = Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;
    //@TODO: See in case of error compiling
    let TouchableNativeColor = Platform.OS === 'ios' ? null : TouchableNativeFeedback.SelectableBackground();
    return <TouchablePlatformSpecific
      delayPressIn={0}
      background={TouchableNativeColor}
      {...props}>
      {props.children}
    </TouchablePlatformSpecific>;
}

module.exports = Button
