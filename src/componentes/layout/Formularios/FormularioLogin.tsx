import axios, { AxiosError } from "axios";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";
import { AiOutlineUser, AiOutlineKey } from "react-icons/ai";
//import Image from "next/image";
import logoImagen from "/public/imagenes/nav/logoUnidad.png";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import Ventana from "@/componentes/ventanas/Ventana";
import CambiarContraseña from "../../ventanas/CambiarContraseña";


export default function FormularioLogin({ styles,setUsuario }: any) {

////////////////////////LOGO
useEffect(()=>{
  obtenerLogo();
},[])

const [logo, setLogo] = useState<any>();

const obtenerLogo = async() =>{
  try {
    const respuestaMision = await axios.get('https://ueeschstrapi.onrender.com/api/informacions/7?[fields][0]=nombre&[fields][1]=contenido')
    setLogo(respuestaMision.data.data.attributes.contenido)
  } catch (error) {
    setLogo(logoImagen.src)
  }
}
////////////////////////////

  const [credenciales, setCredenciales] = useState({
    username: "",
    password: "",
  });


  const [email,setEmail] = useState('');
  const [estadoRecuperar, setEstadoRecuperar] = useState(false);
  const [codigoEnviado,setCodigoEnviado] = useState(false);
  const [cambiarContrasenaAprobado,setCambiarContrasenaAprobado] = useState(false);
  const [codigo,setCodigo] = useState<any>();
  const [codigoRecibido, setCodigoRecibido] = useState<any>();

  const router = useRouter();
  
  const escucharCambio = (e: any) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };
  let loadingToastId:any = null; 

  const envioDatos = async (e: any) => {
    e.preventDefault(); 
  
    try {
      toast.dismiss(loadingToastId);
      loadingToastId = toast.info('Autenticando, esto puede llevar un momento...', {
        style: {
          border: 'none'
        },
      });
          
    const respuesta = await axios.post(
      "/api/sesiones",
      credenciales
    ) 

    toast.dismiss(loadingToastId);
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
  
    loadingToastId =toast.error(errorMensaje.mensaje, {
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
    const botonGenerarCodigo = document.getElementById('botonGenerarCodigo') as HTMLButtonElement;
    try {
      botonGenerarCodigo.disabled =true;
      toast.dismiss(loadingToastId);
      loadingToastId = toast.info('Enviando email, esto puede llevar un momento...', {
        style: {
          border: 'none'
        },
      });

    const respuesta = await axios.post('/api/enviarcodigo',{email: email});
    setCodigoEnviado(!codigoEnviado)
    setCodigoRecibido(respuesta.data.contrasenaGenerada)
    toast.dismiss(loadingToastId);
    //console.log(respuesta.data.contrasenaGenerada)
  } catch (error) {
    ////////////////////////////////////////////////////////////////////////
        const errorMensaje:any = (error as AxiosError).response?.data;    
        
        toast.dismiss(loadingToastId);
      
        loadingToastId =toast.error(errorMensaje.mensaje, {
            style: {
              backgroundColor: 'rgb(203,90,90)',
              border: 'none'
            },
          });
      }
      finally{
        botonGenerarCodigo.disabled =false;
      }
    ////////////////////////////////////////////////////////////////////////
      };
      
      const comprobacion = (e:any) =>{  
        e.preventDefault();
        const boton = document.getElementById('botonComprobacion') as HTMLButtonElement;
        boton.disabled =true;
        if(codigo !== codigoRecibido){
          toast.dismiss(loadingToastId);
          loadingToastId =toast.error('El código ingresado no coincide con el enviado al correo electrónico. Por favor, revisa y vuelve a intentarlo.', {
            style: {
              backgroundColor: 'rgb(203,90,90)',
              border: 'none'
            },
          });
          boton.disabled =false;
          return
        }
        toast.dismiss(loadingToastId);
        setCambiarContrasenaAprobado(!cambiarContrasenaAprobado)
      }
    
  return (
    <>
    <Ventana estado={estadoRecuperar}>
      {
      cambiarContrasenaAprobado ?
      <CambiarContraseña
                mensaje="Tu seguridad es nuestra prioridad. No compartas tu contraseña"
                actualizacionEstado={setEstadoRecuperar}
                id="contenedorAlerta"
                email={email}
              />
      :
      codigoEnviado ?
      <div className={styles.contenedorRecuperarContrasena}>
      <h1>Cuenta verificada</h1>
      <p>Pronto recibirás un código de verificación en tu correo electrónico. Por favor, introduce el código en el campo a continuación para restablecer tu contraseña.</p>
      
      {/* <form class="login-form" action="http://localhost/login/index.php" method="post" id="login"> */}
    
      <form onSubmit={comprobacion} className={styles.contenedorFormularioRecuperarContrasena}>
        <div className={styles.inputsRecuperar}>
          <input
            onChange={(e) => setCodigo(e.target.value)}
            type="text"
            id="codigo"
            name="codigo"
            placeholder="Introduce el código de verificación aquí"
          />
        </div>
        
        <div className={styles.botonesRecuperar}>
          <button type="submit" className={styles.btnRecuperar} id="botonComprobacion">
            Enviar
          </button>
          <button type="submit" className={styles.btnRecuperar} onClick={()=>{setEstadoRecuperar(false)
          setCodigoEnviado(false)
          //setCambiarContrasenaAprobado(false)
          }}>
            Cancelar
          </button>
          </div>
          </form>
        </div>
        :
        <div className={styles.contenedorRecuperarContrasena}>
  <h1>Recupera tu cuenta</h1>
  <p>Ingresa tu email para recuperar tu contraseña</p>
  
  {/* <form class="login-form" action="http://localhost/login/index.php" method="post" id="login"> */}

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
    <button type="submit" className={styles.btnRecuperar} id="botonGenerarCodigo">
        Enviar
      </button>
      <button type="submit" className={styles.btnRecuperar} onClick={()=>{setEstadoRecuperar(false)
          setCodigoEnviado(false)}}>
            Cancelar
          </button>
      </div>
      </form>
    </div>
      }
      
</Ventana>

{/* <form class="login-form" action="http://localhost/login/index.php" method="post" id="login"> */}
      <form className={`login-form ${styles.formulario}`} 
      onSubmit={envioDatos} 
      // action="http://localhost/login/index.php" 
      method="post" 
      id="login"
      >
        
        <div className={styles.contenedorImg}>
  <img
    className={styles.imagen_usuario}
    alt="Logo_Unidad"
    width="65"
    height="60"
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
            <label onClick={()=>{
              setEstadoRecuperar(false)
              setCodigoEnviado(false)
              setCambiarContrasenaAprobado(false)
              setEstadoRecuperar(!estadoRecuperar)}} > ¿Olvidaste tu contraseña?</label>
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
      duration={8000}
      />
    </>
  );
}
