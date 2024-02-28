import axios from 'axios'
import FormularioRegistroMiembros from '@/componentes/layout/Formularios/FormularioActualizacionImportados';
import estilos from '../styles/pestañas/Actualizardatos.module.css'
import { useState,useEffect } from 'react';
import { useRouter } from "next/router";
import {PacmanLoader,BeatLoader} from "react-spinners";
import Layout from '@/componentes/layout/Layout';

const ActualizarDatosPage = ({email,fullname,usuarioCookie,setUsuarioCookie, moodle}:any) => {

  useEffect(()=>{
    verificarEmail()
  },[])

  const [respuesta,setRespuesta] = useState();
  const [mensaje,setMensaje] = useState<boolean>(false);
  const router = useRouter()

  const verificarEmail = async () =>{
    const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/usuarios/obtenerUsuarioEmail`,{email:email})
    setMensaje(true)
    setRespuesta(respuesta.data.valor)
    
    
    if(!respuesta.data.valor)
    setTimeout(() => {
      router.push({
        pathname: '/login',
      });  
    }, 3000);
  }

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
    <div className={estilos.contenerPrincipalActualizarDatos}>

    {!mensaje?
    <div className={estilos.mostrarCargando}>
    <h3>Obteniedo datos</h3>
    <div className={estilos.mostrarCargandoPacman}>
    <PacmanLoader

color={"#558"} loading={true} size={70}/>
  </div>
  </div>
    :
    !respuesta ? 
    <div className={estilos.contenedorUsuarioRegistrado}>
    <h2>¡Ya tienes una cuenta registrada!</h2>
    <p>Parece que ya tienes una cuenta con nosotros. Estamos llevándote al inicio de sesión. Si necesitas asistencia, no dudes en escribirnos</p>
      <BeatLoader size={13} color={"#386A91"} loading={true}/>
    </div>
    :
    email && <FormularioRegistroMiembros email={email} fullname={fullname}/>
    }    
    </div>
    </Layout>
  );
};

export default ActualizarDatosPage;

export const getServerSideProps = async (context: any) => {
    try {
        const email = context.query.email;
        const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]=${email}`)
        if(respuesta.data.users.length ===0 || !respuesta){
                return {
                  redirect: {
                    destination: '/login',
                    permanent: false,
                  },
                };
        }    
        return{
            props:{ 
                email:respuesta.data.users[0].email,
                fullname:respuesta.data.users[0].fullname
            }
        }
        
    } catch (error) {
        console.error('Error en getServerSideProps /actualizardatos:');
    return {
      redirect: {
        destination: '/error?server=moodle',
        permanent: false,
      },
    };
    }
    
}