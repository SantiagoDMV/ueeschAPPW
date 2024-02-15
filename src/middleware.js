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
      case "/administracion":
      case "/gestionmoodle":
      case "/gestionpublicaciones":
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
        
        if (  (userRole !== 1 && userRole !== 2) && !path.startsWith(`/seguimiento/${idMoodle}`) ) {
          return NextResponse.redirect(new URL(`/seguimiento/${idMoodle}`, request.url));
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
    "/gestionmoodle",
    "/gestionpublicaciones",
    "/gestionusuarios",
    "/seguimiento",
    "/administracion",
    "/reportes",
    "/supervision",
    "/seguimiento/:path*",
  ],
};
