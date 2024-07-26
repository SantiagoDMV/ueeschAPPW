import dynamic from 'next/dynamic';
import { useEffect, useState, useCallback } from "react";
import { AiOutlineLoading3Quarters, AiFillNotification, AiOutlineCalendar } from "react-icons/ai";
import Link from 'next/link';
import Layout from "@/componentes/layout/Layout";
import Footer from "@/componentes/layout/Footer/Footer";
import Head from "next/head";
import style from "../styles/pestañas/Index.module.css";
import imagen from '../../public/imagenes/index/header/header.jpg';
import axios, { AxiosError } from "axios";
import ContactFormAgendamiento from '@/componentes/layout/Formularios/FormularioAgendamiento/FormularioEmail';
import imagen_formulario from '../../public/imagenes/index/formulario/imagen_formulario.jpg';

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
  const [datosMultimedia, setDatosMultimedia] = useState<any>(null);
  const [datosPublicacionesAnuncios, setDatosPublicacionesAnuncios] = useState<any>(null);
  const [datosMultimediaAnuncios, setDatosMultimediaAnuncios] = useState<any>(null);
  const [mostrarCarga, setMostrarCarga] = useState(true);

  const obtenerDatosPublicaciones = async () => {
    try {
      const respuesta = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones/noticiasIndex`
      );

      const respuestaAnuncios = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones/anunciosIndex`
      );

      setDatosPublicaciones(respuesta.data.datos);
      setDatosMultimedia(respuesta.data.datosMultimedia);
      setDatosPublicacionesAnuncios(respuestaAnuncios.data.datos);
      setDatosMultimediaAnuncios(respuestaAnuncios.data.datosMultimedia);

    } catch (error) {
      const errorMensaje = (error as AxiosError).response?.data;
      console.error("Error al obtener las publicaciones:", error);
      console.error("Error del servidor al obtener las publicaciones:", errorMensaje);
      document.getElementById("contenedorSeccionPublicaciones")?.remove();
    } finally {
      setMostrarCarga(false);
    }
  }

  useEffect(() => {
    obtenerDatosPublicaciones();
  }, []);

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

        {datosPublicacionesAnuncios && datosPublicacionesAnuncios.length !== 0 && (
          <div className={style.contenedorPrincipalNoticias}>
            <h2>
              <AiFillNotification className={style.iconoPublicacionesRecientes} aria-hidden="true" /> Anuncios
            </h2>
            <div className={style.contenedorNoticias}>
              <Anuncios noticias={datosPublicacionesAnuncios} datosMultimediaAnuncios={datosMultimediaAnuncios}/>
            </div>
          </div>
        )}

        <div className={style.contenedorSeccionPublicaciones} id="contenedorSeccionPublicaciones">
          {datosPublicaciones && datosPublicaciones.length > 0 ? (
            <div className={style.seccionPublicaciones}>
              <h2>
                <AiOutlineCalendar className={style.iconoPublicacionesRecientes} aria-hidden="true" /> Publicaciones recientes
              </h2>
              <div className={style.contenedorPublicaciones}>
                <Publicaciones datosPublicaciones={datosPublicaciones} datosMultimedia={datosMultimedia} />
              </div>
              <div className={style.contenedorBotonVerTodo}>
                <Link href={"publicaciones"} className={style.botonVerTodo} aria-label="Ver todas las publicaciones">
                  VER TODAS LAS PUBLICACIONES
                </Link>
              </div>
            </div>
          ) : mostrarCarga ? (
            <div className={style.seccionPublicacionesCarga}>
              <h4>Obteniendo Publicaciones</h4>
              <div className={style.circuloCarga} role="status" aria-live="polite">
                <AiOutlineLoading3Quarters className={style.iconoCarga} aria-hidden="true" />
              </div>
            </div>
          ) : null}
        </div>

        <div className={style.contenedorAgendamiento}>
          <div className={style.contenedorAgendamientoIzquierda}>
            <img 
            src={`${imagen_formulario.src}`} 
            alt="imagen_formulario" />
          </div>
          <div className={style.contenedorAgendamientoDerecha}>
            <h4>NUESTRO</h4>
          <h1>Compromiso y propósito</h1>
          <p>¡Estudiar en la Unidad Educativa Especializada Sordos de Chimborazo es una decisión llena de oportunidades! Nuestro compromiso se centra en educar a jóvenes con capacidades auditivas diferentes, fomentando su conexión con el mundo, desarrollando su pensamiento crítico y global, y vinculándolos con las constantes evoluciones de nuestra sociedad. Nos esforzamos por formar individuos fuertes y saludables, tanto física como emocionalmente, preparados para enfrentar los desafíos del futuro.</p>
          
          </div>
        </div>

          <div className={style.contenedorNiveles}>

            <h2>Niveles de Formación</h2>

<div className={style.contenedorNivelesContenido}>
          <div className={style.nivelInicial}>
          <div className={style.conenedorImagenNiveles}>
