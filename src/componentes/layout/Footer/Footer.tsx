import style from './Footer.module.css'
import Image from 'next/image'
import {AiOutlineWhatsApp,AiFillFacebook} from 'react-icons/ai'
import Link from 'next/link'

export default function Footer() {

  const logo = 'https://res.cloudinary.com/dxopgkamj/image/upload/v1716430862/thumbnail_logo_unidad_1a960e2f61.png'
  return (
    <div className={style.contenedorPrincipalFooter}>
    <div className={style.contenedorFooter}>
      <div className={style.footerIzquierda}>
      <div className={style.unidadEducativa}>
      <Image
      className={style.logo}
      src={logo}
      alt='logo_unidad'
      height={100}
      width={110}
      />
      <h3>Unidad Educativa Especializada Sordos de Chimborazo</h3>
      </div>
      </div>

      <div className={style.footerMedio}>
      <div className={style.subMenu}>
      {/* <label><AiFillPhone className={style.icono}/>03-2969833</label>  */}
      <Link href="/historia">Nuestra Historia</Link>
      <Link href="/matriculate">Requisitos de matriculación</Link>
      <Link href="/contactanos">Contáctanos</Link>
      <Link href="/servicios">Servicios</Link>
      <Link href="/publicaciones">Publicaciones</Link>
      </div>
    </div>


    <div className={style.footerDerecha}>
      <a target='_blank' href="https://web.whatsapp.com/send/?phone=5930992515443"><AiOutlineWhatsApp className={style.iconosRedes}/></a>
      <a target='_blank' href="https://www.facebook.com/UEESCH?locale=es_LA"><AiFillFacebook className={style.iconosRedes}/></a>

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
  )
}
