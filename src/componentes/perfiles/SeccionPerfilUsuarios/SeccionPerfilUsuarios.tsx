import estilos from "./SeccionPerfilUsuarios.module.css";
import { AiFillFile } from "react-icons/ai";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import axios,{AxiosError} from 'axios'
export default function SeccionPerfilUsuarios({ id_moodle}: any) {
  const [email,setEmail] = useState<any>('')
  const router = useRouter();

  const enviarCorreo = async (e:any) =>{
    e.preventDefault();
    let loadingToastId: any = null;

    try {
      loadingToastId = toast.info(
        "Actualizando información de la cuenta...",
        {
          style: {
            border: "none",
          },
        }
      );

      await axios.put('/api/usuarios/establecermoodle', {emailHijo: email})

      toast.dismiss(loadingToastId);

      toast.success("Información actualizada", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

      router.reload();
    }catch(error){
      const errorMensaje: any = (error as AxiosError).response?.data;
      toast.dismiss(loadingToastId);

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }
  }

  return (
    <div className={estilos.contenedorInformacionMoodle} id="contenedorInformacionMoodle">
      {id_moodle ? 
        <Link target="_blank" href={`/seguimiento/${id_moodle}`}>
        <button>
          <AiFillFile className={estilos.iconoBotonInformacionMoodle} />
          Registro Académico
        </button>
        </Link>
        :
        <div className={estilos.contenedorEmailHijos}>
          <h4>Ingrese el correo electrónico de su hijo, matriculado en la unidad educativa, para conocer su progreso académico</h4>
          <div className={estilos.contenedorInputs}>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} className={estilos.inputEmail}/>
        <input type="button" value="Enviar" className={estilos.botonEmail} onClick={(e)=>enviarCorreo(e)}/>  
        </div>

        </div>
      }
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </div>
  );
}
