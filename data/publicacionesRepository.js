import conexion from "./conexion/db"
export default class PublicacionRepository{
    constructor(){
        if(!PublicacionRepository.instance){
            const conexionDb = new conexion();
            PublicacionRepository.instance = conexionDb.getInstance();
        }
    }

    getInstance(){
        return PublicacionRepository.instance;
    }

    async mostrarPublicaciones(){
        const prisma = this.getInstance();
        try {
            const respuesta = await prisma.publicacion.findMany({
              where: {
                id_tipo_publicacion: {
                  in:[2,3],
                },
                eliminado_en: null                
              },
                take:6,
                orderBy:{
                    id_publicacion: 'desc',
                }
            });    
            prisma.$disconnect();
            return respuesta
        } catch (error) {
            console.log(error)
            prisma.$disconnect();
            return false
        }
    }


    async mostrarPublicacionesPerfil(id){
      const prisma = this.getInstance();
      try {
          const respuesta = await prisma.publicacion.findMany({
            where: {
              id_usuario : id,
              eliminado_en: null,                
            },
              take:6,
              orderBy:{
                  id_publicacion: 'desc',
              }
          });    
          prisma.$disconnect();
          return respuesta
      } catch (error) {
          console.log(error)
          prisma.$disconnect();
          return false
      }
  }


    async mostrarPublicacionesGestion(){
      const prisma = this.getInstance();
      try {
          const respuesta = await prisma.publicacion.findMany({
              //take:6,
              orderBy:[
                {
                  id_publicacion: 'desc',
                },
                {
                  eliminado_en: {
                    sort: 'desc',
                    nulls: 'first'
                  }
                },
                
            ]

          });    
          prisma.$disconnect();
          return respuesta
      } catch (error) {
          console.log(error)
          prisma.$disconnect();
          return false
      }
  }

