import {verify } from "jsonwebtoken";

export default function obtenerInformacionCookie(cookie) {
  const user = verify(cookie, process.env.TOKEN_SECRET)  
  return user
}

