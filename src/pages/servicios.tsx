import Layout from "@/componentes/layout/Layout";
import estilos from "../styles/pestañas/Servicios.module.css";
import axios, { AxiosError } from "axios";
import { useState, useEffect} from "react";
import { SyncLoader } from "react-spinners";
import Carrusel from "../componentes/Carrrusel/CarruselPersonalPublicacion";
import ReactMarkdown from "react-markdown";
import Ventana from "@/componentes/ventanas/Ventana";
import InformacionUsuariosAsistentes from "@/componentes/layout/secciones/informacionUsuariosAsistentes/InformacionUsuariosAsistentes";
import cheerio from "cheerio";
import ReactDOMServer from "react-dom/server";
import Link from "next/link";
import { Toaster, toast } from "sonner";

export default function Servicios({ usuarioCookie, setUsuarioCookie, moodle }: any) {
  useEffect(() => {
    obtenerDatosPublicaciones();
  }, []);

  const [datosPublicaciones, setDatosPublicaciones] = useState<any>();
  const [publicacion, setDatosPublicacion] = useState<any>();
  const [datosMultimedia, setDatosMultimedia] = useState<any>();
  const [estado, setEstado] = useState<boolean>(false);
  const [idPublicacion, setIdPublicacion] = useState<any>();
  const [tituloPublicacionAsistentes, setTituloPublicacionAsistentes] = useState<any>();

  const [datosPublicacionesContenido, setDatosPublicacionesContenido] =
    useState<any[]>([]);

  const obtenerDatosPublicaciones = async () => {
    
    const respuesta = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones/servicios`
    );
      
    respuesta.data.datos.map((e: any) =>
      replaceImgWithNextImage(e.contenido_publicacion)
    );

    setDatosPublicacion(respuesta.data.datos);
    setDatosPublicaciones(respuesta.data.datos);

    setDatosMultimedia(respuesta.data.datosMultimedia);
  };

  const enviarAsistencia = async (id: any) => {
    let loadingToastId: any = null;
    const boton = document.getElementById('botonRegistro') as HTMLButtonElement;
    try {
      boton.disabled = true;
      loadingToastId = toast.info(
        "Registrando asistencia, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      await axios.post("/api/publicaciones/servicios", { id_publicacion: id });

      toast.dismiss(loadingToastId);

      toast.success("Asistencia registrada.", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });
      obtenerDatosPublicaciones()
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      const errorMensaje: any = (error as AxiosError).response?.data;

      toast.dismiss(loadingToastId);

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }finally{
      boton.disabled =false;
    }
  };





  const quitarAsistencia = async (id: any) => {
    let loadingToastId: any = null;
    const boton = document.getElementById('botonQuitarAsistencia') as HTMLButtonElement;
    try {
      boton.disabled=true;
      loadingToastId = toast.info(
        "Quitando registro de asistencia, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      await axios.post("/api/publicaciones/servicios", { id_publicacion_quitar: id });

      toast.dismiss(loadingToastId);

      toast.success("Registro de asistencia eliminado.", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });
      obtenerDatosPublicaciones()
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      const errorMensaje: any = (error as AxiosError).response?.data;

      toast.dismiss(loadingToastId);

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }finally{
      boton.disabled=false;
    }
  };



  const mostrarListaAsistentes = (id: any, titulo:any) => {
    setEstado(true);
    setTituloPublicacionAsistentes(titulo);
    setIdPublicacion(id);
  };

  const arrayContenido: any = [];
  const replaceImgWithNextImage = (htmlContent: string) => {
    const $ = cheerio.load(htmlContent, { xmlMode: true });

    $("img").each((element) => {
      const imgSrc = $(element).attr("src");
      if (imgSrc) {
        const imgComponent = <p></p>;
        const imgHtml = ReactDOMServer.renderToStaticMarkup(imgComponent);

        $(element).replaceWith(imgHtml);
      }
    });

    arrayContenido.push($.xml());

    setDatosPublicacionesContenido(arrayContenido);
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <Ventana estado={estado}>
        <InformacionUsuariosAsistentes
          idPublicacion={idPublicacion}
          setEstado={setEstado}
          tituloServicio={
            tituloPublicacionAsistentes
          }
        />
      </Ventana>

      <div className={estilos.contenedorPrincipalServicios}>
        <div className={estilos.contenedorServicios}>
          {!datosPublicaciones ? (
            <div className={estilos.conteneCargando}>
              <h2>Obteniendo servicios</h2>

              <SyncLoader color={"#558"} loading={true} size={30} />
            </div>
          ) : datosPublicaciones.length === 0 ? (
            <div className={estilos.conteneCargando}>
              <h2>No existen servicios en este momento</h2>
            </div>
          ) : (
            datosPublicaciones.map((e: any, index: number) => (
              <div key={index} className={estilos.contenedorServicioUnico}>
                {datosPublicaciones && datosPublicaciones.length > 0 && (
                  <>
                    {datosMultimedia &&
                      datosMultimedia.filter(
                        (m: any) => m.id_publicacion === e.id_publicacion
                      ).length !== 0 && (
                        <div className={estilos.contenedorCarrusel}>
                          <Carrusel
                            datosMultimedia={datosMultimedia}
                            idPublicacion={e.id_publicacion}
                          />
                        </div>
                      )}

                    <div className={estilos.contenedorInformacion}>
                      {publicacion && (
                        <div className={estilos.publicacion}>
                          <div
                            className={estilos.contenedorContenidoPublicacion}
                          >
                            <div className={estilos.contenidoPublicacion}>
                              {datosPublicacionesContenido.length !== 0 ? (
                                // <div dangerouslySetInnerHTML={{ __html: datosPublicacionesContenido[index] }} />
                                <>
                                  <h2 className={estilos.tituloServicio}>
                                    {e.titulo_publicacion}
                                  </h2>
                                  <span>
                                    <Link
                                      target="_blank"
                                      href={`${process.env.NEXT_PUBLIC_BASE_URL}/publicaciones/publicacion/${e.id_publicacion}`}
                                    >
                                      Leer más
                                    </Link>
                                  </span>
                                </>
                              ) : (
                                <ReactMarkdown>
                                  {publicacion.contenido_publicacion}
                                </ReactMarkdown>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className={estilos.contenedorBotonUnete}>

                        { 
                          e.encontrado === false?
                          usuarioCookie ?
                          <button
                          onClick={() => enviarAsistencia(e.id_publicacion)}
                          className={estilos.botonRegistro}
                          id="botonRegistro"
                        >
                          Registrarme
                        </button>
                        :
                        <button
                          onClick={() => window.location.href ='/login'}
                          className={estilos.botonRegistro}
                          id="botonRegistro"
                        >
                          Registrarme
                        </button>
                        : 
                        <button
                          onClick={() => quitarAsistencia(e.id_publicacion)}
                          className={estilos.botonQuitarRegistro}
                          id="botonQuitarAsistencia"
                        >
                          Quitar registro
                        </button>
                        }
                        

                        {usuarioCookie.rol === 1 && (
                          <button
                          className={estilos.botonRegistro}
                            onClick={() =>
                              mostrarListaAsistentes(e.id_publicacion, e.titulo_publicacion)
                            }
                          >
                            Ver asistentes
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </Layout>
  );
}
