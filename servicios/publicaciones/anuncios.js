import PublicacionRepository from "../../data/publicacionesRepository"
import MultimediaRepository from "../../data/multimediaRepository";

const repoNoticias = new PublicacionRepository();
export async function mostrarAnuncios() {
    try {
        const datos = await repoNoticias.mostrarAnuncios(); 
        
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
        console.log("Ocurrio un error al mostrar las publicaciones: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}

