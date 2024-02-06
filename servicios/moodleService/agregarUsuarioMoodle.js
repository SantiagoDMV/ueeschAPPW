import axios from "axios";
export default async function agregarUsuario(req) {
    const wsfunction = "core_user_create_users"; // Nombre de la función para crear usuarios
    const { nombre_usuario, apellido_usuario, cedula_usuario, email_usuario, password_usuario} = req.body;
    const maildisplay = 1;
    const city = "Riobamba"; 
    //const country = "Ecuador"; 
    try {
      const url = `${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=${wsfunction}&moodlewsrestformat=json&users[0][createpassword]=0&users[0][username]=${cedula_usuario}&users[0][password]=${password_usuario}&users[0][firstname]=${nombre_usuario}&users[0][lastname]=${apellido_usuario}&users[0][email]=${email_usuario}&users[0][maildisplay]=${maildisplay}&users[0][city]=${city}`;
      
      //core_user_update_users
      //ACTUALZAR INF
      //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=16&users[0][username]=davidmm

      const respuesta = await axios.get(url)
      if(respuesta.data.errorcode) return { valor:false,mensaje: "Ocurrió un error, el error se pudó generar por los siguientes motivos: El usuario ya se encuentra registrado en moodle, parámetros inválidos o incorrectos"}
      else  return { valor:true, mensaje: "El usuario fue creado exitosamente en moodle"}
      
    } catch (error) {
        return { valor:false,mensaje: `Ocurrió un error al intentar agregar el usuario a moodle, ${error}`}
    }    

}
