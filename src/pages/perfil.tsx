import InformacionPerfil from "../componentes/layout/secciones/InformacionUsuario";
import styles from "../styles/pestañas/Perfil.module.css";
import SeccionPerfilUsuarios from "@/componentes/perfiles/SeccionPerfilUsuarios/SeccionPerfilUsuarios";
import SeccionPerfilAdministracion from "@/componentes/perfiles/SeccionPerfilAdministrador/SeccionPerfilAdministrador";
import { useState,useEffect } from "react";
import axios,{AxiosError} from "axios";
import Layout from "@/componentes/layout/Layout";
import Link from "next/link";

export default function Perfil({usuarioCookie,setUsuarioCookie, moodle}:any) {
  const [usuario, setUsuario] = useState<any>();

  const obtenerCookie = async () => {
    try {
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieSession`
      );
      setUsuario(respuesta.data);

    } catch (error) {
      const errorEstado: any = (error as AxiosError).response?.status;
      console.log(errorEstado);
    }
  };

  useEffect(() => {
    obtenerCookie();
  }, []); // La dependencia está vacía para ejecutarse solo una vez al montar el componente

  
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={styles.contenedorPerfil}>
        <div className={styles.contenedorSuperior}>
          {usuario ? (
            <div className={styles.contenidoInformacion}>
              <InformacionPerfil usuario={usuario} />
            </div>
          ) : (
            <div className={styles.contenedorCargandoDatosPerfil}>
              <h3>
                Estamos recuperando tu información de perfil. Por favor, espera
                un momento mientras cargamos los datos.
              </h3>
              <div className={styles.indicadorCarga}></div>
            </div>
          )}
        </div>
        <div className={styles.contenedorInferior}>    
  {
    //usuario && (usuario.rol === 5 || usuario.rol === 4 || usuario.rol === 3) ?
    usuarioCookie && usuario && (usuario.rol === 5 || usuario.rol === 4) ?
    (
    usuario.rol ===3 ? 
    
    <div className={styles.contenedorInferiorProfesores}> 
    <div className={styles.contenedorInferiorProfesoresContenido}> 
          <Link
              href={"/publicaciones/crearpublicacion"}
              target="_BLANK"
              className={styles.linkAdministracion}
            >
              Nueva publicación
            </Link>
      <SeccionPerfilUsuarios id_moodle = {usuario.id_moodle} usuarioCookie={usuarioCookie}/>
      </div>
      </div>
      : usuarioCookie && usuario &&
    <SeccionPerfilUsuarios id_moodle = {usuario.id_moodle} usuarioCookie={usuarioCookie}/>
    )
    : usuario && (usuario.rol === 1 || usuario.rol === 2 || usuario.rol === 3) && 
    <SeccionPerfilAdministracion usuarioCookie={usuarioCookie}/>
  }
  </div>
      </div>  
    </Layout>
  );
  
}

