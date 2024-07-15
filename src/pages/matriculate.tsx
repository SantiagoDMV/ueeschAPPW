import Layout from "@/componentes/layout/Layout";
import estilos from "../styles/pestañas/Matriculate.module.css";
import Contenido from "@/componentes/ContenidoStrapi/Contenido";
import axios from "axios";
import Header from "@/componentes/layout/Header/HeaderLiviano/Header";
import Footer from "@/componentes/layout/Footer/Footer";
import NavIzquierdo from "@/componentes/layout/Nav/NavIzquierdoPresentacion/NavIzquierdoIndex";

export default function Matriculate({
  usuarioCookie,
  setUsuarioCookie,
  informacion,
  moodle,
}: any) {
  return (
    <Layout
      usuario={usuarioCookie}
      setUsuarioCookie={setUsuarioCookie}
      moodle={moodle}
    >
      {informacion && <Header informacion={informacion} />}
      <div className={estilos.contenedorMatriculacion}>
        <div className={estilos.contenedorRequisitos}>
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
      </div>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const respuesta = await axios.get(
    "https://ueeschstrapi.onrender.com/api/paginas/5?populate[imagen_header][fields][0]=url"
  );
  const { data } = respuesta.data;
  const { attributes } = data;
  try {
    return {
      props: {
        informacion: attributes,
      },
    };
  } catch (error) {}
};

// import Layout from "@/componentes/layout/Layout"
// import estilos from '../styles/pestañas/Matriculate.module.css'
// import { AiOutlineQuestionCircle } from "react-icons/ai";

// export default function Matriculate({usuarioCookie,setUsuarioCookie}:any) {
//   return (
//     <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
//     <div className={estilos.contenedorMatriculacion}>

//         <div className={estilos.contenedorRequisitos}>
//             <div className={estilos.contenedorRequisitosIzquierda}>
//                 <p>Facilita tu ingreso aportando la documentación necesaria para el proceso de matriculación</p>
//             </div>
//             <div className={estilos.contenedorRequisitosDerecha}>
//                 <ul>
//                     <li>Copia de la cédula de identidad del estudiante y del representante legal.</li>
//                     <li>Certificado de discapacidad auditiva emitido por el Ministerio de Salud Pública.</li>
//                     <li>Certificado de escolaridad del año anterior.</li>
//                     <li>2 fotografías tamaño carnet del estudiante.</li>
//                     <li>Carpeta manila tamaño oficio.</li>
//                 </ul>

//             </div>

//         </div>
//         <div className={estilos.contenedorMasInformacion}>
//             <div>
//         <AiOutlineQuestionCircle className={estilos.iconoInformacion}/>
//         <p>Si tienes alguna pregunta o necesitas más detalles sobre los requisitos de matriculación, no dudes en
//               ponerte en contacto con nuestro equipo de admisiones. Estamos aquí para ayudarte en cada paso del proceso.
//             </p>
//             </div>
//         </div>
//     </div>
//     </Layout>
//   )
// }
