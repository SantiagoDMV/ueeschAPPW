import InformacionPublicaciones from "./InformacionPublicacionesMomentosId";

export default function Publicaciones({
  datosPublicaciones,
  datosMultimedia,
}: any) {

  return (
    <>
      {datosPublicaciones &&
        <InformacionPublicaciones
          publicacion={datosPublicaciones}
          multimedia={datosMultimedia}
        />
      }
    </>
  );
}
