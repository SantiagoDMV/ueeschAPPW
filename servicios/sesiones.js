import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { hashing, comparar } from "./hashing/hash";
import usuariosRepo from "../data/usuariosRepository"
import { loginValidaciones, nuevaContraseñaValidacion } from "./validaciones/sesiones";
import { ObtenerInformacionCookie, ObtenerInformacionDirecta } from "./cookies/manejoCookies";

///////////FALTA ARREGLAR ELCONTROLADOR

export async function login_usuarios(req, res) {

  try {
    const validacionDatos = loginValidaciones(req.body.username, req.body.password);
    
    
    if (!validacionDatos.valor)
      return { status: 400,valor:false ,mensaje: validacionDatos.mensaje }

    const respuesta = await usuariosRepo.buscarUsuarioEmailNoEliminados(req.body.username);
    
    if (!respuesta) return {status:401, valor: false, mensaje: "El usuario o contraseña es incorrrecto" }

    const validacionRepresentantes = await usuariosRepo.buscarUsuarioIdMoodleEstudiante(respuesta.id_moodle)    

    if(!respuesta.password_usuario){
     const email =respuesta.email_usuario
     return {status:200, valor: false, redirectTo: '/actualizardatos', email};
    }

    const hashingPassw = await comparar(
      req.body.password,
      respuesta.password_usuario
    );

    if (!hashingPassw) return {status:401, valor: false, mensaje: "El usuario o contraseña es incorrrecto" };

    const ultimoAcceso = await usuariosRepo.actualizarUltimoAcceso(respuesta.id_usuario);
    if (!ultimoAcceso) return {status:401, valor: false, mensaje: "Error interno en el servidor" };

    const token = jwt.sign(
      {
        id: respuesta.id_usuario,
        id_moodle: respuesta.id_moodle,
        email: respuesta.email_usuario,
        cedula: respuesta.cedula_usuario,
        nombre: respuesta.nombre_usuario,
        apellido: respuesta.apellido_usuario,
        rol: respuesta.id_rol,
        imagen: respuesta.imagen_usuario,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      process.env.TOKEN_SECRET
    );

    const cookie = serialize(process.env.COOKIE_SESSION, token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.setHeader("Set-Cookie", cookie);
    
    const cookieParts = cookie.split(';');
    const userCookiePart = cookieParts.find(part => part.trim().startsWith('UserCookie='));
    const userCookieValor = userCookiePart.split('=')[1];

    const usuario = ObtenerInformacionDirecta(userCookieValor);
    const response = { usuario };

    if (respuesta.password_usuario) {
        // Si la contraseña existe, incluir la redirección en la respuesta
        response.redirectTo = "/"; // Reemplaza "/dashboard" con la ruta deseada
    }

    return {status:200, valor: true, mensaje: "Se inicio sesión correctamente",datos:usuario};
  } catch (error) {
    console.log('.................................................')
    console.log(error)
    return {status:500, valor: false, mensaje: "Error interno del servidor" };
  }
}

export async function cambiarContraseña(req) {
  try {

    const { passwActual, passwNueva, passwNuevaConfirmacion,email } = req.body;
    const validacionDatos = nuevaContraseñaValidacion(passwActual, passwNueva, passwNuevaConfirmacion);
    if (!validacionDatos.valor) return validacionDatos;

    const respuesta = await usuariosRepo.buscarUsuarioEmail(email);
    if (!respuesta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor"
      }
    
    const hashingPassw = await comparar(
      passwActual,
      respuesta.password_usuario
    );

    if (!hashingPassw)
      return {
        statusCode: 401,
        valor: false,
        mensaje: "La contraseña actual es incorrrecta"
      }

    if (passwActual === passwNueva)
      return {
        statusCode: 400,
        valor: false,
        mensaje: "La nueva contraseña debe ser distinta a la actual"
      }


    const nuevaContraseñaHashing = await hashing(passwNueva);

    const cambio = await usuariosRepo.cambiarContraseña(email, nuevaContraseñaHashing);

    if (!cambio)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor"
      }

    return {
      statusCode: 500,
      valor: true,
    }

  } catch (error) {
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno en el servidor"
    }
  }
} 


export async function obtenerCuentasVinculadas(req) {
  try {
    const {moodleCuentasVinculadas} = req.body;     
    const moodleCuentasVinculadasEntero = parseInt(moodleCuentasVinculadas);

  if (! Number.isInteger(moodleCuentasVinculadasEntero)) 
    return {
    statusCode: 400,
    valor: false,
    mensaje: "El parámetro ingresado no es válido"
    }

    const respuesta = await usuariosRepo.obtenerCuentasVinculadas(moodleCuentasVinculadasEntero);


    if (!respuesta)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor"
    }
   
    return {
      statusCode: 200,
      valor: true,
      cuentas: respuesta
    }

  } catch (error) {
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno en el servidor"
    }
  }
} 