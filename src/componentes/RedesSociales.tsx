import React from 'react'
import style from './estilos/RedesSociales.module.css'
import {AiFillFacebook,AiOutlineWhatsApp} from 'react-icons/ai'
import Link from 'next/link'
export default function RedesSociales() {
  return (
    <div className={style.contenedorRedes}>
      <Link href={"https://www.facebook.com/UEESCH/"}
      target='_BLANK'>
        <AiFillFacebook className={style.icono}/>
        </Link>
        <AiOutlineWhatsApp className={style.icono}/>
    </div>
  )
}
