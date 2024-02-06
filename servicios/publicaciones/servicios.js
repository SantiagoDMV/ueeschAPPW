import PublicacionRepository from "../../data/publicacionesRepository"
import MultimediaRepository from "../../data/multimediaRepository";
import { verify } from "jsonwebtoken";

const repo = new PublicacionRepository();
const repoMultimedia = new MultimediaRepository();

export async function agregarUsuarioServicio(req) {
    try {
        const { UserCookie } = req.cookies;
        const {id_publicacion} = req.body;
        const user = verify(UserCookie, process.env.TOKEN_SECRET);

        const verificacion = await repo.buscarUsuarioId(user.id,id_publicacion);

        
        if(verificacion)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Parece que ya confirmaste tu asistencia. No te preocupes, ¡ya estás en la lista!"
            }

        const datos = await repo.agregarUsuarioServicio(id_publicacion,user.id); 
        
        if (!datos)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error, no sepudo registrar la asistencia"
        };


        return {
            mensaje: "Asistencia registrada",
            valor: true
        }


    } catch (error) {
        console.log("Ocurrio un error al registrar la asistencia: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}



export async function agregarUsuariosNuevosServicio(idsUsuariosAgregar,idPublicacion) {
    try {
        
        const verificacion = await repo.agregarUsuariosNuevosServicio(idsUsuariosAgregar,idPublicacion);

        
        if(!verificacion)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Ocurrio un error al intentar registrar un usuario als servicio."
            }

        return {
            mensaje: "Usuarios agregados exitosamente.",
            valor: true
        }


    } catch (error) {
        console.log("Ocurrio un error al registrar la asistencia: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}


export async function mostrarServicios() {
    try {
        const datos = await repo.mostrarServicios(); 
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

export async function mostrarAsistentesServicio(idPublicacion) {
    try {
        
        const datos = await repo.mostrarAsistentesServicio(idPublicacion);
        
        if (datos.length === 0)
        return {
            valor: true,
            datos: []
        };

        console.log('datos: ',datos)
        if (datos && datos.length > 0) {
            const idUsuarios = datos.map((asistente) => asistente.id_usuario);
            const detallesUsuarios = await repo.obtenerDetallesUsuarios(idUsuarios);
            return {
                datos: detallesUsuarios,
                valor: true
            }
        } 

        if (!datos)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno en el servidor"
        };

        console.log('datos_si ')
    } catch (error) {
        console.log("Ocurrio un error al mostrar las publicaciones: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}


export async function eliminarAsistentesServicio(idsUsuariosEliminar,idPublicacion) {
    try {
        const datos = await repo.eliminarAsistentes(idsUsuariosEliminar,idPublicacion); 
        
        if (!datos)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error, al intentar eliminar los usuarios seleccionados"
            };


        return {
            mensaje: 'Usuario/usuarios elimnados correctamente',
            valor: true
        }


    } catch (error) {
        console.log("Ocurrio un error al mostrar los usuarios: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}
