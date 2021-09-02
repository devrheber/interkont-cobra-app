import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TabBar, LoginScreen, ProjectScreen, SplashScreen } from './'
import { getLocalUserInfo } from '../api/db.js'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as Font from 'expo-font';

const mstp = state => {
  return state
}

const Stack = createStackNavigator();

/**
 * @class Home
 * @extends {Component}
 */
class Home extends Component {

  /**
   * Creates an instance of Home.
   * @param {*} props
   * @memberof Home
   */
  constructor(props){
    super(props)
    this.state = {
      fontLoaded: false
    }
  }
  
  /**
   * componentDidMount
   * Load User info from SessionStorage and load external 
   * resources from assets
   * @memberof Home
   */
  async componentDidMount(){
    let userInfo = await getLocalUserInfo()
    await this.loadExternalResources()
    if(userInfo.userLogged)
      this.props.dispatch({
        type: 'SIGN_IN',
        payload: {
          userLogged: userInfo.userLogged,
          token: userInfo.token
        }
      })
  }

  /**
   * loadExternalResources
   * Load fonts in component
   * @memberof Home
   */
  async loadExternalResources(){
    Font.loadAsync({
      'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'MontserratAlternates-Light': require('../assets/fonts/MontserratAlternates-Light.ttf'),
      'MontserratAlternates-Regular': require('../assets/fonts/MontserratAlternates-Regular.ttf'),
    }).then(()=>{
      this.setState({fontLoaded: true})
    })
  }

  /**
   * render login screen if has not session or fonts is not loaded
   * otherwise show tab
   * @returns
   * @memberof Home
   */
  render() {
    if(!this.state.fontLoaded){
      return ( 
        <SplashScreen />
      )
    } else {   
      return (
        <NavigationContainer>
          { this.props.login.userLogged ? (
            <Stack.Navigator 
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="Home" component={TabBar} />
              <Stack.Screen name="Project" component={ProjectScreen} />
            </Stack.Navigator> 
          ) : (
            <Stack.Navigator 
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                headerMode="float"
                animation="fade"
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator> 
          )}    
        </NavigationContainer>
      )
    }
  }

}

export default connect(mstp)(Home)
