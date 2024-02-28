import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/componentes/layout/Layout";
import Link from "next/link";

/////
import estilos from "../styles/pestañas/Estudiantes.module.css";
import { Doughnut } from "react-chartjs-2";
import * as ChartJS from "chart.js/auto";
import { ChartOptions } from "chart.js";
import InformacionModulosMoodle from "../componentes/layout/secciones/Moodle/InformacionTareasEstudiantesMoodle";
import {PacmanLoader} from "react-spinners";
import { AiOutlineMeh } from "react-icons/ai";
//////

export default function Supervision({
  curso_id_number,
  id_estudiante_number,
  moodle,
  usuarioCookie,
  setUsuarioCookie
}: any) {
  ChartJS.defaults.plugins.legend.display = false;
  ChartJS.defaults.plugins.tooltip.mode = "index";
  ChartJS.defaults.plugins.tooltip.intersect = false;

  useEffect(() => {
    obtenerInformacionCurso();
  }, []);

  const [tareas, setTareas] = useState<any>();
  const obtenerTareasMoodle = async () => {
    if(tareas) return
    try {
      const respuesta = await axios.get(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=${curso_id_number}&userid=${id_estudiante_number}`
      );
      setTareas(respuesta.data.tables[0].tabledata);
      return respuesta.data.tables[0].tabledata;
    } catch (error) {
      console.log("Error al intentar conseguir las notas del curso: ", error);
    }
  };

  const [estudianteEncontrado, setEstudianteEncontrado] = useState<any>();
  const [estadoMensaje, setEstadoMensaje] = useState<boolean>(true);
  const [informacionCurso, setInformacionCurso] = useState<any>();
  const [informacioEstudiante, setInformacionEstudiante] = useState<any>();
  
  const obtenerInformacionCurso = async () => {
    try {
      
      const respuesta = await axios.post(
        `/api/moodle/profesores/core_enrol_get_enrolled_users`,
        { cursoId: curso_id_number, id_moodle_estudiante: id_estudiante_number }
      );

      setEstadoMensaje(false)

      if(!respuesta.data.valor){
        setEstudianteEncontrado(respuesta.data.valor);
      }else{
        obtenerTareasMoodle()
        setEstudianteEncontrado(respuesta.data.valor);
        setInformacionEstudiante(respuesta.data.informacionEstudiante);
        setInformacionCurso(respuesta.data.informacionCurso);
      }

    } catch (error) {
      setEstadoMensaje(false)
      setEstudianteEncontrado(false);
    }
  };

  const transformarHoraFecha = (timestamp: any) => {
    const fechaHora = new Date(timestamp * 1000); // Multiplica por 1000 para convertir segundos a milisegundos
    return fechaHora.toLocaleString();
  };

  ///////////////////////////datos

  const progresoCursoData = {
    labels: ["Completado", "Restante"],
    datasets: [
      {
        data: [
          informacionCurso?.progress || 0,
          100 - (informacionCurso?.progress || 0)
        ],
        backgroundColor: ["rgba(30, 144, 255, 0.6)", "rgba(70, 130, 180, 0.6)"],
        borderWidth: 0,
        hoverBackgroundColor: [
          "rgba(30, 144, 255, 0.8)",
          "rgba(70, 130, 180, 0.8)"
        ]
      }
    ]
  };

  const opcionesGrafico: ChartOptions<"doughnut"> = {
    cutout: "80%",
    plugins: {
      title: {
        display: true,
        text: "Progreso del curso", // Añade el título aquí
        position: "top"
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 10
        }
      },
      tooltip: {
        enabled: true
      }
    }
  };

  ////////////////////////////////////

  const categorias = tareas?.map((item: any) =>
  item.itemname?.content?.replace(/<[^>]*>/g, "") || ""
);


const datosGrafico = {
    labels: categorias,
    datasets: [
      {
        label: informacionCurso ? `${informacionCurso.fullname}`: '',
        backgroundColor: 'rgba(31, 123, 125, 0.6)',
        data: tareas?.map((item: any) => parseFloat(item.grade?.content) || 0) || []
      },
    ],
  };
  const opcionesGraficoDos: {
    scales: {
      x: {
        stacked: boolean;
      };
      y: {
        stacked: boolean;
      };
    };
  } = {
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  };

  // Ahora puedes utilizar datosGrafico y opcionesGrafico en tu componente de gráfico

  ////////////////////////////////////

  return (
    <Layout
      usuario={usuarioCookie}
      setUsuarioCookie={setUsuarioCookie}
      moodle={moodle}
      >

{
  estadoMensaje ? 
  <div className={estilos.mostrarCargando}>
    <h3>Obteniedo datos</h3>
    <div className={estilos.mostrarCargandoPacman}>
    <PacmanLoader

color={"#558"} loading={true} size={70}/>
  </div>
  </div>
            :
  !estudianteEncontrado
          ? (
            <div className={estilos.mostrarContenedorUsuarioNoEncontrado}>
              <AiOutlineMeh className={estilos.iconoMostrarContenedorUsuarioNoEncontrado}/>
              <h3>¡Oh no! Algo salió mal</h3>
              <p>Parece que no tienes permisos para acceder a la información que estás buscando o la página que estás buscando no existe.</p>
  <p>También es posible que el servidor de Moodle no esté activo en este momento. Por favor, inténtalo nuevamente más tarde.</p>
  <p>Si crees que esto es un error o necesitas asistencia, contacta al administrador del sitio.</p>
            </div>
          )
          : estudianteEncontrado && (
            <div className={estilos.contenedorPrincipalEstudiantes}>
                <div className={estilos.contenedorContenidoCurso}>
                  {informacionCurso && (
                    <div className={estilos.contendorInformacionHeaderCurso}>
                      <div>
                        <h3>Curso: {informacionCurso.fullname}</h3>
                        <span>Categoria: {informacionCurso.category}</span>
                      </div>
                      <div>
                        <h4>Información del estudiante</h4>
                        <span>
                          Estudiante: {informacioEstudiante.fullname}
                        </span>
                        <span>
                          Email:{" "}
                          <Link
                            href={`mailto:${informacioEstudiante.email}`}
                            className={estilos.emailInformacionEstudiante}
                          >
                            {informacioEstudiante.email}
                          </Link>
                        </span>
                        <span>
                          Último acceso:{" "}
                          {transformarHoraFecha(
                            informacioEstudiante.lastaccess
                          )}
                        </span>
                        <Link className={estilos.reporteNotasSpan} href={`/reportes/notas?id=${id_estudiante_number}&curso=${curso_id_number}`}>Reporte de notas</Link>
                      </div>
                    </div>
                  )}

                  <div className={estilos.contenedorInformacionPrincipalCursos}>
                    <div className={estilos.contendorInformacionCursos}>
                      <h4>Módulos del curso</h4>
                      <div className={estilos.tareasCursos}>
                        <InformacionModulosMoodle
                          cursoId={curso_id_number}
                          userId={id_estudiante_number}
                          moodle={moodle}
                          obtenerTareasMoodle={obtenerTareasMoodle}
                          tareas={tareas}
                          setTareas={setTareas}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={estilos.contendorDatos}>
                  <div className={estilos.datos}>
                    <Doughnut
                      data={progresoCursoData}
                      options={opcionesGrafico}
                    />
                    
                  </div>


                  <div className={estilos.datos}>
    <Doughnut data={datosGrafico} options={opcionesGraficoDos} />
  </div>

                </div>
              </div>
            )
}

    </Layout>
  );
}


export const getServerSideProps = async (context: any) => {

  try{
  const cursoId = context.query.curso;
  const id_estudiante = context.query.estudiante;

  const curso_id_number = parseInt(cursoId);
  const id_estudiante_number = parseInt(id_estudiante);


  return {
    props: {
      curso_id_number: curso_id_number,
      id_estudiante_number: id_estudiante_number,
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
