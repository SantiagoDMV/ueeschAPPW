import style from '../estilos/Footer.module.css'
import logo from '../../src/imagenes/logoUnidad.png'
import Image from 'next/image'
import {AiFillPhone,AiOutlineWhatsApp,AiFillFacebook} from 'react-icons/ai'

export default function Footer() {
  return (
    <div className={style.contenedorFooter}>
      <div className={style.footerIzquierda}>
      <Image
      className={style.logo}
      src={logo}
      alt='logo_unidad'
      height={100}
      width={110}
      />
      <div className={style.contactos}>
      <label><AiFillPhone className={style.icono}/>03-2969833</label> 
      </div>
      </div>
    <div className={style.footerDerecha}>
      <a target='_blank' href="https://web.whatsapp.com/send/?phone=5930992515443"><AiOutlineWhatsApp className={style.iconosRedes}/></a>
      <a target='_blank' href="https://www.facebook.com/UEESCH?locale=es_LA"><AiFillFacebook className={style.iconosRedes}/></a>
      </div>
      FOOOOOTER
      </div>
  )
}
