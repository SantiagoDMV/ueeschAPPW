import {mostrarServiciosIdUsuario,agregarUsuariosNuevosServicio,eliminarAsistentesServicio,mostrarAsistentesServicio,agregarUsuarioServicio, mostrarServicios, eliminarAsistenciaUsuario} from "../../../../servicios/publicaciones/servicios"

export default async function publicaciones(req,res){
    if(req.method === "GET"){
        const servicio = await mostrarServicios(req);
        if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        //datosMultimedia
        if(servicio.datos.length === 0) 
        console.warn('Advertencia: La cantidad de servicios devuelta es 0. Verifica si existen servicios disponibles.');

        const serviciosConRegistro = servicio.datos.map(publicacion => {
          let encontrado = false;
          
          if (Array.isArray(servicio.verificacion)) {
            encontrado = servicio.verificacion.some(serv => serv.id_servicio === publicacion.id_publicacion);
          } else if (typeof servicio.verificacion === 'object' && servicio.verificacion !== null) {
            encontrado = servicio.verificacion.id_servicio === publicacion.id_publicacion;
          }
          return { ...publicacion, encontrado };
        });

        return res.status(200).json({
            datos: serviciosConRegistro,
            datosMultimedia: servicio.datosMultimedia,
          });
    }else if(req.method === "POST"){
      if(req.body.idUsuarioServicios){
        
        const servicio = await mostrarServiciosIdUsuario(req);
        if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        return res.status(200).json({datos: servicio.datos})
      }

      if(req.body.id_publicacion_quitar){
        const {id_publicacion_quitar} = req.body
        const servicio = await eliminarAsistenciaUsuario(req, id_publicacion_quitar);
        if(!servicio.valor) return res.status(servicio.statusCode).json({mensaje: servicio.mensaje});
  
        return res.status(200).json({
            mensaje: 'Registrado eliminado exitosamente'
          });  
      }
      const {idPublicacionAsistentes} = req.body;
      if(idPublicacionAsistentes){
        const servicio = await mostrarAsistentesServicio(idPublicacionAsistentes);
        
        if(!servicio.valor) return res.status(servicio.statusCode).json({mensaje: servicio.mensaje});
  
        return res.status(200).json({
            datos: servicio.datos,
          });
      }

      const {idsUsuariosEliminar} = req.body
      if(idsUsuariosEliminar){
        const {idPublicacion} = req.body
        const servicio = await eliminarAsistentesServicio(idsUsuariosEliminar,idPublicacion);
        if(!servicio.valor) return res.status(servicio.statusCode).json({mensaje: servicio.mensaje});
  
        return res.status(200).json({
            mensaje: 'Usuarios eliminados correctamente'
          });
      }


    const {idsUsuariosAgregar} = req.body
    if(idsUsuariosAgregar){
      const {idPublicacion} = req.body
      const servicio = await agregarUsuariosNuevosServicio(idsUsuariosAgregar,idPublicacion);
      if(!servicio.valor) return res.status(servicio.statusCode).json({mensaje: servicio.mensaje});

      return res.status(200).json({
          mensaje: 'Usuarios agregados exitosamente'
        });
    }

      const servicio = await agregarUsuarioServicio(req);
      if(!servicio.valor) return res.status(servicio.statusCode).json({mensaje: servicio.mensaje});

      return res.status(200).json({
          mensaje: servicio.mensaje,
        });
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}