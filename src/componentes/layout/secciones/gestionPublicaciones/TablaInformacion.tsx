import estilos from "../../../estilos/Secciones/InformacionPublicacion.module.css";
import { AiTwotoneEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import Link from "next/link";
export default function TablaInformacion({
  mostrarUsuariosEliminados,
  infUsers,
  seleccionUsuarios,
  actualizacionEstado,
  datosMultimedia,
  detallesUsuarios,
}: any) {
  
  const accesoUltimo = (fechaEliminacionFormatear: any) => {
    const fecha = new Date(fechaEliminacionFormatear);

    const opcionesFecha: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const opcionesHora: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const fechaFormateada = fecha.toLocaleDateString(undefined, opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString(undefined, opcionesHora);

    const fechaFinalFormateada = `${fechaFormateada} a las ${horaFormateada}`;

    return fechaFinalFormateada;
  };

  return (
    <table className={estilos.tabla}>
      <thead>
        <tr>
          <th className={estilos.filaHead}></th>
          <th className={estilos.filaHead}>Id_Publicacion</th>
          <th className={estilos.filaHead}>Id_TipoPublicacion</th>
          <th className={estilos.filaHead}>Usuario</th>
          <th className={estilos.filaHead}>Título</th>
          {/* <th className={estilos.filaHead}>Contenido</th> */}
          <th className={estilos.filaHead}>Multimedia</th>

          <th className={estilos.filaHead}>Ultima modificacion</th>
          <th className={estilos.filaHead}></th>
        </tr>
      </thead>
      <tbody>
        {!infUsers ? (
          <tr className={estilos.filastr}>
            <td className={estilos.filas}>
              <div className={estilos.seccionPublicacionesCarga}>
                <p>Obteniendo Publicaciones</p>
                <div className={estilos.circuloCarga}>
                  <AiOutlineLoading3Quarters className={estilos.iconoCarga} />
                </div>
              </div>
            </td>
          </tr>
        ) : infUsers.length === 0 ? (
          <tr className={estilos.filastr}>
            <td className={estilos.filas}>
              No hay publicaciones disponibles en este momento
            </td>
          </tr>
        ) : (
          infUsers &&
          infUsers.map((e: any, index: number) => (
            <tr className={estilos.filastr} key={index}>
              {!mostrarUsuariosEliminados && !e.eliminado_en ? (
                <>
                  <td className={estilos.filas}>
                    <input
                      onChange={() =>
                        seleccionUsuarios(
                          `${e.id_publicacion}`,
                          `${e.titulo_publicacion}`
                        )
                      }
                      type="checkbox"
                      name="check"
                      id="check"
                    />
                  </td>

                  <td className={estilos.filas}>{e.id_publicacion}</td>
                  <td className={estilos.filas}>{e.id_tipo_publicacion}</td>
                  
                  <td className={estilos.filas}>
  {detallesUsuarios &&
    detallesUsuarios.map((detalleUsuario: any, detalleIndex: number) => {
      if (detalleUsuario.id_usuario === e.id_usuario) {
        return (
          <p key={detalleIndex}>
            {`${detalleUsuario.nombre_usuario} ${detalleUsuario.apellido_usuario}`}
          </p>
        );
      }
      return null;
    })}
</td>
                    

                  <td className={estilos.filas}>
                    <div className={estilos.contenido}>
                      {e.titulo_publicacion}
                    </div>
                  </td>
                  {/* <td className={estilos.fila_contenido}><div className={estilos.contenido}>{e.contenido_publicacion}</div></td>                 */}
                  <td className={estilos.fila_multimedia}>
                    {datosMultimedia &&
                      datosMultimedia
                        .filter(
                          (m: any) => m.id_publicacion === e.id_publicacion
                        )
                        .map((m: any) => (
                          <div key={m.id_multimedia} className={estilos.links}>
                            <Link href={m.ruta_multimedia} target="_BLANK">
                              {m.ruta_multimedia}
                            </Link>
                          </div>
                        ))}
                  </td>

                  <td className={estilos.filas}>{accesoUltimo(e.creado_en)}</td>

                  <td className={estilos.filas}>
                    <AiTwotoneEdit
                      onClick={() => actualizacionEstado(e.id_publicacion)}
                      className={estilos.iconoActualizar}
                    />
                  </td>
                </>
              ) : (
                mostrarUsuariosEliminados &&
                e.eliminado_en && (
                  <>
                    <td className={estilos.filas}>
                      <input
                        onChange={() =>
                          seleccionUsuarios(
                            `${e.id_publicacion}`,
                            `${e.titulo_publicacion}`
                          )
                        }
                        type="checkbox"
                        name="check"
                        id="check"
                      />
                    </td>

                    <td className={estilos.filas}>{e.id_publicacion}</td>
                    <td className={estilos.filas}>{e.id_tipo_publicacion}</td>

                    <td className={estilos.filas}>
  {detallesUsuarios &&
    detallesUsuarios.map((detalleUsuario: any, detalleIndex: number) => {
      if (detalleUsuario.id_usuario === e.id_usuario) {
        return (
          <p key={detalleIndex}>
            {`${detalleUsuario.nombre_usuario} ${detalleUsuario.apellido_usuario}`}
          </p>
        );
      }
      return null;
    })}
</td>

                    <td className={estilos.filas}>
                      <div className={estilos.contenido}>
                        {e.titulo_publicacion}
                      </div>
                    </td>
                    {/* <td className={estilos.fila_contenido}><div className={estilos.contenido}>{e.contenido_publicacion}</div></td>                 */}
                    <td className={estilos.fila_multimedia}>
                      {datosMultimedia &&
                        datosMultimedia
                          .filter(
                            (m: any) => m.id_publicacion === e.id_publicacion
                          )
                          .map((m: any) => (
                            <div
                              key={m.id_multimedia}
                              className={estilos.links}
                            >
                              <Link href={m.ruta_multimedia} target="_BLANK">
                                {m.ruta_multimedia}
                              </Link>
                            </div>
                          ))}
                    </td>

                    <td className={estilos.filas}>
                      {accesoUltimo(e.creado_en)}
                    </td>

                    <td className={estilos.filas}>
                      <AiTwotoneEdit
                        onClick={() => actualizacionEstado(e.id_publicacion)}
                        className={estilos.iconoActualizar}
                      />
                    </td>
                  </>
                )
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
