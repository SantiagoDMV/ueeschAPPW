import { mostrarNoticias, aumentoLikes, crearNoticia } from "../../../servicios/noticias";

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log('si llego')
    const servicio = await mostrarNoticias();
    if (!servicio.valor)
      return res.status(servicio.statusCode).json(servicio.mensaje);
    console.log('si paso')
    return res.status(200).json(servicio.datos);
  } else if (req.method === "POST") {
    const rawBody = req.rawBody;

    // Parse raw form data to JSON object
    const data = JSON.parse(rawBody);
  
    // Show data in console
    console.log(data);

    return res.status(200).json({
      message: "Solicitud completada",
    });
  } else {
    return res.status(405).json({ mensaje: "Método HTTP no permitido" });
  }
}


//const servicio = await crearNoticia(req);

    //if (!servicio.valor) 
    //{
    //  return res.status(servicio.statusCode).json(servicio.mensaje);
    //}