import {validarCadenas,validarCadenasAmbos} from "./datos/cadenas"
import {validarCedula,validarCedulaAmbos} from "./datos/cedula"
import UsuariosRepository from "../../../data/usuariosRepository";

export function registroValidacionesAmbos(index_usuario,id_rol,cedula_usuario, nombre_usuario,apellido_usuario,email_usuario) {

  if (id_rol) {
    const rolInt = parseInt(id_rol);
    if (!Number.isInteger(rolInt) || rolInt < 1 || rolInt > 5)
      return {
        statusCode: 400,
        valor: false,
        mensaje: `El rol ingresado no existe para el usuario ${index_usuario}`
      }
  }

  if (!cedula_usuario || !nombre_usuario || !apellido_usuario || !email_usuario )
    return {
      statusCode: 400,
      valor: false,
      mensaje: `Debe completar todos los campos del usuario ${index_usuario} para continuar`
    };


  const validacionNombre = validarCadenasAmbos(index_usuario,nombre_usuario, "nombre")
  if (!validacionNombre.valor)
    return {
      statusCode: 400,
      valor: false, mensaje: validacionNombre.mensaje
    }

  const validacionApellido = validarCadenasAmbos(index_usuario,apellido_usuario, "apellido")
  if (!validacionApellido.valor)
    return {
      statusCode: 400,
      valor: false, mensaje: validacionApellido.mensaje
    }


    const validacionCedula = validarCedulaAmbos(index_usuario,cedula_usuario);
    if (!validacionCedula.valor)
      return {
        statusCode: 400,
        valor: false, mensaje: validacionCedula.mensaje
      }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_usuario))
    return {
      statusCode: 400,
      valor: false, mensaje: `Debe ingresar un formato válido para el email del usuario ${index_usuario}`
    }

  

  return { valor: true }
}

export function registroValidaciones(req) {

  const { id_rol, cedula_usuario, nombre_usuario, apellido_usuario, email_usuario, password_usuario, password_usuario_confirmar } = req.body
  if (id_rol) {
    const rolInt = parseInt(id_rol);
    if (!Number.isInteger(rolInt) || rolInt < 1 || rolInt > 5)
      return {
        statusCode: 400,
        valor: false,
        mensaje: "El rol ingresado no existe"
      }
  }

  if (!cedula_usuario || !nombre_usuario || !apellido_usuario || !email_usuario || !password_usuario || !password_usuario_confirmar)
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email_usuario))
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

  const validacionCedula = validarCedula(cedula_usuario);
  if (!validacionCedula.valor)
    return {
      statusCode: 400,
      valor: false, mensaje: validacionCedula.mensaje
    }
  return { valor: true }
}

export async function actualizacionValidacionesDbRegistro(req) {
  
  const { cedula_usuario} = req.body;
  
  let respuesta;
  respuesta = await actualizacionesValidacionesDbMiembros(cedula_usuario, UsuariosRepository)
  return respuesta
}

export async function actualizacionesValidacionesDbMiembros(cedula, UsuariosRepositoryP) {
  try {
    const respuesta = await UsuariosRepositoryP.buscarUsuarioCedula(cedula);
    if (respuesta) {
      if (respuesta.cedula_usuario === cedula)
        return {
          statusCode: 400,
          valor: false, mensaje: "La cédula ya se encuentra registrada"
        }
    }
    return { valor: true }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      valor: false, mensaje: "Error interno del servidor"
    }
  }
}



export async function registroValidacionesDb(req) {
  const { email_usuario, cedula_usuario} = req.body;
  
  let respuesta;
  
  respuesta = await validacionesDbMiembros(email_usuario, cedula_usuario, UsuariosRepository)
  return respuesta
}





