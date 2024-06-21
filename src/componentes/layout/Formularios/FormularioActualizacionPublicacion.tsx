import axios, { AxiosError } from "axios";
import { useState} from "react";
import { Toaster, toast } from "sonner";
import MyQuillEditor from "@/componentes/QuillEditor/QuillEditor";
import  ReactImageFileResizer  from 'react-image-file-resizer';

import styles from "../../estilos/Formularios/FormularioActualizacionPublicacion.module.css";

export default function FormularioActualizacionPublicacion({
  informacionUsuario,
  estado,
  datosMultimedia,
  obtenerDatosPublicaciones
}: any) {

  const [content, setContent] = useState(
    informacionUsuario[0].contenido_publicacion
  );
  const contenidoOriginal = informacionUsuario[0].contenido_publicacion

  const multimedia = datosMultimedia.filter(
    (e: any) => e.id_publicacion === informacionUsuario[0].id_publicacion
  );
  
  const contenidoExistente = {
    tituloP : informacionUsuario[0].titulo_publicacion, 
    fecha_eliminacion: informacionUsuario[0].delete_at,
    id_tipo_publicacion: informacionUsuario[0].id_tipo_publicacion,
    contenido_publicacion: informacionUsuario[0].contenido_publicacion,
  } 

  const [credenciales, setCredenciales] = useState({
    tituloP: informacionUsuario[0].titulo_publicacion,
    id_tipo_publicacion: informacionUsuario[0].id_tipo_publicacion,
    fecha_eliminacion: informacionUsuario[0].delete_at,
    id_publicacion: informacionUsuario[0].id_publicacion,
  });

  let fechaEliminacionFormatear = informacionUsuario[0].delete_at;

  const [tiposArchivos, setTiposArchivos] = useState<any>([]);

  const [filearrayN, setFileArrayN] = useState<any>([]);
  const [imagenes, setImagenes] = useState<any>(multimedia);

  const escucharCambio = (e: any) => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value,
    });
  };

  const envioDatos = (e: any, id_publicacion: any) => {
    envioDatosDB(e, id_publicacion);
    //envioDatosMoodle(e);
  };

  const envioDatosDB = async (e: any, id_publicacion: any) => {
    e.preventDefault();
    let loadingToastId: any = null;
    try {
      loadingToastId = toast.info(
        "Actualizando publicación, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );
      const filearray = filearrayN;

      const reverseContent = (content: string) => {
        const reversedContent = content.replace(/<img src="\/_next\/image\?url=([^"&]+)(?:[^"]*)"[^>]*>/g, (_, imageUrl) => {
            const decodedUrl = decodeURIComponent(imageUrl);
            return `<img src="${decodedUrl}">`;
        });
    
        return reversedContent;
    };
    
    // Ejemplo de uso
    
      const tipos = tiposArchivos;
      setTiposArchivos([]);
      setFileArrayN([]);
      const multimediaFiltrado = multimedia.filter((elemento: any) => {
        return !imagenes.some(
          (imagen: any) => imagen.id_multimedia === elemento.id_multimedia
        );
      });

      let transformedContent: string = reverseContent(content); // Inicializar con el contenido original del editor

      // Redimensionar imágenes si superan el límite de 1 MB
      const images = content.match(/<img[^>]+>/g); // Extraer todas las etiquetas de imagen del contenido
      if (images) {
        const promises = images.map(async (imgTag:any) => {
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
                transformedContent = transformedContent.replace(imgSrc, resizedImageDataUrl);
              }
              return imgTag;
            } catch (error) {
              console.error("Error al cargar la imagen:", error);
              return imgTag;
            }
          }
          return imgTag;
        });
        await Promise.all(promises);
      }

      await axios.put(
        "/api/publicaciones",
        // { credenciales: credenciales, idPublicacion: id_publicacion, imagenes:multimediaFiltrado, filearray: filearray , tipos: tipos},
        {
          datosPublicacion: credenciales,
          //idPublicacion: id_publicacion,
          contenidoExistente: contenidoExistente,
          contenido: transformedContent, // Usar el contenido redimensionado
          contenidoOriginal : contenidoOriginal,
            headers: {
              'Content-Type': 'application/json', // Tipo de contenido que estás enviando
              'Access-Control-Allow-Origin': '*', // O la URL específica de origen permitida
              // Agrega otras cabeceras según sea necesario
            },
        }
      );
      //obtenerInfUser();

      toast.dismiss(loadingToastId);

      toast.success("La publicación fue creada exitosamente", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

      estado(false);
      obtenerDatosPublicaciones()

    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      const errorMensaje: any = (error as AxiosError).response?.data;
      console.log(errorMensaje);
      toast.dismiss(loadingToastId);

      toast.error(errorMensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }
  };


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

  
  const envioMultimedia = async (e: any) => {
    let imagen = document.createElement("img");
    let video = document.createElement("video");
    let divImagenes = document.getElementById("divImagenes");
    const nuevosTipos = [];

    const file = e.target.files;

    const promises = []; // arreglo de promesas
    for (let i = 0; i < file.length; i++) {
      const fileReader = new FileReader();
      const files = URL.createObjectURL(file[i]);
      let tipo;

      if (file[i].type.includes("image")) {
        imagen.src = files;
        imagen.alt = "imagen";
        tipo = "imagen";
      } else {
        video.src = files;
        video.controls = true;
        tipo = "video";
      }

      nuevosTipos.push(tipo);
      setImagenes((e: any) => [...e, files]);

      const promise = new Promise<void>((resolve, reject) => {
        fileReader.onload = () => {
          if (filearrayN.includes(fileReader.result)) {
            const divMensajeExiste = document.createElement("div");
            const label = document.createElement("label");
            label.innerText = "Está imagen ya fue agregada anteiormente";
            divMensajeExiste.appendChild(label);
            divMensajeExiste.className = `${styles.mensajeExiste}`;
            divMensajeExiste.id = "mensajeExiste";
            divImagenes?.appendChild(divMensajeExiste);
            e.target.value = "";
            setTimeout(() => {
              divMensajeExiste.remove();
            }, 3000);
            //      return
          }

          setFileArrayN((prevFilearrayN: any) => [
            ...prevFilearrayN,
            fileReader.result,
          ]);
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
    e.target.value = "";
  };


  function getFechaActual() {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0"); // Asegurar que tenga dos dígitos
    const dia = String(ahora.getDate()).padStart(2, "0");
    const hora = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");

    // Formato: 'YYYY-MM-DDTHH:mm'
    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
  }

  function formatearFechaParaUsuario() {
    const fecha = new Date(fechaEliminacionFormatear);

    const opcionesFecha: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const fechaFormateada = fecha.toLocaleDateString(undefined, opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString(undefined, opcionesHora);

    const fechaFinalFormateada = `${fechaFormateada} a las ${horaFormateada}`;

    return fechaFinalFormateada;
  }

  return (
    <>
      {informacionUsuario ? (
        <>
          <form
            className={styles.formulario}
            onSubmit={(e) =>
              envioDatos(e, informacionUsuario[0].id_publicacion)
            }
          >
            <div className={styles.formulariocampos}>
              <label className={styles.tituloRegistro}>
                {" "}
                Actualización de publicación{" "}
              </label>

              <div className={styles.contenedorSelect}>
                {/* <span>{formatearFechaParaUsuario()}</span> */}
                {/* <div className={styles.contenedorFechaEliminacion}>
                  <input
                    onChange={escucharCambio}
                    min={getFechaActual()}
                    //value={getFechaActual()} // Valor inicial
                    type="datetime-local"
                    name="fecha_eliminacion"
                  />
                </div> */}

                <select
                  onChange={(e) => escucharCambio(e)}
                  name="id_tipo_publicacion"
                >
                  <option value={`${credenciales.id_tipo_publicacion}`}>
                    {" "}
                    Tipo:
                    {credenciales.id_tipo_publicacion === 1
                      ? " Servicio"
                      : credenciales.id_tipo_publicacion === 2
                      ? " Anuncio"
                      : credenciales.id_tipo_publicacion === 3 && " Noticia"}
                  </option>
                  <option value="1">Servicio</option>
                  <option value="2">Anuncio</option>
                  <option value="3">Noticia</option>
                </select>
              </div>

              <div className={styles.inputs} id="cedula">
                <textarea
                  className={styles.textContenido_titulo}
                  onChange={(e) => escucharCambio(e)}
                  name="tituloP"
                  id="titulo_publicacion"
                  value={credenciales.tituloP}
                />
              </div>

              <div className={styles.quillEditorCreacion}>
                <MyQuillEditor content={content} setContent={setContent} />
              </div>
              {/* 
<div className={styles.inputs} id="nombre">
  <textarea 
  className={styles.textContenido}
  onChange={(e) => escucharCambio(e)}
  name="contenido_publicacion" 
  id="contenido_publicacion" 
  value={credenciales.contenido_publicacion}
  />
</div> */}

              {/* <div className={styles.subirFoto}>
            <AiFillCamera className={styles.iconoCamara} />
            <input
              onChange={envioMultimedia}
              className={styles.contenedorMultimedia}
              type="file"
              id="contenido_multimedia"
              multiple
              accept="image/*,video/*"
            />
          </div> */}
              {/* <div id="divImagenes" className={styles.divImagenes}>
        {
         imagenes ? imagenes.map((e:any,index:number) => (
          <div key={index} className={styles.contenedorImagen}>
          <Image 
            src={e.ruta_multimedia ? e.ruta_multimedia:e}
            width={200}
            height={200}
            quality={50}
            alt={`contenido${index}`}
            onClick={()=>{eliminarImagen(index)}}
          />
          </div>
        ))
        :
        ('Cargando')           
        }
      </div> */}

              <div className={styles.opciones}>
                <div className={styles.contenedorbtn}>
                  <button
                    type="submit"
                    className={styles.btn}
                    name="submitbutton"
                    id="id_submitbutton"
                  >
                    Actualizar
                  </button>
                  <button
                    type="submit"
                    className={styles.btnCancelar}
                    name="submitbutton"
                    id="id_submitbutton"
                    onClick={() => estado(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.contenedorImg}></div>
          </form>
        </>
      ) : (
        "Cargando la información del usuario"
      )}
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </>
  );
}
