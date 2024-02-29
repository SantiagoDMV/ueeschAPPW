import { useState,useEffect } from "react";
import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/Moodle/CrearCurso.module.css";
import axios from 'axios'
import { SyncLoader } from "react-spinners";

import { Toaster, toast } from "sonner";

export default function AgregarUsuarioCurso({
  usuarioCookie,
  setUsuarioCookie,
  moodle,
}: any) {


  useEffect(() => {
    obtenerDatosCursos();
  }, [usuarioCookie]);


  useEffect(() => {
    obtenerUsuariosInformacion();
  }, []);

  const [usuariosInformacion, setUsuariosInformacion] = useState<any>();

  const obtenerUsuariosInformacion = async () => {
    let loadingToastId:any = null;
    try {
        
        loadingToastId = toast.info(
            "Obteniendo cursos de moodle, esto puede llevar un momento...",
            {
                style: {
                    border: "none",
                },
            }
        );

      const respuesta = await fetch(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=&criteria[0][value]=`
      );
      
      if(respuesta.type && respuesta.type === 'cors'){
      toast.dismiss(loadingToastId);
      toast.error('Moodle bloqueo el acceso a la aplicación', {
        style: {
            backgroundColor: "rgb(203,90,90)",
            border: "none",
        },
    });
  }

      const datos = await respuesta.json();
  
      if (datos.errorcode) {
        setUsuariosInformacion([]);
      } else {
        setUsuariosInformacion(datos.users);
      }  
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error('Ocurrio un erro al intentar obtener los datos de moodle', {
        style: {
            backgroundColor: "rgb(203,90,90)",
            border: "none",
        },
    });
      console.log(error)
      //window.location.href = '/error?server=moodle';
    }
    
  };




  const [datosCursos, setDatosCursos] = useState<any>();
  const [informacionCursoUsuario,setInformacionCursoUsuario] = useState<any>()
  const [cursoSeleccionado,setCursoSeleccionado]= useState<any>();
  
    useState<any>(false);

    
  const obtenerDatosCursos = async () => {
    try{
      if(!usuarioCookie) return
      if(usuarioCookie.rol === 1 || usuarioCookie.rol===2){
        const respuesta = await axios.get(
          `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
          );
  
        setDatosCursos(respuesta.data.slice(1));
        return
      }
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/moodle/usuario_cursos`,
        { idUsuario: usuarioCookie.id_moodle}
      );
      
      setDatosCursos(respuesta.data);
    }catch(error){

    }
    
    
  };


  const obtenerInformacionCurso = async (id:any) => {
    try {
      if(id === ''){
        setInformacionCursoUsuario(null)
        return
      }

      if(cursoSeleccionado === id){
      setInformacionCursoUsuario(null)
      setCursoSeleccionado(null)
      return
      }

      setInformacionCursoUsuario(null)
      //const user = ObtenerInformacionCookie(req)
      const respuesta = await axios.post(
        `/api/moodle/core_enrol_get_enrolled_users`,{cursoId: id, id_moodle: usuarioCookie.id_moodle,
            headers: {
              'Content-Type': 'application/json', // Tipo de contenido que estás enviando
              'Access-Control-Allow-Origin': '*', // O la URL específica de origen permitida
              // Agrega otras cabeceras según sea necesario
            },
          
        }
      );
      
      if(!respuesta.data.informacionUsuario){ setInformacionCursoUsuario('vacio') 
      return}
      setInformacionCursoUsuario(respuesta.data.informacionUsuario)
    } catch (error) {
      console.log("Error al intentar obtener la informacion del usuario: ", error);
    }
  };
  

    
  const [curso, setCurso] = useState({
    usuario: "",
    curso: "",
    rol: "",
  });

  // Manejador para cambiar los valores del curso
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(name === 'curso'){setCursoSeleccionado(value);
      obtenerInformacionCurso(value);
    }
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

      axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=enrol_manual_enrol_users&moodlewsrestformat=json&enrolments[0][userid]=${curso.usuario}&enrolments[0][courseid]=${curso.curso}&enrolments[0][roleid]=${curso.rol}`
      ,{
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido que estás enviando
          'Access-Control-Allow-Origin': '*', // O la URL específica de origen permitida
          // Agrega otras cabeceras según sea necesario
        },
      });

    toast.dismiss(loadingToastId);

    toast.success("El usuario fue agregado al curso exitosamente", {
      style: {
        backgroundColor: "rgb(90,203,154)",
        border: "none",
      },
      closeButton: true,
      duration: 8000
    });

    setCurso({
      usuario: "",
      curso: "",
      rol: "",
      })
      setCursoSeleccionado(null);
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

