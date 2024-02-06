export function validarCadenas (cadena, tipo){
    if (/\d/.test(cadena)) {
        return { valor: false, mensaje: `El ${tipo} no debe contener números` };
      }
    
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(cadena)) {
        return { valor: false, mensaje: `El ${tipo} solo debe contener letras y espacios`};
    }

    return {valor: true}
}


export function validarCadenasAmbos (index_usuario,cadena, tipo){
    if (/\d/.test(cadena)) {
        return { valor: false, mensaje: `El ${tipo} del usuario ${index_usuario} no debe contener números` };
      }
    
    if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(cadena)) {
        return { valor: false, mensaje: `El ${tipo} del usuario ${index_usuario} solo debe contener letras y espacios`};
    }

    return {valor: true}
}
