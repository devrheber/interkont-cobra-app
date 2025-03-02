import React from 'react'
import {
  createStore,
  combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import { Home } from './components'
import { updateUserInfo } from './api/db.js'
import * as Sentry from 'sentry-expo'
import Constants from 'expo-constants';

Sentry.init({
  dsn: 'https://a858456069f44bc18313bfb4f11a81ec@o379984.ingest.sentry.io/5205361',
  enableInExpoDevelopment: true,
  debug: true,
});
Sentry.setRelease(Constants.manifest.revisionId);

const reducerLogin = (state = {}, action) => {
  let userInfo = {}

  switch (action.type) {
    case 'SIGN_IN':
      userInfo = {
        
        userLogged: action.payload.userLogged,
        token: action.payload.token
      }
      updateUserInfo(userInfo)
      return userInfo

    case 'SIGN_OUT':
        userInfo = {
          userLogged: false,
          token: undefined
        }
        return userInfo
    default:
      return state
  }
}


const reducerLocalData = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        proyectos: action.payload.proyectos,
        indicadores: action.payload.indicadores,
        fromMenu: action.payload.fromMenu
      }
    case 'SET_PROYECTO':
      return {
        ...state,
        proyecto: action.payload.proyecto,
        fromMenu: action.payload.fromMenu
      }
    case 'SET_GEOLOCATION':
      return {
        ...state,
        proyectos: action.payload.proyectos,
        indicadores: action.payload.indicadores,
        indicadoresEstrategicos: action.payload.indicadoresEstrategicos,
        latitud: action.payload.latitud,
        longitud: action.payload.longitud,
        accuracy: action.payload.accuracy
      }
      
    default:
      return state
  }
}

const appReducer = combineReducers({
  login: reducerLogin,
  localData: reducerLocalData
})

const store = createStore(appReducer);

const App = () => (
  <Provider store={store}>
      <Home />
  </Provider>
)

export default App
