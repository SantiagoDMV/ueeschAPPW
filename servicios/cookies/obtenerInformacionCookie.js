import {verify } from "jsonwebtoken";

export default function obtenerInformacionCookie(req,res) {

  const {UserCookie} = req.cookies
  if(!UserCookie)   
  return console.log("La cookie no existe");  
  const user = verify(UserCookie, process.env.TOKEN_SECRET)
  
  return res.status(200).json(user)
}

