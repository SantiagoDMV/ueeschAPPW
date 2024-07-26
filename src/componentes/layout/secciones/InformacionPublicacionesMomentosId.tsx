import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Image from 'next/image';
import style from '../../estilos/Secciones/PublicacionesMomentosId.module.css';
import ReactMarkdown from 'react-markdown';
import cheerio from 'cheerio';
import Head from 'next/head';

export default function Publicaciones({ publicacion, multimedia, informacionUsuarioCreador }: any) {
  const [processedContent, setProcessedContent] = useState<string | null>(null);

  useEffect(() => {
    if (publicacion) {
      const contentWithMedia = replaceMediaWithNextComponents(publicacion.contenido_publicacion);
      setProcessedContent(contentWithMedia);
    }
  }, [publicacion]);

  const replaceMediaWithNextComponents = (htmlContent: string) => {
    const $ = cheerio.load(htmlContent);
    
    // Reemplaza imágenes
    $('img').each((index, element) => {
      const imgSrc = $(element).attr('src');
      if (imgSrc) {
        const imgComponent = (
          <Image
            key={`image-${index}`}
            src={imgSrc}
            quality={100}
            alt="Image"
            className={style.imagenPublicacion}
            objectFit='cover'
            layout='responsive'
            width={500}
            height={500}
          />
        );
        $(element).replaceWith(ReactDOMServer.renderToStaticMarkup(imgComponent));
      }
    });

    // Reemplaza iframes (videos)
    $('iframe.ql-video').each((index, element) => {
      const videoSrc = $(element).attr('src');
      
      if (videoSrc) {
        const iframeComponent = (
          <iframe
            key={`iframe-${index}`}
            src={videoSrc}
            className={style.videoPublicacion}
            width="500"
            height="700"
            allowFullScreen
          ></iframe>
        );
        $(element).replaceWith(ReactDOMServer.renderToStaticMarkup(iframeComponent));
      }
    });

    return $.html();
  };

  function convertirFechaHora(cadenaFechaHora: any) {
    const fechaHora = new Date(cadenaFechaHora);
    const fechaFormateada = fechaHora.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });
    const horaFormateada = fechaHora.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return `${fechaFormateada} ${horaFormateada}`;
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={`Unidad Educativa Especializada Sordos de Chimborazo`} />
        <meta property="og:title" content={`${publicacion.titulo_publicacion}`} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}/publicaciones/publicacion/${publicacion.id_publicacion}`} />
      </Head>
      <div className={style.contenedorPrincipalInformacionPublicacion}>
        {publicacion ? (
          <div className={style.publicacion}>
            <div className={style.contenedorContenidoPublicacion}>
              <div className={style.contenidoPublicacion}>
                <h1>{publicacion.titulo_publicacion}</h1>
                <div className={style.informacioUusuarioCreador}>
                  <Image
                    alt={`imagenUsuario_${informacionUsuarioCreador.nombre_usuario}_${informacionUsuarioCreador.apellido_usuario}`}
                    className={style.imagenFotoCreador}
                    src={informacionUsuarioCreador.imagen_usuario}
                    width={60}
                    height={60}
                  />
                  <div className={style.informacioUsuarioCreadorPublicacion}>
                    <span>Autor {informacionUsuarioCreador.nombre_usuario}{" "}{informacionUsuarioCreador.apellido_usuario}</span>
                    <span>Publicación creada el {convertirFechaHora(publicacion.creado_en)}</span>
                  </div>
                </div>
                
                {processedContent ? (
                  <div className={style.elementosContenido} dangerouslySetInnerHTML={{ __html: processedContent }}/>
                ) : (
                  <ReactMarkdown className={style.elementosContenido}>{publicacion.contenido_publicacion}</ReactMarkdown>
                )}
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
