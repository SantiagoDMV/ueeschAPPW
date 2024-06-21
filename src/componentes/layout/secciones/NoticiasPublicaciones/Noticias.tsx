import estilos from './Noticia.module.css'
import Carrusel from '@/componentes/CarruselNoticias/Carrusel'

export default function Noticias({noticias}:any) {
    const noticiasPublicaciones =  noticias && noticias.filter((e:any)=>(e.id_tipo_publicacion === 2))

  return (
    <div className={estilos.contenedorNoticias}>
    {
    noticiasPublicaciones &&
    <Carrusel datosNoticias = {noticiasPublicaciones}/>
    }
    </div>
  )
  
}
