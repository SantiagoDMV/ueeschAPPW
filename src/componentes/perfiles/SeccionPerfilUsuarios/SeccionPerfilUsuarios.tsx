import estilos from "./SeccionPerfilUsuarios.module.css";
import { AiFillFile } from "react-icons/ai";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { SyncLoader } from "react-spinners";

export default function SeccionPerfilUsuarios({
  id_moodle,
  usuarioCookie,
}: any) {
  const [email, setEmail] = useState<any>("");
  const [cuentas, setCuentas] = useState<any>();
  const [serviciosUsuarioRegistrado, setServiciosUsuarioRegistrado] =
    useState<any>();
  const router = useRouter();
  useEffect(() => {
    obtenerCuentasVinculadas();
    obtenerServicios();
  }, []);

  const obtenerCuentasVinculadas = async () => {
    try {
      const respuesta = await axios.post("/api/sesiones", {
        moodleCuentasVinculadas: usuarioCookie.id_moodle,
      });
      if (respuesta.data.length === 1) {
        setCuentas("No existen cuentas vinculadas a este perfil");
        return;
      }

      setCuentas(respuesta.data);
    } catch (error) {
      const errorMensaje: any = (error as AxiosError).response?.data;

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }
  };

  const obtenerServicios = async () => {
    try {
      const respuesta = await axios.post("/api/publicaciones/servicios", {
        idUsuarioServicios: usuarioCookie.id,
      });
      setServiciosUsuarioRegistrado(respuesta.data.datos);
    } catch (error) {
      const errorMensaje: any = (error as AxiosError).response?.data;

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }
  };

  const quitarAsistencia = async (id: any) => {
    let loadingToastId: any = null;
    try {
      loadingToastId = toast.info(
        "Quitando registro de asistencia, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      await axios.post("/api/publicaciones/servicios", {
        id_publicacion_quitar: id,
      });

      toast.dismiss(loadingToastId);

      toast.success("Registro de asistencia eliminado.", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });
      obtenerServicios();
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
    }
  };

  const enviarCorreo = async (e: any) => {
    e.preventDefault();
    let loadingToastId: any = null;

    try {
      loadingToastId = toast.info("Actualizando información de la cuenta...", {
        style: {
          border: "none",
        },
      });

      await axios.put("/api/usuarios/establecermoodle", { emailHijo: email });

      toast.dismiss(loadingToastId);

      toast.success("Información actualizada", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

      router.reload();
    } catch (error) {
      const errorMensaje: any = (error as AxiosError).response?.data;
      toast.dismiss(loadingToastId);

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }
  };

  return (
    <div
      className={estilos.contenedorInformacionMoodle}
      id="contenedorInformacionMoodle"
    >
      {id_moodle ? (
        <div className={estilos.contenedorInferior}>
          <div className={estilos.seccionIzquierda}>
            
            <Link target="_blank" href={`/seguimiento/${id_moodle}`}>
              <button>
                <AiFillFile className={estilos.iconoBotonInformacionMoodle} />
                Registro Académico
              </button>
            </Link>

            {cuentas &&
            <div className={estilos.contenedorCuentasVinculadas}>
              <h4>Cuentas vinculadas</h4>
              {
               cuentas &&
                (typeof cuentas === "string" ? (
                  <span>{cuentas}</span>
                ) : (
                  cuentas.map((cuenta: any, index: number) => (
                    <span key={index}>{cuenta.email_usuario}</span>
                  ))
                ))}
            
            </div>
}
          </div>
          <div className={estilos.seccionDerecha}>
            <h3>Servicios en los que estas registrado</h3>
            {!serviciosUsuarioRegistrado ? (
              <div className={estilos.conteneCargando}>
                
                <SyncLoader color={"#558"} loading={true} size={20} />
              </div>
            ) : serviciosUsuarioRegistrado.length === 0 ? (
              <div className={estilos.conteneCargando}>
                <h2>No existen servicios en este momento</h2>
              </div>
            ) : (
              <div className={estilos.contenedorPrincipalServicios}>
                {serviciosUsuarioRegistrado.map((e: any, index: number) => (
                  <div key={index} className={estilos.contenedorServicioUnico}>
                    {serviciosUsuarioRegistrado &&
                      serviciosUsuarioRegistrado.length > 0 && (
                        <>
                          <div
                            className={estilos.contenedorinformacionServicios}
                          >
                            {e.titulo_publicacion}
                            <div>
                              <span
                                onClick={() =>
                                  quitarAsistencia(e.id_publicacion)
                                }
                                className={estilos.botonQuitarRegistro}
                                id="botonRegistro"
                              >
                                Quitar registro
                              </span>
                            </div>
                          </div>

                          <div className={estilos.contenedorOpcionesServicios}>
                            <Link
                              className={estilos.botonLink}
                              href={`/publicaciones/publicacion/${e.id_publicacion}`}
                            >
                              Ver publicación
                            </Link>
                          </div>
                        </>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={estilos.contenedorEmailHijos}>
          <h4>
            Ingrese el correo electrónico de su hijo, matriculado en la unidad
            educativa, para conocer su progreso académico
          </h4>
          <div className={estilos.contenedorInputs}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className={estilos.inputEmail}
            />
            <input
              type="button"
              value="Enviar"
              className={estilos.botonEmail}
              onClick={(e) => enviarCorreo(e)}
            />
          </div>
        </div>
      )}
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </div>
  );
}
