import { useState, useEffect, useRef } from 'react';
//import Image from 'next/image';
// import logoUnidad from '../../../../public/imagenes/index/header/headerEstudiantes.jpg'
import style from "./Header.module.css";

export default function Header({ informacion }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoplay, setAutoplay] = useState<boolean>(true);
  const [isImage, setIsImage] = useState<boolean>(false);

  useEffect(() => {
    // Verificar si la URL es una imagen o un video
    const extension = informacion.imagen_header.data.attributes.url.split('.').pop()?.toLowerCase();
    setIsImage(['jpg', 'jpeg', 'png', 'gif'].includes(extension || ''));
  }, [informacion.imagen_header.data.attributes.url]);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        
      });
    }
  }, [autoplay]);

  const handleCanPlayThrough = () => {
    setAutoplay(true);
  };

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Reiniciar el video al principio
      videoRef.current.play(); // Reproducir el video nuevamente
    }
  };

  return (
    <div className={style.contenedorHeader}>
      <div className={style.contenedorSuperior}>
        <div className={style.imagenHeaderContainer}>
          {
            isImage ? (
              <img
                src={informacion.imagen_header.data.attributes.url}
                // src={logoUnidad}
              //  layout="fill"
              //   objectFit="cover"
              //   quality={100}
              //   priority
                className={style.imagenHeader}
                alt="imagen_header"
              />
            ) : (
              <video
                ref={videoRef}
                src={informacion.imagen_header.data.attributes.url}
                className={style.videoHeader}
                autoPlay={false}
                muted
                onCanPlayThrough={handleCanPlayThrough}
                onEnded={handleVideoEnded}
              />
            )
          }
          <div className={style.textoSuperpuesto}>
            <h1>{informacion.titulo && informacion.titulo}</h1>
            {/* <h1>Unidad Educativa Especializada Sordos De Chimborazo</h1> */}
            <p>{informacion.descripcion_titulo && informacion.descripcion_titulo}</p>
            {/* <p>La Unidad Educativa Especializada Sordos de Chimborazo atiende a niños/as, adolescentes y jóvenes con discapacidad auditiva, en los niveles de Inicial, Preparatoria, Básica y Bachillerato Técnico</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
