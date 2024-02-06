import estilos from "../Modulo.module.css"
import {iconoAgregarBasico,iconoCerrarBasico} from "../../../../constantes/iconos"
import {useState} from "react"
import {columnasUsuarios,columnasPublicacion} from "../../../../constantes/reportes"

export default function FiltroColumnas({setColumnas,columnas,tipo}:any) {
  
    const [agregarColumnas, setAgregarColumnas] = useState<any>(
      tipo==='U'?
      columnas === columnasUsuarios ? 
      [] 
      : columnasUsuarios.filter((e:any)=>(!columnas.includes(e)))
      
      :tipo==='P'?
      columnas === columnasPublicacion ? 
      [] 
      : columnasPublicacion.filter((e:any)=>(!columnas.includes(e)))

      :''
      );

      

    const retirarColumna = (nombre: any) => {
        const nuevasColumnas = columnas.filter((columnaEliminada: any) => columnaEliminada !== nombre)
        setColumnas(nuevasColumnas);
        setAgregarColumnas([...agregarColumnas, nombre])
      }

      const agregarColumnasReporte = (nombre: any) => {
        setColumnas([...columnas, nombre])
        const nuevasColumnas = agregarColumnas.filter((columnaEliminada: any) => columnaEliminada !== nombre)
        setAgregarColumnas(nuevasColumnas);
      }
    
  return (
    <div className={estilos.contenedorModulo}>
              <h4>Columnas</h4>

              {
                columnas.map((e: string, index: number) => (
                  <div className={estilos.contenedorOpciones} key={index}>
                    <button className={estilos.botonEliminar} onClick={() => retirarColumna(e)}>{e}
                      {iconoCerrarBasico}
                    </button>
                  </div>
                ))
              }
              {
                agregarColumnas &&
                  <>
                    {
                      agregarColumnas.map((e: any, index: number) => (
                        <div className={estilos.contenedorOpciones} key={index}>
                          <button className={estilos.botonAgregar} onClick={() => agregarColumnasReporte(e)}>{e}
                          {iconoAgregarBasico}
                          </button>
                        </div>
                      ))
                    }
                  </>
                  
              }
            </div>
  )
}
