import estilos from "../styles/pestañas/Historia.module.css";
import imagenDocentes from "../../public/imagenes/pageHistoria/imagenDocecntes.jpg";
import Image from "next/image";
import { useState } from "react";
import Layout from "@/componentes/layout/Layout";
import Carrusel from "@/componentes/Carrrusel/CarruselImagenesLinks/Carrusel";

const importAll = (r) => r.keys().map((filename) => r(filename));

// Importa todas las imágenes de la carpeta impacto
const imagenesImpacto = importAll(require.context('../../public/imagenes/pageHistoria/impacto/', false, /\.(jpg|png)$/));

export default function Historia({usuarioCookie,setUsuarioCookie}) {

    const [id,setId] = useState(0)

    const cambioAvanceImpactoAvance = () => {
        setId((id + 1) % imagenesImpacto.length);
    };
    
    const cambioAvanceImpactoAtras = () => {
        setId((id - 1 + imagenesImpacto.length) % imagenesImpacto.length);
    };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>

      <div className={estilos.contenedorHistoria}>
      <div className={estilos.contenedorImagen}>
        <span>Nuestra Historia</span>
        </div>


        <div className={estilos.contenedorPresentacion}>    
            
          <p>
            La Unidad Educativa Especializada Sordos de Chimborazo (UEESCH) es
            una institución educativa pública ubicada en la ciudad de Riobamba,
            Ecuador. Fue fundada en 1953 por la Asociación de Sordos del
            Chimborazo, con el objetivo de brindar educación a los niños y
            jóvenes sordos de la región. La UEESCH inició sus actividades con un
            grupo de 15 estudiantes y un solo maestro. A lo largo de los años,
            la institución ha crecido y se ha consolidado como una de las
            principales instituciones educativas para personas sordas en
            Ecuador.
          </p>
          
          <Image
            src={imagenDocentes}
            alt="imagenDOcentes"
            width={500}
            height={400}
            quality={80}
            priority
          />
        </div>
        

        <div className={estilos.contenedorAvances}>
            <div>
        <p>La UEESCH ha tenido un impacto significativo en la vida de las personas sordas de Chimborazo. La institución ha brindado a los estudiantes la oportunidad de acceder a una educación de calidad y desarrollar sus habilidades y destrezas. La UEESCH ha contribuido a la inclusión social de las personas sordas y al fortalecimiento de su cultura.</p>
        <p>La UEESCH ha recibido varios reconocimientos por su trabajo, entre ellos el Premio Nacional a la Educación Inclusiva, otorgado por el Ministerio de Educación de Ecuador en 2022. La institución sigue trabajando para brindar una educación de calidad a las personas sordas de Chimborazo, y para contribuir a la construcción de una sociedad más inclusiva.</p>
        <div className={estilos.contenedorImagenesImpacto}>
            {
                imagenesImpacto &&
               <Carrusel datosMultimedia={imagenesImpacto}/>
            }

        </div>
        </div>

        </div>
      </div>
    </Layout>
  );
}
