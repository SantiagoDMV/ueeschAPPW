/*
* @params {string} Fecha obtenida de prisma
* returns {string} Fecha formateada
*/

export function formatearFecha(fechaString){
    const fecha = new Date(fechaString);

    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString().slice(-2);
    const hora = fecha.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const fechaFormateada = `${dia}/${mes}/${anio} ${hora}`;
    return fechaFormateada
}