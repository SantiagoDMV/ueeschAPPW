import { hashing } from "./hashing/hash";
import {
  actualizacionValidacionesDbRegistro,
  registroValidaciones,
  registroValidacionesAmbos,
  registroValidacionesDb,
  validacionesDbUsuariosAmbos,
  validacionActualizacionDatos,
} from "./validaciones/usuarios/registro";
import {
  actualizacionValidaciones,
  actualizacionValidacionesDb,
} from "./validaciones/usuarios/actualizacion";
import {
  ActualizarCookieUser,
  ObtenerInformacionCookie,
} from "../util/cookies/UserCookie";
import {
  enviarDatosUserImg,
  eliminarDatos,
  buscarDatos,
} from "./googleDriveService/GoogleDrive";
import axios from "axios";

import usuariosRepo from "../data/usuariosRepository";
import publicacionesRepo from "../data/publicacionesRepository";
import nodemailer from "nodemailer";

// Configuración del transporte del correo
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_UE,
    pass: process.env.PASSW_UE,
  },
});

////////////////////SERVICIO OBTENER USUARIOS////////////////////////
export const obtenerUsuarios = async (req, res) => {
  const user = ObtenerInformacionCookie(req);

  if (!user)
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno en el servidor",
    };

  let consulta;
  if (user.rol !== 1) consulta = await usuariosRepo.obtenerUsuarios();
  else consulta = await usuariosRepo.obtenerUsuariosAdmin();

  if (!consulta)
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno en el servidor",
    };

  return { valor: true, datos: consulta };
};



export const obtenerInformacionUsuario = async (req, res) => {
  const {idUser} = req.body;
  
  let consulta;
  consulta = await usuariosRepo.obtenerUsuarioInformacion(idUser);
  
  if (!consulta)
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno en el servidor",
    };

  return { valor: true, datos: consulta };
};


////////////////////SERVICIO REGISTRO DE USUARIO////////////////////////
function obtenerEmailsYCedulas(usuarios) {
  const emails = usuarios.map((usuario) => usuario.email_usuario);
  const cedulas = usuarios.map((usuario) => usuario.cedula_usuario);

  return { emails, cedulas };
}

function generarContrasena(longitud) {
  const caracteresMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const caracteresMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const caracteresNumeros = "0123456789";
  const caracteresEspeciales = "!@#$%^&*()_+[]{}|;:,.<>?";

  const aleatorioMinuscula = caracteresMinusculas.charAt(
    Math.floor(Math.random() * caracteresMinusculas.length)
  );
  const aleatorioMayuscula = caracteresMayusculas.charAt(
    Math.floor(Math.random() * caracteresMayusculas.length)
  );
  const aleatorioNumero = caracteresNumeros.charAt(
    Math.floor(Math.random() * caracteresNumeros.length)
  );
  const aleatorioEspecial = caracteresEspeciales.charAt(
    Math.floor(Math.random() * caracteresEspeciales.length)
  );

  const caracteresRestantes =
    caracteresMinusculas +
    caracteresMayusculas +
    caracteresNumeros +
    caracteresEspeciales;

  const caracteresShuffled = caracteresRestantes
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  const contrasena =
    aleatorioMinuscula +
    aleatorioMayuscula +
    aleatorioNumero +
    aleatorioEspecial +
    caracteresShuffled.slice(0, longitud - 4);

  return contrasena;
}

// const enviarCorreoConRetries = async (usuario) => {
//   try {
//     let hashingPassw;
//     let idMoodle;

//     if (parseInt(usuario.id_rol) === 3 || parseInt(usuario.id_rol) === 4) {
//       const passw = generarContrasena(8);
//       hashingPassw = await hashing(passw);
//       const mensajeCorreo = {
//         from: process.env.EMAIL_UE,
//         to: usuario.email_usuario,
//         subject:
//           "¡Bienvenido a la Unidad Educativa Especializada Sordos de Chimborazo!",
//         text:
//           `¡Hola ${usuario.nombre_usuario} ${usuario.apellido_usuario}!\n\n` +
//           "Te damos la bienvenida a nuestra comunidad. Hemos generado una contraseña para tu cuenta. Por favor, sigue las instrucciones a continuación para iniciar sesión:\n\n" +
//           `Contraseña: ${passw}\n\n` +
//           "Gracias por ser parte de nuestra unidad educativa.\n\n" +
//           "Atentamente,\n" +
//           "El equipo de la Unidad Educativa Especializada Sordos de Chimborazo",
//       };

