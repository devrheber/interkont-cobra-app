import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { styles, colors } from '../../resources/styles.js'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import NetInfo from '@react-native-community/netinfo'
import { userCredentialsCitanMock } from '../../mocks/mocks'

import {
  Alert,
  View,
  TextInput,
  TouchableOpacity,
  Text as TextRN,
  Image,
  ActivityIndicator,
  Keyboard
} from 'react-native'
import {
  Text
} from '../'
import {
  login,
  getConfigurationApp
} from '../../api/db.js'

class LoginScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      showIndicator: false,
      showIndicatorAsCitian: false,
      keyboardDidShow: false,
    }
  }

  /**
   * componentDidMount
   * @param {*} e
   * @memberof DashboardScreen
   */
  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  /**
   * componentWillUnmount
   * @param {*} e
   * @memberof DashboardScreen
   */
  componentWillUnmount(){
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }


  async login(loginAsCitian = false){

    if(loginAsCitian){
      this.setState({ showIndicatorAsCitian: true })
    }else{
      this.setState({ showIndicator: true })
    }

    let isConn = true;
    /*await NetInfo.isConnected.fetch().then(isConnected => {
      isConn = isConnected
    })*/

    if(isConn){

      if(loginAsCitian){
        const config = await getConfigurationApp();
        if(config.usuario && config.contrasenia){
          this.user = config.usuario
          this.password = config.contrasenia
        }else{
          this.user = userCredentialsCitanMock.usuario
          this.password = userCredentialsCitanMock.contrasenia
        }
      } else {
        this.user = this.userOriginal
        this.password = this.passwordOriginal
      }

      const userResponse = await login(this.user, this.password)
      if(userResponse.code == 200){
        let token = userResponse.token
        if(token) {
          this.props.dispatch(
            {
              type: 'SIGN_IN',
              payload: {
                userLogged: true,
                token: token
              }
            }
          )
        } else {
          Alert.alert('Error', 'Usuario o contraseña incorrecta')
        }
      } else {
        Alert.alert('Error', 'No existe el usuario')
      }
    } else {
      Alert.alert('Error', 'Debe estar conectado a internet')
    }

    if(loginAsCitian){
      this.setState({ showIndicatorAsCitian: false })
    }else{
      this.setState({ showIndicator: false })
    }
  }

  setUser(text) {
    this.user = text
    this.userOriginal = text
  }

  setPassword(text) {
    this.password = text
    this.passwordOriginal = text
  }

  /**
   * _keyboardDidShow
   * @param {*} e
   * @memberof DashboardScreen
   */
  _keyboardDidShow (e) {
    this.setState({ keyboardDidShow: true })
  }

  /**
   * _keyboardDidHide
   * @param {*} e
   * @memberof DashboardScreen
   */
  _keyboardDidHide (e) {
    this.setState({ keyboardDidShow: false })
  }

  render() {

    const keyboardWillShowLoginLoginPane = {
      marginTop: this.state.keyboardDidShow ? 0 : 80,
    }
    const keyboardWillShowLoginLoginPaneContainer = {
      flex: this.state.keyboardDidShow ? 1 : 2,
    }

    return (
      <LinearGradient colors={colors.blueGradient} style={styles.backgroundApp}>
        <View style={styles.containerLogin}>
          <View style={{ ...keyboardWillShowLoginLoginPaneContainer, justifyContent: 'center', alignItems: 'center', ...keyboardWillShowLoginLoginPane , marginBottom: 10}}>
            <Image style={[styles.imagenLogin]} resizeMode="contain"
              source={require("../../resources/images/login/logo.png")}
            />
          </View>
          <View style={[styles.inputWithIcon, {marginBottom: 10}]}>
            <Icon type="MaterialCommunityIcons" style={{padding: 15}} name="account" size={20} color="#fff"/>
            <TextInput
              placeholder='Usuario'
              onChangeText={(text) => this.setUser(text)}
              placeholderTextColor='#e2ebf6'
              style={styles.textInputLogin}
            />
          </View>
          <View style={[styles.inputWithIcon, {marginBottom: 10}]}>
            <Icon type="MaterialCommunityIcons" style={{padding: 15}} name="lock-outline" size={20} color="#fff"/>
            <TextInput
              placeholder='Contraseña'
              onChangeText={(text) => this.setPassword(text)}
              secureTextEntry={true}
              placeholderTextColor='#e2ebf6'
              style={styles.textInputLogin}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.login()}
            style={styles.buttonLogin}>
            <View style={[{flexDirection: 'row', padding: 2, justifyContent: 'center', alignItems: 'center'}]}>
              { this.state.showIndicator ?
                <ActivityIndicator
                  size="small"
                  color="#ffffff"
                /> : <Text style={styles.textButtonLogin}> INGRESAR </Text>
              }
            </View>
          </TouchableOpacity>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <Image style={styles.imagenLoginPowered} resizeMode="contain"
              source={require("../../resources/images/login/powered.png")}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mstp = state => {
  return state
}

export default connect(mstp)(LoginScreen)
