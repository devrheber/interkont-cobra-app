import {
  StyleSheet,
  Dimensions
} from 'react-native'

const window = Dimensions.get('window');

export const colors = {
  primary: '#575a9d',
  accent: '#ef6837',
  blueGradient: ['#9A88FF','#725CF1'],
  gradientPreload: ['#39b49a', '#39b49a'],
  orangeGradient: ['#ef6837','#f3973e'],
  darkBlueGradient: ['#0f7373', '#0a5050'],
  redOKr: '#cc6666',
  whiteOKr: '#f9f9f9',
  greenOKr: '#20a8a8',
  yellowOKr: '#fae132',
  redBGOKr: '#c85050',
  darkGreen: '#0c7070',
  darkGray: '#6E6E6E',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerForm: {
    flex: 1,
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  textRN: {
    fontFamily: 'Montserrat-Light'
  },
  responsiveImg: {
    flex: 1
  },
  textInput: {
    fontSize: 16
  },
  backgroundApp: {
    flex: 1,
  },
  loadingDataView: {
    height: window.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26
  },
  searchBox: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  searchInputText: {
    flex: 1,
    color: '#ffffff',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf:'center'
  },
  searchTitle: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchTitleText: {
    color: colors.whiteOKr,
    textAlign: 'center',
    borderRadius: 10,
    borderColor: colors.whiteOKr,
    borderWidth: 1,
    padding: 10,
    fontSize: 11,
  },
  proyectosItem: {
    borderRadius: 10,
    borderWidth: 0,
    marginBottom: 10,
    backgroundColor: '#fff'
  },
  proyectosItemTitleContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems:'center'
  },
  proyectosItemFooterContainer: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom:0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  proyectosItemTitle: {
    color: '#e2ebf6',
    fontSize: 14,
    fontWeight: 'bold'
  },
  proyectosItemName: {
    padding: 10,
    fontSize: 14,
    color: '#707b92',
    fontFamily: 'Montserrat-Bold'
  },
  proyectosItemPrice: {
    padding: 5,
    fontSize: 16,
    color: '#707b92',
    fontFamily: 'Montserrat-Light'
  },
  nav:{
    backgroundColor: colors.darkGreen,
  },
  navTitleText: {
    color: colors.whiteOKr,
    fontSize: 16
  },
  navButton: {
    paddingLeft: 15,
    paddingRight: 15
  },
  buttonForm: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    borderRadius: 10,
    marginLeft: 5
  },
  buttonFormSelected: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    marginLeft: 5
  },
  buttonBuscar: {
    flex: 0.4,
    flexDirection: 'row',
    backgroundColor: 'rgba(55, 174, 208, 1)',
    borderRadius: 10,
    marginLeft: 5,
    backgroundColor: '#4cb050',
    textAlign: 'center',
  },
  textButtonForm: {
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    color: '#e2ebf6',
    alignSelf:'center'
  },
  listaContainer: {
    flex: 0.6,
    backgroundColor: '#e2ebf6',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  indicadorGlobal: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicadorGlobalIcono: {
    height: 40,
    width: 40,
  },
  indicadorGlobalBoton: {
    height: undefined,
    width: undefined,
  },
  indicadorGlobalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#464646',
    paddingLeft: 15
  },
  indicadorGlobalTitle: {
    fontSize: 14,
    color: '#A2A2A2',
    paddingLeft: 15
  },
  vallaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#A2A2A2'
  },
  headerProyecto: {
    flexDirection: 'column',
    paddingBottom: 5,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoriaProyectoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#707b92',
    textAlign: 'center',
    borderRadius: 10,
    borderColor: '#707b92',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  categoriaProyecto: {
    fontSize: 12,
    color: '#707b92',
    textAlign: 'center',
    borderRadius: 10,
    borderColor: '#707b92',
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  categoriaProyectoH: {
    fontSize: 12,
    textAlign: 'center',
    padding: 5,
    margin: 5,
  },
  nombreProyectoH: {
    color:'#fff',
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  titleAccordion: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  headerAccordion: {
    backgroundColor: '#fff',
    borderRadius:20,
    marginTop:10
  },
  headerTextAccordion: {
    fontFamily: 'Montserrat-Light',
    textAlign: 'center',
    fontSize: 17
  },
  contentAccordeonItem: {
    flexDirection:'row',
    backgroundColor: '#f4f7fc',
    marginTop: 10,
    padding: 10,
    borderRadius:20,
  },
  contentAccordeonFee:{
    marginTop:10,
    marginBottom:10
  },
  contentAccordeonpriceWrapper: {
    backgroundColor: '#f4f7fc',
    marginTop: 10,
    padding: 10,
    borderRadius:20,
  },
  contentViewAccordeon:{
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
    borderRadius:20,
  },
  boxDetailContainer:{
    flex:1,
    borderRadius:20,
    padding:20
  },
  boxInfoContainer:{
    backgroundColor: '#ffffff',
    marginTop:20,
    marginBottom:10
  },
  counterContainerBottom:{
    paddingTop:10,
    alignItems:'center',
    flexDirection: 'row',
    flex:1,
    justifyContent:'center'
  },
  counterContainerBottomText:{
    flex:0,
    color:'#ffffff',
    fontSize:12
  },
  alertFinishedProjectStyle:{
    fontFamily: 'Montserrat-Bold',
    paddingBottom:5,
    color:'#ffffff',
    textAlign:'center'
  },
  counterDigitTxtStyle : {
    fontFamily: 'Montserrat-Bold',
    color: "#ffffff",
    fontSize:24
  },
  counterTimeLabelStyle:{
    color: "#ffffff"
  },
  counterDigitStyle:{
    padding:1,
    height:25
  },
  activeAccordion: {

  },
  inactiveAccordion: {

  },
  imagenProyecto: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    position: 'absolute',
    bottom: -40
  },
  imagenProyectoValla: {
    width:60,
    height:60,
    position: 'absolute',
    bottom: 5,
    right: 10,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF'
  },
  contenidoCentrado: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  contadorValor: {
    fontFamily: 'Montserrat-Light',
    color: '#8c8c8c',
    fontSize: 36
  },
  avanceProyecto: {
    color: 'rgba(46, 190, 84, 1)',
    fontSize: 52,
    marginLeft: 5,
    alignSelf: 'flex-end'
  },
  textResultadosTitulo: {
    fontSize: 11,
  },
  textResultados: {
    fontFamily: 'Montserrat-Light',
    fontSize: 11,
  },
  datosRelevantesText: {
    fontSize: 14,
    marginLeft: 10,
    color: '#227fc6',
  },
  datosRelevantesText: {
    fontFamily: 'Montserrat-Light',
    fontSize: 16,
    marginLeft: 10
  },
  valla: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    width:window.width,
    height:150,
    position: 'absolute',
    top: 10,
    left: 0,
    padding: 20
  },
  containerLogin: {
    flex: 1,
    padding: 60,
  },
  imagenLogin: {
    flex: 1,
    width: 200,
  },
  textInputLogin: {
    flex: 1,
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'MontserratAlternates-Light',
  },
  buttonLogin: {
    borderRadius: 10,
    backgroundColor: '#77c04c',
    padding: 10
  },
  buttonLoginAscityan: {
    marginTop:15,
    borderRadius: 10,
    backgroundColor: '#0173ba',
    padding: 10
  },
  textButtonLogin: {
    alignItems:'center',
    justifyContent:'center',
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold'
  },
  imagenLoginPowered: {
    flex: 1,
    width: 200
  },
  inputWithIcon: {
    flexDirection: 'row',
    borderRadius: 10,
    // backgroundColor: '#41a5b0'
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderRadius: 20,
    flex:0.2
  },
  headerTop:{
    minHeight: 100
  },
  headerBottom:{
    borderTopWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#556A8D',
  },
  bar: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  detailActionButtons:{
    flexDirection:'row',
    backgroundColor:'#ffffff',
    borderRadius:5,
    borderStyle:'solid',
    borderColor:'#556A8D',
    textAlign:'center',
    justifyContent:'center',
    borderWidth:1,
    padding:20,
    margin:3,
    flex:1,
  },
  projectScrollViewContent:{
    marginBottom:100,
  },
  backgroundImage: {
    width: null,
    height: 250,
  },
  detailActionButtonsLabel:{
    fontFamily: 'Montserrat-Bold',
    color:'#556A8D',
  },
  imageSelected: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    borderBottomColor: '#002f5e',
    borderBottomWidth: 1
  },
  statusProjectList:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:10
  },
  statusProjectItem:{
    position:'relative',
    backgroundColor:'#fff',
    justifyContent:'center',
    borderRadius:20,
    margin:5,
    flex:1,
    padding:20
  },
  statusProjectItemInfo:{
    flex:1,
    justifyContent:'center'
  },
  statusProjectItemLabel:{
    alignSelf:'center',
    color:'#556A8D',
    fontWeight:'bold',
    fontFamily: 'Montserrat-Bold'
  },
  statusProjectItemPercentage:{
    alignSelf:'center',
    fontSize: 22,
    color:'#5599af',
    fontWeight:'bold',
    fontFamily: 'Montserrat-Bold'
  }
})
