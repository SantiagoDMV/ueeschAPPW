import React from 'react';
import estilos from "../../../estilos/ServiciosMoodle/UsuarioCursos.module.css";

export default function CursosUsuarioMoodle({ mostrarTareas, cursos }: any) {

  const decimalesProgreso = (progreso:any) =>{
    return progreso.toFixed(2);
  }
  

  return (
    <>
      {cursos.length > 0 ?
        <div className={estilos.contenedorCursos}>
          <h4>Cursos en los que estás matriculado</h4>

          

          {cursos.map((e: any) => (
            <div key={e.id} className={estilos.seccionCursoTareas}>
              <div className={estilos.contenedorCurso} onClick={() => mostrarTareas(e.id)}>
                <p>{e.fullname}</p>
                {e.progress != null ?
                  (<p className={estilos.progreso}>
                    Progreso: {decimalesProgreso(e.progress)}%
                  </p>) :
                  (<p className={estilos.sinProgreso}>
                    {
                      // No hay actividades en el curso
                    }
                  </p>)
                }
              </div>
            </div>
          ))}
        </div>
        :
        <div className={estilos.contenedorCursos}>
          El usuario no está matriculado en ningún curso
        </div>
      }
    </>
  );
}
