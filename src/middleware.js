import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const cookie = request.cookies.get("UserCookie");

  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(
      cookie.value,
      new TextEncoder().encode(process.env.TOKEN_SECRET)
    );

    const userRole = payload.rol;
    const idMoodle = payload.id_moodle;
    const path = request.nextUrl.pathname;

    switch (path) {
      case "/perfil":
        return NextResponse.next();
      
      case "/publicaciones-servicios":
      case "/gestionusuarios":
      case "/regitromiembros":
      case "/seguimiento":
      case "/reportes":
        if (userRole !== 1 && userRole !== 2) {
          console.log("Redirecting to /");
          return NextResponse.redirect(new URL("/", request.url));
        }
        break;
      
      default:
        
      if(path.startsWith(`/moodle/`)){
      if ( userRole === 3 || userRole === 2 || userRole === 1) 
        return NextResponse.next();
        else
        return NextResponse.redirect(new URL(`/`, request.url));
      }

      if(path.startsWith(`/seguimiento/${idMoodle}`)){
          return NextResponse.next();
        }

        if ( !path.startsWith(`/seguimiento/${idMoodle}`) ) {
          if(userRole !== 1 && userRole !== 2 ) {
          return NextResponse.redirect(new URL(`/`, request.url));
          }else{
            return NextResponse.next();
          }
        }
        
      
    }
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/perfil",
    "/publicaciones-servicios",
    "/gestionusuarios",
    "/seguimiento",
    "/reportes",
    "/seguimiento/:path*",
    "/moodle/:path*"
  ],
};
