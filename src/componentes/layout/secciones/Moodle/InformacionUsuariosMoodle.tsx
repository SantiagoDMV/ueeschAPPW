import axios from "axios";
import estilos from "../../../estilos/ServiciosMoodle/UsuariosMoodle.module.css";
import Link from "next/link";

export default function InformacionUserMoodle({usersInf, cursoId}:any) {
  const estudiantes = usersInf.filter((usuario:any) => {
    const roles = usuario.roles;
    return roles.some((role:any) => role.roleid === 5);
  });
    
  
  // //TODAS NOTAS DE TODOS LOS ESTUDIANTES POR CURSO
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=2

  //TODAS LAS NOTAS DE UN ESTUDIANTE ESPECIFICO POR CURSO
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=2&userid=16

  //UNA NOTAS DE CADA ESTUDIANTES POR TAREA
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=mod_assign_get_grades&moodlewsrestformat=json&assignmentids[0]=2

  //OBTENER NOMBRES DE LAS TAREAS
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=2


  return (
    <div className={estilos.contenedorUsuarios}>
      <ul>
        {estudiantes ? (
          estudiantes.map((e: any, index: number) => (
              <Link key={index} href={`/supervision?curso=${cursoId}&estudiante=${e.id}`} target="_BLANK">
                <li id={`${e.id}`}>
                {e.fullname}
                </li>    
                </Link>
          ))
        ) : (
          <p className={estilos.contenedorCargando}>Cargando usuarios ...</p>
        )}
      </ul>
    </div>
  );
}
