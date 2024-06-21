import axios, { AxiosError } from "axios";
import { useState,useRef } from "react";
import styles from "../../estilos/Formularios/FormularioActualizacionUser.module.css"
import { Toaster, toast } from "sonner";

export default function FormularioActualizacionMoodle({informacionUsuario,obtenerDatos,estado, setInformacionUsuario,
  usuarioCookie,categorias,moodle
}:any) {

  const [credenciales, setCredenciales] = useState({
    id_rol: informacionUsuario[0].categoryid,
    cedula_usuario: informacionUsuario[0].summary,
    nombre_usuario : informacionUsuario[0].fullname,
    apellido_usuario: informacionUsuario[0].shortname,
  });


  const escucharCambio = (e: any) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

const envioDatos = (e:any) => {
  e.preventDefault();
  envioDatosDB(e);
}

  const envioDatosDB = async (e: any) => {
    e.preventDefault();
    let loadingToastId: any = null;
    try{
      loadingToastId = toast.info(
        "Actualizando datos del curso, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );


      const queryParams = new URLSearchParams({
        wstoken: moodle.token,
        wsfunction: "core_course_update_courses",
        moodlewsrestformat: "json",
        "courses[0][id]": informacionUsuario[0].id.toString(),
        "courses[0][fullname]": credenciales.nombre_usuario,
        "courses[0][categoryid]": credenciales.id_rol.toString(),
        "courses[0][summary]": credenciales.cedula_usuario,
        "courses[0][shortname]": credenciales.apellido_usuario,
        
      });

      const response = await axios.get(`${moodle.host}/webservice/rest/server.php?${queryParams.toString()}`);

        
        obtenerDatos()
        estado(false);
          
        toast.dismiss(loadingToastId);

      toast.success("Los datos fueron actualizados correctamente.", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      toast.dismiss(loadingToastId);
      toast.error("Ha ocurrido un error al actualizar los datos del curso.", {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    
    };
  
};


  return (
    <>
{
  (informacionUsuario)?
  (
  
  <>
<form className={styles.formulario} onSubmit={(e)=>envioDatos(e)}>
        <div className={styles.formulariocampos}>
          <label className={styles.tituloRegistro}> Actualización de Curso </label>

<div className={styles.inputs} id="nombre">
            <input onChange={(e) => escucharCambio(e)}
              type="text"
              name="nombre_usuario"
              id="nombre_usuario"
              placeholder="Ingrese aquí el nombre del curso"
              value={credenciales.nombre_usuario} 
            />
          </div>

          <div className={styles.inputs} id="apellido">
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="apellido_usuario"
              id="apellido_usuario"
              placeholder="Ingrese aquí el nombre corto del curso"
              value={credenciales.apellido_usuario}
            />
          </div>

          <div className={styles.inputs} id="cedula">
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="cedula_usuario"
              id="cedula_usuario"
              placeholder="Ingrese aquí la descripción del curso"
              value={credenciales.cedula_usuario}
            />
          </div>


    {
      usuarioCookie.id !== informacionUsuario[0].id_usuario &&
      (
<div className={styles.inputs}>
            <label>Categoría</label>
            <select onChange={(e) => escucharCambio(e)} name="id_rol">
            <option value={`${informacionUsuario[0].categoryid}`}>Categoría actual:
            {
              categorias && categorias.map((c:any)=>{
                if(c.id === informacionUsuario[0].categoryid){
                  return c.name
                }
              })
            }
            </option>
            
            {
              categorias && categorias.map((c:any, index:number)=>(
                <option key={index} value={`${c.id}`}>{c.name}</option>
              ))
            }

             
            
            </select>
          </div>

      )
    }
          

          <div className={styles.opciones}>
            <div className={styles.contenedorbtn}>
              <button
                type="submit"
                className={styles.btn}
                name="submitbutton"
                id="id_submitbutton"
              >
                Actualizar
              </button>
              <button
                type="submit"
                className={styles.btnCancelar}
                name="submitbutton"
                id="id_submitbutton"
                onClick={()=>{estado(false)

                }}
              >
                Cancelar
              </button>
            </div>
          </div>

          </div>

<div className={styles.contenedorImg}>
  
</div>
</form>
  </>
  ):"Cargando la información del usuario"
}
<Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </>
  );
}
