import style from './ConfirmacionEliminacion.module.css'
import { AiOutlineQuestion } from "react-icons/ai";

export default function ConfirmacionEliminacion({estado,setEstado,setEleccion }:any) {
    
    const eliminacionConfirmada = () => {
        setEstado(false)
        setEleccion(true)
    }

  return (
    <>
    { estado &&
    <div className={style.fondo}>
    <div className={style.contenedorMensaje} id="contenedor">
    <AiOutlineQuestion className={style.iconoMensajeExito}/>
    <div className={style.contenedorInformacion}>
    <div className={style.informacion}>
        <p>La eliminación de los registros seleccionados es irreversible. ¿Desea continuar con esta acción?</p>
    </div>
    <div className={style.botonesConfirmacionEliminacion}>
        <button onClick={eliminacionConfirmada}>Confirmar</button>
        <button onClick={()=>setEstado(false)} autoFocus>Cancelar</button>
    </div>
  </div>
  </div>
</div>
    }
    </>
  )
}
