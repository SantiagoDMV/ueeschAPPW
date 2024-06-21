import axios from 'axios'
import { validarEmailVerificacion,validarEmail, validarUsernameDB } from "../../../servicios/validaciones/moodle"

export default async function usuarios(req,res) {
    if(req.method === "GET"){
    }else if(req.method === "POST"){
        
        try {
            
            const {email} = req.body
            
            if(email){
                const respuestaValidaciones = await validarEmail(req);

                if(!respuestaValidaciones.valor){
                    return res.status(respuestaValidaciones.status).json({
                        mensaje: `${respuestaValidaciones.mensaje}`,
                        datos: respuestaValidaciones.datos,
                        valor: respuestaValidaciones.valor
                       })    
                } 
    
                return res.status(200).json({
                    mensaje: `${respuestaValidaciones.mensaje}`,
                    datos: respuestaValidaciones.datos,
                    valor: respuestaValidaciones.valor
                   })    
              
            }else{
            const respuestaValidaciones = await validarEmailVerificacion(req);
            
            
            if(!respuestaValidaciones.valor){
                return res.status(respuestaValidaciones.status).json({
                    mensaje: `${respuestaValidaciones.mensaje}`,
                    datos: respuestaValidaciones.datos,
                    valor: respuestaValidaciones.valor
                   })    
            } 

            return res.status(200).json({
                mensaje: `${respuestaValidaciones.mensaje}`,
                datos: respuestaValidaciones.datos,
                valor: respuestaValidaciones.valor
               })    
            }
        } catch (error) {
            console.log(error)
            return res.status(200).json({
                mensaje: 'Hubo un problema al intentar obtener los datos, inténtalo nuevamente más tarde o contacta con soporte técnico para obtener ayuda.',
                datos: [],
                valor:false
               })
           }
        
       
    }else if(req.method === "PUT"){
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}
