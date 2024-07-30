import axios from "axios";
import estilos from "../../styles/pestañas/SeguimientoMoodleId.module.css";
import { Bar,Scatter} from "react-chartjs-2";
import * as ChartJS from 'chart.js/auto';
import {ChartOptions} from 'chart.js';
import CursosUsuarioMoodle from "../../componentes/layout/secciones/Moodle/CursosUsuarioMoodle";
import InformacionModulosMoodle from "../../componentes/layout/secciones/Moodle/InformacionModulosMoodle";
import { useState } from "react";
import 'chartjs-adapter-moment';
import InformacionUsuarios from "../../componentes/layout/secciones/Moodle/InformacionUsuariosMoodle";
import Link from "next/link";

import Layout from "@/componentes/layout/Layout";

export default function Seguimientoacademico({ cursosUser,userId,usuarioCookie,setUsuarioCookie, moodle}: any) {

  
  ChartJS.defaults.plugins.legend.display = false;
  ChartJS.defaults.plugins.tooltip.mode = 'index';
  ChartJS.defaults.plugins.tooltip.intersect = false;

    const [cursoSeleccionado,setCursoSeleccionado] = useState<any>()
    const [tareas, setTareas] = useState<any>()   
    const [informacionCursoUsuario,setInformacionCursoUsuario] = useState<any>()
    const [usuariosInformacion,setUsuariosInformacion] = useState<any>()
    

    const obtenerTareasMoodle = async () => {
      try {
        const respuesta = await axios.get(
          `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=${cursoSeleccionado}&userid=${userId}`
        );
        setTareas(respuesta.data.tables[0].tabledata)
        return respuesta.data.tables[0].tabledata;
      } catch (error) {
        console.log("Error al intentar conseguir las notas del curso: ", error);
      }
    };

    const obtenerInformacionCurso = async (id:any) => {
      try {
        if(cursoSeleccionado === id){
        setInformacionCursoUsuario(null)
        setCursoSeleccionado(null)
        return
        }

        setInformacionCursoUsuario(null)
        //const user = ObtenerInformacionCookie(req)
        const respuesta = await axios.post(
          `/api/moodle/core_enrol_get_enrolled_users`,{cursoId: id, id_moodle: userId}
        );
        
        
        setUsuariosInformacion(respuesta.data.cursosUSer)
        setInformacionCursoUsuario(respuesta.data.informacionUsuario)
      } catch (error) {
        console.log("Error al intentar obtener la informacion del usuario: ", error);
      }
    };
    
  const progresosNulos = cursosUser.every((curso: any) => curso.progress === null);

  const data = {
    labels: cursoSeleccionado && cursoSeleccionado.fullname,
    datasets: [
      {
        label: "Progreso de los cursos",
        data: cursoSeleccionado && cursoSeleccionado.progress !== null ? cursoSeleccionado.progress : 0,
        backgroundColor: "#3498db",
        borderColor: "#2980b9",
        borderWidth: 1,
      },
    ],
  };
  
  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
      },
    },
  };
  
  const cursosCompletados = cursosUser.filter((curso: any) => curso.completed);

  // const dataCursosCompletados = {
  //   labels: ["Completados", "No completados"],
  //   datasets: [
  //     {
  //       data: [cursosCompletados.length, cursosUser.length - cursosCompletados.length],
  //       backgroundColor: ["#2ecc71", "#e74c3c"],
  //     },
  //   ],
  // };
  
  const optionsCursosCompletados = {};  
  
  // const obtenerDatosGrafico = () => {
  //   if (tareas) {
      
  
  //     const data = {
  //       datasets: [
  //         {
  //           label: "Calificaciones de Tareas",
  //           data: tareas.map((tarea: any) => {
  //             if (tarea.itemname && tarea.itemname.content) {
  //               const match = tarea.itemname.content.match(/<a[^>]*title="(.*?)"[^>]*>/);
  //               const titulo = match ? match[1] : '';
  //               const nombreTarea = titulo.replace(/^(Vincular a la actividad|Link to Assignment activity)/i, '').trim();
  
  //               return {
  //                 x: nombreTarea, // Utilizamos el nombre de la tarea en el eje x
  //                 y: tarea.grade && tarea.grade.content ? parseFloat(tarea.grade.content) : 0,
  //               };
  //             } else {
  //               return null;
  //             }
  //           }).filter(Boolean),
  //           backgroundColor: "rgba(75,192,192,0.2)",
  //           borderColor: "rgba(75,192,192,1)",
  //           borderWidth: 1,
  //         },
  //       ],
  //     };
  
  //     return data;
  //   } else {
  //     return {
  //       datasets: [
  //         {
  //           label: "Calificaciones de Tareas",
  //           data: [],
  //           backgroundColor: "rgba(75,192,192,0.2)",
  //           borderColor: "rgba(75,192,192,1)",
  //           borderWidth: 1,
  //         },
  //       ],
  //     };
  //   }
  // };
  
  // const optionsCalificaciones = {
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       max: 100,
  //     },
  //   },
  // };


  const mostrarTareas = (id:any) =>{      
      setCursoSeleccionado(id);
      obtenerInformacionCurso(id)
}


