import { google } from "googleapis";
import { file } from "googleapis/build/src/apis/file";
import { Stream } from "stream";

const autenticacion = () => {
  console.log(process.env.GOOGLE_DRIVE_CREDENCIALES)
  const auth = new google.auth.GoogleAuth({
    keyFile: `${process.env.GOOGLE_DRIVE_CREDENCIALES}`,
    scopes: "https://www.googleapis.com/auth/drive",
  });

  //instania del cliente de google drive
  const drive = google.drive({
    version: "v3",
    auth: auth,
  });

  return drive;
};


export const enviarDatos = async (cuerpo, googleId, nombre) => {
  const drive = autenticacion();

  //nombre del archivo y la carpeta de destino

  const fileMetadata = {
    name: `${nombre}`,
    parents: [googleId],
  };

  //transformacion de la inf de la imagen en formato 64
  // a stream
  const bufferStream = new Stream.PassThrough();
  //buffer from convierte la cadena resultante en un buffer
  bufferStream.end(
    Buffer.from(
      cuerpo.replace(/^data:(image\/(png|jpg|jpeg|gif)|video\/(mp4|ogg|webm));base64,/, ""),
      "base64"
    )
  );

  const media = {
    mimeType: "image/*|video/*",
    body: bufferStream,
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id"
    });

    //actualizacion de imagen en la cookie
    //  cookies.ActualizarCookieUser(req,res,'imagen',nuevaImagen)
    //...........................................
    //console.log('response   '+response.data.id +'link: ' +response.data.webViewLink)
    //solicitar el enlace de visualizacion del archivo recien creado

    return (
      response.data.id
    );





  } catch (error) {
    //console.log(error);
    console.log(error);
  }

};

export const enviarDatosUserImg = async (nombre, googleId, cuerpo) => {

  const drive = autenticacion()

  //nombre del archivo y la carpeta de destino
  const fileMetadata = {
    name: `${nombre}`,
    parents: [googleId],
  };


  //transformacion de la inf de la imagen en formato 64
  // a stream
  const bufferStream = new Stream.PassThrough();
  //buffer from convierte la cadena resultante en un buffer
  bufferStream.end(
    Buffer.from(cuerpo.replace(/^data:image\/(png|jpg|gif|jpeg);base64,/, ""), "base64")
  );

  const media = {
    mimeType: "image/*",
    body: bufferStream,
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    //'UPDATE usuario set imagen_usuario=$1 where cedula_usuario = $2'

    //const [idUser] = await prisma.usuario.findMany({ where: { cedula_usuario: cedula } })

    //console.log("actualizando imagen perfil user")

    return {
      valor:true,
      imagen: `http://drive.google.com/uc?export=view&id=${response.data.id}`,
    }

  } catch (error) {
    //console.log(error);
    console.log(error)
    return{
      valor: false
    }
  }

};


export const buscarDatos = async (nombre, googleId) => {
  const drive = autenticacion()
  const respuesta = await drive.files.list({
    q: `name='${nombre}' and parents='${googleId}'`,
    fields: "files(id, name)",
  });

  const files = respuesta.data.files;
  if (files.length === 0) {
    //no existe el archivo
    return {
      files: files,
      valor: false
    };
  } else {
    //si existe
    return {
      files: files,
      valor: true
    };
  }
};






export const buscarDatosId = async (id, googleId) => {
  const drive = autenticacion();

  const respuesta = await drive.files.list({
    q: `parents='${googleId}' and trashed=false`,
    fields: "files(id, name)",
  });
  
  const files = respuesta.data.files;
  const nombreArchivo = files.filter((e)=>(e.id === id))
  if (files.length === 0) {
    // No existe el archivo
    return {
      files: [],
      valor: false
    };
  } else {
    // Si existe, devolver solo el archivo con el ID específico
    return {
      files: nombreArchivo,
      valor: true
    };
  }
};

export const eliminarDatosId = async (files) => {
  const drive = autenticacion()
  // Eliminar el archivo encontrado
  const fileId = files;
  await drive.files.delete({
    fileId: fileId,
  });
};


export const eliminarDatos = async (nombre, files) => {
  const drive = autenticacion()
  // Eliminar el archivo encontrado
  const fileId = files[0].id;
  await drive.files.delete({
    fileId: fileId,
  });
};
