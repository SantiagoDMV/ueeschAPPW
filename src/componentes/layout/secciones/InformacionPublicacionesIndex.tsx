import style from "../../estilos/Secciones/Publicaciones.module.css";
import Link from "next/link";
import { useState } from "react";
import axios,{AxiosError} from "axios";
import {
  AiOutlineQuestion,
} from "react-icons/ai";
import { Toaster, toast } from "sonner";

export default function Publicaciones({
  publicacion,
  accesoUltimo,
  usuarioCookie
}: any) {
  const [estadoVentanaEliminacion, setEstadoVentanaEliminacion] = useState<boolean>(false);
  const [idPublicacionEliminar,setIdPublicacionEliminar ] = useState<number>()

const eliminacionConfirmacion = (id:any) => {
    setEstadoVentanaEliminacion(true);
    setIdPublicacionEliminar(id)
  };


  const eliminarEnvioDatos = async () => {
    setEstadoVentanaEliminacion(false);
        
        let loadingToastId: any = null;

        try {
          loadingToastId = toast.info(
            "Eliminando publicación/publicaciones, esto puede llevar un momento...",
            {
              style: {
                border: "none",
              },
            }
          );
    
    await axios.post("/api/publicaciones", {
      idPublicacionEliminar: idPublicacionEliminar,
    });

    toast.dismiss(loadingToastId);

    toast.success("La publicación/publicaciones fueron eliminadas exitosamente", {
      style: {
        backgroundColor: "rgb(90,203,154)",
        border: "none",
      },
    });

    
  } catch (error) {
    const errorMensaje: any = (error as AxiosError).response?.data;
    toast.dismiss(loadingToastId);

    toast.error(errorMensaje.mensaje, {
      style: {
        backgroundColor: "rgb(203,90,90)",
        border: "none",
      },
    });
  }
};




  return (
    <>
{estadoVentanaEliminacion && (
        <div className={style.fondo}>
          <div className={style.contenedorMensaje} id="contenedor">
            <AiOutlineQuestion className={style.iconoMensajeExito} />
            <div className={style.contenedorInformacion}>
              <div className={style.informacion}>
                <p>
                  Eliminar la publicación es un proceso irreversible.
                  ¿Desea continuar con esta acción?
                </p>
              </div>
              <div className={style.botonesConfirmacionEliminacion}>
                <button onClick={eliminarEnvioDatos}>Confirmar</button> 
                <button
                  onClick={() => setEstadoVentanaEliminacion(false)}
                  autoFocus
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}



      {publicacion ? (
        publicacion.map((e: any, index: number) => (
          <div key={e.id_publicacion} className={style.publicacion}>
            <div className={style.contenidoPublicacion}>
            {
                usuarioCookie && (usuarioCookie.rol ===1 || usuarioCookie.rol ===2 || usuarioCookie.rol ===3) && 
                <div className={style.contenedorBotonesOpciones}>
                <button>Actualizar</button>
                
                <button
                onClick={() => eliminacionConfirmacion(e.id_publicacion)}>Eliminar</button>
                </div>
              }
              <label>{accesoUltimo(e.creado_en)}</label>
              <div className={style.h4}>{e.titulo_publicacion}</div>
              
              
            </div>
            <Link className={style.botonLink} href={`/publicaciones/publicacion/${e.id_publicacion}`}>Ver publicación</Link>
          </div>
        ))
        
      ) : (
        <h3 className={style.tituloPublicaciones}>
          No existen publicaciones actualmente
        </h3>
      )}
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </>
  );
}
