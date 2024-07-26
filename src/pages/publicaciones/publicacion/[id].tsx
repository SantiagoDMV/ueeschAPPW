import axios from "axios";
import Publicaciones from "../../../componentes/layout/secciones/PublicacionesMomentosId";
import estilos from "../../../styles/pestañas/MomentosId.module.css";
import { useState, useEffect } from "react";
import Layout from "@/componentes/layout/Layout";
import { SyncLoader } from "react-spinners";
import Footer from '@/componentes/layout/Footer/Footer'
import { AiOutlineArrowLeft,AiOutlineArrowRight } from "react-icons/ai";


export default function MomentosId({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  const [datosPublicaciones, setDatosPublicaciones] = useState(null);
  // const [datosMultimedia, setDatosMultimedia] = useState(null);
  const [datosPublicacionesId, setDatosPublicacionesId] = useState(null);
  const [datosMultimediaId, setDatosMultimediaId] = useState(null);
  const [informacionUsuarioCreador,setInformacionUsuarioCreador] = useState<any>();
  const [tituloPrev, setTituloPrev] = useState(null);
  const [tituloPost, setTituloPost] = useState(null);
  const [linkPrev, setLinkPrev] = useState(null);
  const [linkPost, setLinkPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publicacionId:any = window.location.pathname.split("/").pop();
        const respuesta = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones?publicacionId=${publicacionId}`
        );

        const datos = respuesta.data.datos;
        setTituloPrev(datos[0].titulo_publicacion)
        setTituloPost(datos[2].titulo_publicacion)
        setLinkPrev(datos[0].id_publicacion)
        setLinkPost(datos[2].id_publicacion)
        const datosMultimedia = respuesta.data.datosMultimedia;

        setDatosPublicaciones(datos);
        // setDatosMultimedia(datosMultimedia);
        const publicacion = datos.find((p:any) => p.id_publicacion === parseInt(publicacionId));
        const publicacionMultimedia = datosMultimedia.find((p:any) => p.id_publicacion === parseInt(publicacionId));
        setDatosPublicacionesId(publicacion)
        setDatosMultimediaId(publicacionMultimedia)
        
        if (publicacion) {
          const respuestaInformacionUsuario = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuarios`,
            { idUser: publicacion.id_usuario }
          );
        
          setInformacionUsuarioCreador(respuestaInformacionUsuario.data.datos);
        } else {
          console.error("Publicación no encontrada");
        }
      } catch (error) {
        console.error("Error al obtener las publicaciones:", error);
        setDatosPublicaciones(null);
        // setDatosMultimedia(null);
      }
    };

    fetchData();
  }, []); // El array vacío asegura que useEffect solo se ejecute una vez al montar el componente



  const handleClickPrev = (event:any) => {
    event.preventDefault();
    window.location.href = `/publicaciones/publicacion/${linkPrev}`;
  };

  const handleClickPost = (event:any) => {
    event.preventDefault();
    window.location.href = `/publicaciones/publicacion/${linkPost}`;
  };  
  return (
    <>
  
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      
      <div className={estilos.contenedorPrincipalMomentos}>
        <div className={estilos.contenedorPrincipalPublicacionesFijo}>
          
          <div className={estilos.contenedorPrincipalPublicaciones}>
            {datosPublicacionesId && informacionUsuarioCreador ? (
              <div className={estilos.contenedorPrincipalPublicaciones}>
              <div className={estilos.contenedorPublicaciones}>

                <Publicaciones
                  informacionUsuarioCreador = {informacionUsuarioCreador} 
                  datosPublicaciones={datosPublicacionesId}
                  datosMultimedia={datosMultimediaId}
                />

<div className={estilos.contenedorLinksOtrasPublicaciones}>
              <div   onClick={handleClickPrev}  className={estilos.linkOtrasPublicacionesIzquierda}>
                <div className={estilos.linkOtrasPublicacionesFlechas}>
                <AiOutlineArrowLeft/>
                <p>Publicación anterior</p>
                </div>
                <span>{tituloPrev && tituloPrev}</span>
                </div>
                
                <div onClick={handleClickPost} className={estilos.linkOtrasPublicacionesDerecha}>
                <div className={estilos.linkOtrasPublicacionesFlechas}>
                <p>Siguiente publicación </p>
                <AiOutlineArrowRight/>
                </div>
                <span>{tituloPost && tituloPost}</span>
                </div>
                </div>


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
      <Footer/>
    </Layout>
    </>
  );
}
