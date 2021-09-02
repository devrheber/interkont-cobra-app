import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import NetInfo from '@react-native-community/netinfo'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import {
  View,
  Image,
  Alert
} from 'react-native'
import {
  DashboardScreen,
  SomosTabBar,
  Project,
  Indicadores
} from './'
import { styles, colors } from '../resources/styles.js'
import { updateLocalData, getLocalData, getIndicadores, getIndicadoresResultados, removeLocalUserInfo } from '../api/db.js'

const Tab = createBottomTabNavigator();

class TabBar extends Component{

  /**
   *Creates an instance of TabBar.
   * @param {*} props
   * @memberof TabBar
   */
  constructor(props){
    super(props)
    this.proyectos = undefined
    this.indicadores = undefined
  }

  /**
   * Load initial Data from geocoder
   * @param {*} lat
   * @param {*} lon
   * @param {*} accuracy
   * @memberof TabBar
   */
  async loadInitialDataPayload(lat, lon, accuracy){
    let isConn = true;
    /*await NetInfo.isConnected.fetch().then(isConnected => {
      isConn = isConnected
    })*/
    if(isConn)
      await updateLocalData(0, undefined, lat, lon)

    let { proyectos } = await getLocalData()
    let indicadores = await getIndicadores()
    let indicadoresResultados = await getIndicadoresResultados()

    if(proyectos) {
      this.props.dispatch({
        type: 'SET_GEOLOCATION',
        payload: {
          proyectos: proyectos,
          indicadores: indicadores,
          indicadoresEstrategicos: indicadoresResultados,
          latitud: lat,
          longitud: lon,
          accuracy: accuracy
        }
      })
    }
  }

  /**
   * Component Did Mount
   * @memberof TabBar
   */
  async componentDidMount(){
    const lat = 10.4
    const lon = -75.5  
    const accuracy = 1

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude || 0
        const lon = position.coords.longitude || 0
        this.loadInitialDataPayload(lat, lon, accuracy)
      },
      () => {
        this.loadInitialDataPayload(lat, lon, accuracy)
      }
    )
  }
  
  /**
   * Show Alert button on logout
   * @returns void
   * @memberof TabBar
   */
  showAlertLogout(){
    Alert.alert(
      null,
      '¿Está seguro que desea cerrar la sesión?',
      [
        { text: 'NO' },
        { text: 'SI', onPress: () => this.logout() },
      ]
    );
  }

  async logout(){
    await removeLocalUserInfo()

    this.props.dispatch({
      type: 'SIGN_OUT',
      payload: {}
    })

    return null
  }

  onChangeTab(tab) {
    if(tab.i == 0){
      this.props.dispatch({
        type: 'SET_DATA',
        payload: {
          fromMenu: true
        }
      })
    }
  }

  render() {
    //@TODO Navigation path doesnt Exist
    if(!this.props.localData.proyectos && !this.props.localData.longitud){
      return (
        <LinearGradient colors={colors.blueGradient} style={styles.backgroundApp}>
          <View style={styles.loadingDataView}>
            <Image style={{flex: 1, height: 100, width: 100}}
              source={require('../resources/images/header/logo.png')}
              resizeMode={'contain'}
          />
          </View>
        </LinearGradient>
      )
    } else {
      return (
        <Tab.Navigator 
            screenOptions={({ navigation, route }) => ({
              gestureEnabled: true,
              gestureDirection: "horizontal",
              headerMode: 'none',
              transitionSpec:{
                open: transitionSpecConfig,
                close: transitionSpecConfig,
              },
              tabBarIcon: ({ focused, color, size }) => {      
                let iconName;
                if (route.name === 'Dashboard') {
                  iconName = 'view-list';
                } else if (route.name === 'Logout') {
                  iconName = 'exit-to-app';
                }
                return <Icon type="MaterialCommunityIcons" name={iconName} size={size} color={color} />
              }
            })}
            headerMode="float"
            animation="fade"
          >
          <Tab.Screen 
              name="Dashboard" 
              component={DashboardScreen} />
          <Tab.Screen 
              name="Logout" 
              component={Indicadores} 
              listeners={({ navigation, route }) => ({
                tabPress: e => {
                  e.preventDefault();
                  this.showAlertLogout();
                },
              })}
          />
        </Tab.Navigator>
      )
    }
  }
}

const transitionSpecConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const mstp = state => {
  return state
}

export default connect(mstp)(TabBar)
