import { ObtenerInformacionCookie } from "../util/cookies/UserCookie"
import { verify } from "jsonwebtoken";
import { buscarDatos, eliminarDatos, enviarDatos } from "./googleDriveService/GoogleDrive";
import repo from "../data/publicacionesRepository";

const googleId = process.env.GOOGLE_ID_CPUBLICACIONES;

export async function mostrarNoticias() {
    console.log('paso')
    try {
        const datos = await repo.mostrarNoticias();
        if (!datos)

            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error interno en el servidor"
            };


        return {
            datos: datos,
            valor: true
        }


    } catch (error) {
        console.log("Ocurrio un error al mostrar las noticias: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}

export async function aumentoLikes(req) {
    const { idPublicacion } = req.body;
    const userInf = ObtenerInformacionCookie(req);

    if (!idPublicacion || !userInf) {
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Parámetros inválidos o inexistentes"
        };
    }
    try {
        const informacionPublicacion = await repo.obtenerPublicacion(idPublicacion);
        if (!informacionPublicacion)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Publicación no encontrada"
            };

        let solicitud;

        if (!informacionPublicacion.likes.includes(userInf.id)) {
            solicitud = await repo.aumentoLikes(idPublicacion, informacionPublicacion, userInf);
        } else {
            const nuevoVector = informacionPublicacion.likes.filter(
                (e) => e !== userInf.id
            );
            solicitud = await repo.quitarLikes(idPublicacion, informacionPublicacion, nuevoVector);
        }

        if (!solicitud)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error interno en el servidor"
            };

        return {
            valor: true,
        };
    } catch (error) {
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}


export async function crearNoticia(req) {
    try {
        const {elementos }= req.body
        const { UserCookie } = req.cookies;
        const user = verify(UserCookie, process.env.TOKEN_SECRET);
  
        const datos = await repo.crearNoticia(elementos,user.id);
        if (!datos)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error interno en el servidor"
            };


        return {
            valor: true
        }


    } catch (error) {
        console.log("Ocurrio un error al crear la noticia: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}