import axios,{AxiosError} from "axios";
import { useState ,useRef } from "react";
import styles from "../../estilos/Formularios/FormularioRegistroMiembros.module.css";
import MensajeError from "@/componentes/mensajes/MensajeError/MensajeError";
import MensajeCargando from "@/componentes/mensajes/MensajeCargando/MensajeCargando";
import MensajeExito from "@/componentes/mensajes/MensajeExito/MensajeExito";
import { useRouter } from "next/router";
export default function FormularioRegistroMiembros({idMoodle}:any) {
  const [credenciales, setCredenciales] = useState({
    id_moodle: idMoodle,
    //id_rol: "3",
    cedula_usuario: "",
    nombre_usuario: "",
    apellido_usuario: "",
    email_usuario: "",
    password_usuario: "",
    password_usuario_confirmar: "",
    // Agrega cualquier otro campo que sea necesario para la creación del usuario en Moodle
  });
  
  const router = useRouter();

  ////////////////////////////////////////////////////////////////////////
  const [mensajeErrorEstado, setMensajeErrorEstado] = useState({
    estado: false,
    titulo: '',
    informacion: ''
  })
  const [mensajeCargando,setMensajeCargando] = useState<any>({
    estado:false,
    mensaje: ''
  })

  const [mensajeExito,setMensajeExito] = useState<any>({
    estado:false,
    mensaje: ''
  })
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
////////////////////////////////////////////////////////////////////////

  const escucharCambio = (e: any) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };


  const limpiarCampos = () => {
    const campos = ["nombre_usuario", "apellido_usuario", "cedula_usuario", "email_usuario", "password_usuario"];

    campos.forEach((campo) => {
      const inputElement = document.getElementById(campo) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = "";
      }
    });
  }

  const envioDatos = async (e: any) => {
    e.preventDefault();

    try {
      setMensajeCargando({
        estado:true,
        mensaje: 'Registrando usuario, esto puede llevar un momento...'
      })
      
      await axios.post(
        "/api/usuarios",
        credenciales
      );


      setMensajeExito({
        estado: true,
        mensaje: 'El usuario fue registrado exitosamente'
      });

      router.push("/login");
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
    const errorMensaje:any = (error as AxiosError).response?.data;    
    setMensajeCargando({
      estado:false,
      mensaje: ''
    })
    if(timeoutId.current){
    clearTimeout(timeoutId.current)
    }

    setMensajeErrorEstado({
      estado:true,
      titulo: 'Error',
      informacion:errorMensaje.mensaje
    })

    timeoutId.current = setTimeout(() => {
      setMensajeErrorEstado({
        estado:false,
        titulo:'',
        informacion:''
      })
    }, 3000);
  } 
};
  return (
    <>
    <MensajeCargando informacion={mensajeCargando.mensaje} estado={mensajeCargando.estado}/>
    <MensajeExito informacion={mensajeExito.mensaje} estado={mensajeExito.estado}/>
    <MensajeError estado={mensajeErrorEstado.estado} titulo={mensajeErrorEstado.titulo} informacion={mensajeErrorEstado.informacion}/>
    
      <form className={styles.formulario} onSubmit={envioDatos}>
      <div className={styles.informacionRegistro} id="presentacion">
      <h4>Registro</h4>
    </div>
        <div className={styles.formulariocampos}>
          <div className={styles.formulariocamposMiembros}>

              <div className={styles.inputs} id="nombre">
                <label>Nombre</label>
                <input
                  onChange={(e) => escucharCambio(e)}
                  type="text"
                  name="nombre_usuario"
                  id="nombre_usuario"
                />
              </div>

              <div className={styles.inputs} id="apellido">
                <label>Apellido</label>
                <input
                  onChange={(e) => escucharCambio(e)}
                  type="text"
                  name="apellido_usuario"
                  id="apellido_usuario"
                />
              </div>

              <div className={styles.inputs} id="cedula">
            <label>Cédula</label>
              <input
                onChange={(e) => escucharCambio(e)}
                type="text"
                name="cedula_usuario"
                id="cedula_usuario"
              />
            </div>

              <div className={styles.inputs} id="email">
                <label>Email</label>
                <input
                  onChange={(e) => escucharCambio(e)}
                  type="email"
                  name="email_usuario"
                  id="email_usuario"
                  
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

            {/* <div className={`${styles.inputs} ${styles.contenedorRol}`} id="roles">
            <div className={styles.contenedorSelectorRol}>
            <label>Rol</label>
            <select name="id_rol">
              <option value="3">Estudiante</option>
              <option value="2">Profesor</option>
            </select>
            </div>
          </div> */}

          </div>

          <div className={styles.opciones} id="opciones">
            <div className={styles.contenedorbtn} >
              <button
                type="submit"
                className={styles.btn}
                name="submitbutton"
                id="id_submitbutton"
              >
                Registrar usuario
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
