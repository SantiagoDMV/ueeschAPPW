import estilos from "../styles/pestañas/Registro.module.css";
import Link from "next/link";
import Layout from "@/componentes/layout/Layout";
export default function registro({usuarioCookie,setUsuarioCookie, moodle}:any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contenedorRegistro}>
        <div className={estilos.contenedorPanelRegistro}>
        
          <div className={estilos.contenedorInformacionRegistro}>
            <h3>Unidad educativa especializada sordos de Chimborazo</h3>
            <p>¡Esperamos verte pronto en nuestro entorno educativo!</p>
          </div>
          <h4 className={estilos.tituloTipoRegistro}>¿Cómo deseas registrarte?</h4>
          
          <div className={estilos.contenedorRegistroOpcion}>
            
              <Link className={estilos.opcionesEP} href={"/registromiembros"}>
              Como Estudiante/Docente
              </Link>
          </div>

          <div className={estilos.contenedorRegistroOpcion}>
            <Link href={"/registropadres"}>Como Padre de Familia</Link>
          </div>

          

          <Link className={estilos.botonLogin} href={"/login"}>
            Ya tengo una cuenta
          </Link>
        </div>
      </div>
    </Layout>
  );
}
