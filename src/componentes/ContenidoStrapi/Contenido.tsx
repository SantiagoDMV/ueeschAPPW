import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import estilos from './Contenido.module.css'

export default function Contenido({informacion}:any) {
  return (
    <div className={estilos.contenedorHistoria}>
    <ReactMarkdown
    className={estilos.contenedorContenido}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}                    
    >

    {informacion.contenido}
</ReactMarkdown>
</div>
  )
}
