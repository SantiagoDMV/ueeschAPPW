import React from "react";
import style from "./MisionVision.module.css";
import { useEffect,useState } from "react";
import axios from "axios";
import mdtoTML from '../../../../../util/snarkdown'

import { AiFillRocket,AiOutlineSearch } from "react-icons/ai";
export default function SeccionMisionVision() {
  useEffect(()=>{
    obtenerinformacion();
  },[])
  const [informacionMision,setInformacionMision] = useState<any>()
  const [informacionVision,setInformacionVision] = useState<any>()

  const obtenerinformacion = async() =>{
    const respuestaMision = await axios.get('https://ueeschstrapi.onrender.com/api/informacions/1?[fields][0]=nombre&[fields][1]=contenido')
    setInformacionMision(respuestaMision.data.data.attributes)
    
    const respuestaVision = await axios.get('https://ueeschstrapi.onrender.com/api/informacions/2?[fields][0]=nombre&[fields][1]=contenido')
    setInformacionVision(respuestaVision.data.data.attributes)
    
  }
  return (
    <div className={style.MisionVision}>
      
      {
        informacionMision &&
        <div className={style.contenedorMision}>
      <div>
      <h4>{informacionMision.nombre}</h4>
      {/* <h4>Misión</h4> */}
      <AiFillRocket className={style.iconoMision}/></div>

      <div className={style.contenedor}>
      
        <div className={style.contenido}>
<p dangerouslySetInnerHTML={{__html:mdtoTML(informacionMision.contenido)}}/>
{/* <p>Brindar educación integral de calidad a niños, niñas y jóvenes con discapacidad auditiva, fomentando su desarrollo personal, intelectual, social y laboral, en un ambiente inclusivo y respetuoso de su diversidad, para que sean ciudadanos autónomos, críticos y comprometidos con la sociedad.</p> */}
<p></p>
        </div>
      </div>
      </div>
}

{informacionVision && 
  <div className={style.contenedorVision}>
      <div>
      <h4>{informacionVision.nombre}</h4>
      {/* <h4>Visión</h4> */}
      <AiOutlineSearch className={style.iconoVision}/>
      </div>
      <div className={style.contenedor}>
      
      
        <div className={style.contenido}>
        
          <p dangerouslySetInnerHTML={{__html:mdtoTML(informacionVision.contenido)}}/>
          {/* <p>Ser una institución educativa líder en la formación integral de personas con discapacidad auditiva, reconocida por su excelencia académica, innovación educativa y compromiso con la inclusión social, promoviendo su participación activa en el desarrollo del país.</p> */}
        
        </div>
      </div>
      </div>
}
    </div>
  );
}


// import React from "react";
// import style from "./MisionVision.module.css";
// import { useEffect,useState } from "react";
// import axios from "axios";

// import { AiFillRocket,AiOutlineSearch } from "react-icons/ai";
// export default function SeccionMisionVision() {
//   useEffect(()=>{
//     obtenerinformacion();
//   },[])
//   const [informacionMision,setInformacionMision] = useState<any>()
//   const [informacionVision,setInformacionVision] = useState<any>()

//   const obtenerinformacion = async() =>{
//     const respuestaMision = await axios.get('https://ueeschstrapi.onrender.com/api/informacions/1?[fields][0]=nombre&[fields][1]=contenido')
//     setInformacionMision(respuestaMision.data.data.attributes)
    
//     const respuestaVision = await axios.get('https://ueeschstrapi.onrender.com/api/informacions/2?[fields][0]=nombre&[fields][1]=contenido')
//     setInformacionVision(respuestaVision.data.data.attributes)
    
//   }
//   return (
//     <div className={style.MisionVision}>
      
//       {
//         informacionMision &&
//         <>
//       <div>
//       <h4>{informacionMision.nombre}</h4>
//       <AiFillRocket className={style.iconoMision}/></div>

//       <div className={style.contenedor}>
      
//         <div className={style.contenido}>
          
//           <p>
//             El Instituto de Sordos de Chimborazo atiende a niños, jóvenes en
//             habilitación, rehabilitación y educación inicial, básica,
//             bachillerato y primaria Popular en las especialidades de
//             Agropecuario Forestal, Manualidades y Artesanías, con una cobertura
//             al medio rural y urbano de la zona central del país, con programas
//             de Estimulación Temprana, Ambulatorio, Educación General Básica,
//             Colegio a Distancia, Talleres, Albergue para los niños del campo y
//             servicio de audiometrías a la comunidad.
//           </p>
//         </div>
//       </div>
//       </>
// }


//       <div>
//       <h4>VISION</h4>
//       <AiOutlineSearch className={style.iconoVision}/>
//       </div>
//       <div className={style.contenedor}>
      
      
//         <div className={style.contenido}>
          
//           <p>
//             Una institución de Educación Especial integral y eficiente para
//             personas Deficientes Auditivas basado en la habilitación y
//             rehabilitación de la Audición y Lenguaje, dinamizando los procesos
//             educativos orientados a la consecución de principios, fines y
//             objetivos de la Educación Regular y Especial en el contexto de la
//             expectativa de los requerimientos de la sociedad formando
//             estudiantes íntegros, autónomos, capaces de desenvolverse
//             eficientemente en su entorno.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
