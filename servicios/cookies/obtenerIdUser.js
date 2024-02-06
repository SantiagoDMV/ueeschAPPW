import {verify } from "jsonwebtoken";

export default function obtenerIdUser(req,res) {
  const {UserCookie} = req.cookies
  const user = verify(UserCookie, process.env.TOKEN_SECRET )  
  return res.status(200).json({idUser:user.id})
}

