//import { PrismaClient } from "@prisma/client";
import usuarios from "../src/pages/api/usuarios";
import conexionDb from "./conexion/db";

class UsuariosRepository {
  constructor() {
    if (!UsuariosRepository.instance) {
      const conexion = new conexionDb();
      UsuariosRepository.instance = conexion.getInstance();
    }
  }

  getInstance() {
    return UsuariosRepository.instance;
  }

  async obtenerUsuarios() {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findMany({
        orderBy:[
          {
          id_rol: 'asc',
        },
        {
          apellido_usuario: 'asc',
        },
       ],
        where:{
          eliminado_en: null
        }
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }


  async obtenerUsuarioInformacion(id) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where:{
          id_usuario: id
        }
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }

  async obtenerUsuariosAdmin() {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findMany({
        orderBy:[
          {
          id_rol: 'asc',
        },
        {
          apellido_usuario: 'asc',
        },
       ],
    });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }

  async buscarUsuarioEmail(email) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where: {
          email_usuario: email,
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }

  async buscarUsuarioEmailNoEliminados(email) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where: {
          email_usuario: email,
          eliminado_en: null
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }

  async buscarUsuarioId(id) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where: {
          id_usuario: id,
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }


  async buscarUsuarioCedula(cedula) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where: {
          cedula_usuario: cedula,
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false
    }
  }

  async buscarUsuarioIdRol(id) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where: {
          id_rol: id,
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }

  async buscarUsuarioIdMoodleEstudiante(id) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where: {
          id_moodle: id,
          id_rol:3
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }

  async buscarUsuariosEmailCedula(email, cedula) {
    const prisma = this.getInstance();
    try {
      const respuestaDB = await prisma.usuario.findMany({
        where: {
          OR: [
            {
              email_usuario: email,
            },
            {
              cedula_usuario: cedula,
            },
          ],
        },
      });
      prisma.$disconnect();
      return respuestaDB;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }

  async buscarUsuariosPorEmailYCedula(emails, cedulas) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findMany({
        where: {
          OR: [
            {
              email_usuario: { in: emails },
            },
            {
              cedula_usuario: { in: cedulas },
            },
          ],
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }


  async buscarUsuarioEmailCedula(email, cedula) {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.usuario.findFirst({
        where: {
          OR: [
            {
              email_usuario: email,
            },
            {
              cedula_usuario: cedula,
            },
          ],
        },
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
    }
  }


  async crearUsuarioAmbos(idMoodle,hashingPassw, rol_usuario, nombre_usuario, apellido_usuario, cedula_usuario, email_usuario) {
    const prisma = this.getInstance();
    try {
      const imagen_usuario = `${process.env.IMAGEN_PREDT_USER}`;
      //const fecha_actual = new Date();
      const idRol = parseInt(rol_usuario);
      await prisma.$transaction([
        prisma.usuario.create({
          data: {
            id_rol: idRol, //SE AUMENTA 1 PORQUE EL SUPER ADMINISTRADOR EXISTE EN LA DB 
            nombre_usuario: nombre_usuario,
            apellido_usuario: apellido_usuario,
            cedula_usuario: cedula_usuario, 
            email_usuario: email_usuario,
            imagen_usuario: imagen_usuario,
            password_usuario: hashingPassw,
            ultimo_acceso: null,
            actualizado_en: null,
            eliminado_en: null,
            id_moodle: idMoodle === -1 ? null : idMoodle,
          },
        }),
      ]);
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }


  async crearUsuario(hashingPassw, idRol, userData) {
    const prisma = this.getInstance();
    try {
      const imagen_usuario = `${process.env.IMAGEN_PREDT_USER}`;
      const fecha_actual = new Date();

      await prisma.$transaction([
        prisma.usuario.create({
          data: {
            ...userData,
            id_rol: idRol,
            imagen_usuario: imagen_usuario,
            password_usuario: hashingPassw,
            ultimo_acceso: null,
            actualizado_en: null,
            eliminado_en: null,
          },
        }),
      ]);
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }

  // Dentro de importarUsuariosMoodle
  async importarUsuariosMoodle(usuariosAModificar, usuariosLocales) {
    const prisma = this.getInstance();
    try {
      const imagen_usuario = `${process.env.IMAGEN_PREDT_USER}`;
      const fecha_actual = new Date();
  
      const updates = [];
      const creates = [];
  
      for (const usuarioMoodle of usuariosAModificar) {
        const usuarioLocal = usuariosLocales.find(
          (u) => u.email_usuario === usuarioMoodle.email
        );
  
        if (usuarioLocal) {
          if (
            (usuarioLocal.id_rol !== 1 && usuarioLocal.id_rol !== 2) &&
            (usuarioLocal.id_moodle !== usuarioMoodle.id ||
              usuarioLocal.nombre_usuario !== usuarioMoodle.firstname ||
              usuarioLocal.apellido_usuario !== usuarioMoodle.lastname)
          ) {
            console.log("Dentro de la actualización");
            updates.push({
              where: { email_usuario: usuarioMoodle.email },
              data: {
                id_moodle: usuarioMoodle.id,
                nombre_usuario: usuarioMoodle.firstname,
                apellido_usuario: usuarioMoodle.lastname,
              },
            });
          }
        } else {
          //console.log("Dentro de crear");
          creates.push({
            id_moodle: usuarioMoodle.id,
            id_rol: 4,
            nombre_usuario: usuarioMoodle.firstname,
            apellido_usuario: usuarioMoodle.lastname,
            email_usuario: usuarioMoodle.email,
            imagen_usuario: imagen_usuario,
            ultimo_acceso: null,
            cedula_usuario: '',
            password_usuario: '',
            actualizado_en: null,
            eliminado_en:null,
          });
        }
      }
  
      if (updates.length > 0) {
        await Promise.all(
          updates.map((update) =>
            prisma.usuario.update({
              where: update.where,
              data: update.data,
            })
          )
        );
        prisma.$disconnect();
      }
  
      if (creates.length > 0) {
        await prisma.usuario.createMany({ data: creates });
        prisma.$disconnect();
      }
  
      return true;
    } catch (error) {
      prisma.$disconnect();
      console.error("Error en importarUsuariosMoodle:", error);
      return false;
    }
  }
  

// Dentro de importarUsuariosMoodleEliminar
async importarUsuariosMoodleEliminar(usuariosEliminar) {
  const prisma = this.getInstance();
  try {
    const emailsEliminar = usuariosEliminar.map((usuarioLocal) => usuarioLocal.email_usuario);

    if (emailsEliminar.length > 0) {
      await prisma.usuario.deleteMany({
        where: {
          email_usuario: {
            in: emailsEliminar,
          },
        },
      });
    }

    prisma.$disconnect();
    return true;
  } catch (error) {
    prisma.$disconnect();
    console.error("Error en importarUsuariosMoodleEliminar:", error);
    return false;
  }
}


async actualizarIdMoodle(id_moodle, email) {
  const prisma = this.getInstance();
  try {
    await prisma.usuario.updateMany({
      where: {
        email_usuario: email,
      },
      data: {
        id_moodle: id_moodle
      },
    });
    prisma.$disconnect();
    return true;
  } catch (error) {
    console.log(error);
    prisma.$disconnect();
    return false;
  }
}

  async actualizarUsuarioPassword(id_rol, cedula_usuario,email, password_usuario) {
    const prisma = this.getInstance();
    try {
      await prisma.usuario.updateMany({
        where: {
          email_usuario: email,
        },
        data: {
          id_rol: parseInt(id_rol),
          cedula_usuario:cedula_usuario,
          password_usuario: password_usuario,
        },
      });
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }

  async actualizarUsuario(emailActual, rol, cedula, email, nombre, apellido,hashingPassw) {
    
    const prisma = this.getInstance();
    try {
      const fecha_actual = new Date();
      if(!hashingPassw)
      await prisma.usuario.updateMany({
        where: {
          email_usuario: emailActual,
        },
        data: {
          id_rol: rol,
          email_usuario: email,
          nombre_usuario: nombre,
          apellido_usuario: apellido,
          cedula_usuario: cedula,
          actualizado_en: fecha_actual,
        },
      });
      else
      await prisma.usuario.updateMany({
        where: {
          email_usuario: emailActual,
        },
        data: {
          id_rol: rol,
          email_usuario: email,
          nombre_usuario: nombre,
          apellido_usuario: apellido,
          cedula_usuario: cedula,
          actualizado_en: fecha_actual,
          password_usuario: hashingPassw
        },
      });
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }


  // await prisma.usuario.deleteMany({
      //   where: {
      //     id_moodle: {
      //       in: userIds,
      //     },
      //   },
      // });


      async eliminacionLogicaPorIdMoodle(id) {
        let prisma = this.getInstance();
        try {
          const fechaActual = new Date();
          const fechaActualLocal = new Date(
            fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
          );
            
          await prisma.usuario.updateMany({
            where: {
              id_usuario: id,
            },
            data: {
              eliminado_en: fechaActualLocal
            }
          });
          prisma.$disconnect();
          return true;
        } catch (error) {
          console.log(error);
          prisma.$disconnect();
          return false;
        }
      }

  async eliminarUsuario(userIds) {
    let prisma = this.getInstance();
    try {
      const fechaActual = new Date();
      const fechaActualLocal = new Date(
        fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
      );
      const userIDS = userIds.map(userId => parseInt(userId, 10));
        
      await prisma.usuario.updateMany({
        where: {
          id_usuario: {
            in: userIDS,
          },
        },
        data: {
          eliminado_en: fechaActualLocal
        }
      });
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }

  async cambiarContraseña(email, passw) {
    const prisma = this.getInstance();
    try {
      const fechaActual = new Date();
      const fechaActualLocal = new Date(
        fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
      );
      await prisma.usuario.updateMany({
        where: {
          email_usuario: email,
        },
        data: {
          password_usuario: passw,
          actualizado_en: fechaActualLocal
        },
      });
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }

  async actualizarImagenUsuario(idUser, imagen) {
    const prisma = this.getInstance();
    try {
      await prisma.usuario.update({
        where: {
          id_usuario: idUser,
        },
        data: {
          imagen_usuario: imagen,
        },
      });
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }

  async actualizarFechaEliminacion(idUser) {
    const prisma = this.getInstance();
    try {
      await prisma.usuario.update({
        where: {
          id_usuario: idUser,
        },
        data: {
          eliminado_en: null,
        },
      });
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }

  async actualizarUltimoAcceso(id) {
    const prisma = this.getInstance();
    try {
      const fechaActual = new Date();
      const fechaActualLocal = new Date(
        fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
      );
      await prisma.usuario.update({
        where: {
          id_usuario: id,
        },
        data: {
          ultimo_acceso: fechaActualLocal,
        },
      });
      prisma.$disconnect();
      return true;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }


  async obtenerCuentasVinculadas(id) {
    const prisma = this.getInstance();
    try {
      
      const respuesta = await prisma.usuario.findMany({
        where: {
          id_moodle: id,
        }
      });
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.log(error);
      prisma.$disconnect();
      return false;
    }
  }
}
export default UsuariosRepository;
