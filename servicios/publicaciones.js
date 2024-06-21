import repo from "../data/publicacionesRepository";
import repoMultimedia from "../data/multimediaRepository";
import { verify } from "jsonwebtoken";
import {
  buscarDatos,
  buscarDatosId,
  eliminarDatos,
  eliminarDatosId,
  enviarDatos,
} from "./googleDriveService/GoogleDrive";
import he from "he";

const googleId = process.env.GOOGLE_ID_CPUBLICACIONES;

export async function mostrarPublicacionesGestion() {
  try {
    const datos = await repo.mostrarPublicacionesGestion();
    const idUsuarios = datos.map((usuario) => usuario.id_usuario);
    const detallesUsuarios = await repo.obtenerDetallesUsuariosGestion(
      idUsuarios
    );
    const datosMultimedia = await repoMultimedia.obtenerImagenes(datos);

    if (!datos || !datosMultimedia)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return {
      datos: datos,
      datosMultimedia: datosMultimedia,
      detallesUsuarios: detallesUsuarios,
      valor: true,
    };
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}

export async function mostrarPublicaciones() {
  try {
    const datos = await repo.mostrarPublicaciones();
    const datosMultimedia = await repoMultimedia.obtenerImagenes(datos);

    if (!datos || !datosMultimedia)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return {
      datos: datos,
      datosMultimedia: datosMultimedia,
      valor: true,
    };
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: error,
    };
  }
}


