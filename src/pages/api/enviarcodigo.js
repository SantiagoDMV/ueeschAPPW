import nodemailer from "nodemailer";
import UsuariosRepository from "../../../data/usuariosRepository";

// Configuración del transporte del correo
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: `${process.env.EMAIL_UE}`,
    pass: `${process.env.PASSW_UE}`,
  },
});

function generarContrasena(longitud) {
    const caracteresMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const caracteresMayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const caracteresNumeros = "0123456789";
    const caracteresEspeciales = "!@#$%^&*()_+[]{}|;:,.<>?";
  
    const aleatorioMinuscula = caracteresMinusculas.charAt(
      Math.floor(Math.random() * caracteresMinusculas.length)
    );
    const aleatorioMayuscula = caracteresMayusculas.charAt(
      Math.floor(Math.random() * caracteresMayusculas.length)
    );
    const aleatorioNumero = caracteresNumeros.charAt(
      Math.floor(Math.random() * caracteresNumeros.length)
    );
    const aleatorioEspecial = caracteresEspeciales.charAt(
      Math.floor(Math.random() * caracteresEspeciales.length)
    );
  
    const caracteresRestantes =
      caracteresMinusculas +
      caracteresMayusculas +
      caracteresNumeros +
      caracteresEspeciales;
  
    const caracteresShuffled = caracteresRestantes
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  
    const contrasena =
      aleatorioMinuscula +
      aleatorioMayuscula +
      aleatorioNumero +
      aleatorioEspecial +
      caracteresShuffled.slice(0, longitud - 4);
  
    return contrasena;
  }

export default async function correo(req, res) {
  if (req.method === "POST") {
    try {
      const { email} = req.body;
      console.log(email)

      if(!email || email === '')
      return res.status(400).json({mensaje: `Ingrese un email para continuar.`});
        
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email))
      return res.status(400).json({mensaje: `Debe ingresar un formato válido para el email`});  

      const repo = new UsuariosRepository(); 

      const respuesta = await repo.buscarUsuarioEmail(email);
      
      if(!respuesta)
      return res.status(400).json({mensaje: `El email ingresado no se está registrado.`});  

      // return{

      // }
      
      const contrasenaGenerada= generarContrasena(8);
console.log(contrasenaGenerada)
      //Contenido del correo
      // const mailOptions = {
      //   from: `${process.env.EMAIL_UE}`,
      //   to: email,
      //   subject: "Código de verificación para cambiar la contraseña",
      //   text: `Hola,\n\nHas solicitado cambiar tu contraseña. Utiliza el siguiente código de verificación para proceder con el cambio:\n\nCódigo de Verificación: ${contrasenaGenerada}\n\nSi no has solicitado este cambio, puedes ignorar este correo electrónico.\n\nGracias,\n${process.env.NOMBRE_EMPRESA}`,
      // };
      

      // // Enviar el correo
      // const info = await transporter.sendMail(mailOptions);

      //console.log("Correo enviado: ", info.response);

      return res.status(200).json({ contrasenaGenerada});
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    return res.status(405).json({ mensaje: "Método HTTP no permitido" });
  }
}
