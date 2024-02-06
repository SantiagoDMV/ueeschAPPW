import { actualizarIdMoodlePadres } from "../../../../servicios/usuarios";

export default async function usuarios(req, res) {
  if (req.method === "PUT") {
    try {
      const peticion = await actualizarIdMoodlePadres(req,res);
console.log(peticion)
      if (!peticion.valor) {
        return res.status(peticion.statusCode).json({ mensaje: peticion.mensaje });
      }

      return res.status(200).json({ mensaje: 'El proceso fue exitoso' });
    } catch (error) {
      console.error('Error al intentar obtener los datos: ', error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ mensaje: "Método HTTP no permitido" });
  }
}
