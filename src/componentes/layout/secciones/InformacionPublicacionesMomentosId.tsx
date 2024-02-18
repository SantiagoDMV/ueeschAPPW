import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Image from 'next/image';
import style from '../../estilos/Secciones/PublicacionesMomentosId.module.css';
import ReactMarkdown from 'react-markdown';
import cheerio from 'cheerio';
import Head from 'next/head';
import Usuarios from '@/componentes/Reporte/TablaUsuarios/TablaUsuarios';
import { useRouter } from 'next/router';

export default function Publicaciones({ publicacion, multimedia,informacionUsuarioCreador }: any) {
  const [processedContent, setProcessedContent] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (publicacion) {
      const contentWithImages = replaceImgWithNextImage(publicacion.contenido_publicacion);
      setProcessedContent(contentWithImages);
    }
  }, [publicacion]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const compartirEnFacebook = () => {
        window.open(
          `http://www.facebook.com/sharer/sharer.php?u=https://ueesch-5h2a.onrender.com`,
          'Compartir en Facebook',
          'width=600,height=900'
        );
      };

      // Agregar el evento de clic al botón de compartir
      const boton=  document.getElementById('botonCompartir') as HTMLButtonElement
      boton.addEventListener('click', compartirEnFacebook);
      
      // Retira el evento de clic cuando el componente se desmonte
      return () => {
        boton.removeEventListener('click', compartirEnFacebook);
      };
    }
  }, [router]);

  const replaceImgWithNextImage = (htmlContent: string) => {
    const $ = cheerio.load(htmlContent, { xmlMode: true });

    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      if (imgSrc) {
        const imgComponent = (
          <Image
            key={index}
            src={imgSrc}
            
            alt="Image"
            className={style.imagenPublicacion}
            width={500}
            height={500}
          />
        );

        // Convertir el componente React a HTML usando renderToStaticMarkup
        const imgHtml = ReactDOMServer.renderToStaticMarkup(imgComponent);

        // Reemplazar la etiqueta <img> con el HTML generado del componente Image
        $(element).replaceWith(imgHtml);
      }
    });

    return $.xml();
  };

  function convertirFechaHora(cadenaFechaHora:any) {
    const fechaHora = new Date(cadenaFechaHora);

    const fechaFormateada = fechaHora.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
    const horaFormateada = fechaHora.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return `${fechaFormateada} ${horaFormateada}`;
}
  return (
    <>
    <Head>
        <title>{process.env.NOMBRE_EMPRESA}</title>
        {publicacion && 
        <meta property="og:title" content={`${publicacion.titulo_publicacion}`} />
}
        {informacionUsuarioCreador && 
        <meta property="og:description" content={`${informacionUsuarioCreador.nombre_usuario} ${informacionUsuarioCreador.apellido_usuario}`} />
        }
        <meta property="og:url" content={`www.ueesch-5h2a.onrender.com/publicaciones/publicacion/17`} />
        
        {/* <meta property="og:image" content={`${publicacion.imagen_publicacion}`} /> */}

        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={style.contenedorPrincipalInformacionPublicacion}>
      
      {publicacion ? (
        <div className={style.publicacion}>
          <div className={style.contenedorContenidoPublicacion}>
            <div className={style.contenidoPublicacion}>
              <h1>{publicacion.titulo_publicacion}</h1>
              <button id="botonCompartir">Compartir en Facebook</button>

              {processedContent ? (
                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
              ) : (
                <ReactMarkdown>{publicacion.contenido_publicacion}</ReactMarkdown>
              )}
            </div>
            
          </div>
          <div className={style.informacioUusuarioCreador}>
              <Image
              alt={`imagenUsuario_${informacionUsuarioCreador.nombre_usuario}_${informacionUsuarioCreador.apellido_usuario}`}
              className={style.imagenFotoCreador}
              src={informacionUsuarioCreador.imagen_usuario}
              width={60}
              height={60}
              />
              <div className={style.informacioUsuarioCreadorPublicacion}>
                <h4>Datos de la publicación</h4>
              <span>Autor {informacionUsuarioCreador.nombre_usuario}{" "}{informacionUsuarioCreador.apellido_usuario}</span>
              <span>Creada el {convertirFechaHora(publicacion.creado_en)}</span>
              </div>
              </div>
        </div>
      ) : (
        <h3 className={style.tituloPublicaciones}>No existen publicaciones actualmente</h3>
      )}
    </div>
    </>
  );
}
