import estilos from "../Modulo.module.css"
import {columnasUsuarios,columnasPublicacion,reportesEstablecidos} from "../../../../constantes/reportes"
export default function ModuloEleccion({setReporte,setTipo,setColumnas,obtenerUsuario,obtenerPublicaciones}:any) {

    const handleSelect = (e: any) => {
        const datosReporteSeleccionado = e.target.value.split(",");
        setReporte(parseInt(datosReporteSeleccionado[0]))
        setTipo(datosReporteSeleccionado[1])
        if ( datosReporteSeleccionado[1] === 'U'){
            setColumnas(columnasUsuarios)
            obtenerUsuario()
        }else if(datosReporteSeleccionado[1] === 'P'){
        setColumnas(columnasPublicacion)
        obtenerPublicaciones();
        }
        
      }

  return (
    <div className={estilos.contenedorModulo}>
    <h4>Reportes fijos
    </h4>
    <select onChange={(e: any) => (handleSelect(e))}>
        <option>...</option>
        {reportesEstablecidos.Usuario.map((e:any, index:number)=>(
            <option key={index} value={`${index},U`}
            >{e}</option>
        ))
        }
        {reportesEstablecidos.Publicacion.map((e:any, index:number)=>(
            <option key={index} value={`${index},P`}
            >{e}</option>
        ))
        }
        {
        // reportesEstablecidos.Multimedia.map((e:any, index:number)=>(
        //     <option key={index} value={`${index},M`}>{e}</option>
        // ))
        }
        
    </select>
  </div>
  )
}
