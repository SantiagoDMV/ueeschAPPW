import style from "../styles/pestañas/Contactanos.module.css";
import { AiFillMail,AiOutlineWhatsApp, AiFillPhone } from "react-icons/ai";
import ContactForm from "@/componentes/layout/Formularios/FormularioEmail/FormularioEmail";
import Link from "next/link";
import Layout from "@/componentes/layout/Layout";
export default function About({usuarioCookie,setUsuarioCookie}:any) {
  return (

<Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}> 


      <div className={style.contenedorContactanos}>
      <div className={style.contactanos}>
        <div className={style.contenedorInformacion}>
        <h3>Comunícate con nosotros</h3>
        <div className={style.contenedordatosInformativos}>
          <div className={style.datosInformativos}>
            <div className={style.lineaInformativa}>
              <AiFillMail className={style.icono} /> <b> Email:</b>
              <Link className={style.correoEnlace} href="mailto:ueesch2023@gmail.com">ueesch2023@gmail.com</Link>
            </div>
            <div className={style.lineaInformativa}>
              <AiFillPhone className={style.iconoTelefono} />
              <b>Teléfono:</b> 09876543321
            </div>
            <div className={style.lineaInformativa}>
              <AiFillPhone className={style.iconoTelefono} />
              <b>Dirección:</b> C. Loja &, Riobamba
            </div>
            <div className={style.lineaInformativa}>
              <AiFillPhone className={style.iconoTelefono} />
              <b>Horario de atención:</b>
              <p>Lun - vie: 8:00 - 20:00​ </p>
              <p>Sábado: 9:00 - 19:00</p>
              <p>​Domingo: 9:00 - 20:00</p>
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
