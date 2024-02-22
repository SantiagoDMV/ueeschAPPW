import Image from "next/image";
import style from "./Header.module.css";
import { useEffect } from "react";

export default function Header({ informacion }: any) {
  

  return (
    <div className={style.contenedorHeader}>
      <div className={style.contenedorSuperior}>
        <div className={style.imagenHeaderContainer}>
          <Image
            src={informacion.imagen_header.data[0].attributes.url}
            layout="fill"
            objectFit="cover"
            quality={100}
            alt="imagen_header"
          />
          <div className={style.textoSuperpuesto}>
            <h1>{informacion.titulo}</h1>
            <p>{informacion.descripcion_titulo}</p>
            
          </div>
        </div>
      </div>
    </div>
  );
}
