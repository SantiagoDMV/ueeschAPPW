import nodemailer from "nodemailer";

// Configuración del transporte del correo
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: `${process.env.EMAIL_UE}`,
    pass: `${process.env.PASSW_UE}`,
  },
});

export default async function correo(req, res) {
  if (req.method === "POST") {
    try {
      const { name, email, message } = req.body;

      // Contenido del correo
      const mailOptions = {
        from: `${process.env.EMAIL_UE}`,
        to: "ueesch2023@gmail.com",
        subject: "Nuevo mensaje de contacto",
        text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`,
      };

      // Enviar el correo
      const info = await transporter.sendMail(mailOptions);

      console.log("Correo enviado: ", info.response);

      return res.status(200).json({ message: "Correo enviado exitosamente" });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ mensaje: "Método HTTP no permitido" });
  }
}
