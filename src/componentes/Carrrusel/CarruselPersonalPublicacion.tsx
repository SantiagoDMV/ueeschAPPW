import Image from 'next/image';
import styles from './Carrusel.module.css'; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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

export default function CarruselImágenes({ datosMultimedia, idPublicacion }: any) {  
  const multimediaFiltrado = datosMultimedia.filter((e: any) => e.id_publicacion === idPublicacion);
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay:true,
    autoplaySpeed:4500,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className={styles.contenedorPrinpialCarrusel}>
      <Slider {...settings}>
        {multimediaFiltrado && multimediaFiltrado.map((e: any, index: number) => (
          <div key={index} className={styles.carouselSlide}>
            <Image
              src={e.ruta_multimedia}
              alt={`imagen_servicio_${index}`}
              width={500}
              height={350}

              className={styles.carruselImagen}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
