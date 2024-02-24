import axios from "axios";
import SeccionPublicaciones from "../componentes/layout/secciones/PublicacionesMomentos";
import estilos from "../styles/pestañas/Momentos.module.css";
import { useEffect, useState } from "react";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import Layout from "@/componentes/layout/Layout";
import Anuncios from "@/componentes/layout/secciones/AnunciosPublicaciones/Anuncio";
import Header from "../componentes/layout/Header/HeaderLiviano/Header";
import Footer from "@/componentes/layout/Footer/Footer";

export default function Publicaciones({usuarioCookie,setUsuarioCookie, informacion}:any) {

  useEffect(()=>{
    obtenerDatosPublicaciones()
    obtenerDatosAnuncios()
  },[])
    
  const [datosPublicaciones,setDatosPublicaciones] = useState<any>()
  const [datosMultimedia,setDatosMultimedia] = useState<any>()
  const [datosAnuncios,setDatosAnuncios] = useState<any>()
  

  const obtenerDatosPublicaciones = async()  =>{
    const respuesta = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones/noticias`
    );
    setDatosPublicaciones(respuesta.data.datos);
    setDatosMultimedia(respuesta.data.datosMultimedia);
  }


  const obtenerDatosAnuncios = async()  =>{
    const respuesta = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones/anuncios`
    );
    setDatosAnuncios(respuesta.data.datos);
    
  }

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      {informacion && <Header informacion={informacion} />}
      <div className={estilos.contenedorPrincipalMomentos}>
        <div className={estilos.contenedorPrincipalPublicacionesFijo}>
          <div className={estilos.contenedorPrincipalPublicaciones}>
            {/* <div className={estilos.mensajePrincipal}>
              <span className={estilos.mensajePrincipalTitulo}>
                Publicaciones
              </span>
              <p>
                Nuestras publicaciones son el reflejo de la vitalidad y el
                compromiso de nuestra comunidad educativa. ¡No te pierdas
                ninguna historia!
              </p>
            </div> */}


  {(datosAnuncios && datosAnuncios.length !==0) &&
  <div className={estilos.contenedorPrincipalNoticias}>
  <div className={estilos.contenedorNoticias}>
<Anuncios noticias={datosAnuncios}/>
</div>
</div>
}


            {!datosPublicaciones ? (
              <div className={estilos.seccionPublicacionesCarga}>
              <h4>Obteniendo Publicaciones</h4>
              <div className={estilos.circuloCarga}>
                <AiOutlineLoading3Quarters className={estilos.iconoCarga} />
              </div>
            </div>
            ) :datosPublicaciones.length === 0? (
              <h3 className={estilos.tituloPublicaciones}>
              ¡En este momento no hay publicaciones disponibles!
            </h3>
            ) : 
            (
              <div className={estilos.contenedorPublicaciones}>
                <SeccionPublicaciones
                  datosPublicaciones={datosPublicaciones}
                  datosMultimedia={datosMultimedia}
                />
              </div>
              
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </Layout>
  );
}


export const getServerSideProps = async (context:any) => {
  const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/6?populate[imagen_header][fields][0]=url');
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
