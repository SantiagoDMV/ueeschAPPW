import Layout from "@/componentes/layout/Layout";
import Header from "../componentes/layout/Header/HeaderLiviano/Header";
import dynamic from 'next/dynamic';

import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import estilos from '../styles/pestañas/Historia.module.css'
import Footer from "@/componentes/layout/Footer/Footer";
import NavIzquierdo from "@/componentes/layout/Nav/NavIzquierdoPresentacion/NavIzquierdo";

const SeccionMisionVision = dynamic(() => import("../componentes/layout/secciones/SeccionMisionVision/SeccionMisionVision"));
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
                <SeccionMisionVision/>
                
                </div>
            
            </div>
            <Footer/>
        </Layout>
    );
}

export const getServerSideProps = async (context) => {
    // const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/2?populate[imagen_header][fields][0]=url');
    // const { data } = respuesta.data;
    // const { attributes } = data;

    const attributes = {
        titulo: "Misión y Visión",
        descripcion_titulo: null,
        contenido: "",
        imagen_header: {
            data: {
                id: 2,
                attributes: {
                    url: "https://res.cloudinary.com/dxopgkamj/image/upload/v1720760595/pexels_nitin_arya_386173_1029141_1971e33733.jpg"
                }
            }
        }
    }
    try {
        return {
            props: {
                informacion: attributes
            },
        };
    } catch (error) {
    }
};
