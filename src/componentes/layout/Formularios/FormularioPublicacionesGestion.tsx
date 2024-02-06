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
      
      await axios.post("/api/publicaciones",{contenido: content, datosPublicacion: contenido})
      
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

  const mostrarMasOpciones = () => {
    const div: HTMLDivElement | null = document.getElementById('masOpcionesPublicacion') as HTMLDivElement;
  
    if (div && div.style.display === 'flex') {
      div.style.display = 'none';
      return;
    }
    
      div.style.display = 'flex';
    
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
