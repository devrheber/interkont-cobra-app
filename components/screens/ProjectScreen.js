import React, {Component} from 'react'
import {
  Animated,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import Accordion from 'react-native-collapsible/Accordion'
import { connect } from 'react-redux'
import { styles, colors } from '../../resources/styles.js'
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  getIconoDetalleAcordeon,
  getImagenCategoriaProyecto,
  getSemaforoImg,
  formatMoney,
  getProjectDetailStat
} from '../../api/utils.js'
import {
  urlApiImagenes
} from '../../api/db.js'
import { Text } from '../'
import { SliderBox } from "react-native-image-slider-box";

const CONTENT = []

class ProjectScreen extends Component {

  constructor(props) {
    super(props);

    let { proyecto } = props
    let imagenes = proyecto.imagenesproyecto
    let fromMenu = props.fromMenu

    this.state = {
      imagenes: imagenes,
      proyecto: proyecto,
      activeSections: [],
      fromMenu: fromMenu,
      scrollY: new Animated.Value(0),
    }

    CONTENT.splice(0, CONTENT.length)
    CONTENT.push({
      tab: 1,
      title: '¿Cuanto Cuesta?',
      content: proyecto.objetoproyecto,
      presupuesto: proyecto.valorproyecto
    })
    CONTENT.push({
      tab: 0,
      title: '¿Como va el proyecto?',
      content: proyecto.objetoproyecto,
    })
    CONTENT.push({
      tab: 3,
      title: '¿Quiénes participan?',
      content: proyecto.contratistasproyecto,
      subtitle: 'Coordinador y Co-beneficiario'
    })
    CONTENT.push({
      tab: 5,
      title: 'Imágenes',
      content: proyecto.objetoproyecto,
    })
    CONTENT.push({
      tab: 6,
      title: 'Datos relevantes',
      content: proyecto.objetoproyecto,
    })
  }

