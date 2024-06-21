import {actualizarUsuariosImportados} from "../../../../servicios/usuarios" 

export default async function usuarios(req,res) {
    if(req.method === "GET"){
    
    }else if(req.method === "POST"){    
       const peticion = await registrarUsuarios(req,res);
       if(!peticion.valor)
        return res.status(peticion.statusCode).json(peticion);

        return res.status(200).json({mensaje: "Usuario registrado con exito"})
    }else if(req.method === "PUT"){
        const peticion = await actualizarUsuariosImportados(req,res);
        
        if(!peticion.valor)
          return res.status(peticion.statusCode).json(peticion);
 
         return res.status(200).json({mensaje: "Usuario actualizado con exito"})
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}
