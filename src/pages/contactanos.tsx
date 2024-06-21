import style from "../styles/pestañas/Contactanos.module.css";
import { AiFillMail, AiFillPhone } from "react-icons/ai";
import ContactForm from "@/componentes/layout/Formularios/FormularioEmail/FormularioEmail";
import Link from "next/link";
import Layout from "@/componentes/layout/Layout";
import axios from 'axios'
import mdtoTML from '../../util/snarkdown'

export default function About({usuarioCookie,setUsuarioCookie, 
  // email, telefono,direccion,horario,
   moodle}:any) {
  return (

<Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}> 


      <div className={style.contenedorContactanos}>
      <div className={style.contactanos}>
        <div className={style.contenedorInformacion}>
        <h3>Comunícate con nosotros</h3>
        <div className={style.contenedordatosInformativos}>
          <div className={style.datosInformativos}>
            <div className={style.lineaInformativa}>
              <AiFillMail className={style.icono} /> 
              {/* <b> {email.nombre}</b>
                <p dangerouslySetInnerHTML={{__html:mdtoTML(email.contenido)}}/> */}
                <b>Email</b>
                <p>ueesch2023@gmail.com</p>
            </div>
            <div className={style.lineaInformativa}>
              <AiFillPhone className={style.iconoTelefono} />
              {/* <b>{telefono.nombre}</b> 
              <p dangerouslySetInnerHTML={{__html:mdtoTML(telefono.contenido)}}/> */}
              <b>Telefono</b>
                <p>0992515443</p>
            </div>
            <div className={style.lineaInformativa}>
              <AiFillPhone className={style.iconoTelefono} />
              {/* <b>{direccion.nombre}</b> 
              <p dangerouslySetInnerHTML={{__html:mdtoTML(direccion.contenido)}}/>*/}
              <b>Direccion</b>
                <p>Junin & Loja, Riobamba</p>
            </div>
            <div className={style.lineaInformativa}>
              <AiFillPhone className={style.iconoTelefono} />
              {/* <b>{horario.nombre}</b>
              <p dangerouslySetInnerHTML={{__html:mdtoTML(horario.contenido)}}/>
               */}
               <b>Horario</b>
                <p>Lunes - Viernes: 7am - 1pm</p>
            </div>
          </div>
          <div className={style.contenedorFormulario}>
          
            <ContactForm/>
          </div>
          </div>
        </div>

        <div className={style.contendorMapa}>
          <iframe
            className={style.mapa}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.114743947605!2d-78.64501002641217!3d-1.6743927361705613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d3a92a3c6af3fb%3A0x5fb0b1cd790a8bde!2sUnidad%20Educativa%20Especializada%20Sordos%20de%20Chimborazo!5e0!3m2!1ses!2sec!4v1704207398067!5m2!1ses!2sec"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      </div>

      </Layout> 
      
  );
}


// export const getServerSideProps = async (context: any) => {
//   //const respuesta = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieSession`, { UserCookie: UserCookie });
//   const respuestaEmail= await axios.get('https://ueeschstrapi.onrender.com/api/informacions/3?[fields][0]=nombre&[fields][1]=contenido');
//   const respuestaTelefono= await axios.get('https://ueeschstrapi.onrender.com/api/informacions/4?[fields][0]=nombre&[fields][1]=contenido');
//   const respuestaDireccion= await axios.get('https://ueeschstrapi.onrender.com/api/informacions/5?[fields][0]=nombre&[fields][1]=contenido');
//   const respuestaHorario= await axios.get('https://ueeschstrapi.onrender.com/api/informacions/6?[fields][0]=nombre&[fields][1]=contenido');

//   try {
//     return {
//       props: {
//         email: respuestaEmail.data.data.attributes,
//         telefono: respuestaTelefono.data.data.attributes,
//         direccion: respuestaDireccion.data.data.attributes,
//         horario: respuestaHorario.data.data.attributes
//       },
//     };
//   } catch (error) {
//   }
// };
