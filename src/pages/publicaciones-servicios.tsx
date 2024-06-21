import { useEffect, useState } from "react";
import CrudPublicacion from "../componentes/layout/secciones/gestionPublicaciones/crudPublicaciones";
import FormularioActualizacion from "../componentes/layout/Formularios/FormularioActualizacionPublicacion";
import estilos from "../styles/pestañas/GestionUsuarios.module.css";
import Ventana from "../componentes/ventanas/Ventana";
import axios from "axios";
import Layout from "@/componentes/layout/Layout";

export default function GestionUsuarios({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  useEffect(() => {
    obtenerDatosPublicaciones();
  }, []);

  const [estadoVentana, setestadoVentana] = useState(false);
  const [publicacionInf, setPublicacionInf] = useState<any>();
  const [datosP, setDatosP] = useState<any>();
  const [datosM, setDatosM] = useState<any>();
  const [datosU, setDatosU] = useState<any>();

  const obtenerDatosPublicaciones = async () => {
    const respuesta = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones`,
      { mostrar_tipos_publicaciones: "todo" }
    );
  
    setDatosP(respuesta.data.datos);
    setDatosM(respuesta.data.datosMultimedia);
    setDatosU(respuesta.data.detallesUsuarios);
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contendorUsuarios}>
        <div className={estilos.contenedorInfUsuarios}>
          <div className={estilos.contendorPrincipalInformacionRoles}>
            <p>Tipos de publicaciones en el sistema:</p>
            <div className={estilos.contendorInformacionRoles}>
              <span className={estilos.usuariosAdmin}>1. Servicio</span>
              <span className={estilos.usuariosMoodle}>2. Anuncio</span>
              <span className={estilos.usuariosPadres}>3. Noticias</span>
            </div>
          </div>

          <CrudPublicacion
            detallesUsuarios={datosU}
            publicacionInf={datosP}
            datosMultimedia={datosM}
            setInformacionPublicacion={setPublicacionInf}
            setInformacionPublicaciones={setDatosP}
            setInformacionMultimedia={setDatosM}
            setEstado={setestadoVentana}
            obtenerDatosPublicaciones={obtenerDatosPublicaciones}
          />
        </div>
        <Ventana estado={estadoVentana}>
          <FormularioActualizacion
            estado={setestadoVentana}
            informacionUsuario={publicacionInf}
            datosMultimedia={datosM}
            obtenerDatosPublicaciones={obtenerDatosPublicaciones}
          />
        </Ventana>
      </div>
      
    </Layout>
  );
}
