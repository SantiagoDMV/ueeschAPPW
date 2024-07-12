import { useState,useEffect } from "react";
import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/Moodle/CrearCurso.module.css";
import axios from 'axios'
import { Toaster, toast } from "sonner";

export default function CrearCurso({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {

    useEffect(() => {
        obtenerDatosUsuarios();
      }, []);
    
      const [datosCategorias, setDatosCategorias] = useState<any>();
    
    
      const obtenerDatosUsuarios = async () => {
        
        const respuestaCategorias = await axios.get(
          `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_categories&moodlewsrestformat=json`
        );
        
        
        setDatosCategorias(respuestaCategorias.data)
        
      };

  const [curso, setCurso] = useState({
    fullname: "",
    shortname: "",
    summary: "",
    secciones: "",
    categoryid: "",
  });

  // Manejador para cambiar los valores del curso
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurso({ ...curso, [name]: value });
  };

  // Manejador para enviar los datos del curso
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let loadingToastId: any = null;
    e.preventDefault();
    
    const boton = document.getElementById('botonCrearCurso') as HTMLButtonElement;
    try {
boton.disabled=true;


if(!curso.categoryid){
  
  loadingToastId = toast.info(
      "Para una mejor organización y clasificación de los cursos, es fundamental especificar la categoría a la que pertenece el curso. Por favor, seleccione una categoría para el curso.",
      {
        style: {
          border: "none",
          backgroundColor: "rgb(255, 165, 0)"
        },
        closeButton:true,
        duration: 8000
      }
    );

  return  
  }
  toast.dismiss(loadingToastId);
      loadingToastId = toast.info(
        "Creando curso, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

    
    await axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_create_courses&moodlewsrestformat=json&courses[0][fullname]=${curso.fullname}&courses[0][shortname]=${curso.shortname}&courses[0][categoryid]=${curso.categoryid}&courses[0][summary]=${curso.summary}&courses[0][numsections]=${curso.secciones}`);
    

    toast.dismiss(loadingToastId);

    toast.success("El curso fue creado exitosamente", {
      style: {
        backgroundColor: "rgb(90,203,154)",
        border: "none",
      },
    });

    setCurso({fullname: "",
    shortname: "",
    summary: "",
    secciones: "",
    categoryid: "",})
  } catch (error) {
    toast.dismiss(loadingToastId);
    toast.error("Ha ocurrido un error al crear el curso.", {
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
        <h2>Crear Curso</h2>
        <form className={estilos.formularioCrearCurso} onSubmit={handleSubmit}>
          <div className={estilos.formGroup}>
            <label htmlFor="fullname">Nombre del Curso</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              value={curso.fullname}
              onChange={handleChange}
            />
          </div>

          <div className={estilos.formGroup}>
            <label htmlFor="shortname">Nombre corto del Curso</label>
            <input
              type="text"
              id="shortname"
              name="shortname"
              value={curso.shortname}
              onChange={handleChange}
            />
          </div>

          <div className={estilos.formGroup}>
            <label htmlFor="summary">Descripción del Curso</label>
            <textarea
              id="summary"
              name="summary"
              value={curso.summary}
              onChange={handleChange}
            ></textarea>
          </div>
 
          <div className={estilos.formGroup}>
            <label htmlFor="secciones">Número de secciones</label>
            <input
            type="text"
              id="secciones"
              name="secciones"
              value={curso.secciones}
              onChange={handleChange}
            />
          </div>
 
 
          <div className={estilos.formGroup}>
            <label htmlFor="categoryid">Categoría del Curso</label>
            <select
              id="categoryid"
              name="categoryid"
              value={curso.categoryid}
              onChange={(e:any)=>handleChange(e)}
            >
              <option value="">Seleccionar categoría</option>
              {
              datosCategorias && datosCategorias.map((c:any, index:number)=>(
                <option key={index} value={`${c.id}`}>{c.name}</option>
              ))
            }
              {/* Aquí puedes mapear las opciones de categoría desde un array */}
            </select>
          </div>
          <button id="botonCrearCurso" type="submit">Crear Curso</button>
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