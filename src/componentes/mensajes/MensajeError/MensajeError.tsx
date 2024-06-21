import style from './MensajeError.module.css'
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function MensajeError({estado,titulo,informacion}:any) {
    return (
        <>
        {
          estado?
      <div className={`${style.contenedorMensaje} ${estado ? style.mostrar : ''}`} id="contenedor">    
            <div className={style.circleLoader}><AiOutlineCloseCircle className={style.iconoError}/></div>
          <div className={style.contenedorInformacion}>
            <h4>{titulo}</h4>
            <div className={style.informacion}>{informacion}</div>
          </div>
          
        </div>
        :
        ""
        }
        </>
  )
}
