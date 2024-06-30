import {validarCadenas} from "./datos/cadenas"
import {validarCedula} from "./datos/cedula"
import UsuariosRepository from "../../../data/usuariosRepository";

export function actualizacionValidacionesUsuariosImportados(password_usuario,password_usuario_confirmar, email){
  
  if (!password_usuario || !password_usuario_confirmar || !email )
  return {
    statusCode: 400,
    valor: false,
    mensaje: "Debe completar todos lo campos para continuar"
  };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email))
  return {
    statusCode: 400,
    valor: false, mensaje: "Debe ingresar un formato válido para el email"
  }

  const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
  if (!regexPassword.test(password_usuario))
    return {
      statusCode: 400,
      valor: false, mensaje: "La contraseña debe tener una logintud mínima de 8, además debe incluir por lo menos una letra en mayúscula, minúscula, números y símbolos"
    }

    if (!regexPassword.test(password_usuario_confirmar))
    return {
      statusCode: 400,
      valor: false, mensaje: "La contraseña debe tener una logintud mínima de 8, además debe incluir por lo menos una letra en mayúscula, minúscula, números y símbolos"
    }

    return { valor: true }    
}


export function actualizacionValidaciones(userData, id_rol, emailActual,password_usuario){
    const {cedula_usuario,nombre_usuario,apellido_usuario,email_usuario} = userData

    if (!id_rol || !cedula_usuario || !nombre_usuario || !apellido_usuario || !email_usuario || !emailActual)
    return {
      statusCode: 400,
      valor: false,
      mensaje: "Debe completar todos lo campos para continuar"
    };

    const validacionNombre = validarCadenas(nombre_usuario, "nombre")
  if (!validacionNombre.valor)
    return {
      statusCode: 400,
      valor: false, mensaje: validacionNombre.mensaje
    }

  const validacionApellido = validarCadenas(apellido_usuario, "apellido")
  if (!validacionApellido.valor)
    return {
      statusCode: 400,
      valor: false, mensaje: validacionApellido.mensaje
    }

    const validacionCedula = validarCedula(cedula_usuario);
    if (!validacionCedula.valor)
      return {
        statusCode: 400,
        valor: false, mensaje: validacionCedula.mensaje
      }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_usuario))
    return {
      statusCode: 400,
      valor: false, mensaje: "Debe ingresar un formato válido para el email"
    }

    if (!emailRegex.test(emailActual))
    return {
      statusCode: 400,
      valor: false, mensaje: "No se pudo obtener el identificador del usuario"
    }

    if(password_usuario.length >=1 )
    if (password_usuario.length <= 8) {
      return {
        statusCode: 400,
        valor: false,
        mensaje: `La contraseña debe tener una longitud mínima de 8 caracteres.`
      };
    }

    return { valor: true }
}

export async function actualizacionValidacionesDb(userData,emailActual, cedulaActual) {
    const {cedula_usuario,email_usuario} = userData
    if(emailActual === email_usuario && cedulaActual ===cedula_usuario) return {valor:true} 
    
    const respuesta = await validacionesDb(email_usuario, cedula_usuario, UsuariosRepository, emailActual, cedulaActual)
    return respuesta
  }


  export async function validacionesDb(email, cedula, UsuariosRepositoryP, emailActual) {
    try {
      
      const respuestaDB = await UsuariosRepositoryP.buscarUsuariosEmailCedula(email, cedula);

      let [respuesta] = respuestaDB.filter((e) => e.email_usuario === email)
      let respuestaCedulaDb = respuestaDB.filter((e) => e.cedula_usuario === cedula)

      if(respuestaCedulaDb)
      if(respuestaCedulaDb.length === 3)
      return {
        statusCode: 404,
        valor: false, mensaje: "La cédula ya ha sido registrada varias veces. La cédula sirve para vincular a los padres con el estudiante matrículado, por lo que se permite vincular un máximo de 2 cuentas al número de cédula."
      };

      if(respuesta && emailActual !== respuesta.email_usuario) 
      return {
        statusCode: 409,
        valor: false, mensaje: "El email ya se encuentra registrado"
      };
      //console.log(respuestaDB)

      return { valor: true }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 500,
        valor: false, mensaje: "Error interno del servidor"
      }
    }
  }