const quitarUsuario  = () => {
  let loadingToastId: any = null;
  
  const boton = document.getElementById('botonQuitarUsuario') as HTMLButtonElement;
  try {
    boton.disabled=true;

if(!curso.curso || !curso.usuario){
loadingToastId = toast.info(
  "Elija un usuario y un curso",
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
      "Quitando usuario del curso, esto puede llevar un momento...",
      {
        style: {
          border: "none",
        },
      }
    );

    axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=enrol_manual_unenrol_users&moodlewsrestformat=json&enrolments[0][userid]=${curso.usuario}&enrolments[0][courseid]=${curso.curso}&enrolments[0][roleid]=1`,
    
    {
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido que estás enviando
        'Access-Control-Allow-Origin': '*', // O la URL específica de origen permitida
        // Agrega otras cabeceras según sea necesario
      },
    });


  toast.dismiss(loadingToastId);

  toast.success("El usuario fue quitado del curso exitosamente", {
    style: {
      backgroundColor: "rgb(90,203,154)",
      border: "none",
    },
    closeButton: true,
    duration: 8000
  });

  setCurso({
    usuario: "",
    curso: "",
    rol: "",
    })
    setCursoSeleccionado(null);
} catch (error) {
  toast.dismiss(loadingToastId);
  toast.error("Ha ocurrido un error al tratar de quitar el usuario del curso.", {
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
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contenedorCrearCurso}>
        <h2>Agregar un usuario a un curso</h2>
        <form className={estilos.formularioCrearCurso} onSubmit={handleSubmit}>


<div className={estilos.formGroup}>
            <label htmlFor="curso">Cursos</label>
            <select
              id="curso"
              name="curso"
              value={curso.curso}
              onChange={(e:any)=>handleChange(e)}
            >
              <option value="">...</option>
              {
              datosCursos && datosCursos.map((c:any, index:number)=>(
                <option key={index} value={`${c.id}`}>{c.fullname}</option>
              ))
            }
            </select>
          </div>


{
  usuarioCookie && (usuarioCookie.rol===3) ?
  cursoSeleccionado ?
    informacionCursoUsuario ? 
    (informacionCursoUsuario !== 'vacio' && (informacionCursoUsuario.roles[0].roleid === 3||informacionCursoUsuario.roles[0].roleid === 4)) ?
    <>
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
          <option key={index} value={`${c.id}`}>{c.fullname} - {c.email} - {c.username}</option>
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
    <input type="button" id="botonQuitarUsuario" onClick={()=>quitarUsuario()} className={estilos.botonQuitar} value={'Quitar usuario'}/>
    </>
    :
    <h4>No tienes los permisos necesarios para agregar un usuario a este curso</h4>
    :
    <SyncLoader color={"#558"} loading={true} size={30} />
:
<h4>Selecciona un curso</h4>
: usuarioCookie && (usuarioCookie.rol === 1 || usuarioCookie.rol ===2) &&
cursoSeleccionado ?
  
  <>
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
        <option key={index} value={`${c.id}`}>{c.fullname} - {c.email} - {c.username}</option>
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
  <input type="button" id="botonQuitarUsuario" onClick={()=>quitarUsuario()} className={estilos.botonQuitar} value={'Quitar usuario'}/>
  </>
  
:
<h4>Selecciona un curso</h4>

}



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
