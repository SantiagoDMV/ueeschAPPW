import { useState } from "react";
import estilos from "./ChatDiccionario.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";

export default function ChatTareas() {
  const [estado, setEstado] = useState<boolean>(false);
  // const [palabra, setPalabra] = useState<string>();

  // const imagenContacto = 'https://res.cloudinary.com/dxopgkamj/image/upload/v1720760595/pexels_nitin_arya_386173_1029141_1971e33733.jpg'
  // const abrirCajaChatAyuda = () => {
  //   if (estado === false) {
  //     setEstado(true);
  //     return;
  //   }

  //   setEstado(false);
  // };


  return (
    <div className={estilos.contenedorChatAyuda}>
      {/* {estado &&
        <div className={estilos.cajaContenedorAyuda}>
          <div className={estilos.contenedorContacto}>
          <img
              src={imagenContacto}
              height={50}
              width={50}
              alt="imagen_Contacto"
              className={estilos.imagenContacto}
            />
            <p>Diccionario de Lengua de Señas Ecuatoriana</p>
          </div>
          <div className={estilos.contenedorMensajeEnviado}>


            
            <p aria-readonly className={estilos.input}>Escribe una palabra para aprenderla en lenguaje de señas.</p>
          </div>
          <div className={estilos.contenedorEnviarMensaje}>
          <form onSubmit={(e) => {
    e.preventDefault();
    window.open(`http://www.plataformaconadis.gob.ec/~platafor/diccionario/?s=${palabra}&post_type%5B%5D=st_kb`, '_blank');
}}>
            <input type="text" autoFocus onChange={(e) =>
            setPalabra(e.target.value)
        }  />
        <button type="submit">
            <AiOutlineSend className={estilos.iconoEnviar}/>
            </button>
            </form>
          </div>
        </div>
      } */}
      <AiOutlineCalendar
      // onClick={() => abrirCajaChatAyuda()} 
      />
    </div>
  );
}



{/* <form onSubmit={(e) => {
    e.preventDefault();
    window.open(`http://www.plataformaconadis.gob.ec/~platafor/diccionario/?s=${palabra}&post_type%5B%5D=st_kb`, '_blank');
}}>
    <div className={estilos.contenedorLenguajeSenas}>
        <h3>Diccionario de Lengua de Señas Ecuatoriana</h3>
        <input type="text" placeholder="Ingrese aquí una palabra" onChange={(e) =>
            setPalabra(e.target.value)
        } />
        <button type="submit">Buscar</button>
    </div>
</form> */}