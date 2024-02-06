import styles from "../../estilos/Formularios/FormularioNuevaPublicacion.module.css";
import Ventana from "../../ventanas/Ventana";
import Image from "next/image";
import {
  AiFillPlusCircle,
  AiFillCamera,
  AiOutlineCloseCircle,
  AiFillSound,
  AiOutlineDown
} from "react-icons/ai";
import axios,{AxiosError} from "axios";
import { useState,useRef } from "react";
import MensajeExito from "@/componentes/mensajes/MensajeExito/MensajeExito";
import MensajeError from "@/componentes/mensajes/MensajeError/MensajeError";
import MensajeCargando from "@/componentes/mensajes/MensajeCargando/MensajeCargando";

export default function FormulaioPublicaciones ({usuarioCookie}:any) {
  
  const [contenido, setContenido] = useState({
    tituloP: "",
    contenidoP: "",
    id_tipo_publicacion: '3',
    fecha_eliminacion:''
  });

  const [filearrayN,setFileArrayN] = useState <any>([]);
  const [imagenes,setImagenes] = useState <any>([]);
  const [mostrarVentana, setMostrarVentana] = useState(false)
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [tiposArchivos, setTiposArchivos] = useState<any>([]);

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



  const nuevaPublicacion = () => {
    document.documentElement.style.overflow = 'hidden';
    setMostrarVentana(true);
  };

  const limpiarformulario = () => {
    document.documentElement.style.overflowY = 'scroll';
    setMostrarVentana(false);
    setFileArrayN([]);
    setTiposArchivos([]);
    setImagenes([]);
    const textarea = document.getElementById("textarea") as HTMLTextAreaElement;
    textarea.value = "";
    
    const titulo = document.getElementById(
      "tituloPublicacion"
    ) as HTMLTextAreaElement;
    titulo.value = "";

  };

  const [files, setFiles] = useState<any>([]);

  const envioMultimedia = async (e: any) => {
    const nuevosArchivos = e.target.files;

  if (nuevosArchivos.length > 0) {
    setFiles([...nuevosArchivos]); // Limpiar el estado files antes de agregar los nuevos archivos
  }

    let imagen = document.createElement('img')
    let video = document.createElement('video')
    let divImagenes = document.getElementById('divImagenes');
    
    const file = e.target.files;
    const promises = []; // arreglo de promesas
    const nuevosTipos = [];

    for (let i = 0; i < file.length; i++) {
      const fileReader = new FileReader();
      const files = URL.createObjectURL(file[i])
      let tipo;
      if(file[i].type.includes('image')){
        imagen.src= files
        imagen.alt='imagen'
        tipo= 'imagen'
      }else{
        video.src=files
        video.controls=true
        tipo= 'video'
      }
      
      nuevosTipos.push(tipo);
      setImagenes((e:any)=>[...e, files]);
      
      
      const promise = new Promise<void>((resolve, reject) => {
        fileReader.onload = () => {
          if(filearrayN.includes(fileReader.result)){            
            const divMensajeExiste = document.createElement("div") 
            const label = document.createElement("label")
            label.innerText="Está imagen/video ya fue agregado anteiormente"
            divMensajeExiste.appendChild(label)
            divMensajeExiste.className=`${styles.mensajeExiste}`
            divMensajeExiste.id= "mensajeExiste";
            divImagenes?.appendChild(divMensajeExiste)
            e.target.value="";
            setTimeout(() => {
              divMensajeExiste.remove();
            }, 3000);
            
          }

          setFileArrayN((prevFilearrayN:any) => [...prevFilearrayN, fileReader.result]);
          //
          resolve(); // resuelve la promesa cuando se completa la lectura del archivo
          
        };

        fileReader.onerror = (error) => {
          reject(error); // rechaza la promesa si hay un error al leer el archivo
        };

        fileReader.readAsDataURL(file[i]);
      });

      promises.push(promise);
      
    }
    await Promise.all(promises); // espera a que se completen todas las operaciones de lectura de archivos
    
    
    setTiposArchivos([...tiposArchivos, ...nuevosTipos]);
    e.target.value="";

  };

  const escucharCambio = (e: any) => {
    setContenido({
      ...contenido,
      [e.target.name]: e.target.value,
    });
  };

  const eliminarImagen = (id:any) =>{
    const nuevasImagenes = imagenes.filter((_:any, indice:number) => indice !== id)    
    const filearrayNuevo = filearrayN.filter((_:any, indice:number) => indice !== id)  
    const tiposArchivosNuevo = tiposArchivos.filter((_:any, indice:number) => indice !== id)    
    setImagenes(nuevasImagenes);
    setFileArrayN(filearrayNuevo)
    setTiposArchivos(tiposArchivosNuevo)
  }

  const creacionPublicacion = async (e:any) => {

    console.log(contenido)
    console.log(tiposArchivos)


    e.preventDefault()
    const filearray = filearrayN;
    const tipos= tiposArchivos;
    setFileArrayN([]);
    setTiposArchivos([])
    setMostrarVentana(false);
    setMostrarMensaje(true);

    console.log(files)
    const formData = new FormData();
    console.log(files.length)
    for (const file of files) {
      formData.append('files', file);
    }

  
     

    try {
      
      setMensajeCargando({
        estado:true,
        mensaje: 'Creando publicación, esto puede llevar un momento...'
      })
      
      await axios.post("/api/publicaciones",[filearray,contenido,tipos])
      
      // await axios.post("/api/publicaciones",{contenido: contenido})
      // .then(async (respuesta:any)=>{
      //   const id =respuesta.data.id_publicacion
      //   formData.append('id', id)
      //   await axios.post("/api/imagenes/subirimagenes", formData)
      // })

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
    tituloP: "",
    contenidoP: "",
    id_tipo_publicacion: '3',
    fecha_eliminacion:''
    })

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
          <label>Agregar publicación</label>
          </div>
          <div className={styles.botones}>
            <AiFillPlusCircle
              onClick={nuevaPublicacion}
              className={styles.iconoAñadirPublicacion}
            />
          </div>
    </div>
        

    <Ventana estado={mostrarVentana} actualizacion={setMostrarVentana}>

    <div className={styles.contenedorFormularioPublicacion}>
      <form className={styles.formularioPublicacion} id="formulario" onSubmit={(e:any)=>creacionPublicacion(e)}>

      <div
          className={styles.contenedorArchivosMultimediaVentanaOpciones}
        >
          <div className={styles.contenedorArchivosMultimediaVentana}>
          <div className={styles.subirFoto}>
            <AiFillCamera className={styles.iconoCamara} />
            <input
              onChange={envioMultimedia}
              className={styles.contenedorMultimedia}
              type="file"
              id="contenido_multimedia"
              multiple
              accept="image/*,video/*"
            />
          </div>
          <div className={styles.botones}>
          {usuarioCookie && usuarioCookie.rol ===1 &&
          <AiOutlineDown onClick={()=>mostrarMasOpciones()} className={styles.flechaMasOpciones}/>
          }
            <button type="submit">
            <AiFillSound
            className={styles.iconoPublicar} />
            </button>
            <AiOutlineCloseCircle
              onClick={limpiarformulario}
              className={styles.iconoCancelar}
            />
      
      
      </div>
      </div>
      
      {usuarioCookie && usuarioCookie.rol ===1 &&
      <div className={styles.contenedorMasOpciones} id="masOpcionesPublicacion">
      <div className={styles.contenedorSelect}>
            <select onChange={(e) => escucharCambio(e)} name="id_tipo_publicacion">
            <option value={'3'}>Noticia
            </option>
            <option value="1">Servicio</option>
            <option value="2">Anuncio</option>
            </select>
      
         </div>
        <div className={styles.contenedorFechaEliminacion}>
            <input 
            onChange={escucharCambio}
            min={getFechaActual()}
            type="datetime-local" name="fecha_eliminacion"/>
            </div>
      </div>
      }
        </div>

        <input
          onChange={escucharCambio}
          className={styles.tituloPublicacion}
          type="text"
          name="tituloP"
          id="tituloPublicacion"
          placeholder="Título de la publicación"
          required
        />
        <textarea
          onChange={escucharCambio}
          className={styles.contenidoPublicacion}
          name="contenidoP"
          id="textarea"
          placeholder="Contenido de la publicación"
          required
        />        
      </form>
      <div id="divImagenes" className={styles.divImagenes}>
        {
         imagenes.map((e:any,index:number) => (
          <div key={index} className={styles.contenedorImagen}>
            {
              tiposArchivos && tiposArchivos[index] === 'imagen'?
          <Image 
            src={e}
            width={200}
            height={200}
            quality={50}
            alt={`contenido${index}`}
            onClick={()=>{eliminarImagen(index)}}
          />
          :
          tiposArchivos && tiposArchivos[index] === 'video'?
          <div>
          <video src={e}
          autoPlay
          muted
          onClick={()=>{eliminarImagen(index)}}></video>
          </div>
          :
          null
            }
          </div>
        ))           
        }
      </div>
    </div>
    </Ventana>
    
    </>
  );
}
