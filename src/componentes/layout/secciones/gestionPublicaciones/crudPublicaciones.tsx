import { useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import estilos from "../../../estilos/Secciones/InformacionPublicacion.module.css";
import TablaInformacion from "./TablaInformacion";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import {
  AiOutlineQuestion,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";

export default function InformacionUserMoodle({
  detallesUsuarios,
  publicacionInf,
  setEstado,
  setInformacionPublicacion,
  setInformacionPublicaciones,
  setInformacionMultimedia,
  datosMultimedia,
  obtenerDatosPublicaciones
}: any) {
  const [userInf, setUserInf] = useState<any>(publicacionInf);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [estadoVentanaEliminacion, setEstadoVentanaEliminacion] =
    useState<boolean>(false);
  const [mostrarUsuariosEliminados, setMostrarUsuariosEliminados] =
    useState<any>(false);

  const buscarUsuario = (input: any) => {
    if (input === "") {
      setInformacionPublicaciones(userInf);
    } else {
      const filteredUsers = userInf.filter((user: any) => {
        return user.titulo_publicacion.includes(input);
      });
      setInformacionPublicaciones(filteredUsers);
    }
  };

  const seleccionUsuarios = (value: string, email: string) => {
    if (selectedUserIds.includes(value)) {
      setSelectedUserIds(selectedUserIds.filter((userid) => userid !== value));
    } else {
      // Agregar ids a la variable
      setSelectedUserIds([...selectedUserIds, value]);
    }
  };

  const eliminarEnvioDatos = async () => {
      setEstadoVentanaEliminacion(false);
          
          let loadingToastId: any = null;

          try {
            loadingToastId = toast.info(
              "Eliminando publicación/publicaciones, esto puede llevar un momento...",
              {
                style: {
                  border: "none",
                },
              }
            );
      
      await axios.post("/api/publicaciones", {
        publicacionesIds: selectedUserIds,
      });

      toast.dismiss(loadingToastId);

      toast.success("La publicación/publicaciones fueron eliminadas exitosamente", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

      
      obtenerDatosPublicaciones();
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

  const eliminacionConfirmacion = () => {
    if (selectedUserIds.length === 0) {
      let loadingToastId: any = null;
      loadingToastId = toast.error(
        "Seleccione al menos un registro para eliminar.",
        {
          style: {
            border: "none",
          },
        }
      );

      toast.dismiss(loadingToastId);

      return;
    }
    setEstadoVentanaEliminacion(true);
  };

  //ACTUALZAR INF
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=16&users[0][username]=davidmm
  const actualizacionEstado = (id: any) => {
    const usuariosSeleccionado = publicacionInf.filter(
      (e: any) => e.id_publicacion === id
    );

    setInformacionPublicacion(usuariosSeleccionado);
    setEstado(true);
  };

  //NOTAS DE LOS ESTUDIANTES
  //localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=mod_assign_get_grades&moodlewsrestformat=json&assignmentids[0]=2
  return (
    <>
      
      {estadoVentanaEliminacion && (
        <div className={estilos.fondo}>
          <div className={estilos.contenedorMensaje} id="contenedor">
            <AiOutlineQuestion className={estilos.iconoMensajeExito} />
            <div className={estilos.contenedorInformacion}>
              <div className={estilos.informacion}>
                <p>
                  La eliminación de los registros seleccionados es irreversible.
                  ¿Desea continuar con esta acción?
                </p>
              </div>
              <div className={estilos.botonesConfirmacionEliminacion}>
                <button onClick={eliminarEnvioDatos}>Confirmar</button>
                <button
                  onClick={() => setEstadoVentanaEliminacion(false)}
                  autoFocus
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={estilos.contendorCrudUsuarios}>
        
        <div className={estilos.contenedorBuscador} id="contenedor">
          <h4>Buscar publicación por título</h4>
          <div className={estilos.contenedorOpciones}>
            <div className={estilos.contenedorInput}>
              <input
                className={estilos.inputContenedorBuscador}
                type="text"
                onClick={() => setUserInf(publicacionInf)}
                onChange={(e) => buscarUsuario(e.target.value)}
                placeholder="Buscar publicación por título"
              />
            </div>
            <div className={estilos.contenedorBotones}>
              {!mostrarUsuariosEliminados ? (
                <button
                  className={estilos.botonOcultos}
                  onClick={() =>
                    setMostrarUsuariosEliminados(!mostrarUsuariosEliminados)
                  }
                >
                  <AiFillEyeInvisible />
                </button>
              ) : (
                <button
                  className={estilos.botonOcultos}
                  onClick={() =>
                    setMostrarUsuariosEliminados(!mostrarUsuariosEliminados)
                  }
                >
                  <AiFillEye />
                </button>
              )}

              <div className={estilos.btnAgregar}>
                <Link
                  href={"/publicaciones/crearpublicacion"}
                  target="_BLANK"
                  className={estilos.linkAdministracion}
                >
                  Nueva publicación
                </Link>
              </div>
              <button
                className={estilos.botonEliminar}
                onClick={() => eliminacionConfirmacion()}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>

{
  mostrarUsuariosEliminados && 
        <div className={estilos.contenedorInformacionOcultos}>
        <p>Las publicaciones ocultas pertenecen a usuarios que ya no están activos en el sistema.</p>
        </div>
}
        <div className={estilos.contenedorTabla}>
          <TablaInformacion
            mostrarUsuariosEliminados={mostrarUsuariosEliminados}
            detallesUsuarios={detallesUsuarios}
            infUsers={publicacionInf}
            seleccionUsuarios={seleccionUsuarios}
            actualizacionEstado={actualizacionEstado}
            datosMultimedia={datosMultimedia}
          />
        </div>
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
