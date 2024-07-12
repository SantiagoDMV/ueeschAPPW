import repoNoticias from "../../data/publicacionesRepository"
import repoMultimedia from "../../data/multimediaRepository";


export async function mostrarNoticiasIndex() {
    try {
        const datos = await repoNoticias.mostrarNoticiasIndex(); 
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

