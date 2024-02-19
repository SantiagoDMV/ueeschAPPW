import { useState,useEffect } from "react";
import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/Moodle/CrearCurso.module.css";
import axios from 'axios'
import { Toaster, toast } from "sonner";

export default function CrearPublicacion({
  usuarioCookie,
  setUsuarioCookie,
  moodle,
  usuariosInformacion
}: any) {


  useEffect(() => {
    obtenerDatosCursos();
  }, []);

  const [datosCursos, setDatosCursos] = useState<any>();
  
    useState<any>(false);

  const obtenerDatosCursos = async () => {
    
    const respuesta = await axios.get(
      `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
    );
    setDatosCursos(respuesta.data.slice(1));
    // if (usuariosFiltradosEliminados.length !== 0)
    //   setUsuariosEliminados(usuariosFiltradosEliminados);
    // setDatosUsuario(usuariosFiltrados);
  };


    
  const [curso, setCurso] = useState({
    usuario: "",
    curso: "",
    rol: "",
  });

  // Manejador para cambiar los valores del curso
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  // Manejador para enviar los datos del curso
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let loadingToastId: any = null;
    e.preventDefault();
    
    const boton = document.getElementById('botonCrearCurso') as HTMLButtonElement;
    try {
      boton.disabled=true;

if(!curso.curso || !curso.rol || !curso.usuario){
  loadingToastId = toast.info(
    "Llene todos los campos para continuar",
    {
      style: {
        border: "none",
        backgroundColor: "rgb(255, 165, 0)"
      },
    }
  );  
  return
}
toast.dismiss(loadingToastId);
      loadingToastId = toast.info(
        "Agregando usuario al curso, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      
      axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=enrol_manual_unenrol_users&moodlewsrestformat=json&enrolments[0][userid]=${curso.usuario}&enrolments[0][courseid]=${curso.curso}&enrolments[0][roleid]=1`);      
axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=enrol_manual_enrol_users&moodlewsrestformat=json&enrolments[0][userid]=${curso.usuario}&enrolments[0][courseid]=${curso.curso}&enrolments[0][roleid]=${curso.rol}`);

    toast.dismiss(loadingToastId);

    toast.success("El usuario fue agregado al curso exitosamente", {
      style: {
        backgroundColor: "rgb(90,203,154)",
        border: "none",
      },
    });

    setCurso({
      usuario: "",
      curso: "",
      rol: "",
      })
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error("Ha ocurrido un error al agregar el usuario al curso.", {
      style: {
        backgroundColor: "rgb(203,90,90)",
        border: "none",
      },
    });
  }finally{
    boton.disabled = false;
  }
};


  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      <div className={estilos.contenedorCrearCurso}>
        <h2>Agregar un usuario a un curso</h2>
        <form className={estilos.formularioCrearCurso} onSubmit={handleSubmit}>
        <div className={estilos.formGroup}>
            <label htmlFor="usuario">Usuario</label>
            <select
              id="usuario"
              name="usuario"
              value={curso.usuario}
              onChange={(e:any)=>handleChange(e)}
            >
              <option value="">Seleccionar usuario</option>
              {
              usuariosInformacion && usuariosInformacion.map((c:any, index:number)=>(
                <option key={index} value={`${c.id}`}>{c.fullname}</option>
              ))
            }
            </select>
          </div>

          <div className={estilos.formGroup}>
            <label htmlFor="curso">Curso</label>
            <select
              id="curso"
              name="curso"
              value={curso.curso}
              onChange={(e:any)=>handleChange(e)}
            >
              <option value="">Seleccionar usuario</option>
              {
              datosCursos && datosCursos.map((c:any, index:number)=>(
                <option key={index} value={`${c.id}`}>{c.fullname}</option>
              ))
            }
            </select>
          </div>




          <div className={estilos.formGroup}>
            <label htmlFor="rol">Rol</label>
            <select
              id="rol"
              name="rol"
              value={curso.rol}
              onChange={(e:any)=>handleChange(e)}
            >
              <option value="">Seleccionar rol</option>
              <option value="3">Docente</option>
              {/* <option value="3">Docente sin edición</option> */}
              <option value="5">Estudiante</option>
            </select>
          </div>


          <button id="botonCrearCurso" type="submit">Agregar usuario</button>
        </form>
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
  //const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieSession`, { UserCookie: UserCookie });
try {
    
  const moodle={
    host : process.env.MOODLE_HOST,
    token : process.env.TOKEN_MOODLE,
  }  
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
        moodle: moodle
      },
    };
  }
} catch (error) {
  console.error('Error en getServerSideProps /agregar-usuario-curso:');
    return {
      redirect: {
        destination: '/error?server=moodle',
        permanent: false,
      },
    };
    }
}
