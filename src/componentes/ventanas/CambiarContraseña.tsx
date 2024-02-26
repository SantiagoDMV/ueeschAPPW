import style from "../estilos/CambiarContraseña.module.css"
import axios, { AxiosError } from "axios";
import { useState } from 'react'
import {toast } from "sonner";
import { AiOutlineKey } from "react-icons/ai";

export default function AlertaActualizacion({
  actualizacionEstado,
  mensaje,
  email
}: any) {

  const [passw, setpassw] = useState({
    passwActual: '',
    passwNueva: '',
    passwNuevaConfirmacion: '',
    email: email
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


  let loadingToastId:any = null; 
  const actualizarContraseña = async (e: any) => {
    e.preventDefault()
    try {
      toast.dismiss(loadingToastId);
      loadingToastId = toast.info('Actualizando contraseña, esto puede llevar un momento...', {
        style: {
          border: 'none'
        },
      });
        
      await axios.put('/api/sesiones', passw)
      toast.dismiss(loadingToastId);
      toast.success("La contraseña fue actualizada exitosamente", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
        duration: 3000
      });
      actualizacionEstado(false);
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
          const errorMensaje:any = (error as AxiosError).response?.data;    
          
          toast.dismiss(loadingToastId);
        
          loadingToastId =toast.error(errorMensaje.mensaje, {
              style: {
                backgroundColor: 'rgb(203,90,90)',
                border: 'none'  
              },
            });
        }
  };



  return (
    <>
    <div className={style.contenedorAlertaActualizacion}>
      <div className={style.contenedorMensajeInformacion} id="contenedor">
        <p className={style.mensaje}>{mensaje}</p>
        <AiOutlineKey className={style.iconollave}/>
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
    </>
  );
}
