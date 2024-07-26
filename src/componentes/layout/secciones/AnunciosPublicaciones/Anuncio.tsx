import estilos from './Anuncio.module.css'
import Carrusel from '@/componentes/CarruselNoticias/Carrusel'

export default function Anuncios({noticias,datosMultimediaAnuncios}:any) {
    //const noticiasPublicaciones =  noticias && noticias.filter((e:any)=>(e.id_tipo_publicacion === 2))

  return (
    <div className={estilos.contenedorNoticias}>
    {
    noticias &&
    <Carrusel datosNoticias = {noticias} datosMultimediaAnuncios={datosMultimediaAnuncios}/>
    }
    </div>
  )
  
}
