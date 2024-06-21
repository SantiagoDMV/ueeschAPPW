import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import styles from './Quill.module.css';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// Configuración de módulos (por ejemplo, módulo de enlaces)
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['link', 'image', 'video', ],
    [{ 'color': [] }, { 'background': [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['clean']
  ],
};

// Configuración de temas
const formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video', 'color', 'background'
];

// Usamos dynamic para importar ReactQuill solo en el lado del cliente
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const MyQuillEditor = ({ content, setContent }: any) => {
  // Función para procesar el contenido y reemplazar las URL de las imágenes
  const processContent = (content: string) => {
    const modifiedContent = content.replace(/<img src="http:\/\/drive\.google\.com\/uc\?export=view&amp;id=([^"]+)"[^>]*>/g, (_, id) => {
      //return `<img alt="imagen_servicio_0" loading="lazy" width="500" height="350" decoding="async" data-nimg="1" class="Carrusel_carruselImagen__ml55w" srcset="/_next/image?url=http%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D${id}&w=640&q=75 1x, /_next/image?url=http%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D${id}&w=1080&q=75 2x" src="/_next/image?url=http%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D${id}&w=1080&q=75" style="color: transparent;">`;
      return `<img src="/_next/image?url=http%3A%2F%2Fdrive.google.com%2Fuc%3Fexport%3Dview%26id%3D${id}&w=1080&q=75">`;
    });
    return modifiedContent;
  };

  const processedContent = useMemo(() => processContent(content), [content]);

  const handleEditorChange = (value: any) => {
    setContent(value);
  };


  return (
    <ReactQuill
      className={styles.quill}
      modules={modules}
      formats={formats}
      value={processedContent}
      onChange={handleEditorChange}
    />
  );
};

export default MyQuillEditor;
