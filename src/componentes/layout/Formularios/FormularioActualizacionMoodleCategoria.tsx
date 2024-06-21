import axios, { AxiosError } from "axios";
import { useState,useRef } from "react";
import styles from "../../estilos/Formularios/FormularioActualizacionUser.module.css"
import { Toaster, toast } from "sonner";

export default function FormularioActualizacionMoodle({informacionUsuario,obtenerDatos,estado, setInformacionUsuario,
  usuarioCookie,categorias,moodle}:any) {

  const [credenciales, setCredenciales] = useState({
    
    cedula_usuario: informacionUsuario[0].description ? informacionUsuario[0].description : '',
    nombre_usuario : informacionUsuario[0].name ? informacionUsuario[0].name :'',
    apellido_usuario: informacionUsuario[0].idnumber? informacionUsuario[0].idnumber: '',
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
        "Actualizando datos de la categoría, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );


      // const url = `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_update_categories&categoryid=${informacionUsuario[0].id}&name=${credenciales.nombre_usuario}&description=${credenciales.cedula_usuario}`;
      // console.log(url);
      // await axios.post(url);
      

      const queryParams = new URLSearchParams({
        wstoken: moodle.token,
        wsfunction: "core_course_update_categories",
        moodlewsrestformat: "json",
        "categories[0][id]": informacionUsuario[0].id.toString(),
        "categories[0][name]": credenciales.nombre_usuario,
        "categories[0][description]": credenciales.cedula_usuario,
        "categories[0][idnumber]": credenciales.apellido_usuario,
        
      });

      await axios.get(`${moodle.host}/webservice/rest/server.php?${queryParams.toString()}`);


      
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
      toast.error("Ha ocurrido un error al actualizar los datos de la categoría.", {
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
          <label className={styles.tituloRegistro}> Actualización de categoría </label>

<div className={styles.inputs} id="nombre">
            <input onChange={(e) => escucharCambio(e)}
              type="text"
              name="nombre_usuario"
              id="nombre_usuario"
              placeholder="Ingrese aquí el nombre de la categoría"
              value={credenciales.nombre_usuario} 
            />
          </div>

          <div className={styles.inputs} id="apellido">
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="apellido_usuario"
              id="apellido_usuario"
              placeholder="Ingrese aquí el nombre corto de la categoría"
              value={credenciales.apellido_usuario}
            />
          </div>

          <div className={styles.inputs} id="cedula">
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="cedula_usuario"
              id="cedula_usuario"
              placeholder="Ingrese aquí la descripción de la categoría"
              value={credenciales.cedula_usuario}
            />
          </div>
          

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
                onClick={()=>estado(false)}
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
