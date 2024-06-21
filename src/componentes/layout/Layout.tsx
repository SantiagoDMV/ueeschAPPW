import Nav from "./Nav/Nav";
import Link from "next/link";
import style from "../estilos/Layout.module.css";
import ChatAyuda from "../chatAyuda/ChatAyuda";
import { useState } from "react";
import { useRouter } from "next/router";
import Ventana from "../ventanas/Ventana";
import {
  AiOutlineWhatsApp,
  AiOutlineFacebook,
  AiOutlineLeft,
  AiOutlineTwitter,
  AiOutlineRight,
} from "react-icons/ai";
import axios from "axios";

export default function Layout({ children, usuario, setUsuarioCookie, moodle }: any) {
  const router = useRouter();

  const [mostrarOpcionesCompartir, setMostrarOpcionesCompartir] =
    useState<boolean>(false);

  const [estadoVentana,setEstadoVentana] = useState(false);
  const [cursoSeleccionado,setCursoSeleccionado] = useState<any>()
  const [cursos, setCursos] = useState<any>();

  const obtenerInformacionCursos = async () => {
  
    if (usuario) {
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/moodle/usuario_cursos`,
        { idUsuario: usuario.id_moodle }
      );


      const respuestaTodosLosCursos = await axios.get(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
      );

      if(usuario.rol !== 1 && usuario.rol !== 2){
      const cursosInformacion = respuestaTodosLosCursos.data.filter(
        (curso: any) => {
          return respuesta.data.some((cursoCoincide: any) => {
            return cursoCoincide.id === curso.id;
          });
        }
      );
      setCursos(cursosInformacion);
      return
      }else{
      setCursos(respuestaTodosLosCursos.data);
      }
    }
  };


  const obtenerCalendario = async (id:any) => {
    if(!id){
      setCursoSeleccionado(null)
      return
    }
    
    try {
      
        //const respuesta = await axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_calendar_get_action_events_by_course&moodlewsrestformat=json&events[courseids][0]=${id}&options[timestart]=${fechaActualSec}&options[timeend]=${fechaUnMesDespuesSec}`);
        const respuesta = await axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_calendar_get_action_events_by_course&moodlewsrestformat=json&courseid=${id}`);
        
        if(respuesta.data.message && respuesta.data.message==='Detectado valor de respuesta no válido'){
          setCursoSeleccionado(null);
          return
        }
        //if(!respuesta.data.message && respuesta.data.message === 'Detectado valor de respuesta no válido')
        const eventosFiltrados = respuesta.data.events.filter((evento:any) => evento.visible === 1);
        
        setCursoSeleccionado(eventosFiltrados);
        
        //console.log(respuesta.data.events)
        
        //console.log(respuesta.data.events);
    } catch (error) {
        console.error('Error al obtener el calendario:', error);
    }
}

const convertirTimestampAFecha = (timestamp:any) => {
  const fecha = new Date(timestamp * 1000);
  return fecha.toLocaleString(); // Convertir a formato entendible
};



  return (
    <>
      <div className={style.layout}>
        <div className={style.nav}>
          <Nav usuario={usuario} setUsuarioCookie={setUsuarioCookie} />

          <div className={style.hijos}>

            {
            usuario  && mostrarOpcionesCompartir &&
            <div className={style.contenedorBotonesCompartir}>

              <div
                className={`${style.botonesCompartir} ${
                  mostrarOpcionesCompartir ? style.mostrar : ""
                }`}
              >                


                {/* BOTON PARA CERRAR LAS OPCIONES */}
                {mostrarOpcionesCompartir && (
                  <span>
                  <AiOutlineLeft
                    className={style.botonAbrirOpcionesDeCompartir}
                    onClick={() =>
                      setMostrarOpcionesCompartir(!mostrarOpcionesCompartir)
                    }
                  />
                  </span>
                )}

                {/* BOTONES PARA GESTIONAR DE LA PAGINA */}
                {
                usuario && (usuario.rol === 1 || usuario.rol === 2 )&&
                <>
                    <h3>LOCAL</h3>
                <Link href={'/gestionusuarios'} className={style.link}><span>Gestión de usuarios</span></Link>
                <Link href={'/publicaciones-servicios'} className={style.link}><span>Publicaciones y servicios</span></Link>
                </>
                }
                {
                  usuario && (usuario.rol === 1 || usuario.rol === 2 || usuario.rol === 3 )&&
                  <>
                  <Link target="BLANK" href={'/repositorio'} className={style.link}><span>Cloudinary</span></Link>
                  </>
                }

                {/* BOTONES DE ACCIONES RAPIDAS */}
                {
                usuario && (usuario.rol === 1 || usuario.rol === 2 )&&
                <>
                <h3>ACCIONES RAPIDAS</h3>
                <Link href={'/gestionusuarios/crearusuarios'} className={style.link}><span>Agregar usuario</span></Link>
                <Link href={'/publicaciones/crearpublicacion'} className={style.link}><span>Crear publicacion</span></Link>
                </>
              }

                {/* BOTONES DE FUNCIONALIDADES DE MOODLE */}
                <h3>MOODLE</h3>
                {usuario && usuario.rol ===1 
                ?
                <Link href={'/seguimiento'} className={style.link}><span>Mi moodle</span></Link>
                :
                (
                usuario && usuario.rol ===5?
                <Link href={`/seguimiento/${usuario.id_moodle}`} className={style.link}><span>Ver Moodle</span></Link>
                :
                <Link href={`/seguimiento/${usuario.id_moodle}`} className={style.link}><span>Mi moodle</span></Link>
                )
                }
                
                {
                usuario && (usuario.rol === 1 || usuario.rol === 2 )&&
                <>
                <Link href={'/cursos-moodle'} className={style.link}><span>Cursos y Categorías</span></Link>
                </>
                }
                {
                usuario && (usuario.rol === 1 || usuario.rol === 2 || usuario.rol === 3 )&&
                <>
                <Link href={'/moodle/agregar-usuario-curso'} className={style.link}><span>Agregar usuario a un curso</span></Link>
                <Link href={'/moodle/creartarea'} className={style.link}><span>Crear una tarea</span></Link>
                </>
                }
                <span className={style.link} onClick={()=>{setEstadoVentana(!estadoVentana);
                obtenerInformacionCursos()}}>Proximos Eventos/Tareas</span>


                {/* OPCIONES DE COMPARTIR EN REDES SOCIALES */}
                
                {/* <h3>REDES SOCIALES</h3>
                <div className={style.compartirRedesSociales}>
                  <button className={style.cotonCompartirFacebook} 
                  onClick={()=> window.location.href='https://www.facebook.com/UEESCH/'}>
                    <AiOutlineFacebook
                      className={style.iconoFacebook}
                      onClick={() =>
                        window.open(
                          `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )
                        }`,
                          "Compartir en Facebook",
                          "width=800,height=800"
                        )
                      }
                    />
                    <p>Facebook</p>
                  </button>

                  <button className={style.cotonCompartirX}>
                    <AiOutlineTwitter
                      className={style.iconoX}
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            window.location.href
                          )}`,
                          "Compartir en Twitter",
                          "width=800,height=800"
                        )
                      }
                    />
                    <p>Compartir en X</p>
                  </button>

                  <button className={style.cotonCompartirWhatsapp}>
                    <AiOutlineWhatsApp
                      className={style.iconoWhatsapp}
                      onClick={() =>
                        window.open(
                          `https://api.whatsapp.com/send?text=${encodeURIComponent(
                            window.location.href
                          )}`,
                          "Compartir en WhatsApp",
                          "width=800,height=800"
                        )
                      }
                    />
                    <p>Compartir en Whatsapp</p>
                  </button>
                </div> */}
              </div>
            </div>
            }

