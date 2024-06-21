import repoMultimedia from "../data/multimediaRepository"
import { ObtenerInformacionCookie } from "../util/cookies/UserCookie"
import { verify } from "jsonwebtoken";
import { buscarDatos, eliminarDatos, enviarDatos } from "./googleDriveService/GoogleDrive";

const googleId = process.env.GOOGLE_ID_CPUBLICACIONES;

export async function mostrarMultimedia() {
    try {
        const datosMultimedia = await repoMultimedia.mostrarMultimedia();
        
        if (!datosMultimedia)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error interno en el servidor"
            };


        return {
            datosMultimedia: datosMultimedia,
            valor: true
        }


    } catch (error) {
        console.log("Ocurrio un error al mostrar las publicaciones: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}

// export async function aumentoLikes(req) {
//     const { idPublicacion } = req.body;
//     const userInf = ObtenerInformacionCookie(req);

//     if (!idPublicacion || !userInf) {
//         return {
//             statusCode: 500,
//             valor: false,
//             mensaje: "Parámetros inválidos o inexistentes"
//         };
//     }
//     try {
//         const informacionPublicacion = await repo.obtenerPublicacion(idPublicacion);
//         if (!informacionPublicacion)
//             return {
//                 statusCode: 500,
//                 valor: false,
//                 mensaje: "Publicación no encontrada"
//             };

//         let solicitud;

//         if (!informacionPublicacion.likes.includes(userInf.id)) {
//             solicitud = await repo.aumentoLikes(idPublicacion, informacionPublicacion, userInf);
//         } else {
//             const nuevoVector = informacionPublicacion.likes.filter(
//                 (e) => e !== userInf.id
//             );
//             solicitud = await repo.quitarLikes(idPublicacion, informacionPublicacion, nuevoVector);
//         }

//         if (!solicitud)
//             return {
//                 statusCode: 500,
//                 valor: false,
//                 mensaje: "Error interno en el servidor"
//             };

//         return {
//             valor: true,
//         };
//     } catch (error) {
//         return {
//             statusCode: 500,
//             valor: false,
//             mensaje: "Error interno del servidor"
//         };
//     }
// }



export async function crearPublicacion(req) {
    try {

        const { UserCookie } = req.cookies;
        const user = verify(UserCookie, process.env.TOKEN_SECRET);
        const multimedia = req.body[0];
        const { tituloP } = req.body[1]; //titulo
        const { contenidoP } = req.body[1]; //contenido_Publicacion
        const cedula = user.cedula;
        let multimediaArray = [];

        for (let i = 0; i < multimedia.length; i++) {
             const fechaActual = new Date().toISOString();

             const fechaHoraFormateada = fechaActual
                 .replace(/T/g, '_') // Reemplazar "T" por "_"
                 .replace(/:/g, '-'); // Reemplazar ":" por "-"


             let nombre = `${cedula}-${tituloP}-${i}-${fechaHoraFormateada}`;

             let existe = await buscarDatos(nombre, googleId);

             if (existe.valor) {

                 await eliminarDatos(nombre, existe.files);
                 multimediaArray.push(
                     `${process.env.URL_GOOGLE_DRIVE_IMAGES}${await enviarDatos(multimedia[i], googleId, nombre)}`);
                 console.log(multimediaArray);
             } else {
                 console.log("existe nuevo");
                 multimediaArray.push(
                     `${process.env.URL_GOOGLE_DRIVE_IMAGES}${await enviarDatos(multimedia[i], googleId, nombre)}`);
             }
        }////////////////FIN DEL FOR        
        
        const datos = await repo.crearPublicacion(user.id, tituloP, contenidoP);
        if (!datos)
             return {
                 statusCode: 500,
                 valor: false,
                 mensaje: "Error interno en el servidor"
             };
        console.log(multimediaArray)
        const datosMultimedia = await repoMultimedia.crearMultimedia('*', multimediaArray, datos.id_publicacion,null,);

            if (!datosMultimedia)
             return {
                 statusCode: 500,
                 valor: false,
                 mensaje: "Error interno en el servidor"
             };


         return {
             valor: true
         }


    } catch (error) {
        console.log("Ocurrio un error al mostrar las publicaciones: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}