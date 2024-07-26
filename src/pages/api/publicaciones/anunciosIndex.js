import {mostrarAnunciosIndex} from "../../../../servicios/publicaciones/noticias"
export default async function anuncios (req,res) {
    if(req.method === "GET"){
        const servicio = await mostrarAnunciosIndex();
        if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        //datosMultimedia
        if(servicio.datos.length === 0) 
        console.warn('Advertencia: La cantidad de servicios devuelta es 0. Verifica si existen servicios disponibles.');


        return res.status(200).json({
            datos: servicio.datos,
            datosMultimedia: servicio.datosMultimedia,
          });
    }else if(req.method === "POST"){

    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}