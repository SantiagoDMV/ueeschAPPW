import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { mostrarUltimaImportacion,crearUltimaImportacion } from "../../../servicios/importacionUsuarios"

export default async function usuarios(req,res) {
    if(req.method === "GET"){
        try {
            const respuesta = await mostrarUltimaImportacion();
            
            if(!respuesta.valor){
                return res.status(respuesta.status).json({
                    mensaje: `${respuesta.mensaje}`,
                   })    
            } 
    
            
            if(respuesta.datosImportacion){
                const opcionesDeFormato = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const fecha_formateada = respuesta.datosImportacion.creado_en.toLocaleString('es-ES', opcionesDeFormato);
            return res.status(200).json({
                mensaje: fecha_formateada,
               })        
            }

            return res.status(200).send();
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                mensaje: 'Hubo un problema con el servidor al intentar obtener los datos de las importaciones.',
                valor:false
               })
                       
        }
        
      
    }else if(req.method === "PUT"){
        try {
            const respuesta = await crearUltimaImportacion(req);
            
            if (respuesta.valor === false) {
                return res.status(respuesta.status).json({
                    mensaje: respuesta.mensaje,
                });
            }

            return res.status(200).json({
                mensaje: respuesta.mensaje,
               })    
          
        
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            mensaje: 'Hubo un problema con el servidor al intentar actualizar los datos de las importaciones.',
            datos: [],
            valor:false
           })
       }
    
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}
