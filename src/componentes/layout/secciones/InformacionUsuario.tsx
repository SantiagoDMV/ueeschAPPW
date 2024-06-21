import style from "../../estilos/Perfil.module.css";
import CambiarContraseña from "../../ventanas/CambiarContraseña";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import AlertaCargando from "../../alertas/AlertaCargando";
import { Toaster, toast } from "sonner";

export default function FormualrioPerfil({ usuario }: any) {
  const [estado, setEstado] = useState(false);
  const [imagen, setImagen] = useState("");

  const activarAlertaActualizacion = () => {
    setEstado(true);
  };

  useEffect(() => {
    if (estado === false) {
      document.getElementById("contenedorAlerta")?.remove();
    }
  }, [estado]);

  const enviarImagen = (e: any) => {
    let file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    const fileSizeInBytes = file.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    const maxFileSizeInMegabytes = 1;
    if (fileSizeInMegabytes > maxFileSizeInMegabytes) {
        toast.error("Error: El archivo excede el límite de tamaño permitido (1 MB).", {
            style: {
                backgroundColor: "rgb(203,90,90)",
                border: "none",
            },
        });
        return;
    }



    fileReader.onload = async () => {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/png"
      ) {
        alert("Solo se admitn archivos validos");
      } else {
        let loadingToastId: any = null;
        try {
          loadingToastId = toast.info(
              "Realizando cambios, esto puede llevar un momento...",
              {
                  style: {
                      border: "none",
                  },
              }
          );
      
          axios
              .put("/api/usuarios?cambio=imagen", [fileReader.result])
              .then((imagenRespuesta) => {
                  setImagen(imagenRespuesta.data);
                  toast.dismiss(loadingToastId);
      
                  toast.success("Los cambios fueron realizados exitosamente.", {
                      style: {
                          backgroundColor: "rgb(90,203,154)",
                          border: "none",
                      },
                  });
              });
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
      }
    };
  };

  return (
    <div className={style.contenedorContenidoInformacion}>
      <div className={style.contenedorImagenNombre} id="contenedorImagen">
        <div className={style.fondo}>
          <div className={style.contenedorInfPrincipal}>
            <div className={style.contenedorImagen}>
              {imagen ? (
                <>
                  <Image
                    src={imagen}
                    alt={`usuario-${usuario.nombre}`}
                    width={200}
                    height={200}
                    className={style.imagenUsuario}
                    quality={50}
                    priority={true}
                  />

                  <AlertaCargando valor={false} />
                </>
              ) : usuario.imagen ? (
                <>
                  <Image
                    src={usuario.imagen}
                    alt={`usuario-${usuario.nombre}`}
                    width={200}
                    height={200}
                    className={style.imagenUsuario}
                    quality={50}
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/(png|gif|jpg|jpeg);base54,[http://drive.google.com/uc?export=view&id=1C1YbQTRAlEQ3UT-CgXPGWH3JMw8pVBuK"
                  />
                  <AlertaCargando valor={false} />
                </>
              ) : (
                <AlertaCargando id="alertaCargando" valor={true} />
              )}

              <div className={style.divCambioImagen}>
                <label className={style.labelImagen}>Cambiar Imagen</label>

                <input
                  type="file"
                  onChange={enviarImagen}
                  className={style.inputImagen}
                  accept=".png, .jpg, .jpeg, .gif"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={style.contenedorInformacionUsuario}>
        <div className={style.contenedorInformacion}>
          <div className={style.nombreUsuario}>
            {usuario.nombre} {usuario.apellido}
          </div>
          <h5>
            {usuario.rol === 5 ? (
              <div className={style.rol}>Representante</div>
            ) : usuario.rol === 4 ? (
              <div className={style.rol}>Estudiante</div>
            ) : usuario.rol === 3 ? (
              <div className={style.rol}>Docente</div>
            ) : usuario.rol === 2 ? (
              <div className={style.rol}>Administrador</div>
            ) : (
              usuario.rol === 1 && (
                <div className={style.rol}>Super Administrador</div>
              )
            )}
          </h5>
          <br />
          <h4>Información del perfil</h4>
          <div className={style.email}>Email: {usuario.email}</div>
          <label>Cédula: {usuario.cedula ? usuario.cedula : "?"}</label>

          {estado === true ? (
            <div className={style.contenedorCambioContraseña}>
              <CambiarContraseña
                mensaje="Tu seguridad es nuestra prioridad. No compartas tu contraseña"
                actualizacionEstado={setEstado}
                id="contenedorAlerta"
                email= {usuario.email}
              />
            </div>
          ) : (
            ""
          )}
          {
            //<label className={style.linkEdicionPerfil}>Editar Perfil</label>
          }

          <a
            onClick={() => activarAlertaActualizacion()}
            className={style.linkEdicionContraseña}
          >
            Cambiar contraseña
          </a>
        </div>
      </div>
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </div>
  );
}
