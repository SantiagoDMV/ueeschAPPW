import styles from './Carrusel.module.css'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
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

export default function CarruselImágenes({ datosNoticias }: any) {  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const handleLeerMasClick = (id: string) => {
    // Redirigir a la página de detalles de la publicación
    window.location.href = `/publicaciones/publicacion/${id}`;
  };

  return (
    <div className={styles.contenedorPrinpialCarrusel}>
      <Slider {...settings}>
        {datosNoticias &&
          datosNoticias.map((e: any, index: number) => (
            <div key={index} className={styles.carouselSlide}>
              <div className={styles.contenedorCarruselInformacion}>
                <h4>{e.titulo_publicacion}</h4>
                <button
                  className={styles.LinkButton}
                  onClick={() => handleLeerMasClick(e.id_publicacion)}
                >
                  Leer más
                </button>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}
