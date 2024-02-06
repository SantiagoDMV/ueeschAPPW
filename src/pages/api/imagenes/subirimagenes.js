import multiparty from 'multiparty';
import fs from 'fs/promises';
import path from 'path';
import MultimediaRepository from "../../../../data/multimediaRepository";

const repoMultimedia = new MultimediaRepository();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const fecha = new Date().toLocaleDateString('es-ES', options).replace(/\//g, '-');
    const form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ error: 'Error al procesar el formulario' });
      }

      const { id } = fields;
      const uploadedFiles = files.files || []; // Verifica si hay archivos

      if (uploadedFiles.length === 0) {
        return res.status(400).json({ error: 'No se han proporcionado archivos' });
      }

      // Hacer algo con los datos recibidos
      // console.log('EL ID DE LA PUBLICACION ES: ',id)
      // console.log('files:', uploadedFiles);

      const allowedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const allowedVideoExtensions = ['.mp4', '.mov', '.avi'];

      //console.log('LONNGITUS: ',uploadedFiles.length)
      for (let i = 0; i < uploadedFiles.length; i++) {
        let file = uploadedFiles[i];
        let fileExtension = path.extname(file.originalFilename).toLowerCase();
        let fileType;

        if (allowedImageExtensions.includes(fileExtension)) {
          fileType = 'imagen';
        } else if (allowedVideoExtensions.includes(fileExtension)) {
          fileType = 'video';
        } else {
          return res.status(400).json({ error: 'Tipo de archivo no permitido' });
        }

        let filePath = `./public/imagenes/prueba/${fecha}-${file.originalFilename}`;
        let filePathDb = `/imagenes/prueba/${fecha}-${file.originalFilename}`;

        const datosMultimedia = await repoMultimedia.crearMultimediaServidor(fileType, filePathDb, parseInt(id));
        if (!datosMultimedia)
        return res.status(400).json({ error: 'No se subio nada' });


        await fs.rename(file.path, filePath);

        //console.log(`Archivo es un ${fileType}`);
      }

      
      return res.status(200).json({ message: 'Datos recibidos correctamente'});
    });

    return;
  }

  // Si la solicitud no es POST, devolver un error 405 (Method Not Allowed)
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
