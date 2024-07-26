import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Layout from "@/componentes/layout/Layout";
import Header from "../componentes/layout/Header/HeaderLiviano/Header";
import Footer from "@/componentes/layout/Footer/Footer";
import SeccionPublicaciones from "../componentes/layout/secciones/PublicacionesMomentos";
import estilos from "../styles/pestañas/Momentos.module.css";

export default function Publicaciones({ usuarioCookie, setUsuarioCookie, 
  informacion,
   moodle }: any) {

  const [datosPublicaciones, setDatosPublicaciones] = useState<any>();
  const [datosMultimedia, setDatosMultimedia] = useState<any>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerDatosPublicaciones();

  }, []);

  const obtenerDatosPublicaciones = async () => {
    try {
      const respuesta = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones/noticias`
      );
      setDatosPublicaciones(respuesta.data.datos);
      setDatosMultimedia(respuesta.data.datosMultimedia);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
    }
  }

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
       {informacion &&  
      <Header informacion={informacion} />
      }
      <div className={estilos.contenedorPrincipalMomentos}>
        <div className={estilos.contenedorPrincipalPublicacionesFijo}>
          <div className={estilos.contenedorPrincipalPublicaciones}>
            {loading ? (
              <div className={estilos.seccionPublicacionesCarga}>
                <h4>Obteniendo Publicaciones</h4>
                <div className={estilos.circuloCarga}>
                  <AiOutlineLoading3Quarters className={estilos.iconoCarga} />
                </div>
              </div>
            ) : datosPublicaciones && datosPublicaciones.length === 0 ? (
              <h3 className={estilos.tituloPublicaciones}>
                ¡En este momento no hay publicaciones disponibles!
              </h3>
            ) : (
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
      <Footer />
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/6?populate[imagen_header][fields][0]=url');
    const { data } = respuesta.data;
    const { attributes } = data;
    return {
      props: {
        informacion: attributes
      }
    };
  } catch (error) {
    console.error("Error al obtener la información de la página:", error);
    return {
      props: {
        informacion: null
      }
    };
  }
};
