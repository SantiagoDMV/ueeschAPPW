import { useEffect } from "react";
import style from "../estilos/Ventanas/VentanaAsistencia.module.css";

export default function Ventana({ children, estado}: any) {
  useEffect(() => {
    mostrarVentana;
  }, []);

  const mostrarVentana = () => {
    let fondo = document.getElementById("fondo") as HTMLDivElement;
    if (!estado) {
      fondo.style.display = "none";
      return
    } 
      
    fondo.style.display = "flex";
  };
  return (
    <>
      {estado ? (
        <div className={style.fondo} id="fondo">
          <div className={style.contenedorHijo}>{children}</div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
