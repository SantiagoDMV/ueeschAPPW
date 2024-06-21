import style from "./MensajeCargando.module.css";

export default function ProgresoProceso({informacion, estado}:any) {
  return (
    <>
    {
      estado?
    <div className={style.contenedorMensaje} id="contenedor">
      <div className={style.circleLoader}></div>
      <div className={style.contenedorInformacion}>
        <div className={style.informacion}>{informacion}</div>
      </div>
      
    </div>
    :
    ""
    }
    </>
  )
}
