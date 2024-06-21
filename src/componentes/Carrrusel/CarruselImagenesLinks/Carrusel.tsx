
import Image from 'next/image';
import styles from '../Carrusel.module.css'; 
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

export default function CarruselImágenes({ datosMultimedia }: any) {  
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay:true,
    autoplaySpeed:4500,
    //speed: 700,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  return (
    <div className={styles.contenedorPrinpialCarrusel}>
 <Slider {...settings}>
        {datosMultimedia &&
          datosMultimedia.map((e: any, index: number) => (
            <div key={index} className={styles.carouselSlide}>
              <Image
                src={datosMultimedia[index]}
                alt={`imagen_servicio_${index}`}
                width={600}
                height={400}
                quality={100}
                className={styles.carruselImagen}
              />
            </div>
          ))}
</Slider>
    </div>
  );
}
