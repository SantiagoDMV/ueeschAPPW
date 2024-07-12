import Layout from "@/componentes/layout/Layout";
import Header from "../componentes/layout/Header/HeaderLiviano/Header";
import axios from 'axios';
import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import estilos from '../styles/pestañas/Historia.module.css'
import Footer from "@/componentes/layout/Footer/Footer";
import NavIzquierdo from "@/componentes/layout/Nav/NavIzquierdoPresentacion/NavIzquierdo";

export default function Historia({ usuarioCookie, setUsuarioCookie, 
    informacion, 
    moodle }) {

    return (
        <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
            {/* <Header informacion={"informacion"} /> */}
            <Header informacion={informacion} />
            <div className={estilos.contendorHistoria}>
                <div className={estilos.izquierda}><NavIzquierdo usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}/></div>
                <div className={estilos.derecha}>
                <Contenido informacion={informacion}/>
                </div>
            
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
