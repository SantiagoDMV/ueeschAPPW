import { useState } from "react";
import axios, { AxiosError } from "axios";
import estilos from './FormularioEmail.module.css'
import { Toaster, toast } from "sonner";


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

    let loadingToastId:any = null; 
  
    try {
      loadingToastId = toast.info("Enviando mensaje, esto puede llevar un momento...", {
        style: {
          border: 'none'
        },
      });

        const response = await axios.post(
        '/api/correos',
        formData
      );

      toast.dismiss(loadingToastId);
  
      toast.success("El mensaje fue enciado exitosamente.", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

      setFormData(  {name: "",
        email: "",
        message: "",})
      //console.log(response.data); 
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      const errorMensaje: any = (error as AxiosError).response?.data;
      toast.dismiss(loadingToastId);
  
      toast.error('No es posible enviar el mensaje. Inténtalo de nuevo más tarde', {
        style: {
          backgroundColor: 'rgb(203,90,90)',
          border: 'none'
        },
      });
    }
  };

  return (
    <>
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
    <Toaster 
      theme="dark"
      position="bottom-left"
      visibleToasts={3}
      duration={3000}
      />
</>    
  );
};

export default ContactForm;
