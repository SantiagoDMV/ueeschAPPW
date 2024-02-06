import {mostrarMultimedia,crearPublicacion} from "../../../servicios/multimedia"

export default async function multimedia(req,res){
    if(req.method === "GET"){
        const servicio = await mostrarMultimedia();
        if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        //datosMultimedia
        return res.status(200).json({
            datosMultimedia: servicio.datosMultimedia,
          });
    }else if(req.method === "POST"){
        const {agregar} = req.query
        if(!agregar){
            const servicio = await crearPublicacion(req);
            if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        }

        return res.status(200).json("Solicitud completada");
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}