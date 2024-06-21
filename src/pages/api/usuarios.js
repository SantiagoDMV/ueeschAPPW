import {obtenerUsuarios,obtenerInformacionUsuario,registrarUsuarios,registrarUsuariosAmbosSistemas, actualizarUsuarios,actualizarFechaEliminacion,eliminarUsuarios,actualizarImagenUsuarios} from "../../../servicios/usuarios" 

export default async function usuarios(req,res) {
    if(req.method === "GET"){
        const peticion = await obtenerUsuarios(req,res);
        if(!peticion.valor)
        return res.status(peticion.statusCode).json(peticion);
        return res.status(200).json(peticion.datos);
    }else if(req.method === "POST"){
        if(req.body.idUser){
            const peticion = await obtenerInformacionUsuario(req);
            if(!peticion.valor)
            return res.status(peticion.statusCode).json(peticion);
            return res.status(200).json({datos: peticion.datos})
        }
        if(req.body.userEmails){
            
            const peticion = await eliminarUsuarios(req);
            
            if(!peticion.valor)
            return res.status(peticion.statusCode).json(peticion);
            return res.status(200).json({mensaje: "Usuario eliminado con exito"})
        }
        const {usuariosAmbosSistemas} = req.body;
        if(usuariosAmbosSistemas){ 
            const peticion = await registrarUsuariosAmbosSistemas(usuariosAmbosSistemas);
            if(!peticion.valor)
            return res.status(peticion.statusCode).json(peticion);
        }else{
        const peticion = await registrarUsuarios(req,res);
        if(!peticion.valor)
        return res.status(peticion.statusCode).json(peticion);
        }

        return res.status(200).json({mensaje: "Usuario registrado con exito"})
    }else if(req.method === "PUT"){
        const {cambio} = req.query;
        if(!cambio){
            const peticion = await actualizarUsuarios(req);
            if(!peticion.valor)
            return res.status(peticion.statusCode).json(peticion);
        }
        
        switch(cambio){
            case 'imagen':
                const peticion = await actualizarImagenUsuarios(req,res);
                if(!peticion.valor)
                return res.status(peticion.statusCode).json(peticion);    
                else
                return res.status(200).json(peticion.imagen);    
            break;
            case 'fecha_eliminacion':
                    const peticionrestauracion = await actualizarFechaEliminacion(req,res);

                    if(!peticionrestauracion.valor)
                    return res.status(peticionrestauracion.statusCode).json(peticionrestauracion);    
    
                    return res.status(200).json('Restauración completada');    
            break;
        }

        return res.status(200).json({mensaje: "Usuario actualizado con exito"})
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}
