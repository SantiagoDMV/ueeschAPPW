import Formulario from "@/componentes/layout/Formularios/FormularioRegistroPadres/FormularioRegistroPadres";
import estilos from "../styles/pestañas/RegistroPadres.module.css";
import { useState,useRef } from "react";
import axios from "axios";
import MensajeError from "@/componentes/mensajes/MensajeError/MensajeError";
import MensajeCargando from "@/componentes/mensajes/MensajeCargando/MensajeCargando";
import Layout from "@/componentes/layout/Layout";
import Header from "@/componentes/layout/Header/HeaderLiviano/Header";

export default function Registro({usuarioCookie,setUsuarioCookie, informacion, moodle}:any) {
  const [input, setInput] = useState<any>(null);
  const [estado, setEstado] = useState<any>(null);

////////////////////////////////////////////////////////////////////////
const [mensajeErrorEstado, setMensajeErrorEstado] = useState({
  estado: false,
  titulo: '',
  informacion: ''
})
const [mensajeCargando,setMensajeCargando] = useState<any>({
  estado:false,
  mensaje: ''
})
const timeoutId = useRef<NodeJS.Timeout | null>(null);
////////////////////////////////////////////////////////////////////////


  const comprobarExistenciaEmail = async () => {
    try {
      if (input) {
        setMensajeCargando({
          estado:true,
          mensaje: 'El email está siendo verificado en Moodle. '
        })

        const respuesta = await axios.post("api/moodle", input);
        

        if (respuesta.data.valor) {
          setEstado(respuesta.data.datos);
        } else {

          if(timeoutId.current){
            clearTimeout(timeoutId.current)
            }
        
            setMensajeErrorEstado({
              estado:true,
              titulo: 'Error',
              informacion:respuesta.data.mensaje
            })
        
            timeoutId.current = setTimeout(() => {
              setMensajeErrorEstado({
                estado:false,
                titulo:'',
                informacion:''
              })
            }, 3000);
          }

        
      }  
    } catch (error) {
////////////////////////////////////////////////////////////////////////
    setMensajeCargando({
      estado:false,
      mensaje: ''
    })
  }finally{
    setMensajeCargando({
      estado:false,
      mensaje: ''
    })
  }
////////////////////////////////////////////////////////////////////////
  };


  const escucharCambio = (e: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
    
    <MensajeCargando informacion={mensajeCargando.mensaje} estado={mensajeCargando.estado}/>
    <MensajeError estado={mensajeErrorEstado.estado} titulo={mensajeErrorEstado.titulo} informacion={mensajeErrorEstado.informacion}/>
    
      <div className={estilos.contenedorRegistroMiembros}>
      {
    !estado ?
    (
      <>
        {informacion && <Header informacion={informacion}/>}

        <div className={estilos.contenedorPrincipalUsernameMoodle}>
          <div className={estilos.contenedorUsernameMoodle}>
            <label>
              Para poder registrarse, debe ingresar el email de su hijo(a) que ya esté matriculado en nuestra unidad educativa. 
              Esta medida es necesaria para garantizar una gestión eficiente de nuestros registros y asegurarnos de mantener actualizada la información de cada estudiante. Al utilizar el email de su hijo(a) matriculado(a), nos ayudarán a vincular su cuenta correctamente con nuestros registros existentes.

            </label>
            <form onSubmit={(e)=>e.preventDefault()} className={estilos.contenedorFormEmail}>
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="email"
              placeholder="email"
            />
            <button onClick={comprobarExistenciaEmail}>Enviar</button>
            </form>
          </div>
        </div>
        </>
      )
        : estado && (
          <div className={estilos.contenedorRegistro}>
            <Formulario idMoodle = {estado}/>
          </div>
    )
  }    
      </div>
    
    </Layout>
  );
}


export const getServerSideProps = async (context:any) => {
  const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/8?populate[imagen_header][fields][0]=url');
  const { data } = respuesta.data;
  const { attributes } = data;
  try {
      return {
          props: {
              informacion: attributes
          },
      };
  } catch (error) {
  }
};
