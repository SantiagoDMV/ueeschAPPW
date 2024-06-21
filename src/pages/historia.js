import Layout from "@/componentes/layout/Layout";
import Header from "../componentes/layout/Header/HeaderLiviano/Header";
import axios from 'axios';
import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import estilos from '../styles/pestañas/Historia.module.css'
import Footer from "@/componentes/layout/Footer/Footer";

export default function Historia({ usuarioCookie, setUsuarioCookie, 
    informacion, 
    moodle }) {

        // const informacion = {
        //     contenido:
        //  `# La Unidad Educativa Especializada Sordos de Chimborazo (UEESCH)
        //  La Unidad Educativa Especializada Sordos de Chimborazo (UEESCH) tiene una rica historia que se remonta a varios años atrás, dedicada a brindar educación de calidad a estudiantes con discapacidad auditiva en la provincia de Chimborazo, Ecuador. A continuación, se presenta un resumen de su trayectoria:
        //  Orígenes y Fundación         
        //  Si bien no se cuenta con una fecha exacta de fundación, los inicios de la UEESCH se ubican en la década de 1950, cuando un grupo de padres de familia con hijos sordos se unieron con el objetivo de crear un espacio educativo especializado para sus hijos. En sus inicios, las clases se impartían en una pequeña casa alquilada, con un número reducido de estudiantes y profesores.
        //  Crecimiento y Desarrollo
        //  A lo largo de los años, la UEESCH ha experimentado un crecimiento constante, tanto en su infraestructura como en su población estudiantil. En la década de 1970, la institución se trasladó a un nuevo edificio más amplio, permitiendo atender a un mayor número de estudiantes. Además, se amplió la oferta educativa, incluyendo niveles de educación inicial, básica y media.
        //  Logros y Reconocimiento
        //  La UEESCH se ha convertido en una institución educativa referente en la provincia de Chimborazo, reconocida por su labor en la educación de estudiantes con discapacidad auditiva. Ha obtenido diversos reconocimientos por su compromiso con la inclusión y la calidad educativa.
        //  Impacto en la Comunidad
        //  La UEESCH ha jugado un papel fundamental en la inclusión social de las personas con discapacidad auditiva en la provincia de Chimborazo. Sus egresados han logrado integrarse con éxito a la sociedad, desempeñándose en diversos ámbitos laborales y profesionales.
        //  Actualidad y Perspectivas
        //  En la actualidad, la UEESCH continúa brindando educación de calidad a estudiantes con discapacidad auditiva, desde el nivel de estimulación temprana hasta el bachillerato. La institución cuenta con un equipo docente altamente calificado, infraestructura moderna y recursos tecnológicos de vanguardia.
        //  Mirando hacia el futuro, la UEESCH se compromete a seguir siendo un referente en la educación inclusiva, promoviendo el desarrollo integral de sus estudiantes y su plena participación en la sociedad.
        //  `       
        //     ,
        // }

    return (
        <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
            {/* <Header informacion={"informacion"} /> */}
            <Header informacion={informacion} />
            <div className={estilos.contendorHistoria}>
            <Contenido informacion={informacion}/>
            </div>
            <Footer/>
        </Layout>
    );
}

export const getServerSideProps = async (context) => {
    const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/2?populate[imagen_header][fields][0]=url');
    const { data } = respuesta.data;
    const { attributes } = data;
    try {
        return {
            props: {
                informacion: attributes
            },
        };
    } catch (error) {
    }
};
