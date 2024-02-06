import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { filePath } = req.body; // Asumiendo que envías la ruta del archivo a eliminar en el cuerpo de la solicitud

    if (!filePath) {
      return res.status(400).json({ error: 'La ruta del archivo no se proporcionó correctamente' });
    }

    try {
      // Comprueba si el archivo existe antes de intentar eliminarlo
      await fs.access(filePath);

      // Elimina el archivo
      await fs.unlink(filePath);

      return res.status(200).json({ message: 'Archivo eliminado correctamente' });
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      return res.status(500).json({ error: 'Error al eliminar el archivo' });
    }
  }

  // Si la solicitud no es POST, devolver un error 405 (Method Not Allowed)
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
