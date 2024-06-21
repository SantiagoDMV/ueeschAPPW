import { useState,useEffect } from "react";
import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/Moodle/CrearCurso.module.css";
import axios from 'axios'
import { Toaster, toast } from "sonner";

export default function CrearCategoria({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {

    
  const [curso, setCurso] = useState({
    name: "",
    idnumber: "",
    description: "",
  });

  // Manejador para cambiar los valores del curso
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  // Manejador para enviar los datos del curso
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let loadingToastId: any = null;
    e.preventDefault();
    
    const boton = document.getElementById('botonCrearCurso') as HTMLButtonElement;
    try {
boton.disabled=true;
      loadingToastId = toast.info(
        "Creando categoría, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      
axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_create_categories&moodlewsrestformat=json&categories[0][name]=${curso.name}&categories[0][idnumber]=${curso.idnumber}&categories[0][description]=${curso.description}`);

    toast.dismiss(loadingToastId);

    toast.success("La categoría fue creada exitosamente", {
      style: {
        backgroundColor: "rgb(90,203,154)",
        border: "none",
      },
    });

    setCurso({
        name: "",
        idnumber: "",
        description: "",
      })
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error("Ha ocurrido un error al crear la categoría.", {
      style: {
        backgroundColor: "rgb(203,90,90)",
        border: "none",
      },
    });
  }finally{
    boton.disabled = false;
  }
};


  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contenedorCrearCurso}>
        <h2>Crear Categoría</h2>
        <form className={estilos.formularioCrearCurso} onSubmit={handleSubmit}>
          <div className={estilos.formGroup}>
            <label htmlFor="name">Nombre de la categoría</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={curso.name}
              onChange={handleChange}
            />
          </div>

          <div className={estilos.formGroup}>
            <label htmlFor="idnumber">Nombre corto de la categoría</label>
            <input
              type="text"
              id="idnumber"
              name="idnumber"
              value={curso.idnumber}
              onChange={handleChange}
            />
          </div>

          <div className={estilos.formGroup}>
            <label htmlFor="description">Descripción de la categoría</label>
            <textarea
              id="description"
              name="description"
              value={curso.description}
              onChange={handleChange}
            ></textarea>
          </div>
          
          
          <button id="botonCrearCurso" type="submit">Crear Categoría </button>
        </form>
      </div>
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </Layout>
  );
}