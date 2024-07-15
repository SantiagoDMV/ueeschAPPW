import estilos from "../styles/pestañas/Perdidaauditiva.module.css";
import Layout from "@/componentes/layout/Layout";
import axios from "axios";
import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import Header from "@/componentes/layout/Header/HeaderLiviano/Header";
import Footer from "@/componentes/layout/Footer/Footer";
import NavIzquierdo from "@/componentes/layout/Nav/NavIzquierdoPresentacion/NavIzquierdoIndex";

export default function Entendiendo({ usuarioCookie, setUsuarioCookie, informacion , moodle }: any) {
  
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      
        <Header informacion={informacion}/>
        
        <div className={estilos.contendorHistoria}>
        
        <div className={estilos.izquierda}>
            <NavIzquierdo
              usuario={usuarioCookie}
              setUsuarioCookie={setUsuarioCookie}
            />
          </div>
          <div className={estilos.derecha}>
            <Contenido informacion={informacion} />
          </div>

        </div>
        
  <Footer/>
    </Layout>
  );
}

export const getServerSideProps = async (context:any) => {
  const respuesta = await axios.get('https://ueeschstrapi.onrender.com/api/paginas/3?populate[imagen_header][fields][0]=url');
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