const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  const form = document.getElementById('moodleDownloadForm') as HTMLFormElement;
  if (form) {
    form.submit();
  }
};


  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contenedorPagina}>
        <div className={estilos.contenedorInformacionCuros}>
      <div className={estilos.contenedorCursos}>
          <CursosUsuarioMoodle cursos={cursosUser} userId = {userId} moodle={moodle} setCursoSeleccionado={setCursoSeleccionado} obtenerTareasMoodle={obtenerTareasMoodle} setTareas={setTareas} tareas={tareas} obtenerInformacionCurso={obtenerInformacionCurso} mostrarTareas={mostrarTareas}/>
        </div>
        <div className={estilos.contendorInformacionCursos}>
        {informacionCursoUsuario &&
        <>
          {
          informacionCursoUsuario && informacionCursoUsuario.roles[0].roleid === 5?
          <>
          <h4>{cursoSeleccionado && cursosUser.map((e:any)=>{
             if(e.id === cursoSeleccionado){
              return e.fullname
             }
          }) }</h4>
          <h4>Rol Actual en el curso: Estudiante</h4>
          {/* <Link href={`/reportes/notas?id=${userId}&curso=${cursoSeleccionado}`} 
          className={estilos.reporteNotasSpan}>Reporte de notas</Link> */}
          <div className={estilos.tareasCursos}>
                <InformacionModulosMoodle cursoId = {cursoSeleccionado} userId = {userId} moodle ={ moodle} obtenerTareasMoodle={obtenerTareasMoodle} tareas={tareas} setTareas={setTareas}/>
          </div>
          </>
          : informacionCursoUsuario && (informacionCursoUsuario.roles[0].roleid === 3||informacionCursoUsuario.roles[0].roleid === 4) ?
          <>

<h4>{cursoSeleccionado && cursosUser.map((e:any)=>{
             if(e.id === cursoSeleccionado){
              return e.fullname
             }
          }) }</h4>
          <h4>Rol Actual en el curso: Profesor</h4>        
          {/* <h4>Informes</h4> */}
          <InformacionUsuarios usersInf = {usuariosInformacion} cursoId = {cursoSeleccionado}/>
           </> 
          : informacionCursoUsuario && (informacionCursoUsuario.roles[0].roleid === 2) &&
          <>
          <h4>Rol Actual en el curso: Gestor</h4>          
          <InformacionUsuarios usersInf = {usuariosInformacion}/>
          </>
          }
          
          </>
        }
        </div>

        {
          informacionCursoUsuario && informacionCursoUsuario.roles[0].roleid === 5 &&          
        <div className={estilos.contendorGraficas}>
        <h4>Progreso Académico Actual</h4>

          <div className={estilos.contenedorHistorialCalificaciones}>
            <h4>Historial de calificaciones</h4>
            <form
              method="get"
              action="https://eduinclusivaec.com/grade/report/history/index.php"
              className="dataformatselector m-1"
              id="moodleDownloadForm"
            >
              <div className="form-inline text-xs-right">
                <input type="hidden" name="sesskey" value="ONtV69bMjm" />
                <input type="hidden" name="id" value={`${cursoSeleccionado}`}  />
                <input type="hidden" name="showreport"  value="1"/>
                <input type="hidden" name="itemid" value="0" />
                <input type="hidden" name="grader" value="0" />
                <input type="hidden" name="datefrom" value="0" />
                <input type="hidden" name="datetill" value="0" />
                <input type="hidden" name="userids" value={`${userId}`} />

                <label htmlFor="downloadtype_download" className="mr-1">
                  Descargar datos de como
                </label>
                <select
                  name="download"
                  id="downloadtype_download"
                  className="form-control custom-select mr-1"
                >
                  <option value="csv">Valores separados por comas (.csv)</option>
                  <option value="excel">Microsoft Excel (.xlsx)</option>
                  <option value="html">Tabla HTML</option>
                  <option value="json">Javascript Object Notation (.json)</option>
                  <option value="ods">OpenDocument (.ods)</option>
                  <option value="pdf">Portable Document Format (.pdf)</option>
                </select>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleSubmit}
                >
                  Descargar
                </button>
              </div>
            </form>
          </div>

          {/* <div className={estilos.graficoPastel}>
            {
              progresosNulos?(
              <div className={estilos.pastel}>
                <Bar data={data} options={options} className={estilos.pastel} />
                 <p>No hay progreso en ninguno de los cursos.</p>
              </div>):(
               <Bar data={data} options={options} className={estilos.pastel} />
              )
            }
          </div> */}
          {/* <div className={estilos.graficoPastel}>
          <div className={estilos.pastel}>
            <Pie data={dataCursosCompletados} options={optionsCursosCompletados} />
            </div>
            </div> */}
        </div>
        }

      </div>
      {/* { tareas &&
<div className={estilos.contenedorInformacionTareas}>
<Scatter data={obtenerDatosGrafico()} options={optionsCalificaciones} className={estilos.barrasCalificaciones} />
      </div>
      } */}
      </div>
    </Layout>
  );
}
export const getServerSideProps = async (context: any) => {
  try{

  const {params} = context
  const id = params.id

  const respuesta = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/moodle/usuario_cursos`,
    { idUsuario: id}
  );
  if (respuesta.data.errorcode) {
    return {
      props: {
        cursosUser: [],
        userId: null,

      },
    };
  } else {
    return {
      props: {
        cursosUser: respuesta.data,
        userId: id,

      },
    };
  }
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
