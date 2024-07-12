import InformacionPublicaciones from "./InformacionPublicacionesIndexDos";

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


// import style from "../../estilos/Secciones/Publicaciones.module.css";
// import InformacionPublicaciones from "./InformacionPublicacionesIndex";

// export default function Publicaciones({
//   datosPublicaciones,
//   usuarioCookie
// }: any) {
//   const accesoUltimo = (fecha: any) => {
//     const fechaObj = new Date(fecha);
//     const dia = fechaObj.getDate();
//     const mes = fechaObj.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes real.
//     const anio = fechaObj.getFullYear();
//     const fechaFormat = `${dia}-${mes}-${anio}`;
//     return fechaFormat;
//   };

//   return (
//     <>
//       {datosPublicaciones.length > 0 ? (
//         <InformacionPublicaciones
//           publicacion={datosPublicaciones}
//           accesoUltimo={accesoUltimo}
//           usuarioCookie={usuarioCookie}
//         />
//       ) : (
//         <h3 className={style.tituloPublicaciones}>
//           No existen publicaciones actualmente
//         </h3>
//       )}
//     </>
//   );
// }
