import Imagenes from "../../Imagenes";
import style from "../../estilos/Secciones/PublicacionesMomentos.module.css";
import Link from "next/link";

export default function Publicaciones({
  publicacion,
  multimedia,
}: any) {
  return (
    <>
      {publicacion ? (
        publicacion.map((e: any, index: number) => (
          <div key={e.id_publicacion} className={style.publicacion}>
            <div
              className={style.contenedorImagenPublicacion}
            >
              {multimedia ? (
                <Imagenes
                  multimedia={multimedia}
                  idPublicacion={e.id_publicacion}
                  index={index}
                />
              ) : (
                <p>Cargando imagen</p>
              )}
            </div>

            <div className={style.contenedorContenidoPublicacion}>
              <div className={style.contenidoPublicacion}>
                <Link className={style.botonLink} href={`/publicaciones/publicacion/${e.id_publicacion}`}>Ver publicación</Link>
                <div>{e.titulo_publicacion}</div>
              </div>
            </div>

          </div>
        ))
      ) : (
        <h3 className={style.tituloPublicaciones}>
          No existen publicaciones actualmente
        </h3>
      )}
    </>
  );
}
