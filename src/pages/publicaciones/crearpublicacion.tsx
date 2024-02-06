import FormularioPublicaciones from "@/componentes/layout/Formularios/FormularioPublicacionesQuill";
import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/Publicaciones/CrearPublicacion.module.css";

export default function CrearPublicacion({
  usuarioCookie,
  setUsuarioCookie,
}: any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
        <div className={estilos.contenedorCrearPublicacion}>
          <FormularioPublicaciones usuarioCookie={usuarioCookie} />
        </div>
      
    </Layout>
  );
}
