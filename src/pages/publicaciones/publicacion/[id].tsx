import axios from "axios";
import Publicaciones from "../../../componentes/layout/secciones/PublicacionesMomentosId";
import estilos from "../../../styles/pestañas/MomentosId.module.css";
import { useState, useEffect } from "react";
import Layout from "@/componentes/layout/Layout";
import { SyncLoader } from "react-spinners";
import Footer from '@/componentes/layout/Footer/Footer'
import Anuncios from "@/componentes/layout/secciones/AnunciosPublicaciones/Anuncio";

export default function MomentosId({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  const [datosPublicaciones, setDatosPublicaciones] = useState(null);
  const [datosMultimedia, setDatosMultimedia] = useState(null);
  const [informacionUsuarioCreador,setInformacionUsuarioCreador] = useState<any>();

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

        const respuestaInformacionUsuario = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuarios`,{idUser: datos.id_usuario}
        );
        setInformacionUsuarioCreador(respuestaInformacionUsuario.data.datos)

      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        setDatosPublicaciones(null);
        setDatosMultimedia(null);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que useEffect solo se ejecute una vez al montar el componente


  useEffect(() => {
    obtenerInformacionPublicaciones();
  }, []);

  const [datosTodasPublicaciones, setDatosTodasPublicaciones] = useState<any>();


  const obtenerInformacionPublicaciones = async () => {
    const respuesta = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones`,
      { mostrar_tipos_publicaciones: "todo" }
    );

    
    const nuevosDatos = respuesta.data.datos.map((e:any)=>{
      if(e.eliminado_en ===null){
        return e
      }
    })
    setDatosTodasPublicaciones(nuevosDatos);
    
    // setDatosP(respuesta.data.datos);
    // setDatosM(respuesta.data.datosMultimedia);
    // setDatosU(respuesta.data.detallesUsuarios);
  };


  return (
    <>
  
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      
      <div className={estilos.contenedorPrincipalMomentos}>
        <div className={estilos.contenedorPrincipalPublicacionesFijo}>
          <div className={estilos.contenedorPrincipalPublicaciones}>
            {datosPublicaciones && informacionUsuarioCreador ? (

              <div className={estilos.contenedorPrincipalPublicaciones}>
              <div className={estilos.contenedorPublicaciones}>
                <Publicaciones
                  informacionUsuarioCreador = {informacionUsuarioCreador} 
                  datosPublicaciones={datosPublicaciones}
                  datosMultimedia={datosMultimedia}
                />

</div>


              </div>
              
              
            ) : (
              <div className={estilos.contenedorPublicacionesNoEncontradas}>
                <h1>Obteniendo datos</h1>
                <SyncLoader color={"#558"} loading={true} size={30} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={estilos.contenedorDerecho}>
      {datosTodasPublicaciones &&
  <div className={estilos.contenidoContenedorDerecho}>
  
<h2>Otras publicaciones</h2>
{ datosTodasPublicaciones.length !== 0 && (
                <div className={estilos.contenedorPrincipalNoticias}>
                  <div className={estilos.contenedorNoticias}>
                    <Anuncios noticias={datosTodasPublicaciones} />
                  </div>
                </div>
              )}


</div>
}
</div>
      <Footer/>
    </Layout>
    </>
  );
}
