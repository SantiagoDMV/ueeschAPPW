export function loginValidaciones(email, password) {
    if(!email || !password) return {valor: false, mensaje: "Ingrese todos los campos para continuar"}
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;

    if(!emailRegex.test(email)) 
    return {valor: false, mensaje: "Debe ingresar un formato válido para el email"}

    if(password.length < 8) 
    return {valor: false, mensaje: "La contraseña debe tener una longitud mínima de 8 caracteres"}

    return {valor: true};
}

const validarContraseña = (pass) =>{
    const regexPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/;
    if (!regexPassword.test(pass))
    return {
      statusCode: 400,
      valor: false, 
      mensaje: "Las contraseñas ingresadas deben tener una logintud mínima de 8, además debe incluir por lo menos una letra en mayúscula, minúscula, números y símbolos"
    }

    return {valor:true}
} 

export function nuevaContraseñaValidacion(passwActual, passwNueva, passwNuevaConfirmacion){
    if(!passwActual || !passwNueva || !passwNuevaConfirmacion)
    return {
        statusCode: 400,
        valor: false,
        mensaje: "Debe completar todos lo campos para continuar"
      };
      
    const validacionPassw = validarContraseña(passwActual);
    if (!validacionPassw.valor) return validacionPassw; 

    const validacionPasswNueva = validarContraseña(passwNueva);
    if (!validacionPasswNueva.valor) return validacionPasswNueva; 
    
    const validacionPasswConfirmacion = validarContraseña(passwNuevaConfirmacion);
    if (!validacionPasswConfirmacion.valor) return validacionPasswConfirmacion; 

    if( passwNueva !== passwNuevaConfirmacion)
    return {
        statusCode: 400,
        valor: false, 
        mensaje: "Las contraseñas no coinciden. Por favor, verifica que ambas contraseñas sean idénticas e inténtalo nuevamente. Si sigues teniendo problemas, estamos disponibles para ayudarte en cualquier momento."
    }
    
    return {valor: true};
}