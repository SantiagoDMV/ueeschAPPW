import axios from "axios";
import { ObtenerInformacionCookie } from "../../../../../servicios/cookies/manejoCookies";

function verificarRoles(datos, idMoodle, roleId) {
  return datos.some(
    (usuario) =>
      usuario.id === idMoodle &&
      usuario.roles.some((rol) => rol.roleid === roleId)
  );
}

function obtenerCursoPorId(cursos, idBuscado) {
    return cursos.find(curso => curso.id === idBuscado) || null;
  }

export default async function usuario_cursos(req, res) {
  try {
    const { cursoId, id_moodle_estudiante } = req.body;
    

    const cookieUser = ObtenerInformacionCookie(req);

    const cursosUSer = await axios.get(
      `${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_enrol_get_enrolled_users&moodlewsrestformat=json&courseid=${cursoId}`
    );
  
    
    const usuario_curso = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${id_moodle_estudiante}`)

    const informacionCurso = obtenerCursoPorId(usuario_curso.data,cursoId)

    const informacionEstudiante = obtenerCursoPorId(cursosUSer.data,id_moodle_estudiante)

    const profesorEncontrado = verificarRoles(cursosUSer.data, cookieUser.id_moodle, 3);
    const estudianteEncontrado = verificarRoles(cursosUSer.data, id_moodle_estudiante, 5);
  
    if(cookieUser.rol !== 1 && cookieUser.rol !== 2){
    if(profesorEncontrado && estudianteEncontrado)
    return res.status(200).json({
      valor:true,
      informacionCurso: informacionCurso,
      informacionEstudiante: informacionEstudiante
    });
  }else{
      return res.status(200).json({
        valor:true,
        informacionCurso: informacionCurso,
        informacionEstudiante: informacionEstudiante
      });
    }

    return res.status(200).json({
        valor:false
      });


  } catch (error) {
    //console.log("Error en api/moodle/profesores: ",error)
    return res.status(200).json({
      valor:false,
    });
  }
}


// let informacionUsuario
        // let estudiantes = null
        // if(id_moodle_number === cookieUser.id_moodle){   
        //     informacionUsuario = obtenerInformacionUsuarioPorId(cursosUSer.data, cookieUser.id_moodle);
        // }else{
        //     informacionUsuario = obtenerInformacionUsuarioPorId(cursosUSer.data, id_moodle_number);
            
        // }
        
        // return res.status(200).json({
        //     informacionUsuario:estudiantes? estudiantes : informacionUsuario,
        //     cursosUSer: cursosUSer.data})