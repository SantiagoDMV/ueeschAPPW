import estilos from "../styles/pestañas/Perdidaauditiva.module.css";
import Layout from "@/componentes/layout/Layout";

export default function Aprendizaje({ usuarioCookie, setUsuarioCookie }: any) {
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
          <h2>Aprendizaje del Lenguaje de Señas</h2>

          <div className={estilos.contenedorPerdida}>
          <iframe
          className={estilos.video}
              width="766"
              height="431"
              src="https://www.youtube.com/embed/Twcjc6yEx9U"
              title="👋Acuérdate de... Día Internacional de las lenguas de señas"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
            
          </div>
          
          <p>
            En la Unidad Educativa Especializada para Sordos de Chimborazo,
            reconocemos el valor del lenguaje de señas como una forma poderosa
            de comunicación. Aprender este lenguaje no solo facilita la
            interacción entre estudiantes y educadores, sino que también
            fortalece los vínculos familiares. El aprendizaje del lenguaje de
            señas es una habilidad valiosa y significativa, especialmente para
            aquellos que tienen familiares con pérdida de audición o que forman
            parte de comunidades sordas. Aquí hay algunos puntos clave sobre el
            aprendizaje del lenguaje de señas:
          </p>

          <div className={estilos.contenedorListas}>
            <h2>Comunicación Inclusiva:</h2>
            <p>El lenguaje de señas es una forma completa y legítima de comunicación que permite a las personas sordas expresar pensamientos, emociones y conceptos de manera efectiva.</p>

            <h2>Conexión Familiar:</h2>
            <p>Aprender el lenguaje de señas fortalece los lazos familiares al permitir una comunicación más directa y una comprensión más profunda entre los miembros de la familia y aquellos con pérdida de audición.</p>

            <h2>Inclusión Social:</h2>
            <p>El dominio del lenguaje de señas facilita la inclusión en la sociedad y en comunidades sordas. Proporciona a las personas sordas la capacidad de participar plenamente en conversaciones y actividades sociales.</p>

            
          </div>

       
        </div>
      </div>
    </Layout>
  );
}