export async function validacionesDbUsuariosAmbos(email, cedula) {
  try {
    const respuesta = await UsuariosRepository.buscarUsuariosPorEmailYCedula(email, cedula);

    if (respuesta && Array.isArray(respuesta) && respuesta.length > 0) {
      const emailsRegistrados = respuesta.map(usuario => usuario.email_usuario);
      const cedulasRegistradas = respuesta.map(usuario => usuario.cedula_usuario);

      for (let i = 0; i < cedula.length; i++) {
        if (cedulasRegistradas.includes(cedula[i])) {
          return {
            statusCode: 400,
            valor: false, mensaje: `La cédula del usuario ${i+1} ya se encuentra registrada`
          };
        }
      }

      for (let i = 0; i < email.length; i++) {
        if (emailsRegistrados.includes(email[i])) {
          return {
            statusCode: 400,
            valor: false, mensaje: `El email del usuario ${i+1} ya se encuentra registrado`
          };
        }
      }
    }

    return { valor: true };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false, mensaje: "Error interno del servidor"
    };
  }
}



export async function validacionesDbMiembros(email, cedula, UsuariosRepositoryP) {
  try {
    const respuesta = await UsuariosRepositoryP.buscarUsuarioEmailCedula(email, cedula);
    if (respuesta) {
      if (respuesta.cedula_usuario === cedula)
        return {
          statusCode: 400,
          valor: false, mensaje: "La cédula ya se encuentra registrada"
        }

      if (respuesta.email_usuario === email)
        return {
          statusCode: 400,
          valor: false, mensaje: "El email ya se encuentra registrado"
        }
    }
    return { valor: true }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      valor: false, mensaje: "Error interno del servidor"
    }
  }
}


export async function validacionesDbPadres(email, cedula, UsuariosRepositoryP) {

  try {
    const respuestaDB = await UsuariosRepositoryP.buscarUsuariosEmailCedula(email, cedula)

    let [respuesta] = respuestaDB.filter((e) => e.email_usuario === email)
    let respuestaCedula = respuestaDB.filter((e) => e.cedula_usuario === cedula)

    if (!respuestaCedula)
      return {
        statusCode: 404,
        valor: false, mensaje: "No existe un 'Estudiante' con la cédula ingresada en nuestros registros.",
      };


    if (respuesta) {
      if (respuesta.email_usuario === email) {
        return {
          statusCode: 409,
          valor: false, mensaje: "El email ya se encuentra registrado"
        };
      }

      if (
        respuesta.email_usuario === email && respuesta.cedula_usuario !== cedula
      )
        return {
          statusCode: 409,
          valor: false, mensaje: "El email ya se encuentra vinculado con la cédula de otro estudiante"
        };

      if (
        respuesta.email_usuario === email && respuesta.id_rol === 3
      )
        return {
          statusCode: 409,
          valor: false,
          mensaje: "El email pertenece a un estudiante. El email debe ser diferente al del estudiante"
        };

    }


    if (respuestaCedula.cedula_usuario === cedula && respuestaCedula.id_rol !== 3)
      return {
        statusCode: 409,
        valor: false, mensaje: "La cédula ingresada pertenece a un rol diferente de 'Estudiante'"
      };

      
      if(respuestaCedula.length === 3)
      return {
        statusCode: 404,
        valor: false, mensaje: "La cédula ya ha sido registrada varias veces. La cédula sirve para vincular a los padres con el estudiante matrículado, por lo que se permite vincular un máximo de 2 cuentas al número de cédula."
      };


    return { valor: true }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      valor: false, mensaje: "Error interno del servidor"
    }
  }
}


export function validacionActualizacionDatos(req) {

  const { id_rol, cedula_usuario, email, password_usuario, password_usuario_confirmar } = req.body

  if (!cedula_usuario || !email || !password_usuario || !password_usuario_confirmar || !id_rol)
    return {
      statusCode: 400,
      valor: false,
      mensaje: "Debe completar todos lo campos para continuar"
    };

    if (id_rol) {
      const rolInt = parseInt(id_rol);
      if (!Number.isInteger(rolInt) || rolInt < 1 || rolInt > 5)
        return {
          statusCode: 400,
          valor: false,
          mensaje: "El rol ingresado no existe"
        }
    }

  
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

  const validacionCedula = validarCedula(cedula_usuario);
  if (!validacionCedula.valor)
    return {
      statusCode: 400,
      valor: false, mensaje: validacionCedula.mensaje
    }
  return { valor: true }
}