  async obtenerDetallesUsuariosGestion(idUsuarios) {
    const prisma = this.getInstance();
    try {
      const usuarios = await prisma.usuario.findMany({
        where: {
          id_usuario: {
            in: idUsuarios,
          },
        },
        select: {
          id_usuario: true,
          nombre_usuario: true,
          apellido_usuario: true,
          email_usuario: true,
        },
      });
  
      prisma.$disconnect();
      return usuarios;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }

  async mostrarAnuncios(){
    const prisma = this.getInstance();
    try {
        const respuesta = await prisma.publicacion.findMany({
            //take:3,
            orderBy:{
                id_tipo_publicacion: 'asc',
            },
            where:{
              id_tipo_publicacion: 2,
              eliminado_en: null
            }
        });    
        prisma.$disconnect();
        return respuesta
    } catch (error) {
        console.log(error)
        prisma.$disconnect();
        return false
    }
}


  async mostrarNoticias(){
    const prisma = this.getInstance();
    try {
        const respuesta = await prisma.publicacion.findMany({
            take:6,
            orderBy:{
                id_tipo_publicacion: 'asc',
            },
            where:{
              id_tipo_publicacion: 3,
              eliminado_en: null
            }
        });    
        prisma.$disconnect();
        return respuesta
    } catch (error) {
        console.log(error)
        prisma.$disconnect();
        return false
    }
}
    
async mostrarServicios(){
  const prisma = this.getInstance();
  try {
      const respuesta = await prisma.publicacion.findMany({
          //take:3,
          orderBy:{
            id_publicacion: 'desc',
          },
          where:{
            id_tipo_publicacion: 1,
            eliminado_en: null
          }
      });    
      prisma.$disconnect();
      return respuesta
  } catch (error) {
      console.log(error)
      prisma.$disconnect();
      return false
  }
}

    async obtenerPublicacion(idPublicacion){
      console.log(idPublicacion)
        const prisma = this.getInstance();
        try {
            const respuesta = await prisma.publicacion.findUnique({
                where: {
                  id_publicacion: idPublicacion,
                },
              });  
            prisma.$disconnect();
            return respuesta
        } catch (error) {
            console.log(error)
            prisma.$disconnect();
            return false
        }
    }
    
    async crearPublicacion (idUser,titulo,contenido,id_tipo_publicacion,fecha_eliminacion){
      const idTipoPublicacionInt = parseInt(id_tipo_publicacion, 10);
      const prisma = this.getInstance();
      try {
        const respuesta = await prisma.publicacion.create({
          data:{
            id_usuario : idUser, 
            id_tipo_publicacion: idTipoPublicacionInt,
            titulo_publicacion: titulo, 
            contenido_publicacion: contenido, 
            eliminado_en: !fecha_eliminacion ? null : new Date(fecha_eliminacion)
          }
        });
        prisma.$disconnect();
        return respuesta;
      } catch (error) {
          console.log(error)
          prisma.$disconnect();
          return false
      } 
    }

    async actualizarInformacion(idPublicacion,titulo,contenido,id_tipo_publicacion,fecha_eliminacion){
      const prisma = this.getInstance();
      const idTipoPublicacionInt = parseInt(id_tipo_publicacion, 10);
      try {
          const respuesta = await prisma.publicacion.update({
              where: {
                id_publicacion: idPublicacion,
              },
              data:{
                titulo_publicacion:titulo,
                contenido_publicacion: contenido,
                id_tipo_publicacion: idTipoPublicacionInt,
                eliminado_en:!fecha_eliminacion ? null : new Date(fecha_eliminacion)
              }
            });  
          prisma.$disconnect();
          return respuesta
      } catch (error) {
          console.log(error)
          prisma.$disconnect();
          return false
      }
  }

  async eliminacionPublicacionLogica(ids) {
    const prisma = this.getInstance();
    try {
      const fechaActual = new Date();
          const fechaActualLocal = new Date(
            fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
          );

      await prisma.publicacion.updateMany({
        where: {
          id_usuario: {
            in: ids.map(id => parseInt(id, 10)),
          },
        },
          data: {
            eliminado_en: fechaActualLocal
          }
        
      });

      prisma.$disconnect();
      return true;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }
  


  async restauracionPublicacionLogica(ids) {
    const prisma = this.getInstance();
    try {
      await prisma.publicacion.updateMany({
        where: {
          id_usuario: parseInt(ids)
        },
          data: {
            eliminado_en: null
          }
        
      });

      prisma.$disconnect();
      return true;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }
  

  async eliminarPublicacion(ids) {
    const prisma = this.getInstance();
    try {
      await prisma.publicacion.deleteMany({
        where: {
          id_publicacion: {
            in: ids.map(id => parseInt(id, 10)),
          },
        },
      });
  
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }


  async eliminarPublicacionIdUnico(ids) {
    const prisma = this.getInstance();
    try {
      await prisma.publicacion.deleteMany({
        where: {
          id_publicacion: ids
        },
      });
  
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }
  
////SERVICIOS

  async mostrarAsistentesServicio(idPublicacion){
    const prisma = this.getInstance();
    try {
        const respuesta = await prisma.asistencia_servicio.findMany({
            orderBy:{
              id_asistencia_servicio: 'desc',
            },
            where:{
              id_servicio: idPublicacion
            },
            select:{
              id_usuario: true,    
            }
        });   
        prisma.$disconnect();
        return respuesta
    } catch (error) {
        console.log(error)
        prisma.$disconnect();
        return false
    }
  }
  
  async eliminarAsistentes(idsUsuariosEliminar, idPublicacion) {
    const prisma = this.getInstance();
    try {
      await prisma.asistencia_servicio.deleteMany({
        where: {
          id_servicio: idPublicacion,
          id_usuario: {
            in: idsUsuariosEliminar,
          },
        },
      });
  
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }
  
  async obtenerDetallesUsuarios(idUsuarios) {
    const prisma = this.getInstance();
    try {
      const usuarios = await prisma.usuario.findMany({
        where: {
          id_usuario: {
            in: idUsuarios,
          },
        },
        select: {
          id_usuario: true,
          nombre_usuario: true,
          apellido_usuario: true,
          email_usuario: true,
        },
      });
  
      prisma.$disconnect();
      return usuarios;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }

  async agregarUsuariosNuevosServicio(idsUsuariosAgregar, idPublicacion) {
    const prisma = this.getInstance();
  
    try {
      const registrosCreados = await Promise.all(
        idsUsuariosAgregar.map(async (idUsuario) => {
          return await prisma.asistencia_servicio.create({
            data: {
              id_servicio: idPublicacion,
              id_usuario: idUsuario,
            },
          });
        })
      );
  
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.error(error);
      prisma.$disconnect();
      return false;
    }
  }
    
    async agregarUsuarioServicio(id_publicacion,userId){
      const prisma = this.getInstance();
      try {
          const respuesta = await prisma.asistencia_servicio.create({
              data:{
                id_servicio: id_publicacion,
                id_usuario: userId
              }
          });    
          prisma.$disconnect();
          return respuesta
      } catch (error) {
          console.log(error)
          prisma.$disconnect();
          return false
      }
  }
  
  async buscarUsuarioId(idUser,id_publicacion){
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.asistencia_servicio.findFirst({
        where: {
          id_servicio: id_publicacion,
          id_usuario: idUser,
        },
      });
        prisma.$disconnect();
        return respuesta
    } catch (error) {
        console.log(error)
        prisma.$disconnect();
        return false
    }
}
}