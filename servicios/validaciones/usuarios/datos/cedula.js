export function validarCedula (cedula) {
    if(!/^\d+$/.test(cedula)) 
    return {valor:false, mensaje:"La cédula debe contener solo números"}

    if(cedula.length !== 10) 
    return {valor:false, mensaje:"La cédula debe tener una logitud de 10 dígitos"}
    
    if(parseInt(cedula.substring(0,2)) > 24 && parseInt(cedula.substring(0,2)) < 0) {
    return {valor:false, mensaje:"La cédula no es válida, el código de la provincia es incorrecto"}
    }

  const digitoVerificador = parseInt(cedula.charAt(9));

  const digitosCedula = cedula.substring(0, 9);

  let suma = 0;
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  for (let i = 0; i < digitosCedula.length; i++) {
    let valor = parseInt(digitosCedula.charAt(i)) * coeficientes[i];
    if (valor >= 10) {
      valor -= 9;
    }
    suma += valor;
  }

  const digitoVerificadorCorrecto = (10 - (suma % 10)) % 10;

  if (digitoVerificador !== digitoVerificadorCorrecto) {
    return { valor: false, mensaje: "La cédula no es válida" };
  }

  return {valor: true}
}




export function validarCedulaAmbos (index_usuario,cedula) {
  if(!/^\d+$/.test(cedula)) 
  return {valor:false, mensaje:`La cédula del usuario ${index_usuario} debe contener solo números`}

  if(cedula.length !== 10) 
  return {valor:false, mensaje:`La cédula del usuario ${index_usuario} debe tener una logitud de 10 dígitos`}
  
  if(parseInt(cedula.substring(0,2)) > 24 && parseInt(cedula.substring(0,2)) < 0) {
  return {valor:false, mensaje:`La cédula del usuario ${index_usuario} no es válida, el código de la provincia es incorrecto`}
  }

const digitoVerificador = parseInt(cedula.charAt(9));

const digitosCedula = cedula.substring(0, 9);

let suma = 0;
const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
for (let i = 0; i < digitosCedula.length; i++) {
  let valor = parseInt(digitosCedula.charAt(i)) * coeficientes[i];
  if (valor >= 10) {
    valor -= 9;
  }
  suma += valor;
}

const digitoVerificadorCorrecto = (10 - (suma % 10)) % 10;

if (digitoVerificador !== digitoVerificadorCorrecto) {
  return { valor: false, mensaje: `La cédula del usuario ${index_usuario} no es válida` };
}

return {valor: true}
}