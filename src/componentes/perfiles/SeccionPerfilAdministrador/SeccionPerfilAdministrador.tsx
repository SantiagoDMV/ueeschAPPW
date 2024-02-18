import styles from "./SeccionPerfilAdministrador.module.css";
import { useEffect, useState } from "react";
//import { AiFillFile } from "react-icons/ai";
import { AiOutlineLoading3Quarters, AiOutlineCalendar } from "react-icons/ai";
import axios from "axios";
import Publicaciones from "../../layout/secciones/Publicaciones";

import Link from "next/link";
export default function SeccionPerfilAdministrador({ usuarioCookie }: any) {
  useEffect(() => {
    if (usuarioCookie && usuarioCookie.id) {
      obtenerInformacionPublicaciones();
    }
  }, [usuarioCookie]);

  const [datosPublicaciones, setDatosPublicaciones] = useState<any>();
  const [mostrarCarga, setMostrarCarga] = useState(true);
  const obtenerInformacionPublicaciones = async () => {
    try {
      const respuesta = await axios.post(`/api/publicaciones`, {
        pagina: "perfil",
        idUsuario: usuarioCookie.id,
      });
      setDatosPublicaciones(respuesta.data);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      document.getElementById("contenedorSeccionPublicaciones")?.remove();
    } finally {
      // Ocultar el mensaje de carga después de 5 segundos (5000 milisegundos)
      setMostrarCarga(false);
    }
  };
  return (
    <div className={styles.contenedorInferior}>
      <div className={styles.seccionIzquierda}>
       <Link
          href={"/publicaciones/crearpublicacion"}
          target="_BLANK"
          className={styles.linkAdministracion}
        >
          Nueva publicación
        </Link>

        {usuarioCookie &&
          (usuarioCookie.rol === 1 || usuarioCookie.rol === 2) && (
            <Link
              href={"/reportes"}
              target="_BLANK"
              className={styles.linkAdministracion}
            >
              Gestor de reportes
            </Link>
          )}

        {usuarioCookie && (
          <Link
            target="_blank"
            href={
              usuarioCookie &&
              (usuarioCookie.rol === 1 || usuarioCookie.rol === 2)
                ? "/seguimiento"
                : `/seguimiento/${usuarioCookie.id_moodle}`
            }
            className={styles.linkAdministracion}
          >
            {usuarioCookie.rol === 1 || usuarioCookie.rol === 2
              ? "Registros Académicos"
              : "Registro Académico"}
          </Link>
        )}
      </div>
      <div className={styles.seccionDerecha}>
        <div
          className={styles.contenedorSeccionPublicaciones}
          id="contenedorSeccionPublicaciones"
        >
          {datosPublicaciones &&
          usuarioCookie &&
          datosPublicaciones.datos.length > 0 ? (
            <div className={styles.seccionPublicaciones}>
              <h2>
                <AiOutlineCalendar
                  className={styles.iconoPublicacionesRecientes}
                />{" "}
                Tus publicaciones
              </h2>

              <div className={styles.contenedorPublicaciones}>
                <Publicaciones
                  datosPublicaciones={datosPublicaciones}
                  usuarioCookie={usuarioCookie}
                  obtenerInformacionPublicaciones={
                    obtenerInformacionPublicaciones
                  }
                />
              </div>
              {/* <div className={styles.contenedorBotonVerTodo}>
                <Link href={"publicaciones"} className={styles.botonVerTodo}>
                  VER TODAS LAS PUBLICACIONES
                </Link>
              </div> */}
            </div>
          ) : datosPublicaciones && datosPublicaciones.datos.length === 0 ? (
            <div className={styles.seccionPublicacionesCarga}>
              <h4>Tu lista de publicaciones está vacía por ahora.</h4>
            </div>
          ) : mostrarCarga ? (
            <div className={styles.seccionPublicacionesCarga}>
              <h4>Obteniendo Publicaciones</h4>
              <div className={styles.circuloCarga}>
                <AiOutlineLoading3Quarters className={styles.iconoCarga} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
