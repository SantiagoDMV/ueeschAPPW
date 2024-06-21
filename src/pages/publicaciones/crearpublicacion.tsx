import FormularioPublicaciones from "@/componentes/layout/Formularios/FormularioPublicacionesQuill";
import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/Publicaciones/CrearPublicacion.module.css";

export default function CrearPublicacion({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
        <div className={estilos.contenedorCrearPublicacion}>
          <FormularioPublicaciones usuarioCookie={usuarioCookie} />
        </div>
      
    </Layout>
  );
}