  componentWillReceiveProps(nextProps){
    if (this.props.fromMenu !== nextProps.fromMenu){
      this.setState({
        fromMenu: nextProps.fromMenu
      })
    }
  }

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    })
  }

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.headerAccordion, isActive ? styles.activeAccordion : styles.inactiveAccordion]}
        transition="backgroundColor">
        <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center',
          alignItems: 'center'}}>
          <Image style={{flex: 0.1, width: undefined, height: 30}}
              source={getIconoDetalleAcordeon(section.tab)} resizeMode="contain"
           />
          <Text style={[styles.headerTextAccordion, {flex: 0.8, textAlign: 'left', paddingLeft:20}]}>
            {section.title}
          </Text>
          <Image style={{flex: 0.1, width: undefined, height: 20}}
              source={require("../../resources/images/detalle-proyecto/dropdown_arrow.png")} resizeMode="contain"
           />
         </View>
      </Animatable.View>
    )
  }

  renderContent(section, _, isActive, state) {
    let getContent = section => {
      if(section.tab == 0){
        let beforePercentage = this.state.proyecto.avanceproyecto || '0%';
        let AfterPercengage = this.state.proyecto.debeir || '0%';
        return (
          <View style={styles.statusProjectList}>
            <View style={[styles.statusProjectItem,{ marginLeft: 20 }]}>
              <Image style={{height: 80, width: null}} 
                      source={getProjectDetailStat(beforePercentage)} 
                      resizeMode="cover" />
              <View style={styles.statusProjectItemInfo}>
                <Text style={styles.statusProjectItemPercentage}>{beforePercentage}</Text>
                <Text style={styles.statusProjectItemLabel}>Así va</Text>
              </View>
            </View>
            <View style={[styles.statusProjectItem,{ marginRight: 20 }]}>
              <Image style={{height: 80, width: null}} 
                      source={getProjectDetailStat(AfterPercengage)} 
                      resizeMode="cover" />
              <View style={styles.statusProjectItemInfo}>
                <Text style={styles.statusProjectItemPercentage}>{AfterPercengage}</Text>
                <Text style={styles.statusProjectItemLabel}>Así debería ir</Text>
              </View>
            </View>
          </View>
        )
      }
      if(section.tab == 1){
        return (
          <View style={styles.contentAccordeonpriceWrapper}>
            <View style={{justifyContent: 'center', alignItems: 'center',flex:1}}>
              <View style={{padding: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, marginLeft: 10}}>Presupuesto</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center', width:null}}>
                <Text style={{fontSize: 22,color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>
                  {section.presupuesto}
                </Text>
              </View>
            </View>
            <View style={[styles.contentAccordeonFee,{flex:1}]}>
              <View style={{justifyContent: 'space-between',marginTop:5, width:null, flexDirection:'row', alignItems:'center'}}>
                <Text style={{color:'#556A8D',paddingLeft:30,fontSize: 15,fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>$ Proyecto</Text>
                <Text style={{paddingRight:30,fontSize: 15,fontFamily: 'Montserrat-Light'}}>{this.state.proyecto.valorproyecto}</Text>
              </View>
              <View style={{justifyContent: 'space-between', marginTop:5, width:null, flexDirection:'row', alignItems:'center'}}>
                <Text style={{color:'#556A8D',paddingLeft:30,fontSize: 15,fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>$ Interventoría</Text>
                <Text style={{paddingRight:30,fontSize: 15,fontFamily: 'Montserrat-Light'}}>{this.state.proyecto.valorinterventoria}</Text>
              </View>
            </View>
          </View>
        )
      }
      if(section.tab == 3){
        return (
          <View>
            {contratistas(section)}
          </View>
        )
      }
      if(section.tab == 5){
        const imagenes = this.state.imagenes.map((imagen, i) => `${urlApiImagenes}${imagen.strubicacion}`);
        return <View style={{flex:1, paddingTop:10}}>
          <SliderBox
            images={imagenes}
          />
        </View>
      }
      if(section.tab == 6){
        return (
          <View>     
            <View style={styles.contentAccordeonItem}>
              <Image style={{flex: 0.2, width: undefined, height: 50, alignSelf:'center'}}
                  source={require("../../resources/images/detalle-proyecto/icn_duracion.png")} resizeMode="contain"
              />
              <View style={{flex: 0.8}}>
                <Text style={{fontSize: 16, marginLeft: 10, color: '#283676', fontWeight: 'bold'}}>Duración</Text>
                <Text style={{fontSize: 16, marginLeft: 10}}>Desde {this.state.proyecto.fechainicioproyecto.substring(0,10)}</Text>
                <Text style={{fontSize: 16, marginLeft: 10}}>Hasta {this.state.proyecto.fechafinproyecto.substring(0,10)}</Text>
                <Text style={{fontSize: 16, marginLeft: 10}}>{this.state.proyecto.duracionproyecto} días</Text>
              </View>
            </View> 
            <View style={styles.contentAccordeonItem}>
              <Image style={{flex: 0.2, width: undefined, height: 40, alignSelf:'center'}}
                  source={require("../../resources/images/detalle-proyecto/icn_estado.png")} resizeMode="contain"
              />
              <View style={{flex: 0.8}}>
                <Text style={{fontSize: 16, marginLeft: 10, color: '#283676', fontWeight: 'bold'}}>Estado</Text>
                <Text style={{fontSize: 16, marginLeft: 10}}>En {this.state.proyecto.estadoproyecto}</Text>
              </View>
            </View>
            <View style={styles.contentAccordeonItem}>
                <Image style={{flex: 0.2, width: undefined, height: 30, alignSelf:'center'}}
                    source={require("../../resources/images/detalle-proyecto/icn_lineatematica.png")} resizeMode="contain"
                />
                <View style={{flex: 0.8}}>
                  <Text style={{fontSize: 16, marginLeft: 10, color: '#283676', fontWeight: 'bold'}}>Tipo</Text>
                  <Text style={{fontSize: 16, marginLeft: 10}}>{this.state.proyecto.nombrecategoria}</Text>
                </View>
            </View>    
          </View>
        )
      }
      else
        return <Text style={{fontFamily: 'Montserrat-Light'}}>{section.content}</Text>
    }

    let contratistas = section => {
      return (
        <View>
          <View style={styles.contentAccordeonItem}>
            <View style={{flex:0.2}}>
              <Image style={{marginRight: 10, width: 50, height: 50, borderRadius: 50}}
                  source={require('../../resources/images/detalle-proyecto/contratista.png')}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={{marginBottom: 3,color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>
                Contratista
              </Text>
              <Text style={{marginBottom: 3,color:'#556A8D'}}>{this.state.proyecto.contrarista}</Text>
            </View>
          </View>
          <View style={styles.contentAccordeonItem}>
            <View style={{flex:0.2}}>
              <Image style={{marginRight: 10, width: 50, height: 50, borderRadius: 50}}
                  source={require('../../resources/images/detalle-proyecto/contratista.png')}
              />
            </View>
            <View style={{flex:1}}>
              <Text style={{marginBottom: 3,color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>
                Interventor
              </Text>
              <Text style={{marginBottom: 3,color:'#556A8D'}}>{this.state.proyecto.interventor}</Text>
            </View>
          </View>
          <View style={styles.contentAccordeonItem}>
          <View style={{flex:0.2}}>
            <Image style={{marginRight: 10, width: 50, height: 50, borderRadius: 50}}
                source={require('../../resources/images/detalle-proyecto/contratista.png')}
            />
          </View>
          <View style={{flex:1}}>
            <Text style={{marginBottom: 3,color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>
              Contratante
            </Text>
            <Text style={{marginBottom: 3,color:'#556A8D'}}>{this.state.proyecto.contratante}</Text>
          </View>
        </View>
        </View>
      )
    }

    return (
      <Animatable.View
        duration={400}
        style={[isActive ? styles.activeAccordion : styles.inactiveAccordion]}
        transition="backgroundColor"
      >
      { getContent(section) }
      </Animatable.View>
    )
  }

  _renderScrollViewContent() {
    const { activeSections } = this.state

    return (
      <View style={styles.projectScrollViewContent}>
        <Accordion
          activeSections={activeSections}
          sections={CONTENT}
          touchableComponent={TouchableOpacity}
          expandMultiple={false}
          renderHeader={this.renderHeader}
          renderContent={(section, _, isActive) => this.renderContent(section, _, isActive, this.state)}
          duration={400}
          onChange={this.setSections}
        />
      </View>
    );
  }

  /**
   * print button Actions on project detail
   * like donwload, share
   * Disabled
   * @returns
   * @memberof ProjectScreen
   */
  ProjectDetailButtons(){
    return(
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10, marginBottom:200}}>
      <TouchableOpacity style={styles.detailActionButtons} onPress={() => alert()}>
        <Icon type="MaterialCommunityIcons" name="download" size={20} color="#556A8D"/>
        <Text style={styles.detailActionButtonsLabel}>Descargar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailActionButtons} onPress={() => alert()}>
        <Icon type="MaterialCommunityIcons" name="share" size={20} color="#556A8D"/>
        <Text style={styles.detailActionButtonsLabel}>Compartir</Text>
      </TouchableOpacity>
    </View>
    )
  }

  render() {
    if(this.state.fromMenu){
      this.props.navigation.goBack()
    }
    return (
      <ScrollView style={[styles.fill, {
        flex:1
      }]}
        scrollEventThrottle={16}>
        <ImageBackground 
            imageStyle={{ 
              borderBottomLeftRadius:20,
              borderBottomRightRadius:20,
            }} 
            style={styles.backgroundImage} 
            source={require('../../resources/images/header/header.png')} 
          >
          <TouchableOpacity
            style={{
                alignItems:'center',
                justifyContent:'center',
                width: 50,
                height: 50,
                top: 40,
                marginBottom:20,
              }}
              onPress={() => this.props.navigation.goBack() }>
          <Image
              style={{height: 30, width: 30}}
              source={require("../../resources/images/detalle-proyecto/left_arrow.png")}
              resizeMode="contain"/>
          </TouchableOpacity>
        </ImageBackground>
        <View style={[styles.fill, {
          backgroundColor:'#e2ebf6',
          padding:15
        }]}>
          <View style={[styles.fill]}>
            <Header
              nombreproyecto={this.state.proyecto.nombreproyecto}
              imagenproyecto={this.state.proyecto.imagenproyecto}
              nombrecategoria={this.state.proyecto.nombrecategoria}
              imagencategoria={this.state.proyecto.imagencategoria}
              codigocategoria={this.state.proyecto.codigocategoria}
              colorcategoria={this.state.proyecto.colorcategoria}
              scrollY={this.state.scrollY}
              goBack={() => this.props.navigation.goBack()}
            />
            <CounterContainer/>
            {this._renderScrollViewContent()}
          </View>
        </View>
      </ScrollView>
    );
  }
}

/**
 * Render Counter Component
 * in detail page
 * 
 * @param {*} props
 * @returns
 */
function CounterContainer(){
  
  let contadorSegundos = 0;
  let isFinished = false;
  if(proyecto){
    const fechaFin = proyecto.fechafinproyecto
    const fecha = fechaFin.substring(0, 19)
    const countDownDate = new Date(fecha).getTime()
    const now = new Date().getTime()
    const distance = (countDownDate - now)
    const seconds = distance / 1000
    contadorSegundos = seconds;  
    if(contadorSegundos <= 0){
      isFinished = true;
    }
  }

  return (
    <LinearGradient style={{flex: 0.2,borderRadius:20}} start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={colors.orangeGradient}>
      <View style={ styles.boxDetailContainer }>
        { isFinished ? (
            <Text style={ styles.alertFinishedProjectStyle } >
              <Icon 
                type="MaterialCommunityIcons" 
                style={{flex: 0.1, width: undefined, height: 20, paddingTop:3}}
                name="clock-outline" 
                size={14} 
                color="#fff" />  
                <Text>Projecto finalizado</Text>
            </Text>
          ) : null
        }  
        <View style={ styles.container }>
          <CountDown
            until={contadorSegundos}
            onFinish={() => isFinished = true }
            size={20}
            digitStyle={ styles.counterDigitStyle }
            digitTxtStyle={ styles.counterDigitTxtStyle }
            timeLabelStyle={ styles.counterTimeLabelStyle }
            timeLabels={
              {d: 'Días', h: 'Horas', m: 'Min.', s: 'Seg.'}
            }
          />
        </View>
        <View style={ styles.counterContainerBottom }>
          <Icon type="MaterialCommunityIcons" 
                style={{flex: 0.1, width: undefined, height: 20, paddingTop:3}}
                name="clock-outline" 
                size={14} 
                color="#fff"/>
          <Text style={ styles.counterContainerBottomText }>
            Tiempo para la entrega
          </Text>
        </View>
      </View>
    </LinearGradient>
  )
}

/**
 * Render project header
 * from detail
 * @param {*} props
 * @returns
 */
function Header(props){
  
  let imagenProyecto = {uri: urlApiImagenes.concat(props.imagenproyecto)}
  //@TODO Change semaforo content
  let semaforo = getSemaforoImg("");

  //let contratista = '';
  /*if(proyecto.contratistasproyecto.length){
    contratista = proyecto.contratistasproyecto[0];
  }*/

  return (
    <View style={{
      marginTop:-170,
      zIndex:9
    }}>
      <View style={[styles.header]}>
        <View style={[styles.headerTop]}>
            <View style={{flexDirection: 'row', padding:20, justifyContent: 'flex-start', alignItems: 'center'}}>
              <Image style={{marginRight: 10, width: 80, height: 80, borderRadius: 50}}
                  source={imagenProyecto}
              />
              <View style={{flex: 1}}>
                <Text style={{fontSize:20,marginBottom:10,color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>{props.nombreproyecto}</Text>
                <Text style={{textAlign:'justify',color:'#556A8D'}}>
                    {proyecto.objetoproyecto}
                </Text>
              </View>
            </View>
        </View>
        <View style={[styles.headerBottom]}>
              <View style={{flex:1,flexDirection: 'row',padding:20}}>
                <View style={{flex:0.4}}>
                  <Text style={{color:'#556A8D',fontFamily: 'Montserrat-Light', marginBottom:3}}>Presupuesto</Text>
                  <Text style={{color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>{proyecto.valorproyecto} </Text>
                </View>
                <View style={{flex:0.4}}>
                  <Text style={{color:'#556A8D',fontFamily: 'Montserrat-Light', marginBottom:3}}>Estado</Text>
                  <Text style={{color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}>{proyecto.estadoproyecto}</Text>
                </View>
                <View style={{flex:0.2}}>
                  <Text style={{color:'#556A8D',fontFamily: 'Montserrat-Light', marginBottom:3}}>Avance</Text>
                  <Text style={{color:'#556A8D',fontWeight:'bold',fontFamily: 'Montserrat-Bold'}}> {proyecto.avanceproyecto} </Text>
                </View>
              </View>
          </View>
      </View>
    </View>
  )
}

const mstp = state => {
  return {
    proyecto: state.localData.proyecto,
    fromMenu: state.localData.fromMenu
  }
}

export default connect(mstp)(ProjectScreen)