import axios from "axios";
import estilos from "../styles/pestañas/SeguimientoMoodle.module.css";
import InformacionUsuarios from "../componentes/layout/secciones/Moodle/InformacionUsuariosMoodleAdmin";
import Layout from "@/componentes/layout/Layout";
export default function Seguimientoacademico({ usuariosInformacion,usuarioCookie,setUsuarioCookie }: any) {

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      <div className={estilos.contenedorPrincipalSeguimiento}>
        <div className={estilos.contenedorPagina}>
          <h2>Usuarios registrados en moodle</h2>
          <p>Acceda a información detallada de cada usuario registrado en moodle, seleccionando sus perfiles a continuación:</p>
          <div className={estilos.contenedorUsuarios}>
            <InformacionUsuarios usersInf = {usuariosInformacion}/>
          </div>
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
  const respuesta = await axios.get(
        `${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=&criteria[0][value]=`
      )
  if (respuesta.data.errorcode) {
    return {
      props: {
        usuariosInformacion: [],
      },
    };
  } else {
    return {
      props: {
        usuariosInformacion: respuesta.data.users,
      },
    };
  }
} catch (error) {
  console.error('Error en getServerSideProps /seguimiento:');
    return {
      redirect: {
        destination: '/error?server=moodle',
        permanent: false,
      },
    };
    }
}
