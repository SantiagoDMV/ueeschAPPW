import styles from './Carrusel.module.css'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Imagenes from '../ImagenesAnuncios/ImagenesAnuncios';

function SampleNextArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props:any) {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      antes
    </button>
  );
}

const extractFirstParagraph = (htmlString:any) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const firstParagraph = doc.querySelector('p');
  return firstParagraph ? firstParagraph.textContent : "";
}
export default function CarruselImágenes({ datosNoticias, datosMultimediaAnuncios }:any) {  
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
  };

  console.log(datosMultimediaAnuncios)
  const handleLeerMasClick = (id:any) => {
    // Redirigir a la página de detalles de la publicación
    window.location.href = `/publicaciones/publicacion/${id}`;
  };
  
  return (
    <div className={styles.contenedorPrinpialCarrusel}>
      <Slider {...settings}>
        {datosNoticias &&
          datosNoticias.map((e:any, index:number) => (
            <div key={index} className={styles.carouselSlide}>
              <div className={styles.contenedorCarruselInformacion}>
                {datosMultimediaAnuncios[index] && (
                  <Imagenes
                    multimedia={datosMultimediaAnuncios}
                    idPublicacion={e.id_publicacion}
                    index={index}
                  />
                )}
                { datosMultimediaAnuncios[index] ?
                <div className={styles.contenedorInformacionDatos}>
                  <h4>{e.titulo_publicacion}</h4>
                  <p className={styles.contenedorInformacionDatosP}>{extractFirstParagraph(e.contenido_publicacion)}</p>
                  <button
                    className={styles.LinkButton}
                    onClick={() => handleLeerMasClick(e.id_publicacion)}
                  >
                    Ir al anuncio
                  </button>
                </div>
                :
                <div className={styles.contenedorInformacionDatosSinImagenes}>
                  <h4>{e.titulo_publicacion}</h4>
                  <p className={styles.contenedorInformacionDatosP}>{extractFirstParagraph(e.contenido_publicacion)}</p>
                  <button
                    className={styles.LinkButton}
                    onClick={() => handleLeerMasClick(e.id_publicacion)}
                  >
                    Ir al anuncio
                  </button>
                </div>
                }
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
