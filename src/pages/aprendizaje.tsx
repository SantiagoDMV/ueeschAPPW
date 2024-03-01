import estilos from "../styles/pestañas/Perdidaauditiva.module.css";
import Layout from "@/componentes/layout/Layout";
import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import Header from "@/componentes/layout/Header/HeaderLiviano/Header";
import axios from "axios";
import Footer from "@/componentes/layout/Footer/Footer";
import { useState } from "react";

export default function Aprendizaje({ usuarioCookie, setUsuarioCookie, informacion, moodle }: any) {
    const [palabra,setPalabra] = useState<string>();

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
        <Header informacion={informacion} />
        <form onSubmit={(e) => {
    e.preventDefault();
    window.open(`http://www.plataformaconadis.gob.ec/~platafor/diccionario/?s=${palabra}&post_type%5B%5D=st_kb`, '_blank');
}}>
    <div className={estilos.contenedorLenguajeSenas}>
        <h3>Diccionario de Lengua de Señas Ecuatoriana</h3>
        <input type="text" placeholder="Ingrese aquí una palabra" onChange={(e) =>
            setPalabra(e.target.value)
        } />
        <button type="submit">Buscar</button>
    </div>
</form>

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
