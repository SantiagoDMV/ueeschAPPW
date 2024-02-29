import axios from "axios"
export default async function buscarUsuario(cedula) {
    
    const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=username&criteria[0][value]=${cedula}`)
    //http://localhost/webservice/rest/server.php?wstoken=12b89bff274ec679c86157d7591cc0ab&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]=andrea@gmail.com

    if(respuesta.data.users.length ===0)
    return {valor: false}

    return {valor: true}
}
