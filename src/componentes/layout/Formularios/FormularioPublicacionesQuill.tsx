import MyQuillEditor from "@/componentes/QuillEditor/QuillEditor";
import styles from "../../estilos/Formularios/FormularioNuevaPublicacion.module.css";
import axios, { AxiosError } from "axios";
import { useState, useCallback } from "react";
import { Toaster, toast } from "sonner";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import  ReactImageFileResizer  from 'react-image-file-resizer';


export default function FormulaioPublicaciones({ usuarioCookie }: any) {
  const [contenido, setContenido] = useState({
    id_tipo_publicacion: "3",
    fecha_eliminacion: "",
    tituloP: "",
  });

  const [content, setContent] = useState("");

  const escucharCambio = (e: any) => {
    setContenido({
      ...contenido,
      [e.target.name]: e.target.value,
    });
  };


  const creacionPublicacion = async () => {
    let loadingToastId = null;
    const boton = document.getElementById('botonPublicar') as HTMLButtonElement;
    try {
        boton.disabled = true;
        
        loadingToastId = toast.info(
            "Creando publicación, esto puede llevar un momento...",
            {
                style: {
                    border: "none",
                },
            }
        );

        let transformedContent: string = content; // Inicializar con el contenido original del editor

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
  
        // Aquí deberías esperar a que se redimensionen todas las imágenes antes de continuar con el envío de la publicación
  
        await axios.post("/api/publicaciones", {
          contenido: transformedContent, // Usar el contenido redimensionado
          datosPublicacion: contenido,
        });

        toast.dismiss(loadingToastId);

        toast.success("La publicación fue creada exitosamente", {
            style: {
                backgroundColor: "rgb(90,203,154)",
                border: "none",
            },
        });

        //document.documentElement.style.overflowY = "scroll";

        setContenido({
            id_tipo_publicacion: "3",
            fecha_eliminacion: "",
            tituloP: "",
        });

        setContent("");
    } catch (error) {
        console.log(error)
        const errorMensaje: any = (error as AxiosError).response?.data;

        toast.error(errorMensaje, {
            style: {
                backgroundColor: "rgb(203,90,90)",
                border: "none",
            },
        });
    } finally {
        boton.disabled = false;
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



  function getFechaActual() {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, "0"); // Asegurar que tenga dos dígitos
    const dia = String(ahora.getDate()).padStart(2, "0");
    const hora = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");

    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
  }

  const joyrideStyles = {
    buttonNext: {
      background: "#5caeab",
      textColor: "white",
    },
    buttonLast: {
      background: "#5caeab",
    },
    buttonSkip: {
      background: "#5caeab",
      borderRadius: "5px",
      padding: "10px",
      color: "white",
    },
    options: {
      primaryColor: "#5caeab",
      beaconSize: 36,
      spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
      zIndex: 10000,
    },
  };

  const STEPS: Step[] = [
    {
      content: (
        <div>
          <span className={styles.spanMensajesInformacion}>
            Para facilitar el proceso, te ofrecemos tres tipos de publicaciones.
            Cada uno tiene su propósito único para que tu contenido sea aún más
            relevante.
            <ul>
              <li>
                Servicio: Para servicios específicos como cursos, disponible en
                la pestaña de Servicios.
              </li>
              <li>
                Anuncio: Para información crucial con destacado en la sección de
                Publicaciones y página principal.
              </li>
              <li>
                Noticia: Para eventos y celebraciones, presentado de manera
                estándar en la sección de Publicaciones.
              </li>
            </ul>
          </span>
        </div>
      ),

      title: "Tipo de publicación",
      placement: "auto",
      target: ".contentTipoP",
    },
    {
      content: (
        <span className={styles.spanMensajesInformacion}>
          Para mejorar la experiencia de visualización de las noticias y
          anuncios, se solicita que ingrese un Título de Previsualización.
          Este título de previsualización será mostrado en vistas previas más
          pequeñas de las publicaciones, proporcionando a los usuarios un
          contexto rápido sobre el contenido.
          <b> Se permite un máximo de 100 caracteres</b>
        </span>
      ),
      target: `.contenedorTPrev`,
      placement: "auto",
      title: "Título de Previsualización",

    },
    // {
    //   title: "Fecha de expiración",
    //   content: (
    //     <span className={styles.spanMensajesInformacion}>
    //       Para establecer una duración específica para la publicación,
    //       selecciona la fecha de expiración. La publicación se eliminará
    //       automáticamente después de ese período.
    //       <b> (Opcional)</b>
    //     </span>
    //   ),
    //   target: `.contenedorFechaExpiracion`,
    //   placement: "auto",
    // },
  ];

  const [estadoTour, setEstadoTour] = useState(false);

  const handleJoyrideCallback = useCallback(function (data: CallBackProps) {
    const { status } = data;
    const finishedStatus: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatus.includes(status)) {
      setEstadoTour(false);
    }
  }, []);

  return (
    <>
      {typeof window !== "undefined" && estadoTour && (
        <Joyride
          callback={handleJoyrideCallback}
          run={estadoTour}
          continuous={true}
          scrollToFirstStep={true}
          scrollOffset={100}
          spotlightClicks={true}
          steps={STEPS}
          showProgress={false}
          showSkipButton={true}
          styles={joyrideStyles}
          hideCloseButton={true}
          locale={{
            last: "Salir",
            back: "Atras",
            next: "Siguiente",
            skip: "Saltar",
          }}
        />
      )}

      <div className={styles.seccionIzquierda}>
        <p>
        <AiOutlineQuestionCircle
          className={styles.seccionIzquierdaIconoAyuda}
          onClick={() => setEstadoTour(true)}
        />
        </p>
        <div
          className={`${styles.contenedorMasOpciones} contentTipoP`}
          id="masOpcionesPublicacion"
        >
          <div className={styles.contenedorMasOpcionesDiv}>
            <h4>Tipo de publicación</h4>
          </div>
          <span className={styles.spanMensajes}>
            El tipo de publicación por defecto es Noticia
          </span>
          <div className={styles.contenedorSelect}>
            <select
              onChange={(e) => escucharCambio(e)}
              name="id_tipo_publicacion"
            >
              <option value={"3"}>Noticia</option>
              <option value="1">Servicio</option>
              <option value="2">Anuncio</option>
            </select>
          </div>
        </div>

        
          <div
            className={`${styles.contenedorMasOpciones} contenedorTPrev`}
            id="masOpcionesPublicacion"
          >
            <h4>Título de previsualización</h4>

            <span className={styles.spanMensajesInformacion}>
              <b>(Máximo de 100 caracteres)</b>
            </span>
            <input
              onChange={(e: any) => escucharCambio(e)}
              className={styles.tituloPublicacion}
              type="text"
              name="tituloP"
              id="tituloPublicacion"
              placeholder="Ingrese aquí el título de previsualización"
              required
              value={contenido.tituloP}
              maxLength={100}
            />
          </div>
        

        {/* {usuarioCookie && (usuarioCookie.rol === 1 || usuarioCookie.rol === 2) && (
          <div
            className={`${styles.contenedorMasOpciones} contenedorFechaExpiracion`}
            id="masOpcionesPublicacion"
          >
            <div className={styles.contenedorMasOpcionesDiv}>
              <h4>Fecha de expiración</h4>
            </div>
            <span className={styles.spanMensajesInformacion}>
              <b>(Opcional)</b>
            </span>
            <div className={styles.contenedorFechaEliminacion}>
              <input
                onChange={escucharCambio}
                min={getFechaActual()}
                type="datetime-local"
                name="fecha_eliminacion"
                value={contenido.fecha_eliminacion}
              />
            </div>
          </div>
        )} */}

        <button
          onClick={() => creacionPublicacion()}
          id='botonPublicar'
        >
          Publicar
        </button>
      </div>

      <div className={styles.seccionDerecha}>
        
            <MyQuillEditor content={content} setContent={setContent} />
        
      </div>

      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </>
  );
}
