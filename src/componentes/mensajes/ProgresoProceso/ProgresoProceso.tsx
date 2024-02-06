import style from "./ProgresoProceso.module.css";

export default function ProgresoProceso({titulo, informacion, estado}:any) {
  return (
    <>
    {
      estado?
    <div className={style.contenedorMensaje} id="contenedor">
      <div className={style.contenedorInformacion}>
        <h4>{titulo}</h4>
        <div className={style.informacion}>{informacion}</div>
      </div>
      <div className={style.circleLoader}></div>
    </div>
    :
    ""
    }
    </>
  )
}