{/* BOTON PARA ABRIR LAS OPCIONES */}
{
            usuario && !mostrarOpcionesCompartir &&
              <div className={style.contenedorAbrirOpciones}>

                <AiOutlineRight
                  className={style.botonAbrirOpcionesDeCompartir}
                  onClick={() =>
                    setMostrarOpcionesCompartir(!mostrarOpcionesCompartir)
                  }
                />
              </div>
            
            }
            <div className={style.chatAyuda}>
              <ChatAyuda />
            </div>
            {/* VENTANA PARA VER EL CALENDARIO */}
          {
                  estadoVentana &&
                  <Ventana estado={true}>
                    <div className={style.fondoPrincipalCalendario}>
                      <p onClick={()=>{setEstadoVentana(!estadoVentana);
                      setCursoSeleccionado(null)}}
                      className={style.btnCerrar}
                      >x</p>
                      <h3>Próximos eventos y tareas en Moodle</h3>
                      <div className={style.formGroup}>
            <label htmlFor="course">Curso</label>
            <select
              id="course"
              name="course"
              onChange={(e: any) => {obtenerCalendario(e.target.value);
              }}
            >
              <option value="">Seleccionar Curso</option>
              {cursos &&
                cursos.map((c: any, index: number) => (
                  <option key={index} value={`${c.id}`}>
                    {c.fullname}
                  </option>
                ))}
            </select>
          </div>

          {
              cursoSeleccionado &&
              (
                cursoSeleccionado.length > 0 ?
              cursoSeleccionado.map((e:any,index:number)=>(
                <div key={index} className={style.contenedorTareaCalendario}>
                  {/* <p>{e.modulename}</p> */}
                  <Link href={e.url} target="_blank">
                  <p>{e.name} hasta {convertirTimestampAFecha(e.timestart)}</p>
                  </Link>
                  {/* <p>{e.description}</p> */}
                  {/* <p>{convertirTimestampAFecha(e.timestart)}</p> */}
                  {/* <p className={style.fechaCreacionTareaCalendario}>Creada el {convertirTimestampAFecha(e.timemodified)}</p> */}
                  <Link href={e.action.url} target="_blank" className={style.botonAnadir}>Añadir entrega</Link>
                </div>
              )):
              <div className={style.contenedorTareaCalendario}>
                <h4>No te preocupes, no hay tareas próximas en este curso por ahora.</h4>
                </div>
              )
            }

                    </div>
                  </Ventana>  
                }
{/* FIN DE LA VENTAN PARA VER EL CALENDARIO */}
            {children}
          </div>
        </div>
      </div>
      
    </>
  );
}