//       // Lógica de reintentos y backoff para el envío de correos electrónicos
//       for (let intento = 0; intento < 3; intento++) {
//         try {
//           await transporter.sendMail(mensajeCorreo);
//           //console.log('Correo enviado con éxito:', usuario.email_usuario);
//           break; // Sale del bucle si el envío es exitoso
//         } catch (error) {
//           console.log(error.message);
//           if (error.message.includes("554 5.2.0")) {
//             return {
//               valor: false,
//               mensaje: `Error al enviar el correo para el usuario ${usuario.index_usuario}: hubo un problema con el envío del mensaje debido a restricciones anti-spam.`,
//             };
//           }
//           console.error(
//             `Error al enviar el correo para el usuario ${usuario.index_usuario}:`,
//             error.message
//           );
//           if (intento < 2) {
//             const espera = Math.pow(2, intento) * 1000; // Backoff exponencial
//             console.log(
//               `Esperando ${espera / 1000} segundos antes de reintentar...`
//             );
//             await new Promise((resolve) => setTimeout(resolve, espera));
//           } else {
//             throw new Error(
//               "No se pudo enviar el correo después de varios intentos"
//             );
//           }
//         }
//       }

//       const respuestaCreacionMoodle = await axios.get(
//         `${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_create_users&moodlewsrestformat=json&users[0][username]=${usuario.cedula_usuario}&users[0][password]=${passw}&users[0][firstname]=${usuario.nombre_usuario}&users[0][lastname]=${usuario.apellido_usuario}&users[0][email]=${usuario.email_usuario}`
//       );
//       idMoodle = respuestaCreacionMoodle.data[0].id;
//       // {
//       //   exception: 'invalid_parameter_exception',
//       //   errorcode: 'invalidparameter',
//       //   message: 'Invalid parameter value detected'
//       // }
//     } else {
//       hashingPassw = await hashing(usuario.cedula_usuario);
//     }

//     // Llamada a la función para crear usuario en tu base de datos
//     const usuarioRepo = new UsuariosRepository();
//     await usuarioRepo.crearUsuarioAmbos(
//       idMoodle,
//       hashingPassw,
//       usuario.id_rol,
//       usuario.nombre_usuario,
//       usuario.apellido_usuario,
//       usuario.cedula_usuario,
//       usuario.email_usuario
//     );

//     return {
//       valor: true,
//       mensaje: "usuario creado exitosamente",
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       valor: false,
//       mensaje: "error",
//     };
//   }
// };

