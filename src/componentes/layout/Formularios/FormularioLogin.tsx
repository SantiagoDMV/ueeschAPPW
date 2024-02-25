import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineUser, AiOutlineKey } from "react-icons/ai";
import Image from "next/image";
import logo from "/public/imagenes/nav/logoUnidad.png";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Ventana from "@/componentes/ventanas/Ventana";


export default function FormularioLogin({ styles,setUsuario }: any) {
  const [credenciales, setCredenciales] = useState({
    username: "",
    password: "",
  });


  const [email,setEmail] = useState('');
  const [estadoRecuperar, setEstadoRecuperar] = useState(false);

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


  const enviarcorreorecuperar = async(e:any) =>{
    e.preventDefault();
    let loadingToastId:any = null; 
    try {
  
      loadingToastId = toast.info('Enviando email, esto puede llevar un momento...', {
        style: {
          border: 'none'
        },
      });

    const respuesta = await axios.post('/api/enviarcodigo',{email: email});
    console.log(respuesta.data)
    //console.log(respuesta.data.contrasenaGenerada)
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
    <Ventana estado={estadoRecuperar}>
      <div className={styles.contenedorRecuperarContrasena}>
  <h1>Recupera tu cuenta</h1>
  <p>Ingresa tu email para recuperar tu contraseña</p>
  
  <form onSubmit={enviarcorreorecuperar} className={styles.contenedorFormularioRecuperarContrasena}>
    <div className={styles.inputsRecuperar}>
      <input
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        name="email"
        placeholder="Ingresa tu email aqui"
      />
    </div>
    
    <div className={styles.botonesRecuperar}>
      <button type="submit" className={styles.btnRecuperar}>
        Enviar
      </button>
      <button type="submit" className={styles.btnRecuperar} onClick={()=>setEstadoRecuperar(!estadoRecuperar)}>
        Cancelar
      </button>
      </div>
      </form>
    </div>
</Ventana>

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
            <label onClick={()=>setEstadoRecuperar(!estadoRecuperar)} > ¿Olvidaste tu contraseña?</label>
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
