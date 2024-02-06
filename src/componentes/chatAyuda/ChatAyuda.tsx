import { useState } from "react";
import estilos from "./ChatAyuda.module.css";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import imagenContacto from '../../../public/imagenes/logoUnidadColor.png'
import Image from "next/image";

export default function ChatAyuda() {
  const [estado, setEstado] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>('');

  const abrirCajaChatAyuda = () => {
    if (estado === false) {
      setEstado(true);
      return;
    }

    setEstado(false);
  };

  const enviarMensajeWhatsApp = () => {
    const numeroWhatsApp = "+593992515443";
    const mensajeWhatsApp = encodeURIComponent(mensaje);    

     window.open(`whatsapp://send?phone=${numeroWhatsApp}&text=${mensajeWhatsApp}`, '_blank');
    
// Si no se abre en la aplicación, abrir en el navegador
//window.open(`https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensajeWhatsApp}`, '_blank');




};

  return (
    <div className={estilos.contenedorChatAyuda}>
      {estado &&
        <div className={estilos.cajaContenedorAyuda}>
          <div className={estilos.contenedorContacto}>
            <Image
              src={imagenContacto}
              height={50}
              width={50}
              alt="imagen_Contacto"
              className={estilos.imagenContacto}
            />
            <p>UEESCH</p>
          </div>
          <div className={estilos.contenedorMensajeEnviado}>
                <input type="text" value={'¡Hola! Bienvenido al chat de ayuda.'} readOnly/>
          </div>
          <div className={estilos.contenedorEnviarMensaje}>
            <textarea autoFocus onChange={(e) => setMensaje(e.target.value)} />
            <AiOutlineSend className={estilos.iconoEnviar} onClick={enviarMensajeWhatsApp} />
          </div>
        </div>
      }
      <AiOutlineMessage onClick={() => abrirCajaChatAyuda()} />
    </div>
  );
}
