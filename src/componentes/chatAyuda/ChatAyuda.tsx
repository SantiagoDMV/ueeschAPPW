import { useState } from "react";
import estilos from "./ChatAyuda.module.css";
import { AiOutlineMessage, AiOutlineSend } from "react-icons/ai";
import imagenContacto from '../../../public/imagenes/logoUnidadColor.png'
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";

export default function ChatAyuda() {
  const [estado, setEstado] = useState<boolean>(false);
  const [mensaje, setMensaje] = useState<string>('');
  const [numero, setNumero] = useState<string>();

useEffect(()=>{
  obtenernumero()
},[])

const obtenernumero = async () =>{
  let respuestaTelefono
  try {
    respuestaTelefono= await axios.get('https://ueeschstrapi.onrender.com/api/informacions/4?[fields][0]=nombre&[fields][1]=contenido');
    setNumero(respuestaTelefono.data.data.attributes.contenido)  
  } catch (error) {
    setNumero('0992515443')
  }
  
}

  const abrirCajaChatAyuda = () => {
    if (estado === false) {
      setEstado(true);
      return;
    }

    setEstado(false);
  };

  const enviarMensajeWhatsApp = () => {
    const numeroWhatsApp = `+593${numero}`;
    // const numeroWhatsApp = `+593992515443`;
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
            <img
              src={imagenContacto.src}
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
