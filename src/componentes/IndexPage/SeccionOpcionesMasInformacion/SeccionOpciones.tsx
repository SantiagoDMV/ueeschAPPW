import style from "./SeccionOpciones.module.css";
import {
  AiOutlineHistory,
  AiFillInfoCircle,
  AiOutlineApi,
} from "react-icons/ai";

export default function SeccionOpciones() {
  return (
      <div className={style.contendorHijos}>
        <div className={style.hijos}>

          <div
            className={style.hijo}
            onClick={() => (window.location.href = `/matriculate`)}
          >
            <div className={style.contenedorIcono}><AiOutlineHistory className={style.iconoHijo} /></div>
            <h3>Requisitos de Matriculación</h3>
          </div>

          <div className={style.hijo} onClick={() => (window.location.href = `/entendiendo-la-perdida-auditiva`)}>
          <div className={style.contenedorIcono} > <AiFillInfoCircle className={style.iconoHijo}/> </div>
            <h3>Entendiendo la pérdida auditiva</h3>
          </div>

          <div
            className={style.hijo}
            onClick={() => (window.location.href = `/aprendizaje`)}
          >
            <div className={style.contenedorIcono}><AiOutlineApi className={style.iconoHijo} /></div>
            <h3>Aprendizaje de Lenguaje de Señas</h3>
          </div>
        </div>
      </div>
  );
}
