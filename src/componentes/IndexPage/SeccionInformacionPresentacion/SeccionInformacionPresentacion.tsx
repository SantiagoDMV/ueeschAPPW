import style from "./SeccionInformacionPresentacion.module.css"
import axios from "axios";
import { useEffect,useState } from "react";
import mdtoHTML from "../../../../util/snarkdown";

export default function SeccionInformacionPresentacion() {
  // useEffect(()=>{
  //   obtenerinformacion();
  // },[])
  // const [informacion,setInformacion] = useState<any>()
  

  // const obtenerinformacion = async() =>{
  //   const respuestaMision = await axios.get('https://ueeschstrapi.onrender.com/api/informacions/7?[fields][0]=nombre&[fields][1]=contenido')
  //   setInformacion(respuestaMision.data.data.attributes)
  // }
  return (
    <div className={style.contenedorPresentacion}>
      
        <h3>¿Qué es la UEESCH?</h3>
        <p>
          La Unidad Educativa Especializada Sordos de Chimborazo (UESESCH) es una institución educativa pública comprometida con la inclusión y el desarrollo de las personas sordas de la provincia. Brinda educación inicial, básica, media y superior para personas sordas, con el objetivo de que alcancen su máximo potencial.
        </p> 
        
        
        {
          // informacion &&
          // <>
          // <h3>{informacion.nombre}</h3>
          // <p dangerouslySetInnerHTML={{__html:mdtoHTML(informacion.contenido)}}/>
          // </>
        }
        <button
        onClick={() => (window.location.href = `/historia`)}>
        EXPLORA NUESTRA HISTORIA</button>
    </div> 
  )
}
