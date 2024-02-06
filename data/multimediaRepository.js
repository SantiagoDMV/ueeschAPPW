import conexion from "./conexion/db"
export default class MultimediaRepository{
    constructor(){
        if(!MultimediaRepository.instance){
            const conexionDb = new conexion();
            MultimediaRepository.instance = conexionDb.getInstance();
        }
    }

    getInstance(){
        return MultimediaRepository.instance;
    }

    async mostrarMultimedia(){
        const prisma = this.getInstance();
        try {
            const respuesta = await prisma.multimedia.findMany({
                orderBy:{
                    id_multimedia: 'desc',
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
    
    async obtenerImagenes(datos){
        const prisma = this.getInstance();
        try {
          const respuesta = await prisma.multimedia.findMany({              
                orderBy:{
                    id_publicacion: 'desc',
                },
                 where: {
                  OR: datos.map((idObj) => ({
                    id_publicacion: idObj.id_publicacion,
                 })),
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
    

    async obtenerImagenesIdPublicacion(id){
      const prisma = this.getInstance();
      try {
        const respuesta = await prisma.multimedia.findMany({              
              //take:3,
              orderBy:{
                  id_publicacion: 'desc',
              },
               where: {
                  id_publicacion: id,
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
  


  async crearMultimediaServidor(tipo, multimedia, id_publicacion) {
    const prisma = this.getInstance();
    try {
      
        await prisma.multimedia.create({
          data: {
            id_tipo_multimedia: tipo==='image'? 1 : tipo==='video'? 2 : 3,
            ruta_multimedia: multimedia,
            id_publicacion: id_publicacion ? id_publicacion : null,
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

    
  async crearMultimedia(tipos, multimediaArray, id_publicacion) {
        const prisma = this.getInstance();
        const multimediaPromises = [];
        try {
          for (let i = 0; i < multimediaArray.length; i++) {
            const multimediaPromise = prisma.multimedia.create({
              data: {
                id_tipo_multimedia: tipos[i]==='image'? 1 : tipos[i]==='video'? 2 : 3,
                ruta_multimedia: multimediaArray[i],
                id_publicacion: id_publicacion ? id_publicacion : null,
              },
            });
      
            multimediaPromises.push(multimediaPromise);
          }
      
          const respuestas = await Promise.all(multimediaPromises);
          prisma.$disconnect();
          return respuestas;
        } catch (error) {
          console.error(error);
          prisma.$disconnect();
          return false;
        }
      }

      async eliminarMultimedia(multimediaArray) {
        const prisma = this.getInstance();
        try {
          const idsMultimedia = multimediaArray.map((obj) => obj.id_multimedia);
          // // Eliminar los registros que coinciden con los IDs proporcionados
          const respuesta = await prisma.multimedia.deleteMany({
            where: {
              id_multimedia: {
                in: idsMultimedia,
              },
            },
          });
      
          prisma.$disconnect();
          return respuesta;
        } catch (error) {
          console.log(error);
          prisma.$disconnect();
          return false;
        }
      }


      async eliminarMultimediaRutas(rutas) {
        const prisma = this.getInstance();
        try {
          // // Eliminar los registros que coinciden con los IDs proporcionados
          await prisma.multimedia.deleteMany({
            where: {
              ruta_multimedia: {
                in: rutas,
              },
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


      async eliminarMultimediaIds(ids) {
        const prisma = this.getInstance();
        try {
          const respuesta = await prisma.multimedia.deleteMany({
            where: {
              id_publicacion: {
                in: ids.map(id => parseInt(id, 10)), 
              },
            },
          });
          prisma.$disconnect();
          return respuesta;
        } catch (error) {
          console.error(error);
          prisma.$disconnect();
          return false;
        }
      }


      async eliminarMultimediaIdUnico(ids) {
        const prisma = this.getInstance();
        try {
          const respuesta = await prisma.multimedia.deleteMany({
            where: {
              id_publicacion: ids,
            },
          });
          prisma.$disconnect();
          return respuesta;
        } catch (error) {
          console.error(error);
          prisma.$disconnect();
          return false;
        }
      }



      async ObtenerUrlsEliminacionMultimediaIds(ids) {
        const prisma = this.getInstance();
        try {
          const respuesta = await prisma.multimedia.findMany({
            where: {
              id_publicacion: {
                in: ids.map(id => parseInt(id, 10)), // Convertir las cadenas a números
              },
            },
          });
          prisma.$disconnect();
          return respuesta;
        } catch (error) {
          console.error(error);
          prisma.$disconnect();
          return false;
        }
      }


      async ObtenerUrlsEliminacionMultimediaIdUnico(ids) {
        const prisma = this.getInstance();
        try {
          const respuesta = await prisma.multimedia.findMany({
            where: {
              id_publicacion: 
                ids
            },
          });
          prisma.$disconnect();
          return respuesta;
        } catch (error) {
          console.error(error);
          prisma.$disconnect();
          return false;
        }
      }


      async buscarRutas(rutas) {
        const prisma = this.getInstance();
        try {
            const respuesta = await prisma.multimedia.findMany({
                where: {
                    ruta_multimedia: {
                        in: rutas,
                    },
                },
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