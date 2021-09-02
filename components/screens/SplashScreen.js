import { LinearGradient } from 'expo-linear-gradient'
import { styles, colors } from '../../resources/styles.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Image,
  } from 'react-native'

const mstp = state => {
  return state
}

/**
 * @class Home
 * @extends {Component}
 */
class SplashScreen extends Component {

  /**
   * Creates an instance of Home.
   * @param {*} props
   * @memberof Home
   */
  constructor(props){
    super(props)
  }

  /**
   * render login screen if has not session or fonts is not loaded
   * otherwise show tab
   * @returns
   * @memberof Home
   */
  render() { 
      return (
        <LinearGradient colors={colors.gradientPreload} style={styles.backgroundApp}>
          <View style={styles.loadingDataView}>
            <Image style={{flex: 1, height: 100, width: 100}}
              source={require('../../resources/images/header/loader.gif')}
              resizeMode={'contain'}
          />
          </View>
        </LinearGradient>
      )
  }

}

export default connect(mstp)(SplashScreen)
