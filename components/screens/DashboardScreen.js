import React, { Component } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import * as Permissions from 'expo-permissions';

// @TODO Change ListView per FlatList
import ListView from "deprecated-react-native-listview";

import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient'
import { styles, colors } from '../../resources/styles.js'
import {
  getSemaforoImg,
  getImagenCategoria,
  getIndicadorImg,
  getImagenCategoriaIndicador,
  kFormatter,
  pFormatter,
  numberWithCommas,
  getIconoVallaProyecto,
  getSemaforoValla,
  isSelectedCategoria,
  resolveHeaderColor
} from '../../api/utils.js'
import { updateLocalData, getLocalData, getProyecto, getProyectos, urlApiImagenes, getConfigurationApp } from '../../api/db.js'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import PubNub from 'pubnub';
import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
const pubnub = new PubNub({
  subscribeKey: "sub-c-0f1b1da2-8bd0-11ea-927a-2efbc014b69f",
  publishKey: "pub-c-20fcd685-08a6-440f-8046-a9eb96e3975e"
});

/**
 * Dashboard Class
 * @class DashboardScreen
 * @extends {Component}
 */
class DashboardScreen extends Component {
  static navigationOptions = {
    header: null
  }

  static MAPVIEW_DELTA_LEVEL = 5;
  /**
   *Creates an instance of DashboardScreen.
   * @param {*} props
   * @memberof DashboardScreen
   */
  constructor(props){
    super(props)

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let { proyectos, indicadores, latitud, longitud } = props

    let indicadorInicial = indicadores && indicadores.length ? indicadores[0] : {}

    this.state = {
      dataSource: ds,
      proyectos: proyectos,
      proyectosConst: proyectos,
      indicadores: indicadores,
      categoriaSeleccionada: indicadorInicial,
      latitud: latitud,
      longitud: longitud,
      vallaVisible: false,
      keyboardDidShow: false,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.centrarMapa();      
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

  /**
   * componentDidMount
   * @param {*} e
   * @memberof DashboardScreen
   */
  componentDidMount(){
    this._askForLocationServices();
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    this.listView.scrollToEnd()
  }

  async _askForLocationServices() {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION, {
      title: 'Allow device location access for a better experience in Siente APP',
      message: 'Siente APP works better, collecting location data to allow knowing the distance and location of the projects managed in Siente APP only if the application is in use'
    });

    if (status !== 'granted') {
      alert('Location permission not granted.');
    }
    
    /*Permissions.request(Permissions.LOCATION, {
      'title': 'Allow device location access for a better experience in Siente APP',
      'message': 'Siente APP works better, collecting location data to allow knowing the distance and location of the projects managed in Siente APP only if the application is in use',
    }).then((granted) => {
      alert(1);
      console.log('granted', granted);
    })*/
  }

  /**
   * componentWillUnmount
   * @param {*} e
   * @memberof DashboardScreen
   */
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    pubnub.unsubscribeAll();
  }
  /**
   *
   *
   * @memberof DashboardScreen
   */
  centrarMapa(){
    let { latitude, longitude } = this.centerPointsFromProjects();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude || 0
        const lon = position.coords.longitude || 0
        const accuracy = position.coords.accuracy || 0
        this.calcularDelta(lat, lon, accuracy)
      },
      (error) => this.setState({
        region: {
          latitude: latitude || 3.9089622103110315,
          longitude: longitude || -73.57992186038612,
          latitudeDelta: DashboardScreen.MAPVIEW_DELTA_LEVEL,
          longitudeDelta: 0
        }
      })
    )
  }

  /**
   * center map related to points
   * get centroid 
   * @see https://github.com/react-native-community/react-native-maps/issues/1325
   * @returns
   * @memberof DashboardScreen
   */
  centerPointsFromProjects(){

    let total = this.state.proyectos.length;

    let X = 0;
    let Y = 0;
    let Z = 0;

    this.state.proyectos.forEach( proyecto => {
      let lat = proyecto.latitudproyecto * Math.PI / 180;
      let lon = proyecto.longitudproyecto * Math.PI / 180;

      let x = Math.cos(lat) * Math.cos(lon);
      let y = Math.cos(lat) * Math.sin(lon);
      let z = Math.sin(lat);

      X += x;
      Y += y;
      Z += z;
    });

    X = X / total;
    Y = Y / total;
    Z = Z / total;

    let Lon = Math.atan2(Y, X);
    let Hyp = Math.sqrt(X * X + Y * Y);
    let Lat = Math.atan2(Z, Hyp);

    return {
      latitude: Lat * 180 / Math.PI,
      longitude: Lon * 180 / Math.PI
    }

  }

  /**
   *
   *
   * @param {*} lat
   * @param {*} lon
   * @param {*} acc
   * @memberof DashboardScreen
   */
  calcularDelta(lat, lon, acc){
    let { width, height } = Dimensions.get('window')
    const ASPECT_RATIO = width / height
    const LATITUDE_DELTA = DashboardScreen.MAPVIEW_DELTA_LEVEL
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
    this.setState({
      region: {
        latitude: lat,
        longitude: lon,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    })
  }

  /**
   *
   *
   * @param {*} value
   * @memberof DashboardScreen
   */
  handleInputChange(value) {
    this.setState({inputSearch: value})
  }

  /**
   *
   *
   * @memberof DashboardScreen
   */
  async buscar() {
    let isConn = true
    /*await NetInfo.isConnected.fetch().then(isConnected => {
      isConn = isConnected
    })*/

    if(isConn)
      await updateLocalData(
        this.state.categoriaSeleccionada.codigocategoria,
        this.state.inputSearch,
        this.state.latitud,
        this.state.longitud
      )

    let { proyectos } = await getLocalData()

    this.setState({
      proyectos: proyectos,
      proyectosConst: proyectos
    })
  }

  /**
   *
   *
   * @memberof DashboardScreen
   */
  mapa() {
    this.setState({
      verMapa: true
    })
  }

  /**
   *
   *
   * @memberof DashboardScreen
   */
  lista() {
    this.setState({
      verMapa: false
    })
  }

  /**
   *
   *
   * @param {*} indicador
   * @memberof DashboardScreen
   */
  async seleccionarCategoria(indicador){
    let isConn = true;
    /*await NetInfo.isConnected.fetch().then(isConnected => {
      isConn = isConnected
    })*/

    if(isConn)
      await updateLocalData(indicador.codigocategoria, "", this.state.latitud,
        this.state.longitud)

    let { proyectos } = await getLocalData()

    this.setState({
      proyectos: proyectos,
      proyectosConst: proyectos,
      categoriaSeleccionada: indicador
    })
  }

  /**
   *
   *
   * @param {*} codigoproyecto
   * @memberof DashboardScreen
   */
  async verProyecto(codigoproyecto) {
    const { navigate } = this.props.navigation
    proyecto = await getProyecto(codigoproyecto, this.state.latitud, this.state.longitud)
    
    this.props.dispatch({
      type: 'SET_PROYECTO',
      payload: {
        proyecto: proyecto,
        fromMenu: false
      }
    })
    
    navigate('Project')
    this.cerrarValla()
  }

  /**
   *
   *
   * @param {*} codigoproyecto
   * @memberof DashboardScreen
   */
  async abrirValla(codigoproyecto) {
    proyecto = await getProyecto(codigoproyecto, this.state.latitud, this.state.longitud)
    
    this.props.dispatch({
      type: 'SET_PROYECTO',
      payload: {
        proyecto: proyecto
      }
    })

    this.setState({
      vallaVisible: true,
      proyecto: proyecto
    })
  }

  /**
   *
   *
   * @memberof DashboardScreen
   */
  cerrarValla(){
    this.setState({
      vallaVisible: false
    })
  }

  /**
   *
   *
   * @param {*} text
   * @memberof DashboardScreen
   */
  setProyecto(text){
    nombre = text
  }

  /**
   *
   *
   * @returns
   * @memberof DashboardScreen
   */
  render() {
    let getMap = (centrarMapa) => {

      if(this.state.verMapa){
        return <View style={StyleSheet.absoluteFillObject}>
            <MapView style={{flex: 1,marginTop:10}} initialRegion={this.state.region} region={this.state.region}>
              { getMapMarkers() }
            </MapView>
            {this.state.vallaVisible ?
              <Valla
                proyecto={this.state.proyecto}
                verProyecto={(codigoProyecto) => this.verProyecto(codigoProyecto)} 
              /> : null
            }
            <TouchableOpacity
             style={{
                 alignItems:'center',
                 justifyContent:'center',
                 width:60,
                 height:60,
                 position: 'absolute',
                 bottom: 10,
                 left: 10,
                 borderRadius:100,
               }}
               onPress={() => this.centrarMapa()}
            >
             <Image
                style={{height: 60, width: 60}}
                source={require("../../resources/images/home-proyectos/btn_mapa_centrar.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
      } else {
        return <ListView
            ref={listView => { this.listView = listView; }}
            dataSource={this.state.dataSource.cloneWithRows(
              this.state.proyectos
            )}

            enableEmptySections={true}
            renderRow={(rowData) =>
              <ProyectosItem
                verProyecto={(codigoproyecto) => this.verProyecto(codigoproyecto)}
                content={rowData}
              />
            }
          />
      }
    }

    let getMapMarkers = () => {
        return this.state.proyectos.map((proyecto, i) => {
          console.log()
          return <MapView.Marker
            key={i}
            coordinate={{
              latitude: proyecto.latitudproyecto || 0,
              longitude: proyecto.longitudproyecto || 0
            }}
            title="Proyecto"
            description={proyecto.nombrecategoria}
            onCalloutPress={() => this.abrirValla(proyecto.codigoproyecto)}
          >
            <Image
              style={{height: 50, width: 50}}
              source={{uri: getImagenCategoria(proyecto.imagencategoria, urlApiImagenes)}}
            />
            <MapView.Callout>
                  <View>
                      <Text>Detalle</Text>
                  </View>
            </MapView.Callout>
          </MapView.Marker>
        })
    }

    return (
      <PubNubProvider client={pubnub}>
        <PubNubConsumer>
            {client => {
              
              client.subscribe({
                channels: ['CondorChannel'],
                withPresence: true
              });

              client.publish(
                {
                  channel: 'CondorChannel',
                  message: 'showBeLive',
                },
                (response) => {
                  if(response.error){
                    console.log(response)
                    this.setState( { proyectos: [] })
                  }
                }
              );
            }}
        </PubNubConsumer>
        <KeyboardAvoidingView 
          style={[styles.container]}
          behavior= { (Platform.OS === 'ios') ? "padding" : null } >
          <Search buscar={() => this.buscar()} 
                  handleInputChange={(e) => this.handleInputChange(e)}
                  mapa={() => this.mapa()} 
                  keyboardDidShow={this.state.keyboardDidShow}
                  lista={() => this.lista()} 
                  verMapa={this.state.verMapa} />
          { !this.state.keyboardDidShow ? <Indicadores indicador={this.state.categoriaSeleccionada} /> : null }
          { !this.state.keyboardDidShow ? <Filtros
            indicadores={this.state.indicadores}
            seleccionarCategoria={(indicador) => this.seleccionarCategoria(indicador)}
            categoriaSeleccionada={this.state.categoriaSeleccionada.codigocategoria}
            keyboardDidShow={this.state.keyboardDidShow}
          />  : null }
          <View style={styles.listaContainer}>
            { getMap(this.centrarMapa) }
          </View>
        </KeyboardAvoidingView>
      </PubNubProvider>
    )
  }
}

/**
 *
 *
 * @param {*} props
 * @returns
 */
function Filtros(props) {
  let indicadores = props.indicadores
  const keyboardWillShowSearch = {
    flexGrow : props.keyboardDidShow ? 0.3 : undefined,
    flexShrink:0, 
    flexBasis:"0%"
  }
  const keyboardWillHideSearch = {
    flex : 0.13
  }
  return (
      <View style={{ backgroundColor: '#e2ebf6', ...keyboardWillShowSearch, ...keyboardWillHideSearch, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <ScrollView horizontal={true} style={{ flex: 1 }} showsHorizontalScrollIndicator={false}>
          {
            indicadores.map((indicador, i) => {
              return <TouchableOpacity 
                  key={i} style={{ flex: 1, width:90,height:90, margin:4, ...isSelectedCategoria(indicador.codigocategoria, props.categoriaSeleccionada)} }
                  onPress={() => props.seleccionarCategoria(indicador)}
                >
                  <Image
                    style={{ 
                      flex: 1, 
                      alignSelf: 'stretch', 
                      width:90,
                      
                    }}
                    source={ getImagenCategoriaIndicador(indicador.codigocategoria, props.categoriaSeleccionada )}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
            })
          }
        </ScrollView>
      </View>
  )
}

/**
 *
 *
 * @param {*} props
 * @returns
 */
function ProyectosItem(props){
  let item = props.content
  let semaforo = getSemaforoImg(item.semaforoproyecto)

  return (
    <View style={styles.proyectosItem}>
      <View style={[styles.proyectosItemTitleContainer, {backgroundColor: resolveHeaderColor(item.colorcategoria)}]}>
        <Image style={{flex: 0.1, width: undefined, height: 25}}
          source={ {uri: getImagenCategoria(item.imagencategoria, urlApiImagenes)}} resizeMode="contain"
        />
        <Text style={[styles.proyectosItemTitle, {flex: 0.75}]}>{item.nombrecategoria}</Text>
        <Text style={[styles.proyectosItemTitle, {flex: 0.15}]}>{item.distaciaproyecto}</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.85}}>
          <Text style={styles.proyectosItemName}>{item.nombreproyecto}</Text>
          <View style={styles.proyectosItemFooterContainer}>
            <Text style={[styles.proyectosItemPrice]}>{item.valorproyecto}</Text>
            <Text style={[styles.proyectosItemPrice]}>{'|'}</Text>
            <Text style={[styles.proyectosItemPrice,{fontSize:19,fontWeight:'bold'}]}>{item.avanceproyecto}</Text>
            <Text style={[styles.proyectosItemPrice]}>{'|'}</Text>
            <Image style={{width: 70, height: 50}} source={semaforo} resizeMode="contain" />
          </View>
        </View>
        <TouchableOpacity style={{flex: 0.15, justifyContent: 'center', alignItems: 'center', padding: 5}}
          onPress={() => props.verProyecto(item.codigoproyecto)}
        >
          <Image source={require('../../resources/images/home-proyectos/btn_enlace.png')} style={{height: 40, width: 40}} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

/**
 *
 *
 * @param {*} props
 * @returns
 */
function Valla(props) {
  let proyecto = props.proyecto
  let imagenProyecto = urlApiImagenes.concat(proyecto.imagenproyecto)
  let colorCategoria = proyecto.colorcategoria ? proyecto.colorcategoria : colors.darkGray
  return (
    <View style={[styles.valla, {backgroundColor: colorCategoria}]}>
      <View style={{flex: 0.65, flexDirection: 'row'}}>
        <View style={{flex: 0.2}}>
          <Image style={[styles.imagenProyectoValla,{ zIndex:9 }]} 
                 source={{uri: imagenProyecto}} />
          <Image style={[styles.imagenProyectoValla,{ zIndex:1 }]}
            source={getImagenCategoria(proyecto.codigocategoria)} 
          />
        </View>
        <View style={{flex: 0.8, marginLeft: 10}}>
          <Text style={{color: '#fff', fontSize: 18}}>{proyecto.nombreproyecto}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#fff', fontSize: 13}}>{proyecto.localidadproyecto}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.35, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20}}>
        <View style={{flex: 0.32}}>
          <Text style={{fontFamily: 'Montserrat-Bold',color: '#fff', fontSize: 16}}>Avance</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 20, width: 20, alignSelf: 'center'}}
              resizeMode="contain"
              source={getSemaforoImg(proyecto.semaforoproyecto,true)}
            />
            <Text style={{color: '#fff', fontSize: 14, paddingLeft: 3, paddingTop: 2}}>{proyecto.avanceproyecto}</Text>
          </View>
        </View>
        <View style={{flex: 0.32}}>
          <Text style={{fontFamily: 'Montserrat-Bold',color: '#fff', fontSize: 16}}>Estado</Text>
          <Text style={{color: '#fff', fontSize: 14}}>{proyecto.estadoproyecto}</Text>
        </View>
        <View style={{flex: 0.32}}>
          <Text style={{fontFamily: 'Montserrat-Bold',color: '#fff', fontSize: 16}}>Valor</Text>
          <Text style={{color: '#fff', fontSize: 14}}>{proyecto.valorproyecto}</Text>
        </View>
      </View>
      <TouchableOpacity style={{position: 'absolute', bottom: -30, right: 10, padding: 5}}
        onPress={() => props.verProyecto(proyecto.codigoproyecto)}>
        <Image
          source={require('../../resources/images/home-proyectos/btn_enlace.png')}
          style={{height: 45, width: 45}}
        />
      </TouchableOpacity>
    </View>
  )
}

/**
 *
 *
 * @param {*} props
 * @returns
 */
function Search(props){
  return (
    <LinearGradient style={ { flex : (props.keyboardDidShow ? 0.4 : 0.2) }} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={colors.blueGradient}>
      <View style={{flex:1,justifyContent: 'flex-end', paddingBottom: 5 }}>
        <View style={[styles.searchBox, { paddingBottom: 5, paddingTop: 10}]}>
          <Image style={{ marginTop:10, marginRight:10, width: 40, height: 32}} source={require("../../resources/images/header/logo.png")} />
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row', flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.09)', borderRadius: 10,}}>
            <Icon type="MaterialCommunityIcons" style={{alignSelf:'center', paddingTop:5, paddingLeft: 10, paddingRight: 5}} name="magnify" size={20} color="#fff"/>
            <TextInput
              style={[styles.searchInputText, styles.textInput, styles.textRN]}
              placeholder='Buscar...'
              placeholderTextColor='#e2ebf6'
              onChangeText={(text) => props.handleInputChange(text)}
            />
          </View>
          <TouchableOpacity
              onPress={() => props.buscar()}
              style={styles.buttonBuscar}>
              <View style={[{flex:1,flexDirection: 'row', paddingLeft: 5, justifyContent: 'center', alignItems: 'center'}]}>
                <Text style={styles.textButtonForm}>
                  Buscar
                </Text>
              </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.searchBox, {paddingBottom: 10}]}>
          <TouchableOpacity
              onPress={() => props.mapa()}
              style={props.verMapa ? styles.buttonFormSelected : styles.buttonForm}>
              <View 
                style={[{
                  flexDirection: 'row',
                  paddingLeft: 10,
                  justifyContent: 'center',
                  alignItems: 'center'
                }]}>
                <Image style={{width: 20, height: 20}}
                  source={require("../../resources/images/header/btn_vista_mapa.png")}
                />
                <Text style={styles.textButtonForm}>
                  Mapa
                </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => props.lista()}
              style={!props.verMapa ? styles.buttonFormSelected : styles.buttonForm}>
              <View style={[{flexDirection: 'row', paddingLeft: 10, justifyContent: 'center', alignItems: 'center'}]}>
                <Image style={{width: 20, height: 20}}
                  source={require("../../resources/images/header/btn_vista_lista.png")}
                />
                <Text style={styles.textButtonForm}>
                  Lista
                </Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
}

