import axios, { AxiosError } from "axios";
import { useState ,useRef } from "react";
import { useRouter } from "next/router";
import { AiOutlineUser, AiOutlineKey } from "react-icons/ai";
import Image from "next/image";
import logo from "/public/imagenes/nav/logoUnidad.png";
import { Toaster, toast } from "sonner";
import Link from "next/link";

export default function FormularioLogin({ styles,setUsuario }: any) {
  const [credenciales, setCredenciales] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  
  const escucharCambio = (e: any) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const envioDatos = async (e: any) => {
    e.preventDefault();
    let loadingToastId:any = null; 
  
    try {
  
      loadingToastId = toast.info('Autenticando, esto puede llevar un momento...', {
        style: {
          border: 'none'
        },
      });
          
    const respuesta = await axios.post(
      "/api/sesiones",
      credenciales
    ) 
    
    setUsuario(respuesta.data)
    if (respuesta.data.redirectTo) {
      try{
        router.push({
          pathname: respuesta.data.redirectTo,
          query: { email: respuesta.data.email },
        });
      }catch(error){
        console.log('error')
      }
    } else {
      router.push("/");
    }
  } catch (error) {
////////////////////////////////////////////////////////////////////////
    const errorMensaje:any = (error as AxiosError).response?.data;    
    
    toast.dismiss(loadingToastId);
  
      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: 'rgb(203,90,90)',
          border: 'none'
        },
      });
  }
////////////////////////////////////////////////////////////////////////
  };

  return (
    <>
      <form className={styles.formulario} 
      onSubmit={envioDatos} 
      //action="http://localhost/login/index.php" 
      method="post" 
      id="login"
      >
        
        <div className={styles.contenedorImg}>
          <Image
            className={styles.imagen_usuario}
            alt="imagen_estudiantes"
            src={logo}
          />
        </div>


        <div className={styles.formulariocampos}>
          
          <div id="presentacion" className={styles.presentacionMensajes}>
          <label className={styles.titulo_login}>Inicia sesion</label>
          </div>

          <div className={styles.opcionRegistro}>
          <label>¿Aún no tienes una cuenta? </label>
          <Link href={'/registro'}>
          <span>Registrarme</span>
          </Link>
          </div>


          <div className={styles.inputs}>
            <label>
              <AiOutlineUser className={styles.iconos} />
            </label>
            <input
              onChange={(e) => escucharCambio(e)}
              type="text"
              name="username"
              id="username"
              placeholder="Ingrese aquí su email"
            />
          </div>

          <div className={styles.inputs}>
            <label>
              <AiOutlineKey className={styles.iconos} />
            </label>
            <input
              onChange={(e) => escucharCambio(e)}
              type="password"
              name="password"
              id="password"
              placeholder="Ingrese aquí su contraseña"
            />
          </div>

          <div className={styles.opciones}>
            <label> ¿Olvidaste tu contraseña?</label>
            <div className={styles.contenedorbtn}>
              <button type="submit" className={styles.btn}>
                Login
              </button>
            </div>
          </div>
        </div>

      </form>
      <Toaster 
      theme="dark"
      position='top-center'
      visibleToasts={3}
      duration={3000}
      />
    </>
  );
}
