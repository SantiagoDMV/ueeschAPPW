import estilos from "./PanelOpciones.module.css"

export default function PanelOpciones({setElemento}:any) {
    
  return (
    
    <div className={estilos.contenedor}>
        <div className={estilos.contenedorElementos}>
            <label>Elementos textuales</label>
            <div className={estilos.elementos}>
                <label onClick={()=>setElemento("h1")}>Titulo</label>
                <label onClick={()=>setElemento("h3")}>Subtítulo</label>
                <label onClick={()=>setElemento("p")}>Párrafo</label>
                <label onClick={()=>setElemento("img")}>Imagen</label>
            </div>
        </div>
        <div className={estilos.contenedorOpcionesPanel}>
          <button onClick={()=>setElemento("button")}>Publicar</button>
        </div>
    </div>


  )
}
