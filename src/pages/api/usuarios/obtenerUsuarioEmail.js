import {obtenerUsuarioEmail} from "../../../../servicios/usuarios" 

export default async function usuarios(req,res) {
    if(req.method === "POST"){
        try {
            const peticion = await obtenerUsuarioEmail(req);

            return res.status(200).json({valor: peticion.valor})    
        } catch (error) {
            console.log('Error al intentar obtenre los datos: ',error)
        }
        
        
    }else{
        return res.status(405).json({mensaje:"Método HTTP no permitido"});
      }
}
