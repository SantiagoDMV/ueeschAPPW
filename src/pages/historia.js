import Layout from "@/componentes/layout/Layout";
import Header from "../componentes/layout/Header/HeaderLiviano/Header";
import axios from 'axios';
import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import estilos from '../styles/pestañas/Historia.module.css'
import Footer from "@/componentes/layout/Footer/Footer";

export default function Historia({ usuarioCookie, setUsuarioCookie, informacion }) {

    return (
        <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
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
