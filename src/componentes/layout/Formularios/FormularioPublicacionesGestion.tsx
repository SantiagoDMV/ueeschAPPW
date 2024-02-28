import styles from "../../estilos/Formularios/FormularioNuevaPublicacion.module.css";
import Ventana from "../../ventanas/Ventana";
import MyQuillEditor from "@/componentes/QuillEditor/QuillEditor";
import {
  AiFillPlusCircle,
  AiOutlineCloseCircle,
  AiFillSound,
} from "react-icons/ai";
import axios,{AxiosError} from "axios";
import { useState,useRef } from "react";
import MensajeExito from "@/componentes/mensajes/MensajeExito/MensajeExito";
import MensajeError from "@/componentes/mensajes/MensajeError/MensajeError";
import MensajeCargando from "@/componentes/mensajes/MensajeCargando/MensajeCargando";
import  ReactImageFileResizer  from 'react-image-file-resizer';



export default function FormulaioPublicaciones ({actualizarPublicaciones}:any) {

  const [contenido, setContenido] = useState({
    id_tipo_publicacion: '3',
    fecha_eliminacion:''
  });

  const [content, setContent] = useState('')
  const [mostrarVentana, setMostrarVentana] = useState(false)
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  
  ////////////////////////////////////////////////////////////////////////
  const [mensajeExito,setMensajeExito] = useState<any>({
    estado:false,
    mensaje: ''
  })

  const [mensajeCargando,setMensajeCargando] = useState<any>({
    estado:false,
    mensaje: ''
  })

  const [mensajeErrorEstado, setMensajeErrorEstado] = useState({
    estado: false,
    titulo: '',
    informacion: ''
  })


  const timeoutId = useRef<NodeJS.Timeout | null>(null);
////////////////////////////////////////////////////////////////////////

const escucharCambio = (e: any) => {
  setContenido({
    ...contenido,
    [e.target.name]: e.target.value,
  });
};



  const nuevaPublicacion = () => {
    document.documentElement.style.overflow = 'hidden';
    setMostrarVentana(true);
  };

  const limpiarformulario = () => {
    document.documentElement.style.overflowY = 'scroll';
    setMostrarVentana(false);
    setContent('')
  };


  const creacionPublicacion = async () => {
    
    try {
      
      setMensajeCargando({
        estado:true,
        mensaje: 'Creando publicación, esto puede llevar un momento...'
      })
      
      let contentToSend:string[] = [content]; // Copia del contenido original del editor

        // Redimensionar imágenes si superan el límite de 1 MB
        const images = content.match(/<img[^>]+>/g); // Extraer todas las etiquetas de imagen del contenido
        if (images) {
            const promises = images.map(async imgTag => {
                const src = imgTag.match(/src="([^"]+)"/); // Extraer el atributo src de la etiqueta de imagen
                if (src && src[1]) {
                    const imgSrc = src[1];
                    try {
                        const response = await fetch(imgSrc); // Obtener la imagen
                        if (!response.ok) {
                            // Si la solicitud no fue exitosa, saltar al siguiente bucle
                            return imgTag;
                        }
                        const blob = await response.blob();
                        //console.log("Tamaño inicial de la imagen:", blob.size);

                        if (blob.size > 307200) {
                            // Redimensionar la imagen
                            const resizedImageBlob = await new Promise<Blob>((resolve, reject) => {
                                ReactImageFileResizer.imageFileResizer(
                                  blob, // file: Blob
                                  700, // maxWidth: number
                                  700, // maxHeight: number
                                  'PNG', // compressFormat: string
                                  1, // quality: number
                                  0, // rotation: number
                                  (value: string | Blob | File | ProgressEvent<FileReader>) => { // responseUriFunc: (value: string | Blob | File | ProgressEvent<FileReader>) => void
                                      if (value instanceof Blob) {
                                          // Si el valor es una Blob, es la imagen redimensionada
                                          resolve(value);
                                      } else {
                                          // Si el valor no es una Blob, puedes manejar otros tipos de respuestas aquí
                                          console.error("Se recibió un tipo de respuesta inesperado:", value);
                                          reject(new Error("Respuesta inesperada al redimensionar la imagen"));
                                      }
                                  },
                                  'blob' // outputType: string (opcional, puedes omitirlo si deseas el valor predeterminado)
                                );
                            });
                            //console.log("Tamaño después de redimensionar:", resizedImageBlob.size);
                            // Convertir la imagen redimensionada a formato de datos URL
                            const resizedImageDataUrl = await blobToDataURL(resizedImageBlob);
                            // Reemplazar la imagen original con la redimensionada en el contenido
                            return imgTag.replace(imgSrc, resizedImageDataUrl);
                        }
                        return imgTag;
                    } catch (error) {
                        console.error("Error al cargar la imagen:", error);
                        return imgTag;
                    }
                }
                return imgTag;
            });
            contentToSend = await Promise.all(promises);
        }
        
        // Aquí deberías esperar a que se redimensionen todas las imágenes antes de continuar con el envío de la publicación

        await axios.post("/api/publicaciones", {
            contenido: contentToSend.join(''), // Usar el contenido redimensionado
            datosPublicacion: contenido,
        });

      
      // await axios.post("/api/publicaciones",{contenido: contenido})
      // .then(async (respuesta:any)=>{
      //   const id =respuesta.data.id_publicacion
      //   formData.append('id', id)
      //   await axios.post("/api/imagenes/subirimagenes", formData)
      // })

      actualizarPublicaciones();
          setMostrarMensaje(false);
          setMensajeExito({
            estado: true,
            mensaje: 'La publicación fue creada exitosamente'
          });
        
    } catch (error) 
    {
      ////////////////////////////////////////////////////////////////////////
    const errorMensaje:any = (error as AxiosError).response?.data;    

    console.log(error)
    setMensajeCargando({
      estado:false,
      mensaje: ''
    })

    if(timeoutId.current){
    clearTimeout(timeoutId.current)
    }

    setMensajeErrorEstado({
      estado:true,
      titulo: 'Error',
      informacion:errorMensaje.mensaje
    })

    timeoutId.current = setTimeout(() => {
      setMensajeErrorEstado({
        estado:false,
        titulo:'',
        informacion:''
      })
    }, 3000);
  } finally {
    
    setContenido({
    id_tipo_publicacion: '3',
    fecha_eliminacion:''
    })

    setContent('')

    setMensajeCargando({
      estado: false,
      mensaje: ''
    });


    setTimeout(() => {
      setMensajeExito({
        estado: false,
        mensaje: ''
      });
    }, 3000);

  }
    
  };


  /* */


  const blobToDataURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                resolve(reader.result);
            } else {
                reject(new Error("Error al leer el archivo como URL de datos."));
            }
        };
        reader.onerror = () => {
            reject(new Error("Error al leer el archivo como URL de datos."));
        };
        reader.readAsDataURL(blob);
    });
  };

  
  function getFechaActual() {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Asegurar que tenga dos dígitos
    const dia = String(ahora.getDate()).padStart(2, '0');
    const hora = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
  
    // Formato: 'YYYY-MM-DDTHH:mm'
    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
  }
  
  
  return (
    <>
    <MensajeExito informacion={mensajeExito.mensaje} estado={mensajeExito.estado}/>
    <MensajeError estado={mensajeErrorEstado.estado} titulo={mensajeErrorEstado.titulo} informacion={mensajeErrorEstado.informacion}/>
    <MensajeCargando informacion={mensajeCargando.mensaje} estado={mensajeCargando.estado}/>
    
    <div
          className={styles.contenedorArchivosMultimedia}
        >
          <div className={styles.tituloContenedorContraido}>
          <label>Nueva publicación</label>
          </div>
          <div className={styles.botones}>
            <AiFillPlusCircle
              onClick={nuevaPublicacion}
              className={styles.iconoAñadirPublicacion}
            />
          </div>
    </div>
        

    <Ventana estado={mostrarVentana} actualizacion={setMostrarVentana}>
    {/* <Ventana estado={true} actualizacion={setMostrarVentana}> */}
    <div
          className={styles.contenedorArchivosMultimediaVentanaOpciones}
        >

<div className={styles.contenedorSelect}>
            <select onChange={(e) => escucharCambio(e)} name="id_tipo_publicacion">
            <option value={'3'}>Tipo: Noticia</option>
            <option value="1">Tipo: Servicio</option>
            <option value="2">Tipo: Anuncio</option>
            </select>
      
         </div>

          <div className={styles.contenedorArchivosMultimediaVentana}>
         
<div className={styles.contenedorMasOpciones}>

      <div className={styles.contenedorMasOpciones} id="masOpcionesPublicacion">
        <div className={styles.contenedorFechaEliminacion}>
            <input 
            onChange={escucharCambio}
            min={getFechaActual()}
            type="datetime-local" name="fecha_eliminacion"/>
            </div>
      </div>

</div>

          <div className={styles.botones}>  
            <button onClick={()=>creacionPublicacion()}>
            <AiFillSound
            className={styles.iconoPublicar} />
            </button>
            <AiOutlineCloseCircle
              onClick={limpiarformulario}
              className={styles.iconoCancelar}
            />      
      
      </div>
      </div>

      </div>
      <div className={styles.contenedorQuill}> 
      <MyQuillEditor content={content} setContent={setContent}/>  
      
      </div>
    
    </Ventana>
    
    </>
  );
}
