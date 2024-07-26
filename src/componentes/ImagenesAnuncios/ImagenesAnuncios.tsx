import style from './PublicacionMomentos.module.css'
import Image from 'next/image'
import { useState } from 'react';
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";

export default function CarruselImgenes({ multimedia, idPublicacion, index }: any) {

  const multimediaFiltrado = multimedia.filter((e: any) => e.id_publicacion === idPublicacion);

  
  const [indexI,setIndexI] = useState(0)

  const cambioImagenAumento =()=>{

    console.log(multimediaFiltrado[indexI])
    if(indexI === multimediaFiltrado.length - 1){
    setIndexI(0)
    return
    }
    setIndexI(indexI + 1)
  }
  
  const cambioImagenAtras =()=>{
    console.log(indexI)
    if(indexI === 0){
      setIndexI(multimediaFiltrado.length -1)
      return
    }
    setIndexI(indexI-1)
  }
  return (
    <>
      <div key={index} className={style.estiloContenedor}>

{
  multimediaFiltrado && multimediaFiltrado.length !== 0 && multimediaFiltrado.length > 1 ? (
    <>
      {multimediaFiltrado[indexI].id_tipo_multimedia === 1 ? (
        <Image
          className={style.imagenPublicacion}
          alt={`imagen_${multimediaFiltrado[indexI]?.id_publicacion}_${multimediaFiltrado[indexI]?.ruta_multimedia}`}
          fill
          src={multimediaFiltrado[indexI]?.ruta_multimedia}
        />
      ) : multimediaFiltrado[indexI].id_tipo_multimedia === 2 ? (
        <video
          src={multimediaFiltrado[indexI]?.ruta_multimedia}
          controls
          className={style.imagenPublicacion}
        ></video>
      ) : null}
      <div className={style.botonesCarrusel}>
        <span onClick={() => cambioImagenAtras()}>
          <AiFillCaretLeft className={style.boton} />
        </span>
        <span onClick={() => cambioImagenAumento()}>
          <AiFillCaretRight className={style.boton} />
        </span>
      </div>
    </>
  ) : multimediaFiltrado.length === 1 ? (
    <>
      {multimediaFiltrado[0].id_tipo_multimedia === 1 ? (
        <Image
          alt={`imagen_${multimediaFiltrado[0]?.id_publicacion}_${multimediaFiltrado[0]?.ruta_multimedia}`}
          fill
          src={multimediaFiltrado[0]?.ruta_multimedia}
        />
      ) : multimediaFiltrado[0].id_tipo_multimedia === 2 ? (
        <video
          src={multimediaFiltrado[0]?.ruta_multimedia}
          controls
          className={style.imagenPublicacion}
        ></video>
      ) : null}
    </>
  ) : (
    <>
      <br />
      <br />
      <br />
    </>
  )
}


      </div>
    </>
  );
}




// import style from './estilos/Pestañas/PublicacionMomentos.module.css'
// import Image from 'next/image'
// import { useState } from 'react';
// import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";

// export default function CarruselImgenes({ multimedia, idPublicacion, index }: any) {
//   console.log(multimedia)
//   const multimediaFiltrado = multimedia.filter((e: any) => e.id_publicacion === idPublicacion);
//   console.log(multimediaFiltrado)

//   const [indexI,setIndexI] = useState(0)

//   const cambioImagenAumento =()=>{

//     console.log(multimediaFiltrado[indexI])
//     if(indexI === multimediaFiltrado.length - 1){
//     setIndexI(0)
//     return
//     }
//     setIndexI(indexI + 1)
//   }
  
//   const cambioImagenAtras =()=>{
//     console.log(indexI)
//     if(indexI === 0){
//       setIndexI(multimediaFiltrado.length -1)
//       return
//     }
//     setIndexI(indexI-1)
//   }
//   return (
//     <>
//       <div key={index} className={style.estiloContenedor}>
        
//         {multimediaFiltrado.length > 1 ? (
//           <>
//           {
//             multimediaFiltrado[indexI].id_tipo_multimedia === 1 ?
//             <Image
//             className={style.imagenPublicacion}
//             alt={`imagen_${multimediaFiltrado[index].id_publicacion}_${multimediaFiltrado[index].id_multimedia}`}
//             fill
            
//             src={multimediaFiltrado[indexI].ruta_multimedia}
//           />: multimediaFiltrado[indexI].id_tipo_multimedia === 2 ?
//           <video src={multimediaFiltrado[indexI].ruta_multimedia}
//           controls
//           className={style.imagenPublicacion}
//           >
//           </video>
//           :
//           null
//             }
//           <div className={style.botonesCarrusel}>
//           <span  onClick={()=>cambioImagenAtras()} ><AiFillCaretLeft className={style.boton}/></span>
//           <span  onClick={()=>cambioImagenAumento()} ><AiFillCaretRight className={style.boton}/></span>
//           </div>
//           </>
          
//         ) : multimediaFiltrado.length === 1 ? (
//           <>
//           {
//             multimediaFiltrado[0].id_tipo_multimedia ===1 ?
//             <Image
//               //className={style.imagenPublicacion}
//               alt={`imagen_${multimediaFiltrado[0].id_publicacion}_${multimediaFiltrado[0].id_multimedia}`}
//               fill
//               src={multimediaFiltrado[0].ruta_multimedia}
//               />: multimediaFiltrado[index].id_tipo_multimedia === 2 ?
//               <video src={multimediaFiltrado[0].ruta_multimedia}
//               controls
//               className={style.imagenPublicacion}
//               >
//               </video>
//               :
//               null
//           }
//           </>  
//         ) : (
//           <>
//           <br />
//           <br />
//           <br />
//           </>
//         )}
//       </div>
//     </>
//   );
// }

