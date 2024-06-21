import InformacionPublicaciones from "./InformacionPublicacionesMomentosId";

export default function Publicaciones({
  informacionUsuarioCreador,
  datosPublicaciones,
  datosMultimedia,
}: any) {

  return (
    <>
      {datosPublicaciones &&
        <InformacionPublicaciones
        informacionUsuarioCreador={informacionUsuarioCreador}
          publicacion={datosPublicaciones}
          multimedia={datosMultimedia}
        />
      }
    </>
  );
}
