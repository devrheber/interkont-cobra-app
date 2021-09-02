import { styles, colors } from '../resources/styles'

  /**
   * @export
   * get image from code 
   * @param {*} code
   * @returns {Image} Semaforo Image
   */
  export function getSemaforoImg(code, valla=false){
    if(code){
      const semaforoString = /(\w+)\.\w+/.exec(code) || [,'rojo'];
    
      switch (semaforoString[1]) {

        case 'naranja':
          if(valla){
            return require("../resources/images/home-proyectos/valla_semaforo_naranja.png")
          }else{
            return require("../resources/images/home-proyectos/semaforo_naranja.png")
          }
    
        case 'rojo':
          if(valla){
            return require("../resources/images/home-proyectos/valla_semaforo_rojo.png")
          }else{
            return require("../resources/images/home-proyectos/semaforo_rojo.png")
          }
    
        case 'verde':
          if(valla){
            return require("../resources/images/home-proyectos/valla_semaforo_verde.png")
          }else{
            return require("../resources/images/home-proyectos/semaforo_verde.png")
          }
    
        default:
          if(valla){
            return require("../resources/images/home-proyectos/valla_semaforo_naranja.png")
          }else{
            return require("../resources/images/home-proyectos/valla_semaforo_rojo.png")
          }
      }

    } else {
      return require("../resources/images/home-proyectos/semaforo_rojo.png")
    }
    
  }

  /**
   * get Stat image 
   * @export
   * @param {*} beforePercentage
   * @param {*} afterPercentage
   */
  export function getProjectDetailStat(percentage){
    if(/\%/.test(percentage)){
      const percentageNumber = percentage.replace(/\%/g,'')
      const valuePercentage = ~~(percentageNumber / 10)
      switch(valuePercentage){
        case 0 : 
          return require("../resources/images/detalle-proyecto/stats/0.png")
        case 1 : 
          return require("../resources/images/detalle-proyecto/stats/10.png")
        case 2 :
          return require("../resources/images/detalle-proyecto/stats/20.png")
        case 3 :
          return require("../resources/images/detalle-proyecto/stats/30.png")
        case 4 :
          return require("../resources/images/detalle-proyecto/stats/40.png")
        case 5 :
          return require("../resources/images/detalle-proyecto/stats/50.png")
        case 6 :
          return require("../resources/images/detalle-proyecto/stats/60.png")
        case 7 :
          return require("../resources/images/detalle-proyecto/stats/70.png")
        case 8 :
          return require("../resources/images/detalle-proyecto/stats/80.png")
        case 9 :
          return require("../resources/images/detalle-proyecto/stats/90.png")
        case 10 :
          return require("../resources/images/detalle-proyecto/stats/100.png")
        default :
          return require("../resources/images/detalle-proyecto/stats/10.png")
      }
    }
    return require("../resources/images/detalle-proyecto/stats/10.png")
  }

  /**
   * get Category image from code
   * if code = 0 otherwise show all icon
   * @export
   * @param {*} code
   * @returns
   */
  export function getImagenCategoria(code, url){
    return url + code;

    switch (code) {

    case 1:
    return require("../resources/images/home-proyectos/icn-circular-fiab.png")

    case 2:
    return require("../resources/images/home-proyectos/icn-circular-otic.png")
    
    case 3:
    return require("../resources/images/home-proyectos/icn-circular-drn.png")
    
    case 4:
    return require("../resources/images/home-proyectos/icn-circular-dlia.png")
    
    case 5:
    return require("../resources/images/home-proyectos/icn-circular-dgoat.png")
    
    case 6:
    return require("../resources/images/home-proyectos/icn-circular-desca.png")
    
    case 7:
    return require("../resources/images/home-proyectos/icn-circular-dia.png")
    
    case 8:
    return require("../resources/images/home-proyectos/icn-circular-dcasc.png")
    
    case 9:
    return require("../resources/images/home-proyectos/icn-circular-daf.png")
    
    case 10:
    return require("../resources/images/home-proyectos/icn-circular-oap.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

export function getImagenCategoriaProyecto(code){
    switch (code) {
    case 1:
    return require("../resources/images/detalle-proyecto/jovenes.png")

    case 2:
    return require("../resources/images/detalle-proyecto/fortalecimiento.png")

    case 3:
    return require("../resources/images/detalle-proyecto/educacion.png")

    case 4:
    return require("../resources/images/detalle-proyecto/desarrollo.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

export function getIconoDetalleAcordeon(code){
    switch (code) {
    case 0:
    return require("../resources/images/detalle-proyecto/icn_consiste.png")

    case 1:
    return require("../resources/images/detalle-proyecto/icn_cuesta.png")

    case 2:
    return require("../resources/images/detalle-proyecto/icn_proyecto.png")

    case 3:
    return require("../resources/images/detalle-proyecto/icn_participan.png")

    case 4:
    return require("../resources/images/detalle-proyecto/icn_indicadores.png")

    case 5:
    return require("../resources/images/detalle-proyecto/icn_imagenes.png")

    case 6:
    return require("../resources/images/detalle-proyecto/icn_datos.png")

    default:
      return require("../resources/images/undefined.png")
  }
}

/**
 * get indicator img
 * @export
 * @param {*} codeIndicador
 * @param {*} codeCategoria
 * @returns
 */
export function getIndicadorImg(codeIndicador, codeCategoria){
    switch(codeCategoria){
        case 0:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/0_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/0_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/0_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/0_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/0_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/0_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_todos_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_todos_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_todos_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_todos_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 1:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/1_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/1_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/1_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/1_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/1_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/1_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_jovenes_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_jovenes_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_jovenes_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_jovenes_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 2:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/2_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/2_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/2_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/2_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/2_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/2_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_osc_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_osc_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_osc_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_osc_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 3:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/3_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/3_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/3_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/3_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/3_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/3_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_educacion_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_educacion_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_educacion_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_educacion_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break
        case 4:
            switch (codeIndicador) {
                case 0:
                return require("../resources/images/indicadores-globales/4_modena.png")

                case 1:
                return require("../resources/images/indicadores-globales/4_modena.png")

                case 2:
                return require("../resources/images/indicadores-globales/4_chart.png")

                case 3:
                return require("../resources/images/indicadores-globales/4_barras.png")

                case 4:
                return require("../resources/images/indicadores-globales/4_barras.png")

                case 5:
                return require("../resources/images/indicadores-globales/4_barras.png")

                case 6:
                return require("../resources/images/indicadores-globales/icn_desarrollo_3.png")

                case 7:
                return require("../resources/images/indicadores-globales/icn_desarrollo_4.png")

                case 8:
                return require("../resources/images/indicadores-globales/icn_desarrollo_1.png")

                case 9:
                return require("../resources/images/indicadores-globales/icn_desarrollo_2.png")

                default:
                  return require("../resources/images/undefined.png")
              }
        break

        default:
          switch (codeIndicador) {
            case 0:
            return require("../resources/images/indicadores-globales/4_modena.png")

            case 1:
            return require("../resources/images/indicadores-globales/4_modena.png")

            case 2:
            return require("../resources/images/indicadores-globales/4_chart.png")

            case 3:
            return require("../resources/images/indicadores-globales/4_barras.png")

            case 4:
            return require("../resources/images/indicadores-globales/4_barras.png")

            case 5:
            return require("../resources/images/indicadores-globales/4_barras.png")

            case 6:
            return require("../resources/images/indicadores-globales/icn_desarrollo_3.png")

            case 7:
            return require("../resources/images/indicadores-globales/icn_desarrollo_4.png")

            case 8:
            return require("../resources/images/indicadores-globales/icn_desarrollo_1.png")

            case 9:
            return require("../resources/images/indicadores-globales/icn_desarrollo_2.png")

            default:
              return require("../resources/images/undefined.png")
          }
    }
}

/**
 * Check if selected category and show shadow
 * @export
 * @param {*} code
 * @param {*} seleccionada
 * @returns mixed to set parameters to shadow
 */
export function isSelectedCategoria(code, seleccionada){
  return code == seleccionada ? styles.imageSelected : {};
}

export function getImagenCategoriaIndicador(code, seleccionada){
    //@TODO disable selection Selected option
    seleccionada = false;
    switch(code) {
      case 0:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_0.png') :
            require('../resources/images/indicadores-globales/btn_0.png')
      case 1:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_1-selected.png') :
            require('../resources/images/indicadores-globales/btn_1.png')
      case 2:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_2-selected.png') :
            require('../resources/images/indicadores-globales/btn_2.png')
      case 3:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_3-selected.png') :
            require('../resources/images/indicadores-globales/btn_3.png')
      case 4:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_4-selected.png') :
            require('../resources/images/indicadores-globales/btn_4.png')
      case 5:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_5-selected.png') :
            require('../resources/images/indicadores-globales/btn_5.png')
      case 6:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_6-selected.png') :
            require('../resources/images/indicadores-globales/btn_6.png')
      case 7:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_7-selected.png') :
            require('../resources/images/indicadores-globales/btn_7.png')
      case 8:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_8-selected.png') :
            require('../resources/images/indicadores-globales/btn_8.png')
      case 9:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_9-selected.png') :
            require('../resources/images/indicadores-globales/btn_9.png')
      case 10:
        return code == seleccionada ? require('../resources/images/indicadores-globales/btn_10-selected.png') :
            require('../resources/images/indicadores-globales/btn_10.png')
      default:
        return require('../resources/images/undefined.png')
    }
}

export function getIconoVallaProyecto(code){
    switch(code) {
      case 'fortalecimiento':
        return require('../resources/images/home-proyectos/valla_fortalecimiento.png')
      case 'educacion':
        return require('../resources/images/home-proyectos/valla_educacion.png')
      case 'jovenes':
        return require('../resources/images/home-proyectos/valla_jovenes.png')
      case 'desarrollo':
        return require('../resources/images/home-proyectos/valla_desarrollo.png')

      default:
        return require('../resources/images/undefined.png')
    }
}

export function resolveHeaderColor(color){
  if(color){
    return color
  }
  return colors.primary;
}

export function kFormatter(num, digits=2) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  let result = (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  let numberWithCommas = (x) => { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); } 
  return numberWithCommas(result);
  
  // return result.replace(/\d+/, (a) => (+a).toLocaleString() )
}

export function pFormatter(num) {
  let numFixed = 0;
  if (num !== undefined) {
    numFixed = num;
  }
  return numFixed.toFixed(2) + "%";
}

export function numberWithCommas(x) {
  let toString = '';
  if (x !== undefined) {
    toString = x;
  }
  toString = toString.toString()
    var pattern = /(-?\d+)(\d{3})/
    while (pattern.test(toString))
    toString = toString.replace(pattern, "$1.$2")
    return toString
}


export function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};