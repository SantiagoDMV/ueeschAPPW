import { useState } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado
import estilos from './FormularioEmail.module.css'

const ContactFormAgendamiento = () => {
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
        <input
          type="telefono"
          id="telefono"
          name="telefono"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Teléfono de contacto"
        />
      </div>

      <div>
        <select name="" id="">
          <option value="0">¿Nivel al que aspira?</option>
          <option value="1">Educación inicial - 1°</option>
          <option value="2">Educación inicial - 2°</option>
          <option value="3">Educación Básica - 1°</option>
          <option value="4">Educación Básica - 2°</option>
          <option value="5">Educación Básica - 3°</option>
          <option value="6">Educación Básica - 4°</option>
          <option value="7">Educación Básica - 5°</option>
          <option value="8">Educación Básica - 6°</option>
          <option value="9">Educación Básica - 7°</option>
          <option value="10">Educación Básica - 8°</option>
          <option value="11">Educación Básica - 9°</option>
          <option value="12">Educación Básica - 10°</option>
          <option value="13">Bachillerato - 1°</option>
          <option value="14">Bachillerato - 2°</option>
          <option value="15">Bachillerato - 3°</option>
        </select>
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
};

export default ContactFormAgendamiento;
