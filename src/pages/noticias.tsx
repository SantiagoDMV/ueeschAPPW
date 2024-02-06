import Layout from "@/componentes/layout/Layout"
import PanelOpciones from "@/componentes/Noticias/PanelOpciones/PanelOpciones"
import ContenidoNoticia from "@/componentes/Noticias/ContenidoNoticia/ContenidoNoticia"
import estilos from "../styles/pestañas/Noticias.module.css"
import { useState } from "react"
export default function Noticias({usuarioCookie}:any) {
  
  const [elemento,setElemento] = useState(null);

  return (
    <Layout>
    <div className={estilos.conetenedorNoticias}>
      <div className={estilos.contenedorPanel}>
      <PanelOpciones setElemento = {setElemento}/>
      </div>
      <div className={estilos.contenedorContenido}>
      <ContenidoNoticia elemento = {elemento} setElemento = {setElemento}/>
      </div>
    </div>
    </Layout>
  )
}
