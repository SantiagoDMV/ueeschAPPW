import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from "react";
import { AiOutlineLoading3Quarters, AiOutlineCalendar } from "react-icons/ai";
import Link from 'next/link';
import Layout from "@/componentes/layout/Layout";
import Footer from "@/componentes/layout/Footer/Footer";
import Head from "next/head";
import style from "../styles/pestañas/Index.module.css";
import imagen from '../../public/imagenes/index/header/header.jpg';
import axios, { AxiosError } from "axios";

// Componentes cargados de manera diferida
const Header = dynamic(() => import("../componentes/layout/Header/Header"));
const SeccionOpcionesMasInformacion = dynamic(() => import("../componentes/IndexPage/SeccionOpcionesMasInformacion/SeccionOpciones"));
const SeccionInformacionPresentacion = dynamic(() => import("../componentes/IndexPage/SeccionInformacionPresentacion/SeccionInformacionPresentacion"));
const Publicaciones = dynamic(() => import("../componentes/layout/secciones/PublicacionesIndex"));
const Anuncios = dynamic(() => import("@/componentes/layout/secciones/AnunciosPublicaciones/Anuncio"));

interface Props {
  usuarioCookie: any;
  setUsuarioCookie: (usuario: any) => void;
  informacion: any;
  moodle: any;
}

export default function Home({ usuarioCookie, setUsuarioCookie, informacion, moodle }: Props) {
  const [datosPublicaciones, setDatosPublicaciones] = useState<any>(null);
  const [datosAnuncios, setDatosAnuncios] = useState<any>(null);
  const [mostrarCarga, setMostrarCarga] = useState(true);

  const obtenerInformacionPublicaciones = useCallback(async () => {
    try {
      const respuesta = await axios.post(`/api/publicaciones`, { pagina: "index" });
      const { datos } = respuesta.data;

      if (datos.length === 0) {
        document.getElementById("contenedorSeccionPublicaciones")?.remove();
        return;
      }

      const datosAnuncios = datos.filter((e: any) => e.id_tipo_publicacion === 2);
      const datosNoticias = datos.filter((e: any) => e.id_tipo_publicacion === 3);

      setDatosAnuncios(datosAnuncios);
      setDatosPublicaciones(datosNoticias);
    } catch (error) {
      const errorMensaje = (error as AxiosError).response?.data;
      console.error("Error al obtener las publicaciones:", error);
      console.error("Error del servidor al obtener las publicaciones:", errorMensaje);
      document.getElementById("contenedorSeccionPublicaciones")?.remove();
    } finally {
      setMostrarCarga(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
        obtenerInformacionPublicaciones();
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    obtenerInformacionPublicaciones();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [obtenerInformacionPublicaciones]);

  // Forzar todos los eventos de desplazamiento a pasivos
  const overrideEventListeners = () => {
    const addEventListener = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (type === 'scroll' && options === undefined) {
        options = { passive: true };
      }
      addEventListener.call(this, type, listener, options);
    };
  };

  useEffect(() => {
    overrideEventListeners();
  }, []);

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
            {informacion && <Header informacion={informacion} />}
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

        <div className={style.contenedorSeccionPublicaciones} id="contenedorSeccionPublicaciones">
          {datosPublicaciones && datosPublicaciones.length > 0 ? (
            <div className={style.seccionPublicaciones}>
              <h2>
                <AiOutlineCalendar className={style.iconoPublicacionesRecientes} /> Publicaciones recientes
              </h2>

              {datosAnuncios && datosAnuncios.length !== 0 && (
                <div className={style.contenedorPrincipalNoticias}>
                  <div className={style.contenedorNoticias}>
                    <Anuncios noticias={datosAnuncios} />
                  </div>
                </div>
              )}

              <div className={style.contenedorPublicaciones}>
                <Publicaciones datosPublicaciones={datosPublicaciones} obtenerInformacionPublicaciones={obtenerInformacionPublicaciones} />
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

        {/* <div className={style.contenedorMisionVision}>
        
        </div>  */}
      </Layout>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
    let respuesta;
    let data;
    let attributes
    try{
      respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/1?populate[imagen_header][fields][0]=url');
      data = respuesta.data
      attributes = data[0].attributes
    }catch(error){
      respuesta = {
        data: {
            id: 1,
            attributes: {
                titulo: "Unidad Educativa Especializada Sordos de Chimborazo",
                descripcion_titulo: "La Unidad Educativa Especializada Sordos de Chimborazo atiende a niños/as, adolescentes y jóvenes con discapacidad auditiva, en los niveles de Inicial, Preparatoria, Básica y Bachillerato Técnico",
                createdAt: "2024-05-26T20:36:29.847Z",
                updatedAt: "2024-05-26T20:45:27.643Z",
                publishedAt: null,
                contenido: null,
                imagen_header: {
                    data: {
                        id: 2,
                        attributes: {
                            url: "https://res.cloudinary.com/dxopgkamj/image/upload/v1716774136/fondo_inicio_estudiantes_5d404fc0d1.jpg"
                        }
                    }
                }
            }
        },
        meta: {}
    }
    data = respuesta.data;
    attributes = data.attributes;
    }    
    return {
      props: {
        informacion: attributes,
      },
    };
  
};