/**
 *
 *
 * @param {*} props
 * @returns
 */
function Indicadores(props) {
  let indicador = props.indicador
  let codigoCategoria = indicador.codigocategoria
  
  return (
      <View style={{flex: 0.1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF'}}>
        <ScrollView
          horizontal={true} style={{flex: 1}} showsHorizontalScrollIndicator={false}>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(0, codigoCategoria)} resizeMode="contain" />
            <View>
              <Text style={styles.indicadorGlobalValue}>{kFormatter(indicador.totalvalorproyectos)}</Text>
               <Text style={styles.indicadorGlobalTitle}>Total invertido</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(1, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{kFormatter(indicador.totalvalorejecutadoproyectos)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Total ejecutado</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(2, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{pFormatter(indicador.totalavanceproyectos)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Avance</Text>
            </View>
          </View>

          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(5, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{numberWithCommas(indicador.totalhabitantesbeneficiados)}</Text>
              <Text style={styles.indicadorGlobalTitle}>Población Beneficiada</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(6, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectos}</Text>
              <Text style={styles.indicadorGlobalTitle}>Proyectos</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(7, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectosejecucion}</Text>
              <Text style={styles.indicadorGlobalTitle}>En ejecución</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(8, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectosiniciar}</Text>
              <Text style={styles.indicadorGlobalTitle}>Por iniciar</Text>
            </View>
          </View>
          <View style={styles.indicadorGlobal}>
            <Image style={styles.indicadorGlobalIcono} source={getIndicadorImg(9, codigoCategoria)} />
            <View>
              <Text style={styles.indicadorGlobalValue}>{indicador.totalproyectosterminados}</Text>
              <Text style={styles.indicadorGlobalTitle}>Terminados</Text>
            </View>
          </View>
      </ScrollView>
    </View>
  )
}

const mstp = state => {
  return {
    proyectos: state.localData.proyectos,
    indicadores: state.localData.indicadores,
    latitud: state.localData.latitud,
    longitud: state.localData.longitud
  }
}

export default connect(mstp)(DashboardScreen)