<img src={`${imagen.src}`} alt="imagen_nivel_inicial" />
            </div>
            <div className={style.nivelContenido}>
              <h4>Educación Inicial</h4>
            <p>En la Educación Inicial, proporcionamos un entorno estimulante y adaptado para los niños con discapacidad auditiva, centrado en el juego y la exploración. Nuestro enfoque es desarrollar habilidades sociales, emocionales y cognitivas, preparando a los pequeños para su futura educación.</p>
            </div>
          </div>

          <div className={style.nivelBasica}>
          <div className={style.conenedorImagenNiveles}>
          <img src={`${imagen.src}`} alt="imagen_nivel_basica" />
</div>
<div className={style.nivelContenido}>
  <h4>Educación Básica</h4>
<p>La Educación Básica ofrece una formación académica integral, utilizando métodos visuales y táctiles para fortalecer habilidades en lectura, escritura y matemáticas. Fomentamos la participación en actividades y proyectos que desarrollen la autoestima y habilidades sociales.</p>
</div>
          </div>

          <div className={style.nivelBachillerato}>
          <div className={style.conenedorImagenNiveles}>
          <img src={`${imagen.src}`} alt="imagen_nivel_bacillerato" />
</div>
<div className={style.nivelContenido}>
  <h4>Bachillerato</h4>
<p>En el Bachillerato, preparamos a los estudiantes para la educación superior y el mundo laboral con un currículo avanzado y capacitación profesional. Ofrecemos orientación vocacional y apoyo para desarrollar competencias clave para la vida independiente y la integración social.</p>
</div>
          </div>
          </div>
          </div>

      </Layout>
      <Footer />
    </>
  );
}

export const getServerSideProps = async () => {
  let respuesta;
  let data;
  let attributes;

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
              url: "https://res.cloudinary.com/dxopgkamj/image/upload/v1720808905/fondo_Escuela_d1fccc85b0.jpg"
            }
          }
        }
      }
    },
    meta: {}
  };
  data = respuesta.data;
  attributes = data.attributes;

  return {
    props: {
      informacion: attributes,
    },
  };
};


// import dynamic from 'next/dynamic';
// import { useEffect, useState, useCallback } from "react";
// import { AiOutlineLoading3Quarters,AiFillNotification, AiOutlineCalendar } from "react-icons/ai";
// import Link from 'next/link';
// import Layout from "@/componentes/layout/Layout";
// import Footer from "@/componentes/layout/Footer/Footer";
// import Head from "next/head";
// import style from "../styles/pestañas/Index.module.css";
// import imagen from '../../public/imagenes/index/header/header.jpg';
// import axios, { AxiosError } from "axios";

// // Componentes cargados de manera diferida
// const Header = dynamic(() => import("../componentes/layout/Header/Header"));
// const SeccionOpcionesMasInformacion = dynamic(() => import("../componentes/IndexPage/SeccionOpcionesMasInformacion/SeccionOpciones"));
// const SeccionInformacionPresentacion = dynamic(() => import("../componentes/IndexPage/SeccionInformacionPresentacion/SeccionInformacionPresentacion"));
// const Publicaciones = dynamic(() => import("../componentes/layout/secciones/PublicacionesIndex"));
// const Anuncios = dynamic(() => import("@/componentes/layout/secciones/AnunciosPublicaciones/Anuncio"));

// interface Props {
//   usuarioCookie: any;
//   setUsuarioCookie: (usuario: any) => void;
//   informacion: any;
//   moodle: any;
// }

// export default function Home({ usuarioCookie, setUsuarioCookie, informacion, moodle }: Props) {
//   const [datosPublicaciones, setDatosPublicaciones] = useState<any>(null);
//   const [datosMultimedia, setDatosMultimedia] = useState<any>(null);
//   const [datosAnuncios, setDatosAnuncios] = useState<any>(null);

//   const [mostrarCarga, setMostrarCarga] = useState(true);


//   const obtenerDatosPublicaciones = async () => {
//     try {
//       const respuesta = await axios.get(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones/noticiasIndex`
//       );
//       setDatosPublicaciones(respuesta.data.datos);
//       setDatosMultimedia(respuesta.data.datosMultimedia);
//     } catch (error) {
//       console.error("Error al obtener las publicaciones:", error);
//     }
//   }


//   const obtenerInformacionPublicaciones = useCallback(async () => {
//     obtenerDatosPublicaciones()
//     try {
//       // const respuesta = await axios.post(`/api/publicaciones`, { pagina: "index" });
//       const respuesta = await axios.post(`/api/publicaciones`, { pagina: "index" });
//       const { datos } = respuesta.data;
//       console.log(datos)

//       if (datos.length === 0) {
//         document.getElementById("contenedorSeccionPublicaciones")?.remove();
//         return;
//       }

//       const datosAnuncios = datos.filter((e: any) => e.id_tipo_publicacion === 2);
//       const datosNoticias = datos.filter((e: any) => e.id_tipo_publicacion === 3);

