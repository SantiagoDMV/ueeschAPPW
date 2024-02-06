
import {mostrarAnuncios} from "../../../../servicios/publicaciones/anuncios"
export default async function anuncios (req,res) {
    if(req.method === "GET"){
        const servicio = await mostrarAnuncios();
        if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        //datosMultimedia
        if(servicio.datos.length === 0) 
        console.warn('Advertencia: La cantidad de servicios devuelta es 0. Verifica si existen servicios disponibles.');


        return res.status(200).json({
            datos: servicio.datos,
          });
    }else if(req.method === "POST"){

    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}