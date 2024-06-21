import ReporteUsuarios from "@/componentes/Reporte/ReportesCompletos/ReporteUsuarios";
import ReportePublicacion from "../componentes/Reporte/ReportesCompletos/ReportePublicacion";
import ModuloColumnas from "@/componentes/Reporte/Modulos/ModuloColumnas/ModuloColumnas";
import ModuloFiltros from "@/componentes/Reporte/Modulos/ModuloFiltros/ModuloFIltros";
import ModulosFiltrosPublicaciones from "../componentes/Reporte/Modulos/ModuloFiltros/ModuloFIltrosPublicaciones";
import ModuloEleccion from "@/componentes/Reporte/Modulos/ModuloEleccionTipo/ModuloEleccion";
import estilos from "../styles/pestañas/Reportes.module.css";
import { use, useState } from "react";
import axios from "axios";
import { AiOutlineFileUnknown, AiOutlineWarning } from "react-icons/ai";
import {
  columnasUsuarios,
  columnasPublicacion,
  datosFiltrosUsuarios,
  datosFiltrosPublicaciones
} from "../constantes/reportes";
import Layout from "@/componentes/layout/Layout";
//columnasUsuarios
let cacheUsuario: any = null;

//export default function Reporte({ informacionUsuario,usuarioCookie,setUsuarioCookie }: any) {
export default function Reporte({ usuarioCookie, setUsuarioCookie, moodle }: any) {
  const [reporte, setReporte] = useState(null);
  const [tipoReporte, setTipoReporte] = useState();
  const [estado, setEstado] = useState(false);
  const [usuariosR, setUsuariosR] = useState<any>(null);
  const [publicacionesR, setPublicacionesR] = useState<any>(null);
  const [cacheUsuariosR, setCacheUsuariosR] = useState<any>([]);
  const [publicacionesCacheR, setPublicacionesCacheR] = useState<any>([]);
  const [columnas, setColumnas] = useState<any>();
  const [filtros, setFiltros] = useState(datosFiltrosUsuarios);

  const obtenerUsuarios = async () => {
    if (usuariosR) return;

    try {
      await axios.get("/api/usuarios").then((respuesta) => {
        setUsuariosR(respuesta.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerPublicaciones = async () => {
    
  
    if (publicacionesR) return;

    try {
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones`,
        { mostrar_tipos_publicaciones: "todo" }
      );


      setPublicacionesR(respuesta.data.datos);
    } catch (error) {
      console.log(error);
    }
  };

  const activarReporte = async () => {
    if (reporte === 0) {
      await obtenerUsuarios();
      setEstado(!estado);
    }
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contendorReportes}>
        <div className={estilos.seccionIzquierda}>
          <div className={estilos.modulos}>
            <ModuloEleccion
              setReporte={setReporte}
              setTipo={setTipoReporte}
              setColumnas={setColumnas}
              obtenerUsuario={obtenerUsuarios}
              obtenerPublicaciones={obtenerPublicaciones}
            />
            {tipoReporte && tipoReporte === "U" ? (
              usuariosR &&
              <>
                <hr className={estilos.lineaDivision} />
                <ModuloColumnas
                  setColumnas={setColumnas}
                  columnas={columnas}
                  tipo={tipoReporte}
                />
                <hr className={estilos.lineaDivision} />
                <ModuloFiltros
                  usuariosR={usuariosR}
                  cache={cacheUsuariosR}
                  setCache={setCacheUsuariosR}
                  datosFiltros={datosFiltrosUsuarios}
                />
              </>
            ) : tipoReporte && tipoReporte === "P" ? (
              publicacionesR &&
                <>
                <hr className={estilos.lineaDivision} />
                <ModuloColumnas setColumnas={setColumnas} columnas={columnas} />
                <hr className={estilos.lineaDivision} />
                <ModulosFiltrosPublicaciones
                  usuariosR={publicacionesR}
                  cache={publicacionesCacheR}
                  setCache={setPublicacionesCacheR}
                  datosFiltros={datosFiltrosPublicaciones}
                />
                </>
            ) : (
              ""
            )}
          </div>

          <div
            className={estilos.contenedroOpcionGenerar}
            onClick={() => activarReporte()}
          >
            <button>Generar Reporte</button>
          </div>
        </div>
        <div className={estilos.seccionDerecha}>
          <div className={estilos.reporte}>
            {estado ? (
              reporte === 0 && tipoReporte === "U" ? (
                <div className={estilos.contenedorReporte}>
                 {
                      (cacheUsuariosR.length !== 0) ?
                        <ReporteUsuarios usuarioSesion={usuariosR} informacionUsuarios={cacheUsuariosR} columnasUsuarios={columnas} usuarioCreador = {usuarioCookie} />
                        :
                        <ReporteUsuarios usuarioSesion={usuariosR} informacionUsuarios={usuariosR} columnasUsuarios={columnas} usuarioCreador = {usuarioCookie}/>
                    }
                </div>
              ): reporte === 0 && tipoReporte === "P" ? (
                <div className={estilos.contenedorReporte}>
                  {
                    (publicacionesCacheR.length !== 0) ?
                  <ReportePublicacion
                    usuarioSesion={publicacionesR}
                    informacionUsuarios={publicacionesCacheR}
                    columnasUsuarios={columnas}
                    usuarioCreador={usuarioCookie}
                  />:
                  <ReportePublicacion
                    usuarioSesion={publicacionesR}
                    informacionUsuarios={publicacionesR}
                    columnasUsuarios={columnas}
                    usuarioCreador={usuarioCookie}
                  />
                }
                </div>
              ) : (
                <div className={estilos.divSinReporte}>
                  <h2>
                    {" "}
                    <AiOutlineWarning
                      className={estilos.iconosMensajesSinReporte}
                    />{" "}
                    El reporte no se encuentra disponible
                  </h2>
                </div>
              )
            ) : (
              <div className={estilos.divSinReporte}>
                <h2>
                  {" "}
                  <AiOutlineFileUnknown
                    className={estilos.iconosMensajesSinReporte}
                  />{" "}
                  No se ha generado ningún reporte
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// export const getServerSideProps = async (context: any) => {
//   if (cacheUsuario) {
//     return {
//       props: {
//         informacionUsuario: cacheUsuario,
//         //informacionPublicaciones: cachePublicaciones,
//       }
//     }
//   }
//   //NEXT_PUBLIC_BASE_URL_URL
//   const { UserCookie } = context.req.cookies
//   const informacionUsuario = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieSession`, { UserCookie: UserCookie });
//   cacheUsuario = informacionUsuario.data
//   /*
//     if (cacheUsuario.id === 1) {
//       const informacionPublicaciones = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/publicaciones`)
//       cachePublicaciones = informacionPublicaciones.data;
//     }
//   */
//   return {
//     props: {
//       informacionUsuario: cacheUsuario,
//       //     informacionPublicaciones: cachePublicaciones
//     }
//   }
// }


