import Image from "next/image"
import estilos from "../../estilos/Formularios/FormularioNuevoComentario.module.css"
import {AiOutlineSend} from "react-icons/ai"
import { useEffect,useState } from "react";
import axios from "axios"
export default function FormularioComentarios() {

    const [imagenUser,setImagenUser] = useState();

    useEffect(() => {
        obtenerImagenUser()
      }, []);

      const obtenerImagenUser = async () =>{
        const respuesta = await axios.get("/api/cookieSession?solicitar=imagen");
        setImagenUser(respuesta.data);
      }

  return (
    <>
        <form className={estilos.formulario}>
            <div className={estilos.contenedorComentarios}>
                <div className={estilos.contenedorImagen}>
                    {
                        imagenUser?(
                        <Image
                        src={imagenUser}
                        alt={`imagen_usuario`}
                        width={50}
                        height={50}
                        quality={100}
                        /> 
                        ):(
                            <p>cargando</p>
                        )
                    }   
                </div>
                <div className={estilos.contenedorInteraccion}>
        <textarea cols={30} rows={10}>
            
            </textarea>
        
        <div className={estilos.contenedorOpciones}>
        <AiOutlineSend className={estilos.iconoEnviar}/>
                </div>
                </div>
        </div>
        </form>
    </>
  )
}
