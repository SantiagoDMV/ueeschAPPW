import { useEffect } from "react";
import style from "../estilos/Ventanas/VentanaPublicacion.module.css";
import axios from "axios";
import Imagenes from "../Imagenes";
import { AiFillCloseCircle } from "react-icons/ai";
//import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import FormularioComentarios from "../layout/Formularios/FormularioComentarios";

export default function Ventana({
  estado,
  setEstado,
  actualizarInfPublicacion,
  infPublicacion,
  multimedia,
  
}: any) {
  useEffect(() => {
    mostrarVentana;
  }, []);

  const accesoUltimo = (fecha: any) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes real.
    const anio = fechaObj.getFullYear();
    const fechaFormat = `${dia}-${mes}-${anio}`;
    return fechaFormat;
  };

  const mostrarVentana = () => {
    let fondo = document.getElementById("fondo") as HTMLDivElement;
    if (!estado) {
      fondo.style.display = "none";
      return;
    }
    fondo.style.display = "flex";
  };

  const cerrarVenatana = () =>{
    setEstado(false);
    mostrarVentana();
  }

  return (
    <>
      {estado ? (
        <div className={style.fondo} id="fondo">
          {infPublicacion ? (
            infPublicacion.map((e: any, index: number) => (
              <div key={e.id_publicacion} className={style.contenedorHijo}>
                <div className={style.contenedorImagenPublicacion}>
                {
                  multimedia ?
                <Imagenes
                multimedia={multimedia}
                idPublicacion={e.id_publicacion}
                  estiloContenedor={
                    style.contenedorImagenPublicacion
                  }
                  index={index}
                />
                  :
                  <p>Cargando imagen</p>
                }
                </div>
              

                <div className={style.seccionDerecha}>
                  <div className={style.contenedorOpcionesVentana}>
                  <AiFillCloseCircle onClick={cerrarVenatana}/>
                  </div>
                  <div className={style.contenidoPublicacion}>
                    <h4>{e.titulo_publicacion}</h4>

                    {/* <div className={style.contenedorOpciones}>
                      <div className={style.contenedorLikes}>
                    
                    {
                    (e.contador_likes!==0)?
                    <AiFillHeart className={style.iconoLikes}/>
                    :
                    <AiOutlineHeart className={style.iconoLikes}/>
                    }
                    <label>{e.contador_likes}</label>
                    </div>
                    </div> */}

                    <p>{e.contenido_publicacion}</p>
                    <label>{accesoUltimo(e.create_at)}</label>
                  </div>

                  {/* <div className={style.contenedorComentarios}>
                    <FormularioComentarios/>
                    </div> */}
                </div>
              </div>
            ))
          ) : (
            <h3>Cargando datos de la publicación</h3>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
