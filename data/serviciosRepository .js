//import { PrismaClient } from "@prisma/client";
import conexionDb from "./conexion/db"

class ServiciosRepository {

  constructor() {
    if (!ServiciosRepository.instance) {
      const conexion = new conexionDb;
      ServiciosRepository.instance = conexion.getInstance();
    }
  }

  getInstance() {
    return ServiciosRepository.instance;
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


async mostrarServicios(){
  const prisma = this.getInstance();
  try {
      const respuesta = await prisma.publicacion.findMany({
          //take:3,
          orderBy:{
            id_publicacion: 'desc',
          },
          where:{
            id_tipo_publicacion: 1
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


}
export default ServiciosRepository;
