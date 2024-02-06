//import { PrismaClient } from "@prisma/client";
import conexionDb from "./conexion/db"

class ImportacionUsuarioRepository {

  constructor() {
    if (!ImportacionUsuarioRepository.instance) {
      const conexion = new conexionDb;
      ImportacionUsuarioRepository.instance = conexion.getInstance();
    }
  }

  getInstance() {
    return ImportacionUsuarioRepository.instance;
  }

  async obtenerUltimaImportacion() {
    const prisma = this.getInstance();
    try {
      const respuesta = await prisma.importacion_usuarios.findFirst({
        orderBy: { creado_en: 'desc' }, 
      });
      
      prisma.$disconnect();
      return respuesta;
    } catch (error) {
      console.error(error);
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
      return respuesta
    } catch (error) {
      console.log(error)
      prisma.$disconnect();
    }
  }

  async crearUltimaImportacion(id_usuario) {
    const prisma = this.getInstance();
    const fecha_actual = new Date();
    const fecha_actual_local = fecha_actual.toLocaleString(); // Para incluir la hora
    try {
      await prisma.$transaction([
        prisma.importacion_usuarios.create({
          data: {
            id_usuario : id_usuario,
            creado_en: fecha_actual,
          },
        })
      ])
      prisma.$disconnect();
      return {valor: true,
      mensaje: fecha_actual_local}
    } catch (error) {
      console.log(error)
      prisma.$disconnect();
      return false;
    }
  }


}
export default ImportacionUsuarioRepository;


/* elimina las creaciones a cada rato y solo de una una conexion y se elimina cuando ya se sale de la ruta 

import conexionDb from "./conexion/db"

class UsuariosRepository {

  constructor() {
    if(!UsuariosRepository.instance){
      const prismaInstance = new conexionDb();
      this.instance = prismaInstance.getInstance();
    }
  }

  getInstance() {
    return UsuariosRepository.instance;
  }

  async obtenerUsuarios() {

    try {
      const respuesta = await this.instance.usuario.findMany();
    
      return respuesta;
    } catch (error) {
      console.log(error)
      //prisma.$disconnect();
    }
  }

*/