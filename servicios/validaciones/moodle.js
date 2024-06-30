import axios from "axios";
import UsuariosRepository from "../../data/usuariosRepository";


export async function validarEmailVerificacion(req,res){
    try {
        
        const {email_usuario}= req.body;

        if(!email_usuario) 
        return{
            status: 200,
            mensaje: 'Por favor, introduzca su email  para continuar.',
            datos: [],
            valor:false          
        }

        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email_usuario))
        return{
            status: 200,
            mensaje: 'El formato del email no es válido.',
            datos: [],
            valor:false          
        }
    
        const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]=${email_usuario}`)
        //console.log(respuesta.data.users.length) //no existe username =0  sino =1
        
        if(respuesta.data.users.length === 0) 
        return {
        status: 200,
         mensaje: 'El email ingresado no existe',
         datos: [],
         valor:false
        }

        // const usuarioRepo = new UsuariosRepository();
        const consulta = await UsuariosRepository.buscarUsuarioEmail(email_usuario);
     
         if (!consulta)
         return {
            status: 200,
             mensaje: 'El email ingresado no se encuentra registrado en nuestro sistema',
             datos: [],
             valor:false
            }

    if(consulta.password_usuario)
     return {
        status: 200,
         mensaje: 'Ya existe una cuenta con el email ingresado',
         datos: respuesta.data.users[0].id,
         valor:false
    }
    
     return {
        status: 200,
         mensaje: 'El email ha sido validado',
         datos: respuesta.data.users[0].id,
         valor:true
    }     
     

    } catch (error) {
        console.log(error)
        return{
            status: 200,
            mensaje: 'Hubo un problema al intentar obtener los datos, inténtalo nuevamente más tarde o contacta con soporte técnico para obtener ayuda.',
            datos: [],
            valor:false
           }
       }
    
   
}

export async function validarEmail(req,res){
    try {
        const {email}= req.body;
        if(!email) 
        return{
            status: 200,
            mensaje: 'Por favor, introduzca el email del estudiante para continuar.',
            datos: [],
            valor:false          
        }

        
        const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]=${email}`)
        //console.log(respuesta.data.users.length) //no existe username =0  sino =1
    
        if(respuesta.data.users.length === 0) 
        return {
        status: 200,
         mensaje: 'El email ingresado no existe en moodle.',
         datos: [],
         valor:false
        }

        // const usuarioRepo = new UsuariosRepository();
        const consulta = await UsuariosRepository.buscarUsuarioEmail(email);
     
         if (!consulta)
           return {
             valor: false,
           }
     if(consulta.id_rol !== 4)
     return {
        status: 200,
         mensaje: 'El email ingresado no pertenece a un estudiante.',
         datos: respuesta.data.users[0].id,
         valor:false
    }        
     
     
        
        return {
            status: 200,
             mensaje: 'El email a sido validado.',
             datos: respuesta.data.users[0].id,
             valor:true
        }        

        
        
    } catch (error) {
        console.log(error)
        return{
            status: 200,
            mensaje: 'Hubo un problema al intentar obtener los datos, inténtalo nuevamente más tarde o contacta con soporte técnico para obtener ayuda.',
            datos: [],
            valor:false
           }
       }
    
   
}
