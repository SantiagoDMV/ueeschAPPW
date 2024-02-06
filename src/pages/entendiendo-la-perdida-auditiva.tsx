import estilos from "../styles/pestañas/Perdidaauditiva.module.css";
import Layout from "@/componentes/layout/Layout";

export default function Entendiendo({ usuarioCookie, setUsuarioCookie }: any) {
  const causas = [
    { titulo: "Factores genéticos" },
    { titulo: "Infecciones" },
    { titulo: "Lesiones" },
    { titulo: "Exposición al ruido excesivo" },
    { titulo: "Envejecimiento" },
  ];
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      <div className={estilos.contenedorHistoria}>
        <div className={estilos.contenedorImagen}></div>
        <div className={estilos.contenedorPresentacion}>
          <h2>Entendiendo la perdida auditiva</h2>
          <p>
            La pérdida auditiva se refiere a la disminución en la capacidad de
            percibir sonidos, ya sea total o parcialmente. Este fenómeno puede
            manifestarse de diversas formas, afectando la habilidad de una
            persona para escuchar sonidos suaves, entender conversaciones o
            percibir frecuencias específicas. Las causas de la pérdida auditiva
            son variadas e incluyen factores genéticos, exposición al ruido,
            infecciones, lesiones y el proceso natural de envejecimiento. Es
            crucial abordar la pérdida auditiva de manera temprana, buscando
            intervenciones adecuadas, como el uso de audífonos, implantes
            cocleares y estrategias educativas, para mejorar la calidad de vida
            y facilitar la participación plena en la sociedad.
          </p>



          <div className={estilos.contenedorListas}>
          <h2>Causas Comunes de Pérdida Auditiva:</h2>
          <ul>
            <li>Factores genéticos.</li>
            <li>Infecciones del oído.</li>
            <li>Lesiones traumáticas.</li>
            <li>Exposición prolongada a niveles altos de ruido.</li>
            <li>Proceso natural de envejecimiento.</li>
          </ul>

          <h2>Tipos y Grados de Pérdida Auditiva:</h2>
          <ul>
            <li>Leve: Dificultad para escuchar sonidos suaves.</li>
            <li>Moderada: Dificultad para entender conversaciones.</li>
            <li>Severa: Dificultad para percibir frecuencias específicas.</li>
            <li>Profunda: Ausencia total de percepción auditiva.</li>
          </ul>

          <h2>Importancia de la Detección Temprana:</h2>
          <ul>
            <li>
              Facilita intervenciones adecuadas para minimizar el impacto.
            </li>
            <li>Permite buscar atención médica oportuna.</li>
          </ul>
        </div>

        <div className={estilos.contenedorPerdida}>
          <iframe
            className={estilos.video}
            src="https://www.youtube.com/embed/Ag-16MTo4Nw"
            title="YouTube video player"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>


        </div>
      </div>
    </Layout>
  );
}
