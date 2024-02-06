import {mostrarPublicaciones,mostrarPublicacionesInformacionPerfil,mostrarPublicacionesGestion,mostrarPublicacionId,crearPublicacion,actualizarPublicacion,eliminarPublicacion,eliminarPublicacionIdUnico, mostrarPublicacionesInformacion} from "../../../servicios/publicaciones"

export default async function publicaciones(req,res){
    if(req.method === "GET"){

        
        const servicio = await mostrarPublicaciones();
        if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        //datosMultimedia
        if(servicio.datos.length === 0) 
        console.warn('Advertencia: La cantidad de publicaciones devuelta es 0. Verifica si existen publicaciones disponibles.');


        return res.status(200).json({
            datos: servicio.datos,
            datosMultimedia: servicio.datosMultimedia,
          });
    }else if(req.method === "POST"){
        if(req.body.mostrar_tipos_publicaciones){
            const servicio = await mostrarPublicacionesGestion();
            if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
            else{
                return res.status(200).json({
                    datos: servicio.datos,
                    datosMultimedia: servicio.datosMultimedia,
                    detallesUsuarios: servicio.detallesUsuarios,
                  });
            }
        }

        if(req.body.pagina){
            let servicio;
            switch(req.body.pagina){
                case'index':
                servicio = await mostrarPublicacionesInformacion();
                break;
                case'perfil':
                servicio = await mostrarPublicacionesInformacionPerfil(req);
                break;
            }
            
            
            if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
            //datosMultimedia
            if(servicio.datos.length === 0) 
            console.warn('Advertencia: La cantidad de publicaciones devuelta es 0. Verifica si existen publicaciones disponibles.');
    
    
            return res.status(200).json({
                datos: servicio.datos,
                datosMultimedia: servicio.datosMultimedia
              });
        }

        if(req.body.publicacionesIds){
            const peticion = await eliminarPublicacion(req);
            if(!peticion.valor)
            return res.status(peticion.statusCode).json(peticion);

            
            return res.status(200).json({mensaje: "Publicación(es) eliminada(s) con exito"})
        }
        
        if(req.body.idPublicacionEliminar){
            const peticion = await eliminarPublicacionIdUnico(req);
            if(!peticion.valor)
            return res.status(peticion.statusCode).json(peticion);

            
            return res.status(200).json({mensaje: "Publicación(es) eliminada(s) con exito"})
        }


        const {publicacionId} = req.query
        if(!publicacionId){
            const servicio = await crearPublicacion(req);
            if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);

            //id_publicacion
            return res.status(200).json({mensaje: 'Operación completada exitosamente'})
        }else{
        const servicio = await mostrarPublicacionId(req);
        return res.status(200).json({
            datos: servicio.datos,
            datosMultimedia: servicio.datosMultimedia,
        });
        }
        //return res.status(200).json({mensaje: 'Operación completada exitosamente'})
        
    }else  if(req.method === "PUT"){
        //console.log(req.body)
     const servicio = await actualizarPublicacion(req);
        if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        return res.status(200).json({'mensaje': 'Publicación actualizada'})
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}