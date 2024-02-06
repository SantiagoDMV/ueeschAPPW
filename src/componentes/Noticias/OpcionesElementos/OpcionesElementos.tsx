import { iconoCerrarBasico,iconoBasuraBasico } from "@/constantes/iconos";
import {AiOutlineFontColors} from 'react-icons/ai'
import estilos from './OpcionesElementos.module.css'
import { rejects } from "assert";

export default function OpcionesElementos({x,y,eleccion,eleccionEscogida}:any) {
    const estilosPosicion={
        top: y,
        left: x
    }


    const eleccionN = async ()=>{
      console.log("X")
      await eleccion(1)
      console.log(eleccionEscogida)
    }
  return (
    <div className={estilos.contenedorOpciones}
    style={estilosPosicion}>
        <span className={estilos.iconoCerrar}  onClick={()=>eleccionN()}>{iconoCerrarBasico}</span>
        <span className={estilos.iconoCerrar}  onClick={()=>{eleccion(2)}}><AiOutlineFontColors/></span>
        <span className={estilos.iconoEliminar} onClick={()=>{eleccion(3)}}>{iconoBasuraBasico}</span>
        <input type="color" name="" id="" />
    </div>
  )
}
