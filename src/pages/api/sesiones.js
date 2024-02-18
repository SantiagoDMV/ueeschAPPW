import {login_usuarios,cambiarContraseña, obtenerCuentasVinculadas} from "../../../servicios/sesiones";
import {BorrarCookieUSer} from '../../../servicios/cookies/manejoCookies'

export default async function sesiones(req, res) {
  
  if (req.method === "POST") {
    try {
      if(req.body.moodleCuentasVinculadas){
        const respuesta = await obtenerCuentasVinculadas(req)
        if(!respuesta.valor)
        return res.status(respuesta.status).json({mensaje: respuesta.mensaje})

        return res.status(200).json(respuesta.cuentas)
      }
      const respuesta = await login_usuarios(req, res);

      if(respuesta.redirectTo){
      return res.status(respuesta.status).json(respuesta)
      }

      if(!respuesta.valor)
        return res.status(respuesta.status).json({mensaje: respuesta.mensaje})
        
          
        return res.status(respuesta.status).json(respuesta.datos)  
    } catch (error) {
      
      return res.status(404).json({mensaje: 'Se ha producido un error interno en el servidor. Por favor, póngase en contacto con nuestro equipo de soporte técnico para obtener asistencia.'})  
    }
  
  }else if(req.method === "GET"){
    BorrarCookieUSer(req,res,process.env.COOKIE_SESSION)  
  }else if(req.method === "PUT"){
    const servicioSesiones = await cambiarContraseña(req) 
    if(!servicioSesiones.valor) return res.status(servicioSesiones.statusCode).json(servicioSesiones)
    
    return res.status(200).json({mensaje: "La contraseña ha sido cambiada exitosamente"})
  }else{
    return res.status(405).json({mensaje:"Método HTTP no permitido"});
  }
}



