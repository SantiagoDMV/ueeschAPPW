import axios, { AxiosError } from "axios";
import style from "../styles/pestañas/Index.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineCalendar } from "react-icons/ai";
import Layout from "@/componentes/layout/Layout";
import Footer from "@/componentes/layout/Footer/Footer";

import Head from "next/head";
import Header from "../componentes/layout/Header/Header";
import SeccionMisionVision from "../componentes/layout/secciones/SeccionMisionVision/SeccionMisionVision";
import SeccionOpcionesMasInformacion from "../componentes/IndexPage/SeccionOpcionesMasInformacion/SeccionOpciones";
import SeccionInformacionPresentacion from "../componentes/IndexPage/SeccionInformacionPresentacion/SeccionInformacionPresentacion";
import Publicaciones from "../componentes/layout/secciones/PublicacionesIndex";
import Anuncios from "@/componentes/layout/secciones/AnunciosPublicaciones/Anuncio";
import imagen from '../../public/imagenes/index/header/header.jpg'

export default function Home({ usuarioCookie, setUsuarioCookie,informacion, moodle }: any) {
  const [datosPublicaciones, setDatosPublicaciones] = useState<any>();
  const [datosAnuncios, setDatosAnuncios] = useState<any>();
  const [mostrarCarga, setMostrarCarga] = useState(true);

  useEffect(() => {
    obtenerInformacionPublicaciones();
  }, []);

  

  const obtenerInformacionPublicaciones = async () => {
    try {
      const respuesta = await axios.post(`/api/publicaciones`, {
        pagina: "index",
      });

      if (respuesta.data.datos.length === 0) {
        document.getElementById("contenedorSeccionPublicaciones")?.remove();
        return;
      }

      const datosAnuncios = respuesta.data.datos.filter(
        (e: any) => e.id_tipo_publicacion === 2
      );
      const datosNoticias = respuesta.data.datos.filter(
        (e: any) => e.id_tipo_publicacion === 3
      );

      setDatosAnuncios(datosAnuncios);
      setDatosPublicaciones(datosNoticias);
    } catch (error) {
      const errorMensaje: any = (error as AxiosError).response?.data;
      console.error("Error al obtener las publicaciones:", error);
      console.error("Error del servidor al obtener las publicaciones:", errorMensaje);
      
      document.getElementById("contenedorSeccionPublicaciones")?.remove();
    } finally {
      // Ocultar el mensaje de carga después de 5 segundos (5000 milisegundos)
      setMostrarCarga(false);
    }
  };

  return (
    <>
      <Head>
        <title>{process.env.NOMBRE_EMPRESA}</title>
        <meta name="description" content="Educación inicial, básica, media y superior para personas sordas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`Unidad Educativa Especializada Sordos de Chimborazo`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
        <meta property="og:image" content={imagen.src} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
        <div className={style.contenedorInicio}>
          <div className={style.contenedorSuperior}>
            {informacion && <Header informacion={informacion}/>}
          </div>
          <div className={style.contenedorInferior}>
            <div className={style.contenedorInformacionPresentacion}>
              <SeccionInformacionPresentacion />
            </div>
            <div className={style.contenedorMasInformacion}>
              <SeccionOpcionesMasInformacion />
            </div>
          </div>
        </div>

        <div
          className={style.contenedorSeccionPublicaciones}
          id="contenedorSeccionPublicaciones"
        >
          {datosPublicaciones && datosPublicaciones.length > 0 ? (
            <div className={style.seccionPublicaciones}>
              <h2>
                <AiOutlineCalendar
                  className={style.iconoPublicacionesRecientes}
                />{" "}
                Publicaciones recientes
              </h2>

              {datosAnuncios && datosAnuncios.length !== 0 && (
                <div className={style.contenedorPrincipalNoticias}>
                  <div className={style.contenedorNoticias}>
                    <Anuncios noticias={datosAnuncios} />
                  </div>
                </div>
              )}

              <div className={style.contenedorPublicaciones}>
                <Publicaciones datosPublicaciones={datosPublicaciones} 
                obtenerInformacionPublicaciones={obtenerInformacionPublicaciones}/>
              </div>
              <div className={style.contenedorBotonVerTodo}>
                <Link href={"publicaciones"} className={style.botonVerTodo}>
                  VER TODAS LAS PUBLICACIONES
                </Link>
              </div>
            </div>
          ) : mostrarCarga ? (
            <div className={style.seccionPublicacionesCarga}>
              <h4>Obteniendo Publicaciones</h4>
              <div className={style.circuloCarga}>
                <AiOutlineLoading3Quarters className={style.iconoCarga} />
              </div>
            </div>
          ) : null}
        </div>

        <div className={style.contenedorMisionVision}>
          <SeccionMisionVision />
        </div>
      </Layout>
      <Footer/>
    </>
  );
}


export const getServerSideProps = async (context: any) => {
  //const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieSession`, { UserCookie: UserCookie });
  const respuesta= await axios.get('https://ueeschstrapi.onrender.com/api/paginas/1?populate[imagen_header][fields][0]=url');
  const {data} =respuesta.data
  const {attributes} = data;


  try {
    return {
      props: {
        informacion: attributes,
      },
    };
  } catch (error) {
  }
};
