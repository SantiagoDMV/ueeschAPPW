import estilos from "../../../estilos/ServiciosMoodle/UsuarioCursos.module.css"
import InformacionModulosMoodle from "./InformacionModulosMoodle";
import axios from "axios";
export default function CursosUsuarioMoodle({mostrarTareas,cursos}:any) {

  return (
    <>
    {cursos.length > 0 ?
    <div className={estilos.contenedorCursos}>

    <h4>Cursos en los que estas matriculados</h4>
    {
        cursos.map((e:any,index:number) =>(
            <div key={e.id} className={estilos.seccionCursoTareas}>
                <div className={estilos.contenedorCurso} onClick={()=> mostrarTareas(e.id)}>
                <p>{e.fullname}</p>
                {
                    (e.progress!=null)?
                    (
                    <p className={estilos.progreso}>
                        Progreso: {e.progress}%</p>
                    ): 
                    (
                        <p className={estilos.sinProgreso}>
                          
                        {
                        //No hay actividades en el curso
                      }
                        </p>
                    )
                }
                
                </div>
            </div>
        ))
    }
    </div>
    :
    <div className={estilos.contenedorCursos}>
    El usuario no esta matriculado en ningún curso
    </div>
    }
    </>
  )
}
