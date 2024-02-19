import { useEffect, useState, useRef } from "react";
import CrudUsuario from "../componentes/layout/secciones/cursosMoodle/crudCursoMoodle"; //
import CrudCategorias from "../componentes/layout/secciones/cursosMoodle/crudCategorias"; //
import FormularioActualizacion from "../componentes/layout/Formularios/FormularioActualizacionMoodleCurso"; //
import FormularioActualizacionCategoria from "../componentes/layout/Formularios/FormularioActualizacionMoodleCategoria"; //

import estilos from "../styles/pestañas/GestionUsuarios.module.css";
import Ventana from "../componentes/ventanas/Ventana"; //
import axios from "axios";
import { Toaster } from "sonner";
import Layout from "@/componentes/layout/Layout";
export default function GestionUsuarios({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  useEffect(() => {
    obtenerDatosUsuarios();
  }, []);

  const [estadoVentana, setestadoVentana] = useState(false);
  const [estadoVentanaCategoria, setestadoVentanaCategoria] = useState(false);
  const [userInf, setUserInf] = useState<any>();
  const [datosUsuarios, setDatosUsuario] = useState<any>();
  const [datosCategorias, setDatosCategorias] = useState<any>();
  const [datosCategoriasCursos, setDatosCategoriasCursos] = useState<any>();
  
    useState<any>(false);

  const obtenerDatosUsuarios = async () => {
    
    const respuesta = await axios.get(
      `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
    );

    const respuestaCategorias = await axios.get(
      `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_categories&moodlewsrestformat=json`
    );
    
  
    setDatosCategorias(respuestaCategorias.data)
    setDatosCategoriasCursos(respuestaCategorias.data)
    setDatosUsuario(respuesta.data.slice(1));
    // if (usuariosFiltradosEliminados.length !== 0)
    //   setUsuariosEliminados(usuariosFiltradosEliminados);
    // setDatosUsuario(usuariosFiltrados);
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      <div className={estilos.contendorUsuarios}>
        <div className={estilos.contenedorInfUsuarios}>

<div className={estilos.contenedorInfCategorias}>
        <CrudCategorias
            usuarioCookie={usuarioCookie}
            infUsers={datosCategorias}
            setInformacionUsuario={setUserInf}
            setInformacionUsuarios={setDatosCategorias}
            obtenerDatos={obtenerDatosUsuarios}
            setEstado={setestadoVentanaCategoria}      
            moodle={moodle}
            />
            </div>

            <CrudUsuario
              usuarioCookie={usuarioCookie}
              infUsers={datosUsuarios}
              setInformacionUsuario={setUserInf}
              setInformacionUsuarios={setDatosUsuario}
              obtenerDatos={obtenerDatosUsuarios}
              setEstado={setestadoVentana}
              datosCategorias ={datosCategoriasCursos}      
              moodle={moodle}
            />

            
          
        </div>
        <Ventana estado={estadoVentana}>
          <FormularioActualizacion
            usuarioCookie={usuarioCookie}
            obtenerDatos={obtenerDatosUsuarios}
            estado={setestadoVentana}
            informacionUsuario={userInf}
            setInformacionUsuario={setDatosUsuario}
            categorias={datosCategoriasCursos}
            moodle={moodle}
          />
        </Ventana>


        <Ventana estado={estadoVentanaCategoria}>
          <FormularioActualizacionCategoria
            usuarioCookie={usuarioCookie}
            obtenerDatos={obtenerDatosUsuarios}
            estado={setestadoVentanaCategoria}
            informacionUsuario={userInf}
            setInformacionUsuario={setDatosUsuario}
            categorias={datosCategoriasCursos}
            moodle={moodle}
          />
        </Ventana>
      </div>
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </Layout>
  );
}
export const getServerSideProps = async (context: any) => {
  try{

  const moodle={
    host : process.env.MOODLE_HOST,
    token : process.env.TOKEN_MOODLE,
  }

    return {
      props: {      
        moodle:moodle
      },
    };
  
} catch (error) {
  console.error('Error en getServerSideProps /seguimiento/id :');
    return {
      redirect: {
        destination: '/error?server=moodle',
        permanent: false,
      },
    };
    }
};

//http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=&criteria[0][value]=
//http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]=santyago0325@outlook.com
