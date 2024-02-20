import axios from "axios";
import estilos from "../styles/pestañas/SeguimientoMoodle.module.css";
import InformacionUsuarios from "../componentes/layout/secciones/Moodle/InformacionUsuariosMoodleAdmin";
import Layout from "@/componentes/layout/Layout";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";

export default function Seguimientoacademico({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  useEffect(() => {
    obtenerUsuariosInformacion();
  }, []);

  const [usuariosInformacion, setUsuariosInformacion] = useState<any>();

  const obtenerUsuariosInformacion = async () => {
    try {
      const respuesta = await fetch(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=&criteria[0][value]=`
      );

      const datos = await respuesta.json();
  
      if (datos.errorcode) {
        setUsuariosInformacion([]);
      } else {
        setUsuariosInformacion(datos.users);
      }  
    } catch (error) {
      console.log(error)
      //window.location.href = '/error?server=moodle';
    }
    
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      <div className={estilos.contenedorPrincipalSeguimiento}>
        <div className={estilos.contenedorPagina}>
          <h2>Usuarios registrados en moodle</h2>
          <p>
            Acceda a información detallada de cada usuario registrado en moodle,
            seleccionando sus perfiles a continuación:
          </p>
          {usuariosInformacion ?
          <div className={estilos.contenedorUsuarios}>
            <InformacionUsuarios usersInf={usuariosInformacion} />
          </div>
          :
<div className={estilos.contenedorCargando}>
          <SyncLoader color={"#558"} loading={true} size={30} />
          </div>
          }
        </div>
      </div>
    </Layout>
  );
}

{
  /* <div className={estilos.contenedorCursos}>
          <CursosUsuarioMoodle cursos={cursosUser} />
          <InformacionModulosMoodle />
        </div>
        <div className={estilos.contendorGraficas}>
          <div className={estilos.graficoPastel}>
            <Pie data={data} options={options} className={estilos.pastel} />
          </div>
        </div> */
}

//<Bar data={data} options={options}/>
export const getServerSideProps = async (context: any) => {
  //const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieSession`, { UserCookie: UserCookie });

  try {
    const moodle = {
      host: process.env.MOODLE_HOST,
      token: process.env.TOKEN_MOODLE,
    };

    return {
      props: {
        moodle: moodle,
      },
    };
  } catch (error) {
    console.error("Error en getServerSideProps /seguimiento:");
    return {
      redirect: {
        destination: "/error?server=moodle",
        permanent: false,
      },
    };
  }
};
