import axios, { AxiosError } from "axios";
import { useState} from "react";
import styles from "../../estilos/Formularios/FormularioActualizacionImportados.module.css";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
export default function FormularioActualizacionImportados({
  email,
  fullname,
}: any) {
  const [credenciales, setCredenciales] = useState({
    email: email,
    password_usuario: "",
    password_usuario_confirmar: "",
    id_rol: '4'
    // Agrega cualquier otro campo que sea necesario para la creación del usuario en Moodle
  });

  const router = useRouter();

  
  const escucharCambio = (e: any) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const limpiarCampos = () => {
    const campos = [
      "nombre_usuario",
      "apellido_usuario",
      "cedula_usuario",
      "email_usuario",
      "password_usuario",
    ];

    campos.forEach((campo) => {
      const inputElement = document.getElementById(campo) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = "";
      }
    });
  };

  const envioDatos = async (e: any) => {
    e.preventDefault();

    let loadingToastId:any = null; 
  
    try {
      loadingToastId = toast.info("Actualizando usuario, esto puede llevar un momento...", {
        style: {
          border: 'none'
        },
      });
  
      await axios.put("/api/usuarios/establecerpassword", credenciales);

      toast.dismiss(loadingToastId);
  
      toast.success("La actualización fue exitosa", {
        style: {
          backgroundColor: 'rgb(90,203,154)',
          border: 'none'
        },
      });

      router.push("/login");
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      const errorMensaje: any = (error as AxiosError).response?.data;
      toast.dismiss(loadingToastId);
  
      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: 'rgb(203,90,90)',
          border: 'none'
        },
      });
    }
  };
  return (
    <>
      <form className={styles.formulario} onSubmit={envioDatos}>
        <div className={styles.cajaPresentacionActualizacionImportados}>
          <h3>
            ¡Te damos la bienvenida {fullname ? <span> {fullname}</span> : ""}!
          </h3>
          <p>Completa tu registro en solo unos pasos.</p>
        </div>
        <div className={styles.formulariocampos}>
          <div className={styles.formulariocamposMiembros}>


          <div className={styles.inputs} id="cedula">
              <label>Ingresa tu número de cédula:</label>
              <input
                onChange={(e) => escucharCambio(e)}
                type="text"
                name="cedula_usuario"
                id="cedula_usuario"
              />
            </div>

            <div className={styles.inputs} id="contraseña">
              <label>Contraseña</label>
              <input
                onChange={(e) => escucharCambio(e)}
                type="password"
                name="password_usuario"
                id="password_usuario"
              />
            </div>

            <div className={styles.inputs} id="contraseñaConfirmar">
              <label>Confirmar contraseña</label>
              <input
                onChange={(e) => escucharCambio(e)}
                type="password"
                name="password_usuario_confirmar"
                id="password_usuario_confimar"
              />
            </div>

            <div className={`${styles.inputsRol} ${styles.inputs}`}>
            <p>Por favor, elige cuidadosamente tu perfil (estudiante o docente), ya que la información será revisada. Esto asegurará una experiencia personalizada.</p>
            <label>Soy:</label>
              <select id="id_rol" name="id_rol" onChange={(e) => escucharCambio(e)}>
                <option value="4">Estudiante</option>
                <option value="3">Docente</option>
              </select>
            </div>
            
          </div>

          <div className={styles.opciones} id="opciones">
            <div className={styles.contenedorbtn}>
              <button
                type="submit"
                className={styles.btn}
                name="submitbutton"
                id="id_submitbutton"
              >
                Establecer Contraseña
              </button>
            </div>
          </div>
        </div>
      </form>
      <Toaster 
      theme="dark"
      position="bottom-left"
      visibleToasts={3}
      duration={3000}
      />
    </>
  );
}
