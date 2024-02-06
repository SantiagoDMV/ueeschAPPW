import PublicacionRepository from "../../data/publicacionesRepository"
import MultimediaRepository from "../../data/multimediaRepository";

const repoNoticias = new PublicacionRepository();
const repoMultimedia = new MultimediaRepository();
export async function mostrarNoticias() {
    try {
        const datos = await repoNoticias.mostrarNoticias(); 
        const datosMultimedia = await repoMultimedia.obtenerImagenes(datos);
        
        if (!datos || !datosMultimedia)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error interno en el servidor"
            };


        return {
            datos: datos,
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

