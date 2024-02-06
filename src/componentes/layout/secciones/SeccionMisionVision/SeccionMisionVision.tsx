import React from "react";
import style from "./MisionVision.module.css";

import { AiFillRocket,AiOutlineSearch } from "react-icons/ai";
export default function SeccionMisionVision() {
  return (
    <div className={style.MisionVision}>
      
      <div>
      <h4>MISION</h4>
      <AiFillRocket className={style.iconoMision}/></div>

      <div className={style.contenedor}>
      
        <div className={style.contenido}>
          
          <p>
            El Instituto de Sordos de Chimborazo atiende a niños, jóvenes en
            habilitación, rehabilitación y educación inicial, básica,
            bachillerato y primaria Popular en las especialidades de
            Agropecuario Forestal, Manualidades y Artesanías, con una cobertura
            al medio rural y urbano de la zona central del país, con programas
            de Estimulación Temprana, Ambulatorio, Educación General Básica,
            Colegio a Distancia, Talleres, Albergue para los niños del campo y
            servicio de audiometrías a la comunidad.
          </p>
        </div>
      </div>
      <div>
      <h4>VISION</h4>
      <AiOutlineSearch className={style.iconoVision}/>
      </div>
      <div className={style.contenedor}>
      
      
        <div className={style.contenido}>
          
          <p>
            Una institución de Educación Especial integral y eficiente para
            personas Deficientes Auditivas basado en la habilitación y
            rehabilitación de la Audición y Lenguaje, dinamizando los procesos
            educativos orientados a la consecución de principios, fines y
            objetivos de la Educación Regular y Especial en el contexto de la
            expectativa de los requerimientos de la sociedad formando
            estudiantes íntegros, autónomos, capaces de desenvolverse
            eficientemente en su entorno.
          </p>
        </div>
      </div>
    </div>
  );
}
