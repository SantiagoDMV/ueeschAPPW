import { AiOutlineSchedule, AiOutlineUnlock } from "react-icons/ai";
import style from "../../estilos/Perfil.module.css";
import CambiarContraseña from "../../ventanas/CambiarContraseña";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import AlertaCargando from "../../alertas/AlertaCargando";

export default function FormualrioPerfil({ usuario }: any) {
  const [estado, setEstado] = useState(false);
  const [imagen, setImagen] = useState("");
  const [estadoAlertaCargando, setEstadoAlertaCargando] = useState(false);

  const activarAlertaActualizacion = () => {
    setEstado(true);
  };

  useEffect(() => {
    if (estado === false) {
      document.getElementById("contenedorAlerta")?.remove();
    }
  }, []);

  const enviarImagen = (e: any) => {
    //console.log(e.target.files[0])

    let file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    //console.log(fileReader.result)

    fileReader.onload = async () => {
      if (
        file.type !== "image/jpg" &&
        file.type !== "image/jpeg" &&
        file.type !== "image/gif" &&
        file.type !== "image/png"
      ) {
        alert("Solo se admitn archivos validos");
      } else {
        abrirMensaje();
        axios
          .put("/api/usuarios?cambio=imagen", [fileReader.result])
          .then((imagenRespuesta) => {
            setImagen(imagenRespuesta.data);
            abrirMensaje()
          });
      }
    };
  };

  const abrirMensaje = () => {
    if (document.getElementById("mensajeCambioImagen"))
      return document.getElementById("mensajeCambioImagen")?.remove();

    const div = document.getElementById("contenedorImagen");
    const divMensaje = document.createElement("div");
    const label = document.createElement("label");
    divMensaje.classList.add(`${style.mensajeCabioImagen}`);
    divMensaje.id = "mensajeCambioImagen"
    label.innerText = "Los cambios se estan realizando en este momento"
    divMensaje.appendChild(label);
    div?.appendChild(divMensaje)

    /*setTimeout(() => {
      document.getElementById("mensajeCambioImagen")?.remove();
    }, 5000);*/
  }

  return (
    <div className={style.contenedorContenidoInformacion}>
      <div className={style.contenedorImagenNombre} id="contenedorImagen">
        {estadoAlertaCargando === true ? (
          <AlertaCargando valor={estadoAlertaCargando} />
        ) : (
          ""
        )}
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
          
            <div className={style.nombreUsuario}>{usuario.nombre} {usuario.apellido}</div>
            <h5>
              {(usuario.rol === 5) ? 
              <div className={style.rol}>Representante</div>
              : 
            (usuario.rol === 4) ? 
                <div className={style.rol}>Estudiante</div>
                : 
              (usuario.rol === 3) ? 
              <div className={style.rol}>Docente</div>
              : 
              ((usuario.rol === 2) ? 
              <div className={style.rol}>Administrador</div>
              : (usuario.rol === 1) && 
              <div className={style.rol}>Super Administrador</div>
              )}
            </h5>
            <br />
            <h4>Información del perfil</h4>
            <div className={style.email}>Email: {usuario.email}</div>
            <label>Cédula: {usuario.cedula ? usuario.cedula  : '?'}</label>
            


            {estado === true ? (
              <div className={style.contenedorCambioContraseña}>
                <CambiarContraseña
                  mensaje="Tu seguridad es nuestra prioridad. No compartas tu contraseña"
                  actualizacionEstado={setEstado}
                  id="contenedorAlerta"
                />
              </div>
            ) : (
              ""
            )}
            {
            //<label className={style.linkEdicionPerfil}>Editar Perfil</label>
            }

            <a onClick={() => activarAlertaActualizacion()} className={style.linkEdicionContraseña}>
              Cambiar contraseña
            </a>

            
        </div>

      </div>
    </div>
  );
}
