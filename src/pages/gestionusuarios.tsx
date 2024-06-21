import { useEffect, useState, useRef } from "react";
import CrudUsuario from "../componentes/layout/secciones/gestionUsuarios/crudUsuarios"; //
import FormularioActualizacion from "../componentes/layout/Formularios/FormularioActualizacionMoodle"; //
import estilos from "../styles/pestañas/GestionUsuarios.module.css";
import Ventana from "../componentes/ventanas/Ventana"; //
import axios, { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import Layout from "@/componentes/layout/Layout";
export default function GestionUsuarios({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  useEffect(() => {
    obtenerDatosUsuarios();
    obtenerUltimaImportacion();
  }, []);

  const [estadoVentana, setestadoVentana] = useState(false);
  const [userInf, setUserInf] = useState<any>();
  const [datosUsuarios, setDatosUsuario] = useState<any>();
  const [datosImportacion, setDatosImportacion] = useState<any>();
  const [usuariosEliminados, setUsuariosEliminados] = useState<any>([]);
  const [mostrarUsuariosEliminados, setMostrarUsuariosEliminados] =
    useState<any>(false);

  const obtenerDatosUsuarios = async () => {
    const respuesta = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuarios`
    );
    const usuariosFiltrados = respuesta.data.filter(
      (e: any) => e.eliminado_en === null
    );
    const usuariosFiltradosEliminados = respuesta.data.filter(
      (e: any) => e.eliminado_en !== null
    );
    if (usuariosFiltradosEliminados.length !== 0)
      setUsuariosEliminados(usuariosFiltradosEliminados);
    setDatosUsuario(usuariosFiltrados);
  };

  const obtenerUltimaImportacion = async () => {
    try {
      const respuesta = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/importacionUsuarios`
      );

      setDatosImportacion(respuesta.data.mensaje);
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarImportacionUsuarios = async () => {
        let loadingToastId: any = null;

    try {
      loadingToastId = toast.info(
        "Realizando importación, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      const respuesta = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/importacionUsuarios`
      );

      setDatosImportacion(respuesta.data.mensaje);

      obtenerDatosUsuarios();

      toast.dismiss(loadingToastId);

      toast.success("La importación se realizo exitosamente, la tabla de usuarios se está actualizando", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });

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
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contendorUsuarios}>
        <div className={estilos.contenedorInfUsuarios}>
          <div className={estilos.contenedorBotonMoodle}>
            <button onClick={actualizarImportacionUsuarios}>
              Importar Usuarios desde Moodle
            </button>
            {datosImportacion && (
              <span>
                La última importación fue realizada el {datosImportacion}
              </span>
            )}
            <p>
              Este botón facilita la integración de datos entre Moodle y nuestra
              aplicación. Al hacer clic en Importar Usuarios desde Moodle, se
              iniciará un proceso que recuperará información relevante de los
              usuarios almacenados en Moodle y los transferirá a nuestra base de
              datos local. Este proceso garantiza la sincronización actualizada
              de los datos, permitiéndonos aprovechar la información de usuarios
              de Moodle de manera eficiente en nuestra aplicación.
            </p>
          </div>

          <div className={estilos.contendorPrincipalInformacionRoles}>
            <p>Roles en el sistema:</p>
            <div className={estilos.contendorInformacionRoles}>
              <span className={estilos.usuariosSuperAdmin}>
                1. Super Administrador
              </span>
              <span className={estilos.usuariosAdmin}>2. Administrador</span>
              <span className={estilos.usuariosMoodleDocente}>3. Docente</span>
              <span className={estilos.usuariosMoodle}>4. Estudiante</span>
              <span className={estilos.usuariosPadres}>5. Representante</span>
            </div>
          </div>
          {!mostrarUsuariosEliminados ? (
            <CrudUsuario
              usuarioCookie={usuarioCookie}
              infUsers={datosUsuarios}
              setInformacionUsuario={setUserInf}
              setInformacionUsuarios={setDatosUsuario}
              obtenerDatos={obtenerDatosUsuarios}
              setEstado={setestadoVentana}
              mostrarUsuariosEliminados={mostrarUsuariosEliminados}
              setMostrarUsuariosEliminados={setMostrarUsuariosEliminados}
            />
          ) : (
            <CrudUsuario
              usuarioCookie={usuarioCookie}
              infUsers={usuariosEliminados}
              // setInformacionUsuario={setUserInf}
              setInformacionUsuarios={setDatosUsuario}
              obtenerDatos={obtenerDatosUsuarios}
              setEstado={setestadoVentana}
              mostrarUsuariosEliminados={mostrarUsuariosEliminados}
              setMostrarUsuariosEliminados={setMostrarUsuariosEliminados}
            />
          )}
        </div>
        <Ventana estado={estadoVentana}>
          <FormularioActualizacion
            usuarioCookie={usuarioCookie}
            obtenerDatos={obtenerDatosUsuarios}
            estado={setestadoVentana}
            informacionUsuario={userInf}
            setInformacionUsuario={setDatosUsuario}
          />
        </Ventana>
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

//http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=&criteria[0][value]=
//http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=email&criteria[0][value]=santyago0325@outlook.com
