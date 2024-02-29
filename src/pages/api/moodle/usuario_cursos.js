import axios from "axios"

export default async function usuario_cursos(req,res) {
    const {idUsuario} = req.body;
    try {
        //const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=username&criteria[0][value]=${user.cedula}`)    
        //const cursosUSer = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${respuesta.data.users[0].id}`)
        //const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=username&criteria[0][value]=ueeschapp`)    
        const cursosUSer = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${idUsuario}`)
//console.log(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_enrol_get_users_courses&moodlewsrestformat=json&userid=${idUsuario}`)
        //const notasUser = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=2&userid=${respuesta.data.users[0].id}`)
        return res.status(200).json(cursosUSer.data)
    } catch (error) {
//        console.log("Error al intentar conseguir los cursos del usuario")
        return res.status(500).json({mensaje:"Ocurrio un error al intentar conseguir los cursos en los que está matriculado el usuario",
    error: error})
    }
    
}
