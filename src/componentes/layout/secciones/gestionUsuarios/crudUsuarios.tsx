import { useState } from "react";
import axios, { AxiosError } from "axios";
import estilos from "../../../estilos/Secciones/InformacionUser.module.css";
import Link from "next/link";
import TablaInformacion from "./TablaInformacion";
import { Toaster, toast } from "sonner";
import {
  AiOutlineQuestion,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/ai";

export default function InformacionUserMoodle({
  infUsers,
  setEstado,
  setInformacionUsuario,
  setInformacionUsuarios,
  usuarioCookie,
  mostrarUsuariosEliminados,
  setMostrarUsuariosEliminados,
  obtenerDatos,
}: any) {
  const [userInf, setUserInf] = useState<any>(infUsers);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedUserEmails, setSelectedUserEmails] = useState<string[]>([]);
  const [selectedUserRoles, setSelectedUserRoles] = useState<string[]>([]);
  const [selectedUserFechaEliminacion, setSelectedUserFechaEliminacion] =
    useState<string[]>([]);
  const [estadoVentanaEliminacion, setEstadoVentanaEliminacion] =
    useState<boolean>(false);

  const obtenerInformacion = async () => {
    obtenerDatos();
  };

  const buscarUsuario = (input: any) => {
    if (input === "") {
      setInformacionUsuarios(userInf);
    } else {
      const filteredUsers = userInf.filter((user: any) => {
        // if (Number.isInteger(parseInt(input))) {
        //return user.username.includes(input);
        return user.email_usuario.includes(input);
        // }
        // return false;
      });

      setInformacionUsuarios(filteredUsers);
    }
  };

  const seleccionUsuarios = (
    value: string,
    email: string,
    rol: string,
    fecha_eliminacion: string
  ) => {
    if (selectedUserIds.includes(value)) {
      const indexToDelete = selectedUserIds.indexOf(value);

      // Crear copias de los arrays sin modificar los originales
      const newSelectedUserIds = selectedUserIds.slice();
      const newSelectedUserEmails = selectedUserEmails.slice();
      const newSelectedUserRoles = selectedUserRoles.slice();
      const newSelectedUserDate = selectedUserFechaEliminacion.slice();

      // Eliminar el elemento en la posición indexToDelete
      newSelectedUserIds.splice(indexToDelete, 1);
      newSelectedUserEmails.splice(indexToDelete, 1);
      newSelectedUserRoles.splice(indexToDelete, 1);
      newSelectedUserDate.splice(indexToDelete, 1);

      // Actualizar los estados con las nuevas copias modificadas
      //const [selectedUserFechaEliminacion, setSelectedUserFechaEliminacion] = useState<string[]>([]);
      setSelectedUserIds(newSelectedUserIds);
      setSelectedUserEmails(newSelectedUserEmails);
      setSelectedUserRoles(newSelectedUserRoles);
      setSelectedUserFechaEliminacion(newSelectedUserDate);
    } else {
      // Agregar ids a la variable
      setSelectedUserIds([...selectedUserIds, value]);
      setSelectedUserEmails([...selectedUserEmails, email]);
      setSelectedUserRoles([...selectedUserRoles, rol]);
      setSelectedUserFechaEliminacion([
        ...selectedUserFechaEliminacion,
        fecha_eliminacion,
      ]);
    }
  };

  //ACTUALZAR INF
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_user_update_users&moodlewsrestformat=json&users[0][id]=16&users[0][username]=davidmm
  const actualizacionEstado = (id: any) => {
    const usuariosSeleccionado = infUsers.filter(
      (e: any) => e.id_usuario === id
    );
    setInformacionUsuario(usuariosSeleccionado);
    //setUserInf(usuariosSeleccionado)
    setEstado(true);
  };

  const restaurarUsuario = async (id: any) => {
    let loadingToastId: any = null;
    try {
      setEstadoVentanaEliminacion(false);
      loadingToastId = toast.info(
        "Restaurando usuario, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      await axios.put("/api/usuarios?cambio=fecha_eliminacion", {
        id_usuarioRestauracion: id,
      });
      toast.dismiss(loadingToastId);

      toast.success("El usuario fue restaurado exitosamente", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

      obtenerDatos();
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

  const eliminarEnvioDatos = async () => {
    let loadingToastId: any = null;
    const boton = document.getElementById('botonEliminar') as HTMLButtonElement;
    try {
      boton.disabled = true;
      setEstadoVentanaEliminacion(false);
      loadingToastId = toast.info(
        "Eliminando usuario/usuarios, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      await axios.post("/api/usuarios", {
        userEmails: selectedUserEmails,
        userIds: selectedUserIds,
        userRoles: selectedUserRoles,
        userFechas: selectedUserFechaEliminacion,
      });

      toast.dismiss(loadingToastId);

      toast.success("El usuario/usuarios fueron eliminados exitosamente", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

      setSelectedUserIds([]);
      setSelectedUserEmails([]);
      setSelectedUserRoles([]);
      setSelectedUserFechaEliminacion([]);

      obtenerInformacion();
    } catch (error) {
      const errorMensaje: any = (error as AxiosError).response?.data;
      toast.dismiss(loadingToastId);

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    }finally{
      boton.disabled = false;
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
          <h4>Buscar usuarios por email</h4>
          <div className={estilos.contenedorOpciones}>
            <div className={estilos.contenedorInput}>
              <input
                type="text"
                onClick={() => setUserInf(infUsers)}
                onChange={(e) => buscarUsuario(e.target.value)}
                placeholder="Buscar usuario por el campo email"
              />
            </div>

            <div className={estilos.contenedorBotones}>
              {usuarioCookie &&
                usuarioCookie.rol === 1 &&
                (!mostrarUsuariosEliminados ? (
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
                ))}
              <button className={estilos.btnAgregar}>
                {" "}
                <Link target="_BLANK" href={"/gestionusuarios/crearusuarios"}>
                  Agregar
                </Link>
              </button>
              {!mostrarUsuariosEliminados && (
                <button
                  className={estilos.botonEliminar}
                  onClick={() => eliminacionConfirmacion()}
                  id="botonEliminar"
                >
                  Eliminar
                </button>
              )}
            </div>
          </div>
        </div>

        <div className={estilos.contenedorTabla}>
          <TablaInformacion
            mostrarUsuariosEliminados={mostrarUsuariosEliminados}
            infUsers={infUsers}
            seleccionUsuarios={seleccionUsuarios}
            actualizacionEstado={actualizacionEstado}
            usuarioCookie={usuarioCookie}
            restaurarUsuario={restaurarUsuario}
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
