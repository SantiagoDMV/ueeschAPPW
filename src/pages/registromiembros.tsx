
import estilos from "../styles/pestañas/RegistroMiembros.module.css";
import { useState,useRef } from "react";
import axios from "axios";
import MensajeError from "@/componentes/mensajes/MensajeError/MensajeError";
import MensajeCargando from "@/componentes/mensajes/MensajeCargando/MensajeCargando";
import { useRouter } from "next/router";
import Layout from "@/componentes/layout/Layout";
import Header from "@/componentes/layout/Header/HeaderLiviano/Header";

export default function Registro({usuarioCookie,setUsuarioCookie, informacion, moodle}:any) {
  const [input, setInput] = useState<any>({
    email_usuario:''
  });

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
const router = useRouter()
////////////////////////////////////////////////////////////////////////

// const verificarEmail = async () =>{
//   const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/usuarios/obtenerUsuarioEmail`,{email:email})
//   setMensaje(true)
//   setRespuesta(respuesta.data.valor)
  
  
//   if(!respuesta.data.valor)
//   setTimeout(() => {
//     router.push({
//       pathname: '/login',
//     });  
//   }, 3000);
// }


  const comprobarExistenciaUsername = async () => {
    try {
      if (input) {
        setMensajeCargando({
          estado:true,
          mensaje: 'El email está siendo verificado en Moodle. '
        })

        const respuesta = await axios.post("api/moodle", input);

        if (respuesta.data.valor) {
          setMensajeCargando({
            estado:true,
            mensaje:respuesta.data.mensaje
          })

          setTimeout(() => {
            router.push(`/actualizardatos?email=${input.email_usuario}`)  
          }, 2000);
        } 
         else {

          setMensajeCargando({
            estado:false,
            mensaje:''
          })

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
   }//finally{
  //   setMensajeCargando({
  //     estado:false,
  //     mensaje: ''
  //   })
  // }
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
      <Header informacion={informacion} />
      <>

        <div className={estilos.contenedorPrincipalUsernameMoodle}>
          <div className={estilos.contenedorUsernameMoodle}>
            <label>
              Ingresa tu email de Moodle para comenzar tu registro. ¡Únete a
              nosotros y empieza tu viaje educativo ahora!
            </label>
            <form onSubmit={(e)=>e.preventDefault()} className={estilos.formularioEmailEnviar}>
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="email_usuario"
              placeholder="email_usuario"
            />
            <button onClick={comprobarExistenciaUsername}>Enviar</button>
            </form>
          </div>
        </div>
        </>
      {/* )
        : estado && (
          <div className={estilos.contenedorRegistro}>
            <Formulario idMoodle = {estado}/>
          </div>
    )
  }     */}
      </div>
    
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/7?populate[imagen_header][fields][0]=url');
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
