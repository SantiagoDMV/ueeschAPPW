import { serialize } from "cookie";
import { sign,verify } from "jsonwebtoken";

  export function ObtenerInformacionCookie (req){
  const {UserCookie} = req.cookies
  if(!UserCookie)   
  return console.log("La cookie no existe");  
  return verify(UserCookie, process.env.TOKEN_SECRET)
  }

  export function ObtenerInformacionDirecta (UserCookie){
    if(!UserCookie)   
    return false;  
    return verify(UserCookie, process.env.TOKEN_SECRET)
  }

  export const BorrarCookieUSer = (req,res,nombreCookie) => {
    try {
      const nuevaCookie = serialize(nombreCookie, null, {
        httpOnly: true,
        path: "/",
        maxAge: 0,
      });
      
      res.setHeader("Set-Cookie", nuevaCookie);
      return res.json("La cookie fue eliminada");
    } catch (error) {
      return res.json(error);
    }
  };

  export const ActualizarCookieUser= (req,campo,valor)=>{
    const {UserCookie} = req.cookies
      if(!UserCookie)
      return console.log('No existe una cookie en este momento')

      const user = verify(UserCookie, process.env.TOKEN_SECRET)
      
      switch(campo){ //puede ser el brak
        case 'email': user.email=valor; break;
        case 'cedula': user.cedula=valor; break;
        case 'nombre': user.nombre=valor; break;
        case 'apellido': user.apellido=valor; break;
        case 'rol': user.rol=valor; break;
        case 'imagen': user.imagen=valor; break;
      }

      const nuevoToken = sign(user,process.env.TOKEN_SECRET)

      const nuevaCookie= serialize('UserCookie',nuevoToken,{
        httpOnly:true,
        path: '/',
        maxAge:60*60*24*30
      })

      return nuevaCookie
  }


  

