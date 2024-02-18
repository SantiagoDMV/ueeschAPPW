import style from "../../estilos/Secciones/Publicaciones.module.css";
import InformacionPublicaciones from "./InformacionPublicaciones";
import FormularioActualizacion from "../../layout/Formularios/FormularioActualizacionPublicacion";
import Ventana from "../../ventanas/Ventana";
import {useState} from 'react'

export default function Publicaciones({
  datosPublicaciones,
  usuarioCookie,  
  obtenerInformacionPublicaciones
}: any) {
  

  const accesoUltimo = (fecha: any) => {
    const fechaObj = new Date(fecha);
    const dia = fechaObj.getDate();
    const mes = fechaObj.getMonth() + 1; // Los meses van de 0 a 11, sumamos 1 para obtener el número de mes real.
    const anio = fechaObj.getFullYear();
    const fechaFormat = `${dia}-${mes}-${anio}`;
    return fechaFormat;
  };
  const [estadoVentana, setestadoVentana] = useState(false);
  const [publicacionInf, setPublicacionInf] = useState<any>();
  
  return (
    <>

<Ventana estado={estadoVentana}>
          <FormularioActualizacion
            estado={setestadoVentana}
            informacionUsuario={publicacionInf}
            datosMultimedia={datosPublicaciones.datosMultimedia}
            obtenerDatosPublicaciones={obtenerInformacionPublicaciones}
          />
        </Ventana>

      {datosPublicaciones && datosPublicaciones.datos.length > 0 ? (
        <InformacionPublicaciones
        obtenerInformacionPublicaciones={obtenerInformacionPublicaciones}
        setInformacionPublicacion={setPublicacionInf}
          publicacion={datosPublicaciones.datos}
          publicacionInf={datosPublicaciones.datos}
          setEstado={setestadoVentana}
          accesoUltimo={accesoUltimo}
          usuarioCookie={usuarioCookie}
        />
      ) : (
        <h3 className={style.tituloPublicaciones}>
          No existen publicaciones actualmente
        </h3>
      )}
    </>
  );
}
