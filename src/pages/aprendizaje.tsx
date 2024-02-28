import estilos from "../styles/pestañas/Perdidaauditiva.module.css";
import Layout from "@/componentes/layout/Layout";
import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import Header from "@/componentes/layout/Header/HeaderLiviano/Header";
import axios from "axios";
import Footer from "@/componentes/layout/Footer/Footer";

export default function Aprendizaje({ usuarioCookie, setUsuarioCookie, informacion, moodle }: any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
        <Header informacion={informacion} />
        <div className={estilos.contendorHistoria}>
        <Contenido informacion={informacion}/>
        </div>
        <Footer/>
    </Layout>
);
}

export const getServerSideProps = async (context:any) => {
const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/4?populate[imagen_header][fields][0]=url');
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
