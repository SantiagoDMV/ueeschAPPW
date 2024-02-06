import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import Image from 'next/image';
import style from '../../estilos/Secciones/PublicacionesMomentosId.module.css';
import ReactMarkdown from 'react-markdown';
import cheerio from 'cheerio';

export default function Publicaciones({ publicacion, multimedia }: any) {
  const [processedContent, setProcessedContent] = useState<string | null>(null);

  useEffect(() => {
    if (publicacion) {
      const contentWithImages = replaceImgWithNextImage(publicacion.contenido_publicacion);
      setProcessedContent(contentWithImages);
    }
  }, [publicacion]);

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

  return (
    <div className={style.contenedorPrincipalInformacionPublicacion}>
      {publicacion ? (
        <div className={style.publicacion}>
          <div className={style.contenedorContenidoPublicacion}>
            <div className={style.contenidoPublicacion}>
              <h1>{publicacion.titulo_publicacion}</h1>
              {processedContent ? (
                <div dangerouslySetInnerHTML={{ __html: processedContent }} />
              ) : (
                <ReactMarkdown>{publicacion.contenido_publicacion}</ReactMarkdown>
              )}
            </div>
          </div>

        </div>
      ) : (
        <h3 className={style.tituloPublicaciones}>No existen publicaciones actualmente</h3>
      )}
    </div>
  );
}