//       setDatosAnuncios(datosAnuncios);
//       setDatosPublicaciones(datosNoticias);
//     } catch (error) {
//       const errorMensaje = (error as AxiosError).response?.data;
//       console.error("Error al obtener las publicaciones:", error);
//       console.error("Error del servidor al obtener las publicaciones:", errorMensaje);
//       document.getElementById("contenedorSeccionPublicaciones")?.remove();
//     } finally {
//       setMostrarCarga(false);
//     }
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 100) {
//         obtenerInformacionPublicaciones();
//         window.removeEventListener('scroll', handleScroll);
//       }
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });

//     obtenerInformacionPublicaciones();

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [obtenerInformacionPublicaciones]);

//   // Forzar todos los eventos de desplazamiento a pasivos
//   const overrideEventListeners = () => {
//     const addEventListener = EventTarget.prototype.addEventListener;
//     EventTarget.prototype.addEventListener = function (type, listener, options) {
//       if (type === 'scroll' && options === undefined) {
//         options = { passive: true };
//       }
//       addEventListener.call(this, type, listener, options);
//     };
//   };

//   useEffect(() => {
//     overrideEventListeners();
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>{process.env.NOMBRE_EMPRESA}</title>
//         <meta name="description" content="Educación inicial, básica, media y superior para personas sordas" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta property="og:title" content={`Unidad Educativa Especializada Sordos de Chimborazo`} />
//         <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
//         <meta property="og:image" content={imagen.src} />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
//         <div className={style.contenedorInicio}>
//           <div className={style.contenedorSuperior}>
//             {informacion && <Header informacion={informacion} />}
//           </div>
//           <div className={style.contenedorInferior}>
//             <div className={style.contenedorInformacionPresentacion}>
//               <SeccionInformacionPresentacion />
//             </div>
//             <div className={style.contenedorMasInformacion}>
//               <SeccionOpcionesMasInformacion />
//             </div>
//           </div>
//         </div>


//         {datosAnuncios && datosAnuncios.length !== 0 && (
//                 <div className={style.contenedorPrincipalNoticias}>
//                   <h2>
//                 <AiFillNotification className={style.iconoPublicacionesRecientes} /> Anuncios
//               </h2>
//                   <div className={style.contenedorNoticias}>
//                     <Anuncios noticias={datosAnuncios} />
//                   </div>
//                 </div>
//               )}

//         <div className={style.contenedorSeccionPublicaciones} id="contenedorSeccionPublicaciones">
//           {datosPublicaciones && datosPublicaciones.length > 0 ? (
//             <div className={style.seccionPublicaciones}>
//               <h2>
//                 <AiOutlineCalendar className={style.iconoPublicacionesRecientes} /> Publicaciones recientes
//               </h2>

//               <div className={style.contenedorPublicaciones}>
//                 {/* <Publicaciones datosPublicaciones={datosPublicaciones} obtenerInformacionPublicaciones={obtenerInformacionPublicaciones} /> */}
//                 <Publicaciones datosPublicaciones={datosPublicaciones} datosMultimedia={datosMultimedia}/>
//               </div>
//               <div className={style.contenedorBotonVerTodo}>
//                 <Link href={"publicaciones"} className={style.botonVerTodo}>
//                   VER TODAS LAS PUBLICACIONES
//                 </Link>
//               </div>
//             </div>
//           ) : mostrarCarga ? (
//             <div className={style.seccionPublicacionesCarga}>
//               <h4>Obteniendo Publicaciones</h4>
//               <div className={style.circuloCarga}>
//                 <AiOutlineLoading3Quarters className={style.iconoCarga} />
//               </div>
//             </div>
//           ) : null}
//         </div>

//         {/* <div className={style.contenedorMisionVision}>
        
//         </div>  */}
//       </Layout>
//       <Footer />
//     </>
//   );
// }

// export const getServerSideProps = async () => {
//     let respuesta;
//     let data;
//     let attributes
//     // try{
//     //   respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/1?populate[imagen_header][fields][0]=url');
//     //   data = respuesta.data
//     //   attributes = data[0].attributes
//     // }catch(error){
//       respuesta = {
//         data: {
//             id: 1,
//             attributes: {
//                 titulo: "Unidad Educativa Especializada Sordos de Chimborazo",
//                 descripcion_titulo: "La Unidad Educativa Especializada Sordos de Chimborazo atiende a niños/as, adolescentes y jóvenes con discapacidad auditiva, en los niveles de Inicial, Preparatoria, Básica y Bachillerato Técnico",
//                 createdAt: "2024-05-26T20:36:29.847Z",
//                 updatedAt: "2024-05-26T20:45:27.643Z",
//                 publishedAt: null,
//                 contenido: null,
//                 imagen_header: {
//                     data: {
//                         id: 2,
//                         attributes: {
//                             url: "https://res.cloudinary.com/dxopgkamj/image/upload/v1720808905/fondo_Escuela_d1fccc85b0.jpg"
//                         }
//                     }
//                 }
//             }
//         },
//         meta: {}
//     }
//     data = respuesta.data;
//     attributes = data.attributes;
//     // }    
//     return {
//       props: {
//         informacion: attributes,
//       },
//     };
  
// };
