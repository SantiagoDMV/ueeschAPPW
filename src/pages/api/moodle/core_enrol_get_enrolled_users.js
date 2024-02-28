//`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}
import axios from "axios"
import {ObtenerInformacionCookie} from "../../../../servicios/cookies/manejoCookies"


function obtenerInformacionUsuarioPorId(listaUsuarios, usuarioId) {
    const usuarioEncontrado = listaUsuarios.find(usuario => usuario.id === usuarioId);
    return usuarioEncontrado || null; // Devolver null si no se encuentra el usuario con el ID especificado
}

export default async function usuario_cursos(req,res) {
    try {
        //const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=username&criteria[0][value]=${user.cedula}`)    
        //const cursosUSer = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${respuesta.data.users[0].id}`)
        //const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=username&criteria[0][value]=ueeschapp`)    
        
        const {cursoId,id_moodle} = req.body
        
        const id_moodle_number =parseInt(id_moodle)
        
        const cookieUser = ObtenerInformacionCookie(req);
        
        
        const cursosUSer = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_enrol_get_enrolled_users&moodlewsrestformat=json&courseid=${cursoId}`);
        
        let informacionUsuario
        let estudiantes = null
        if(id_moodle_number === cookieUser.id_moodle){   
            informacionUsuario = obtenerInformacionUsuarioPorId(cursosUSer.data, cookieUser.id_moodle);
        }else{
            informacionUsuario = obtenerInformacionUsuarioPorId(cursosUSer.data, id_moodle_number);
            
        }
        
        //const notasUser = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=2&userid=${respuesta.data.users[0].id}`)
        return res.status(200).json({
            informacionUsuario:estudiantes? estudiantes : informacionUsuario,
            cursosUSer: cursosUSer.data})
    } catch (error) {

        console.log("Error al intentar conseguir los cursos del usuario",error)
        return res.status(500).json({mensaje:"Ocurrio un error al intentar conseguir los cursos en los que está matriculado el usuario",
    error: error})
    }
    
}
