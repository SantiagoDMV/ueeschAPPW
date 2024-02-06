import style from "../estilos/CambiarContraseña.module.css"
import axios, { AxiosError } from "axios";
import { useState } from 'react'
import ProgresoProceso from "../mensajes/ProgresoProceso/ProgresoProceso";

export default function AlertaActualizacion({
  actualizacionEstado,
  mensaje,
}: any) {


  const [passw, setpassw] = useState({
    passwActual: '',
    passwNueva: '',
    passwNuevaConfirmacion: '',
  }
  )

  const campos = [
    { titulo: 'Contraseña actual', name: 'passwActual', tipo: 'password' },
    { titulo: 'Nueva contraseña', name: 'passwNueva', tipo: 'password' },
    { titulo: 'Confirmar Contraseña', name: 'passwNuevaConfirmacion', tipo: 'password' }
  ]

  const escucharCambio = (e: any) => {
    setpassw({
      ...passw,
      [e.target.name]: e.target.value
    })
  };

  const eliminarAlerta = () => {
    actualizacionEstado(false);
  };

  const [mostrarMensaje, setMostrarMensaje] = useState(false);


  const actualizarContraseña = async (e: any) => {
    e.preventDefault()
    try {
      setMostrarMensaje(true);
      await axios.put('/api/sesiones', passw)
      actualizacionEstado(false);
    } catch (error) {
      const errorMensaje:any = (error as AxiosError).response?.data;
      console.log(errorMensaje.mensaje)
      mensajeError(errorMensaje.mensaje)
    }finally{
      setMostrarMensaje(false);
    }
  };
   
   const mensajeError = (error:any)=>{
    let input= document.getElementById("contenedor");
    
    if(document.getElementById("mError"))
    document.getElementById("mError")?.remove();
    
    const mensaje = document.createElement("div");
    mensaje.innerHTML=`${error}`;
    mensaje.id="mError";
    mensaje.className=`${style.mensajeError}`;
    input?.appendChild(mensaje);
  }


  return (
    <>
    <div className={style.contenedorAlertaActualizacion}>
      <div className={style.contenedorMensajeInformacion} id="contenedor">
        <p className={style.mensaje}>{mensaje}</p>
      </div>

      <div className={style.campos}>
        <form onSubmit={actualizarContraseña}>
          {
            campos.map((e: any, index: number) => (
              <div key={index} className={style.contenedorCampos}>
                <h4>{e.titulo}</h4>
                <input
                 className={style.input}
                  onChange={(e) => escucharCambio(e)}
                  type={`${e.tipo}`}
                  name={`${e.name}`}
                />
              </div>
            ))
          }
      
          <div className={style.opciones}>
            <button type="submit" className={style.actualizar}>Actualizar</button>
            <button type="button" onClick={eliminarAlerta} className={style.cancelar}>
              Cancelar
            </button>
          </div>

        </form>

      </div>
    </div>
    <ProgresoProceso titulo={"Procesando solicitud"} informacion={"Por favor, espere un momento"} estado={mostrarMensaje}/>
    </>
  );
}
