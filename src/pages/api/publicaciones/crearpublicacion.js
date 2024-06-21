import {mostrarPublicaciones,mostrarPublicacionId,crearPublicacion,actualizarPublicacion,eliminarPublicacion} from "../../../../servicios/publicaciones"

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
        if(req.body.publicacionesIds){
            const peticion = await eliminarPublicacion(req);
            if(!peticion.valor)
            return res.status(peticion.statusCode).json(peticion);

            
            return res.status(200).json({mensaje: "Publicación(es) eliminada(s) con exito"})
        }
        
        const {publicacionId} = req.query
//         console.log(req.body)
//         // Buscar las etiquetas <img> en el contenido HTML
//         const { contenido } = req.body;
// let contenidoHtml = contenido;

// var recursosMultimedia = [];
// var tiposArchivo = [];

// var inicioMultimedia = contenidoHtml.indexOf('data:');
// while (inicioMultimedia !== -1) {
//   var finMultimedia = contenidoHtml.indexOf('"', inicioMultimedia);
//   var recursoMultimedia = contenidoHtml.substring(inicioMultimedia, finMultimedia + 1);
//   recursosMultimedia.push(recursoMultimedia);

//   // Determinar el tipo de archivo
//   var tipoArchivo = recursoMultimedia.split(':')[1].split('/')[0];
//   tiposArchivo.push(tipoArchivo);

//   inicioMultimedia = contenidoHtml.indexOf('data:', finMultimedia);
// }

// console.log('Recursos Multimedia:', recursosMultimedia);
// console.log('Tipos de Archivo:', tiposArchivo);
        
// const urls = ['https://www.youtube.com/watch?v=Ihx6lfl-RnE','http://localhost:3000/perfil']

// // Reemplazar las imágenes en base64 con las URLs proporcionadas
// for (let i = 0; i < urls.length; i++) {
//   const imagenBase64 = recursosMultimedia[i];
//   const url = urls[i];
  
//   // Reemplazar en el contenido HTML
//   contenidoHtml = contenidoHtml.replace(imagenBase64, `${url}" /`);
// }

// console.log('Contenido HTML con URLs:', contenidoHtml);        


        if(!publicacionId){
            console.log(req.body)
            const servicio = await crearPublicacion(req);
            if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);

            id_publicacion
            return res.status(200).json({mensaje: 'Operación completada exitosamente', id_publicacion: servicio.id_publicacion})
        }else{
        const servicio = await mostrarPublicacionId(req);
        return res.status(200).json({
            datos: servicio.datos,
            datosMultimedia: servicio.datosMultimedia,
        });
        }
        return res.status(200).json({mensaje: 'Operación completada exitosamente'})
        
    }else  if(req.method === "PUT"){
        const servicio = await actualizarPublicacion(req);
    if(!servicio.valor) return res.status(servicio.statusCode).json(servicio.mensaje);
        // return res.status(200).json({
        //     datos: servicio.datos,
        //     datosMultimedia: servicio.datosMultimedia,
        //   });
        return res.status(200).json({'mensaje': 'Publicación actualizada'})
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}