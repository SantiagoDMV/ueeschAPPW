import axios, { AxiosError } from "axios";
import { useState,useRef } from "react";
import styles from "../../estilos/Formularios/FormularioActualizacionUser.module.css"
import { Toaster, toast } from "sonner";

export default function FormularioActualizacionMoodle({informacionUsuario,obtenerDatos,estado, setInformacionUsuario,
  usuarioCookie}:any) {

  const [credenciales, setCredenciales] = useState({
    id_rol: informacionUsuario[0].id_rol,
    cedula_usuario: informacionUsuario[0].cedula_usuario,
    nombre_usuario : informacionUsuario[0].nombre_usuario,
    apellido_usuario: informacionUsuario[0].apellido_usuario,
    email_usuario: informacionUsuario[0].email_usuario,
    id_moodle: informacionUsuario[0].id_moodle,
    password_usuario: ""
  });


  const escucharCambio = (e: any) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

const envioDatos = (e:any,email:any,cedula:any) => {
  envioDatosDB(e,email,cedula);
}

  const envioDatosDB = async (e: any,email:any,cedula:any) => {
    e.preventDefault();
    let loadingToastId: any = null;
    try{
      loadingToastId = toast.info(
        "Actualizando datos del usuario, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      await axios.put(
        "/api/usuarios",
        {credenciales: credenciales, emailActual: email}, 
      )
        
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
    const errorMensaje:any = (error as AxiosError).response?.data;    
    toast.dismiss(loadingToastId);
          toast.error(errorMensaje.mensaje, {
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
<form className={styles.formulario} onSubmit={(e)=>envioDatos(e,informacionUsuario[0].email_usuario,informacionUsuario[0].cedula_usuario)}>
        <div className={styles.formulariocampos}>
          <label className={styles.tituloRegistro}> Actualización de usuario </label>

<div className={styles.inputs} id="nombre">
            <input onChange={(e) => escucharCambio(e)}
              type="text"
              name="nombre_usuario"
              id="nombre_usuario"
              placeholder="Ingrese aquí el nombre del usuario"
              value={credenciales.nombre_usuario} 
            />
          </div>

          <div className={styles.inputs} id="apellido">
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="apellido_usuario"
              id="apellido_usuario"
              placeholder="Ingrese aquí el apellido del usuario"
              value={credenciales.apellido_usuario}
            />
          </div>

          <div className={styles.inputs} id="cedula">
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="cedula_usuario"
              id="cedula_usuario"
              placeholder="Ingrese aquí la cédula del usuario"
              value={credenciales.cedula_usuario}
            />
          </div>

          <div className={styles.inputs} id="email">
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="email_usuario"
              id="email_usuario"
              placeholder="Ingrese aquí el email del usuario"
              value={credenciales.email_usuario}
            />
          </div>


          <div className={styles.inputs} id="password">
            <input
              onChange={(e) => escucharCambio(e)}
              type="password"
              name="password_usuario"
              id="password_usuario"
              placeholder="Ingrese aquí la nueva contraseña"
              value={credenciales.password_usuario}
            />
          </div>

    {
      usuarioCookie.id !== informacionUsuario[0].id_usuario &&
      (
<div className={styles.inputs}>
            <label>Rol</label>
            <select onChange={(e) => escucharCambio(e)} name="id_rol">
            <option value={`${credenciales.id_rol}`}>Rol actual:
            {
              credenciales.id_rol === 1
              ?
              <p> Super Administrador</p>
              :
              credenciales.id_rol === 2
              ?
              <p> Administrador</p>
              :
            credenciales.id_rol === 4
            ?
            <p> Estudiante</p>
            : credenciales.id_rol === 3
            ?
              <p> Profesor</p>
              
              : credenciales.id_rol === 5
            ?
              <p> Representante</p>
              :
              <p> No definido</p>
            }
            </option>
            
            { usuarioCookie.rol === 1 &&
            <option value="3">Administrador</option>
            }
              <option value="4">Estudiante</option>
              <option value="3">Profesor</option>
              <option value="5">Representante</option>
            
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
