import axios from "axios";
import Publicaciones from "../../../componentes/layout/secciones/PublicacionesMomentosId";
import estilos from "../../../styles/pestañas/MomentosId.module.css";
import { useState, useEffect } from "react";
import Layout from "@/componentes/layout/Layout";

export default function MomentosId({
  usuarioCookie,
  setUsuarioCookie,
}: any) {
  const [datosPublicaciones, setDatosPublicaciones] = useState(null);
  const [datosMultimedia, setDatosMultimedia] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publicacionId = window.location.pathname.split("/").pop();
        const respuesta = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones?publicacionId=${publicacionId}`
        );

        const datos = respuesta.data.datos;
        const datosMultimedia = respuesta.data.datosMultimedia;

        setDatosPublicaciones(datos);
        setDatosMultimedia(datosMultimedia);
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        setDatosPublicaciones(null);
        setDatosMultimedia(null);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que useEffect solo se ejecute una vez al montar el componente

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      <div className={estilos.contenedorPrincipalMomentos}>
        <div className={estilos.contenedorPrincipalPublicacionesFijo}>
          <div className={estilos.contenedorPrincipalPublicaciones}>
            {datosPublicaciones ? (
              <div className={estilos.contenedorPublicaciones}>
                <Publicaciones
                  datosPublicaciones={datosPublicaciones}
                  datosMultimedia={datosMultimedia}
                />
              </div>
            ) : (
              <div className={estilos.contenedorPublicacionesNoEncontradas}>
                <h3>Obteniendo datos</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
