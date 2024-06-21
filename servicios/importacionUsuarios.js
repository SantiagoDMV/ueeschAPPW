import repoImportacionUsuario from "../data/importacionUsuariosRepository";
import repoUsuario from "../data/usuariosRepository";
import { ObtenerInformacionCookie } from "../util/cookies/UserCookie";
import axios from "axios";

export async function mostrarUltimaImportacion() {
  try {
    //const userInf = ObtenerInformacionCookie(req);
    const datosImportacion =
      await repoImportacionUsuario.obtenerUltimaImportacion();

    if (!datosImportacion)
      return {
        status: 200,
        valor: false,
        mensaje: "No se encontraron fechas de importación.",
      };

    return {
      datosImportacion: datosImportacion,
      valor: true,
    };
  } catch (error) {
    console.log(
      "Ocurrio un error al mostrar la fecha de la última improtación: ",
      error
    );
    return {
      status: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}

export async function crearUltimaImportacion(req) {
  try {
    const user = ObtenerInformacionCookie(req);
    const respuesta = await axios.get(
      `${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=&criteria[0][value]=`
    );
    const datosMoodle = respuesta.data.users;

    const usuariosLocales = await repoUsuario.obtenerUsuarios();

    const usuariosAModificar = [];

    // Verificar si hay cambios que realizar
    datosMoodle.forEach((usuarioMoodle) => {
      const usuarioLocal = usuariosLocales.find(
        (u) => u.email_usuario === usuarioMoodle.email
      );
      if (
        !usuarioLocal ||
        //usuarioLocal.id_rol !== 1 || // Si el id_rol es 1, no se actualiza
        usuarioLocal.id_moodle !== usuarioMoodle.id || // Si el id_moodle es diferente, se actualiza
        usuarioLocal.nombre_usuario !== usuarioMoodle.firstname || // Comparar otros atributos si es necesario
        usuarioLocal.apellido_usuario !== usuarioMoodle.lastname
      ) {
        usuariosAModificar.push(usuarioMoodle);
      }
    });


    let consultaImportacion =true;
    if (usuariosAModificar.length > 0) {
      consultaImportacion = repoUsuario.importarUsuariosMoodle(
        usuariosAModificar,
        usuariosLocales
      );
    }

    if(!consultaImportacion)
         return {
             status: 500,
             valor: false,
             mensaje: "Error, la importación no se pudo completar"
         };

    // const usuariosEliminar = usuariosLocales.filter((usuarioLocal) => {
    //     return (
    //       usuarioLocal.id_rol !== 1 &&
    //       !datosMoodle.some((usuarioMoodle) => usuarioMoodle.id === usuarioLocal.id_moodle)
    //     );
    //   });
      
    //   let consultaImportacionEliminacion =true;
    //   if (usuariosEliminar.length > 0) {
    //      consultaImportacionEliminacion = repoUsuario.importarUsuariosMoodleEliminar(
    //       usuariosEliminar
    //     );
    //   }

    //   if(!consultaImportacionEliminacion)
    //      return {
    //          status: 500,
    //          valor: false,
    //          mensaje: "Error, algunos registros en la base local no se pudieron eliminar."
    //      };

    
         //if (usuariosAModificar.length === 0  && usuariosEliminar.length === 0) {
          if (usuariosAModificar.length === 0 ) {
          return {
            status: 500,
            valor: false,
            mensaje: "No se requirió ninguna acción adicional, ya que la información en la base de datos estaba al día."
        };

         }
    const respuestaImportacion = await repoImportacionUsuario.crearUltimaImportacion(user.id);
 
        if (!respuestaImportacion.valor)
         return {
             status: 500,
             valor: false,
             mensaje: "Error interno en el servidor"
         };

         return {
            valor:true,
            mensaje: respuestaImportacion.mensaje
          };

  } catch (error) {
    console.log("Error interno al importar los usuarios: ", error);
    return {
      status: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}
