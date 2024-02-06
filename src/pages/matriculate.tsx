import Layout from "@/componentes/layout/Layout"
import estilos from '../styles/pestañas/Matriculate.module.css'
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function Matriculate({usuarioCookie,setUsuarioCookie}:any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
    <div className={estilos.contenedorMatriculacion}>
        
        <div className={estilos.contenedorRequisitos}>
            <div className={estilos.contenedorRequisitosIzquierda}>
                <p>Facilita tu ingreso aportando la documentación necesaria para el proceso de matriculación</p>
            </div>
            <div className={estilos.contenedorRequisitosDerecha}>
                <ul>
                    <li>Copia de la cédula de identidad del estudiante y del representante legal.</li>
                    <li>Certificado de discapacidad auditiva emitido por el Ministerio de Salud Pública.</li>
                    <li>Certificado de escolaridad del año anterior.</li>
                    <li>2 fotografías tamaño carnet del estudiante.</li>
                    <li>Carpeta manila tamaño oficio.</li>
                </ul>

                
            </div>

            
        </div>
        <div className={estilos.contenedorMasInformacion}>
            <div>
        <AiOutlineQuestionCircle className={estilos.iconoInformacion}/>        
        <p>Si tienes alguna pregunta o necesitas más detalles sobre los requisitos de matriculación, no dudes en
              ponerte en contacto con nuestro equipo de admisiones. Estamos aquí para ayudarte en cada paso del proceso.
            </p>
            </div>
        </div>
    </div>
    </Layout>
  )
}
