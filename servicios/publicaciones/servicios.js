import repo from "../../data/publicacionesRepository"
import repoMultimedia from "../../data/multimediaRepository";
import { verify } from "jsonwebtoken";

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
                mensaje: "Parece que ya confirmaste tu asistencia en este servicio. No te preocupes, ¡ya estás en la lista!"
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


export async function mostrarServicios(req) {
    try {
        const { UserCookie } = req.cookies;

        let user= null
        let verificacion= null
        if(UserCookie)
        user = verify(UserCookie, process.env.TOKEN_SECRET);
       

        if(user){
        verificacion = await repo.buscarUsuarioIdRegistrado(user.id);
        }

        const datos = await repo.mostrarServicios(); 
        const datosMultimedia = await repoMultimedia.obtenerImagenes(datos);
        
        if (!datos || !datosMultimedia)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error interno en el servidor"
            };

            
            if(!verificacion){
        return {
            datos: datos,
            datosMultimedia: datosMultimedia,
            verificacion: [],
            valor: true
        }
    }

    return {
        datos: datos,
        datosMultimedia: datosMultimedia,
        verificacion: verificacion,
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


export async function mostrarServiciosIdUsuario(req) {
    try {
        const { idUsuarioServicios } = req.body;
        const verificacion = await repo.buscarUsuarioIdRegistrado(idUsuarioServicios);
        
        if(!verificacion)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Ocurrio un error al intentar obtener los servicio."
            }

        const idServiciosUnicos = [...new Set(verificacion.map(item => item.id_servicio))];

        
        const datos = await repo.mostrarServiciosUsuarioRegistrado(idServiciosUnicos); 

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


export async function mostrarAsistentesServicio(idPublicacion) {
    try {
        
        const datos = await repo.mostrarAsistentesServicio(idPublicacion);
        
        if (datos.length === 0)
        return {
            valor: true,
            datos: []
        };

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
        console.log("Ocurrio un error al eliminar el registro: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}





export async function eliminarAsistenciaUsuario(req,idPublicacion) {
    try {
        const { UserCookie } = req.cookies;
        const user = verify(UserCookie, process.env.TOKEN_SECRET);

        const datos = await repo.eliminarAsistentes(user.id,idPublicacion); 
        
        if (!datos)
            return {
                statusCode: 500,
                valor: false,
                mensaje: "Error, al intentar eliminar el registro en el servicio seleccionado"
            };


        return {
            mensaje: 'Registro elimniado exitosamente',
            valor: true
        }


    } catch (error) {
        console.log("Ocurrio un error al eliminar el registro: ", error)
        return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno del servidor"
        };
    }
}