export const registrarUsuariosAmbosSistemas = async (usuariosAmbosSistemasP) => {
  
  const usuariosAmbosSistemas = usuariosAmbosSistemasP
  try {
    const respuestaValidaciones = usuariosAmbosSistemas.map((e, index) => {
      const respuestaValidacion = registroValidacionesAmbos(
        e.index_usuario,
        e.id_rol,
        e.cedula_usuario,
        e.nombre_usuario,
        e.apellido_usuario,
        e.email_usuario
      );

      return respuestaValidacion;
    });

    const primerError = respuestaValidaciones.find(
      (respuesta) => !respuesta.valor
    );

    if (primerError) {
      return primerError;
    }

    const { emails, cedulas } = obtenerEmailsYCedulas(usuariosAmbosSistemas);

    const respuestaValidacionDb = await validacionesDbUsuariosAmbos(
      emails,
      cedulas
    );
    if (!respuestaValidacionDb.valor) return respuestaValidacionDb;

    let hashingPassw;

    for (const usuario of usuariosAmbosSistemas) {
      let idMoodle = -1;
      try {
        //const resultadoCorreo = await enviarCorreoConRetries(usuario);

        //MODIFICACIONES REALIZADAS PARA CONTRASENAS CON CEDULA
        const passw = usuario.cedula_usuario;
        hashingPassw = await hashing(passw);

        try {
          if (
            parseInt(usuario.id_rol) === 3 ||
            parseInt(usuario.id_rol) === 4
          ) {
            //EN EL FORMULARIO SE MUESTRAN LOS ROLES IN INCLUIR EL SUPER ADMINISTRADOR  POR LO QUE SE MENORA UN ROL
            const respuestaCreacionMoodle = await axios.get(
              `${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_create_users&moodlewsrestformat=json&users[0][username]=${usuario.cedula_usuario}&users[0][password]=${passw}&users[0][firstname]=${usuario.nombre_usuario}&users[0][lastname]=${usuario.apellido_usuario}&users[0][email]=${usuario.email_usuario}`
            );
            idMoodle = respuestaCreacionMoodle.data[0].id;
          }
        } catch (error) {
          if (error.code === "ECONNREFUSED") {
            return {
              statusCode: 500,
              valor: false,
              mensaje: `Error al procesar el usuario ${usuario.nombre_usuario}. No se pudo establecer conexión con el servidor de Moodle. Asegúrate de que el servidor esté activo y vuelva a intentarlo.`,
            };
          }

          // Otro tipo de error
          return {
            statusCode: 500,
            valor: false,
            mensaje: `Error al procesar el usuario ${usuario.nombre_usuario}. No se pudo crear el usuario en Moodle; el proceso ha sido interrumpido.`,
          };
        }

        const respuestaCreacionDB = await usuariosRepo.crearUsuarioAmbos(
          idMoodle,
          hashingPassw,
          usuario.id_rol,
          usuario.nombre_usuario,
          usuario.apellido_usuario,
          usuario.cedula_usuario,
          usuario.email_usuario
        );

        if (!respuestaCreacionDB)
          return {
            statusCode: 500,
            valor: false,
            mensaje:
              "Error al momento de crear los usuarios en el sistema local",
          };

        // if (!resultadoCorreo.valor)
        //   return {
        //     statusCode: 500,
        //     valor: false,
        //     mensaje: `Error al momento de crear el usuario ${usuario.index_usuario}, ${resultadoCorreo.mensaje}`,
        //   };
      } catch (error) {
        return {
          statusCode: 500,
          valor: false,
          mensaje: `Error al procesar el usuario ${usuario.nombre_usuario}:  ${error.message}`,
        };
      }
    }

    return {
      valor: true,
      mensaje: "usuario creado exitosamente",
    };
  } catch (error) {
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};

export const registrarUsuarios = async (req) => {
  try {
    const respuestaValidacion = registroValidaciones(req);
    if (!respuestaValidacion.valor) return respuestaValidacion;

    const respuestaValidacionDb = await registroValidacionesDb(req);

    if (!respuestaValidacionDb.valor) return respuestaValidacionDb;

    const {
      password_usuario_confirmar,
      password_usuario,
      id_rol,
      ...userData
    } = req.body;

    if (password_usuario_confirmar !== password_usuario) {
      return {
        statusCode: 401,
        valor: false,
        mensaje: "Las contraseñas no coinciden.",
      };
    }

    const hashingPassw = await hashing(password_usuario);

    let consulta;
    if (!id_rol) {
      consulta = await usuariosRepo.crearUsuario(hashingPassw, 5, userData);
    } else {
      const idRol = parseInt(id_rol);
      consulta = await usuariosRepo.crearUsuario(hashingPassw, idRol, userData);
    }

    if (!consulta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };
    return { valor: true };
  } catch (error) {
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};
////////////////////SERVICIO ACTUALIZAR USUARIO////////////////////////
export const actualizarUsuariosImportados = async (req) => {
  try {

    const validaciones = validacionActualizacionDatos(req);

    const {
      id_rol,
      cedula_usuario,
      password_usuario_confirmar,
      password_usuario,
      email,
    } = req.body;

    
    const respuesta = await userRepo.buscarUsuarioCedula(cedula_usuario)

  
    if(respuesta)
    return {
      statusCode: 401,
      valor: false,
      mensaje: "La cédula ingresada ya se encuentra registrada",
    };

    
    if (password_usuario_confirmar !== password_usuario) {
      return {
        statusCode: 401,
        valor: false,
        mensaje: "Las contraseñas no coinciden.",
      };
    }

    const respuestaValidacionDb = await actualizacionValidacionesDbRegistro(
      req
    );

    if (!respuestaValidacionDb.valor) return respuestaValidacionDb;

    //const validaciones = actualizacionValidacionesUsuariosImportados(password_usuario,password_usuario_confirmar, email);
    if (!validaciones.valor) return validaciones;

    const hashingPassw = await hashing(password_usuario);
    
    const consulta = await usuariosRepo.actualizarUsuarioPassword(
      id_rol,
      cedula_usuario,
      email,
      hashingPassw
    );

    if (!consulta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return { valor: consulta };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};

export const actualizarUsuarios = async (req) => {
  try {
    const { credenciales, emailActual } = req.body;
    const { id_rol, id_moodle, ...userData } = credenciales;
    const idRol = parseInt(id_rol);

    const validaciones = actualizacionValidaciones(
      userData,
      id_rol,
      emailActual,
      credenciales.password_usuario
    );

    if (!validaciones.valor) return validaciones;

    const validacionesDB = await actualizacionValidacionesDb(
      userData,
      emailActual
    );

    if (!validacionesDB.valor) return validacionesDB;

    let hashingPassw = null;

    if (credenciales.password_usuario)
      hashingPassw = await hashing(credenciales.password_usuario);


      const consulta = await usuariosRepo.actualizarUsuario(
        emailActual,
        idRol,
        userData.cedula_usuario,
        userData.email_usuario,
        userData.nombre_usuario,
        userData.apellido_usuario,
        hashingPassw
      );
  
      if (!consulta)
        return {
          statusCode: 500,
          valor: false,
          mensaje: "Error interno en el servidor",
        };

    if (idRol === 3 || idRol === 4)
      try {
        //http://localhost/webservice/rest/server.php?wstoken=12b89bff274ec679c86157d7591cc0ab&wsfunction=core_user_delete_users&moodlewsrestformat=json&userids[0]=10
        await axios.get(
          `${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=${id_moodle}&users[0][firstname]=${userData.nombre_usuario}&users[0][lastname]=${userData.apellido_usuario}&users[0][email]=${userData.email_usuario}`
        );
      } catch (error) {
        return {
          statusCode: 500,
          valor: false,
          mensaje:
            "No se pudó completar el proceso, el servidor de moodle no se encuentra disponible, sin embargo los datos fueron actualizados en la base de datos local",
        };
      }

    return { valor: consulta };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};

////////////////////SERVICIO ELIMINAR USUARIO////////////////////////

//MOODLE PROGRAMACION
const generarURL = (userIds) => {
  const baseUrl = `${process.env.MOODLE_HOST}/webservice/rest/server.php`;
  const token = `${process.env.TOKEN_MOODLE}`;
  const functionEndpoint = "core_user_update_users";
  const format = "json";
  const url = `${baseUrl}?wstoken=${token}&wsfunction=${functionEndpoint}&moodlewsrestformat=${format}&users[0][id]=${userIds}&users[0][suspended]=1`;
  return url;
};

export const eliminarUsuarios = async (req) => {
  const { userEmails, userIds, userRoles,userFechas } = req.body;
  console.log(userFechas)
  
  try {
    let i = 0;
    try {
      //const filteredEmails = userEmails.filter(email => email !== 'null');
      for (const e of userEmails) {
        if (parseInt(userRoles[i]) === 3 || parseInt(userRoles[i]) === 4) {
          await axios.get(`${generarURL(e)}`); //SUSPENCION DE LA CUENTA DE LOS ESTUDIANTES EN MOODLE
          
          await usuariosRepo.eliminacionLogicaPorIdMoodle(parseInt(e)); //ACTUALIZACION DE LA CUENTA DE PADRES
          await publicacionesRepo.eliminacionPublicacionLogica(userIds);
        }
        i += 1;
      }
    } catch (error) {
      return {
        statusCode: 500,
        valor: false,
        mensaje: `No se puede realizar el proceso de eliminación, el servidor de moodle no se encuentra disponible.`,
      };
    }

    const consulta = await usuariosRepo.eliminarUsuario(userIds);

    if (!consulta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return { valor: true };
  } catch (error) {
    console.log("Error interno en la eliminacion: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};
////////////////////SERVICIO ACTUALIZAR USUARIO////////////////////////
export const actualizarImagenUsuarios = async (req, res) => {
  try {
    const user = ObtenerInformacionCookie(req);

    if (!user)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    const googleId = process.env.GOOGLE_ID_CIMAGES_USER;
    const cuerpo = req.body[0]; //cuerpo de la imagen
    //const nombre = `usuario-${req.body[1]} ${req.body[2]} - ${email}`;
    const nombre = `usuario-${user.nombre}-${user.apellido}-${user.id}`;

    const existe = await buscarDatos(nombre, googleId);

    let datos = "";

    if (existe.valor) {
      await eliminarDatos(nombre, existe.files);
      datos = await enviarDatosUserImg(nombre, googleId, cuerpo);
    } else {
      datos = await enviarDatosUserImg(nombre, googleId, cuerpo);
    }

    if (!datos.valor)
      return {
        statusCode: 400,
        valor: false,
        mensaje: "Error con el servicio de google drive",
      };

    const consulta = await usuariosRepo.actualizarImagenUsuario(
      user.id,
      datos.imagen
    );

    if (!consulta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    const nuevaCookie = ActualizarCookieUser(req, "imagen", datos.imagen);

    if (!nuevaCookie)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    res.setHeader("Set-Cookie", nuevaCookie);

    return datos;
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};

export const actualizarFechaEliminacion = async (req, res) => {
  
  try {
    const { id_usuarioRestauracion } = req.body;

    const consulta = await usuariosRepo.actualizarFechaEliminacion(
      id_usuarioRestauracion
    );

    if (!consulta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    const consultaUsuario = await usuariosRepo.buscarUsuarioId(
      consulta.id_usuarioRestauracion
    );

    await publicacionesRepo.restauracionPublicacionLogica(id_usuarioRestauracion);

    try {
      const baseUrl = `${process.env.MOODLE_HOST}/webservice/rest/server.php`;
      const token = `${process.env.TOKEN_MOODLE}`;
      const functionEndpoint = "core_user_update_users";
      const format = "json";
      const url = `${baseUrl}?wstoken=${token}&wsfunction=${functionEndpoint}&moodlewsrestformat=${format}&users[0][id]=${consultaUsuario.id_moodle}&users[0][suspended]=0`;
      if (consultaUsuario.id_moodle) await axios.get(url);
    } catch (error) {
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor de moodle",
      };
    }

    return {
      valor: true,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};

export const obtenerUsuarioEmail = async (req) => {
  try {
    const { email } = req.body;

    if (!email)
      return {
        valor: false,
      };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return {
        valor: false,
      };

    const consulta = await usuariosRepo.buscarUsuarioEmail(email);

    if (!consulta)
      return {
        valor: false,
      };
    if (consulta.password_usuario)
      return {
        valor: false,
      };

    return { valor: true };
  } catch (error) {
    console.log(error);
    return {
      valor: false,
    };
  }
};

export const actualizarIdMoodlePadres = async (req, res) => {
  try {
    const { emailHijo } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailHijo))
      return {
        statusCode: 400,
        valor: false,
        mensaje: "Debe ingresar un formato válido para el email",
      };

    const consulta = await usuariosRepo.buscarUsuarioEmailNoEliminados(
      emailHijo
    );

    if (!consulta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "El email ingresado no existe en el sistema",
      };

    const user = ObtenerInformacionCookie(req);

    if (!user)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    if (consulta.id_rol !== 4)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "El email ingresado no pertenece a ningún estudiante",
      };

    let consultaActualizar;
    if (consulta.id_moodle && consulta.id_rol === 4)
      consultaActualizar = await usuariosRepo.actualizarIdMoodle(
        consulta.id_moodle,
        user.email
      );

    const nuevaCookie = ActualizarCookieUser(
      req,
      "id_moodle",
      consulta.id_moodle
    );

    if (!nuevaCookie)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    res.setHeader("Set-Cookie", nuevaCookie);

    return { valor: true };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};
