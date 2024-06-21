import React from 'react'
import {PacmanLoader,BeatLoader} from "react-spinners";
import Layout from '@/componentes/layout/Layout';
import estilos from '../styles/pestañas/ErroresPages.module.css'
import { AiOutlineWarning } from 'react-icons/ai';

export default function errorservermoodle({error,usuarioCookie,setUsuarioCookie, moodle}:any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
    <div className={estilos.contendorErrorPage}>
    {error === 'moodle' &&
    (
      <div className={estilos.contendorMensajeError}>
      <AiOutlineWarning size={88} color="#FF8C00" className={estilos.icono}/>
      <p>El servidor de Moodle no se encuentra disponible en este momento. Por favor, inténtalo más tarde.</p>
      </div>
    )
    }
    </div>
    
    </Layout>
  )
}
export const getServerSideProps = async (context: any) => {
      const server = context.query.server;
 
      if(!server){
              // Si la respuesta no existe, redirige a '/login'
              return{
                redirect: {
                  destination: '/',
                  permanent: false,
                },
              }        
      }
      if(server === 'moodle')
          return {
            props:{
                error : server
            }
              };            
      else
      return{
        redirect: {
          destination: '/',
          permanent: false,
        },
      }              
  } 
