import { useState } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado
import estilos from './FormularioEmail.module.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/api/correos',
        formData
      );
      //console.log(response.data); 
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={estilos.contenedorFormulario}>
        
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nombre"
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
        />
      </div>
      <div>
        
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Mensaje"
        ></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactForm;