export async function mostrarPublicacionesInformacionPerfil(req) {
  try {
    const {idUsuario} = req.body;
    const datos = await repo.mostrarPublicacionesPerfil(idUsuario);
    const datosMultimedia = await repoMultimedia.obtenerImagenes(datos);

    if (!datos || !datosMultimedia)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return {
      datos: datos,
      datosMultimedia: datosMultimedia,
      valor: true,
    };
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}

export async function mostrarPublicacionesInformacion() {
  try {
    const datos = await repo.mostrarPublicaciones();
    

    if (!datos.valor)
      return {
        statusCode: 500,
        valor: false,
        mensaje: `Error interno en el servidor, ${datos.mensaje}`,
      };

    return {
      datos: datos.mensaje,
      valor: true,
    };
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: `Error interno del servidor, ${error}`,
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
        mensaje: "Error interno en el servidor",
      };

    return {
      datos: datos,
      datosMultimedia: datosMultimedia,
      valor: true,
    };
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}

export async function mostrarPublicacionId(req) {
  try {
    const publicacionId = parseInt(req.query.publicacionId, 10);
    const datos = await repo.obtenerPublicacion(publicacionId);
    const datosMultimedia = await repoMultimedia.obtenerImagenesIdPublicacion(
      publicacionId
    );

    if (!datos || !datosMultimedia)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return {
      datos: datos,
      datosMultimedia: datosMultimedia,
      valor: true,
    };
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}

export async function crearPublicacion(req) {
  try {
    const { UserCookie } = req.cookies;
    const user = verify(UserCookie, process.env.TOKEN_SECRET);
    const cedula = user.cedula;
    let multimediaArray = [];

    const { contenido, datosPublicacion } = req.body;

    if (!datosPublicacion.tituloP)
      return {
        statusCode: 400,
        valor: false,
        mensaje: "Debe ingresar el título de previsualización",
      };

    if (!contenido)
      return {
        statusCode: 400,
        valor: false,
        mensaje: "La publicación no tiene contenido",
      };
    let contenidoHtml = contenido;

    var recursosMultimedia = [];
    var tiposArchivo = [];

    var inicioMultimedia = contenidoHtml.indexOf("data:");
    while (inicioMultimedia !== -1) {
      var finMultimedia = contenidoHtml.indexOf('"', inicioMultimedia);
      var recursoMultimedia = contenidoHtml.substring(
        inicioMultimedia,
        finMultimedia + 1
      );
      recursosMultimedia.push(recursoMultimedia);

      // Determinar el tipo de archivo
      var tipoArchivo = recursoMultimedia.split(":")[1].split("/")[0];
      tiposArchivo.push(tipoArchivo);

      inicioMultimedia = contenidoHtml.indexOf("data:", finMultimedia);
    }

    // Reemplazar las imágenes en base64 con las URLs proporcionadas

    for (let i = 0; i < recursosMultimedia.length; i++) {
      const fechaActual = new Date().toISOString();

      const fechaHoraFormateada = fechaActual
        .replace(/T/g, "_") // Reemplazar "T" por "_"
        .replace(/:/g, "-"); // Reemplazar ":" por "-"

      let nombre = `${cedula}-${fechaHoraFormateada}`;

      //let existe = await buscarDatos(nombre, googleId);

      multimediaArray.push(
        `${process.env.URL_GOOGLE_DRIVE_IMAGES}${await enviarDatos(
          recursosMultimedia[i],
          googleId,
          nombre
        )}`
      );
    } ////////////////FIN DEL FOR

    //CAMBIAR EL CONTENIDO POR URLS DE LAS IMAGENES
    for (let i = 0; i < multimediaArray.length; i++) {
      const imagenBase64 = recursosMultimedia[i];
      const url = multimediaArray[i];

      // Reemplazar en el contenido HTML
      contenidoHtml = contenidoHtml.replace(imagenBase64, `${url}" /`);
    }

    //console.log('Contenido HTML con URLs:', contenidoHtml);

    const datos = await repo.crearPublicacion(
      user.id,
      datosPublicacion.tituloP,
      contenidoHtml,
      datosPublicacion.id_tipo_publicacion,
      datosPublicacion.fecha_eliminacion
    );
    if (!datos)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    const datosMultimedia = await repoMultimedia.crearMultimedia(
      tiposArchivo,
      multimediaArray,
      datos.id_publicacion
    );

    if (!datosMultimedia)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };
    return {
      valor: true,
    };
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}

const extraerIdDeUrl = (url) => {
  const match = url.match(/id=([^&]+)/);
  return match ? match[1] : null;
};

function encontrarDiferencias(array1, array2) {
  return array1.filter((elemento) => !array2.includes(elemento));
}

export async function actualizarPublicacion(req) {
  try {
    const { UserCookie } = req.cookies;
    const user = verify(UserCookie, process.env.TOKEN_SECRET);
    const cedula = user.cedula;
    let multimediaArray = [];

    const { contenido, datosPublicacion, contenidoExistente,contenidoOriginal } = req.body;
//console.log(contenidoOriginal)
    if (!datosPublicacion.tituloP)
      return {
        statusCode: 400,
        valor: false,
        mensaje: "Debe ingresar el título de previsualización",
      };

    if (!contenido)
      return {
        statusCode: 400,
        valor: false,
        mensaje: "La publicación no tiene contenido",
      };

    //CODIGO PARA OBTENER LOS LA DATA DE LAS IMAGENES QUE FUERON AGREGADAS
    let contenidoHtml = contenido;
  //  console.log(contenido)
    var recursosMultimedia = [];
    var tiposArchivo = [];
    var inicioMultimedia = contenidoHtml.indexOf("data:");
    while (inicioMultimedia !== -1) {
      var finMultimedia = contenidoHtml.indexOf('"', inicioMultimedia);
      var recursoMultimedia = contenidoHtml.substring(
        inicioMultimedia,
        finMultimedia + 1
      );
      recursosMultimedia.push(recursoMultimedia);

      // Determinar el tipo de archivo
      var tipoArchivo = recursoMultimedia.split(":")[1].split("/")[0];
      tiposArchivo.push(tipoArchivo);

      inicioMultimedia = contenidoHtml.indexOf("data:", finMultimedia);
    }

    //CODIGO PARA OBTENRE ENLACES DE IMAGENES PREEXISTENTES
    let enlaces = [];
    const regex = /<img[^>]+src="([^"]+)"[^>]*>/g;

    let match;
    while ((match = regex.exec(contenido)) !== null) {
      const rutaDecodificada = match[1].replace(/&amp;/g, "&");
      enlaces.push(rutaDecodificada);
    }

    const datosMultimedia = await repoMultimedia.obtenerImagenesIdPublicacion(
      datosPublicacion.id_publicacion
    );

  //   const idsMultimedia = datosMultimedia.map(item => {
  //     const urlSplit = item.ruta_multimedia.split('='); 
  //     return urlSplit[urlSplit.length - 1]; 
  // });

const soloURLs = datosMultimedia.map(item => item.ruta_multimedia);

    
    if (enlaces.length !== datosMultimedia.length) {
      const diferencias = encontrarDiferencias(
        soloURLs,
        enlaces
      );

      if (diferencias.length !== 0) {
        const rutasEliminadas = await repoMultimedia.eliminarMultimediaRutas(
          diferencias
        );
        if (!rutasEliminadas)
          return {
            statusCode: 500,
            valor: false,
            mensaje: "Error interno en el servidor",
          };
      }
    }

    //IF PARA CAMBIAR LA MULTIMEDIA DEL CONTENIDO DE LA PUBLICACION
    if (recursosMultimedia && recursosMultimedia.length !== 0) {
      for (let i = 0; i < recursosMultimedia.length; i++) {
        const fechaActual = new Date().toISOString();

        const fechaHoraFormateada = fechaActual
          .replace(/T/g, "_") // Reemplazar "T" por "_"
          .replace(/:/g, "-"); // Reemplazar ":" por "-"

        let nombre = `${cedula}-${fechaHoraFormateada}`;

        //let existe = await buscarDatos(nombre, googleId);

        multimediaArray.push(
          `${process.env.URL_GOOGLE_DRIVE_IMAGES}${await enviarDatos(
            recursosMultimedia[i],
            googleId,
            nombre
          )}`
        );
      } ////////////////FIN DEL FOR

      //CAMBIAR EL CONTENIDO POR URLS DE LAS IMAGENES
      for (let i = 0; i < multimediaArray.length; i++) {
        const imagenBase64 = recursosMultimedia[i];
        const url = multimediaArray[i];

        // Reemplazar en el contenido HTML
        contenidoHtml = contenidoHtml.replace(imagenBase64, `${url}" /`);
      }
      const datos = await repo.actualizarInformacion(
        datosPublicacion.id_publicacion,
        datosPublicacion.tituloP,
        contenidoHtml,
        datosPublicacion.id_tipo_publicacion,
        datosPublicacion.fecha_eliminacion
      );
      if (!datos)
        return {
          statusCode: 500,
          valor: false,
          mensaje: "Error interno en el servidor",
        };

      //contenido,datosPublicacion
      const datosMultimedia = await repoMultimedia.crearMultimedia(
        tiposArchivo,
        multimediaArray,
        datosPublicacion.id_publicacion
      );
      if (!datosMultimedia)
        return {
          statusCode: 500,
          valor: false,
          mensaje: "Error interno en el servidor",
        };
    } else {
      const datos = await repo.actualizarInformacion(
        datosPublicacion.id_publicacion,
        datosPublicacion.tituloP,
        contenidoHtml,
        datosPublicacion.id_tipo_publicacion,
        datosPublicacion.fecha_eliminacion
      );
      if (!datos)
        return {
          statusCode: 500,
          valor: false,
          mensaje: "Error interno en el servidor",
        };
    }

    return {
      valor: true,
    };

    // Reemplazar las imágenes en base64 con las URLs proporcionadas

    //     const { UserCookie } = req.cookies;
    //     const user = verify(UserCookie, process.env.TOKEN_SECRET);
    //     const cedula = user.cedula;
    //     const {credenciales,imagenes, idPublicacion,filearray} = req.body
    //     const tipos = req.body.tipos
    //     const imagenesF = imagenes.filter(item => typeof item === 'object');
    //     const multimedia = filearray;
    //     const tituloP  = credenciales.titulo_publicacion; //titulo
    //     const contenidoP = credenciales.contenido_publicacion; //contenido_Publicacion
    //     const id_tipo_publicacion = credenciales.id_tipo_publicacion;
    //     const fecha_eliminacion = credenciales.fecha_eliminacion
    //     let multimediaArray = [];

    //     const datos = await repo.actualizarInformacion(idPublicacion, tituloP, contenidoP,id_tipo_publicacion,fecha_eliminacion);
    //     if (!datos)
    //          return {
    //              statusCode: 500,
    //              valor: false,
    //              mensaje: "Error interno en el servidor"
    //          };

    //       // Aplicar la función a cada elemento de datosMultimedia
    //     const idsDeUrls = imagenesF.map((item) => extraerIdDeUrl(item.ruta_multimedia));

    //     //BUSCAR/ELIMINAR DATOS EXISTENTES
    //     if(imagenesF){
    //     for (let i = 0; i < idsDeUrls.length; i++) {
    //          let existe = await buscarDatosId(idsDeUrls[i], googleId);
    //          if (existe.valor) {
    //             await eliminarDatos(existe.files[0].name,existe.files);
    //          } else {
    //              break
    //          }
    //     }////////////////FIN DEL FOR
    //     await repoMultimedia.eliminarMultimedia(imagenesF)
    // }

    // if(multimedia){
    //     for (let i = 0; i < multimedia.length; i++) {
    //         const fechaActual = new Date().toISOString();

    //         const fechaHoraFormateada = fechaActual
    //             .replace(/T/g, '_') // Reemplazar "T" por "_"
    //             .replace(/:/g, '-'); // Reemplazar ":" por "-"

    //         let nombre = `${cedula}-${tituloP}-${i}-${fechaHoraFormateada}`;

    //         multimediaArray.push(
    //             `${process.env.URL_GOOGLE_DRIVE_IMAGES}${await enviarDatos(multimedia[i], googleId, nombre)}`);

    //    }////////////////FIN DEL FOR
    // }

    //     const datosMultimedia = await repoMultimedia.crearMultimedia(tipos, multimediaArray,idPublicacion,null);
    //         if (!datosMultimedia)
    //          return {
    //              statusCode: 500,
    //              valor: false,
    //              mensaje: "Error interno en el servidor"
    //          };

    //      return {
    //          valor: true
    //      }
  } catch (error) {
    console.log("Ocurrio un error al mostrar las publicaciones: ", error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
}

export const eliminarPublicacion = async (req) => {
  try {
    const { publicacionesIds } = req.body;

    const consultarRegistros =
      await repoMultimedia.ObtenerUrlsEliminacionMultimediaIds(
        publicacionesIds
      );

    consultarRegistros &&
      consultarRegistros.map(async (e) => {
        const partes = e.ruta_multimedia.split(/[=&]/);

        const indiceId = partes.indexOf("id");

        if (indiceId !== -1 && indiceId < partes.length - 1) {
          await eliminarDatosId(partes[indiceId + 1]);
        }
      });

    const consultaDeleteM = await repoMultimedia.eliminarMultimediaIds(
      publicacionesIds
    );
    const consultaDelete = await repo.eliminarPublicacion(publicacionesIds);

    if (!consultaDelete)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    if (!consultaDeleteM)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return { valor: true };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};


export const eliminarPublicacionIdUnico = async (req) => {
  try {
    const { idPublicacionEliminar } = req.body;

    const consultarRegistros =
      await repoMultimedia.ObtenerUrlsEliminacionMultimediaIdUnico(
        idPublicacionEliminar
      );

    consultarRegistros &&
      consultarRegistros.map(async (e) => {
        const partes = e.ruta_multimedia.split(/[=&]/);

        const indiceId = partes.indexOf("id");

        if (indiceId !== -1 && indiceId < partes.length - 1) {
          await eliminarDatosId(partes[indiceId + 1]);
        }
      });

    const consultaDeleteM = await repoMultimedia.eliminarMultimediaIdUnico(
      idPublicacionEliminar
    );
    const consultaDelete = await repo.eliminarPublicacionIdUnico(idPublicacionEliminar);

    if (!consultaDelete)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    if (!consultaDeleteM)
      return {
        statusCode: 500,
        valor: false,
        mensaje: "Error interno en el servidor",
      };

    return { valor: true };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      valor: false,
      mensaje: "Error interno del servidor",
    };
  }
};



// const multimedia = req.body[0];
// console.log(multimedia)
// const { tituloP } = req.body[1]; //titulo
// const tipos = req.body[2];

// const { id_tipo_publicacion } = req.body[1];
// const { contenidoP } = req.body[1]; //contenido_Publicacion
// const {fecha_eliminacion} = req.body[1];

// const cedula = user.cedula;
// let multimediaArray = [];

// const datos = await repo.crearPublicacion(user.id, tituloP, contenidoP,id_tipo_publicacion,fecha_eliminacion);
// if (!datos)
//      return {
//          statusCode: 500,
//          valor: false,
//          mensaje: "Error interno en el servidor"
//      };

// for (let i = 0; i < multimedia.length; i++) {
//      const fechaActual = new Date().toISOString();

//      const fechaHoraFormateada = fechaActual
//          .replace(/T/g, '_') // Reemplazar "T" por "_"
//          .replace(/:/g, '-'); // Reemplazar ":" por "-"

//      let nombre = `${cedula}-${tituloP}-${i}-${fechaHoraFormateada}`;

//      let existe = await buscarDatos(nombre, googleId);

//      if (existe.valor) {

//          await eliminarDatos(nombre, existe.files);
//          multimediaArray.push(
//              `${process.env.URL_GOOGLE_DRIVE_IMAGES}${await enviarDatos(multimedia[i], googleId, nombre)}`);
//      } else {
//          multimediaArray.push(
//              `${process.env.URL_GOOGLE_DRIVE_IMAGES}${await enviarDatos(multimedia[i], googleId, nombre)}`);
//      }
// }////////////////FIN DEL FOR

// const datosMultimedia = await repoMultimedia.crearMultimedia(tipos, multimediaArray, datos.id_publicacion);

//     if (!datosMultimedia)
//      return {
//          statusCode: 500,
//          valor: false,
//          mensaje: "Error interno en el servidor"
//      };
