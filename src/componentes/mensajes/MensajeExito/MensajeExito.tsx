import style from "./MensajeExito.module.css";
import { AiFillLike} from 'react-icons/ai'
export default function MensajeExito({informacion, estado}:any) {
  return (
    <>
    {
      estado &&
    <div className={style.contenedorMensaje} id="contenedor">
        <AiFillLike className={style.iconoMensajeExito}/>
      <div className={style.contenedorInformacion}>
        <div className={style.informacion}>{informacion}</div>
      </div>
      
    </div>
    
    }
    </>
  )
}
