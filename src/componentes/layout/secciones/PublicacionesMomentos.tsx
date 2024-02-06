import InformacionPublicaciones from "./InformacionPublicacionesMomentos";

export default function Publicaciones({
  datosPublicaciones,
  datosMultimedia,
}: any) {
  
const accesoUltimo = (fecha: any) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes real.
    const anio = fechaObj.getFullYear();
    const fechaFormat = `${dia}-${mes}-${anio}`;
    return fechaFormat;
  };


  
  return (
    <>
    {datosPublicaciones &&
        <InformacionPublicaciones
          publicacion={datosPublicaciones}
          multimedia={datosMultimedia}
          accesoUltimo={accesoUltimo}
        />
    }
    </>
  );
}
