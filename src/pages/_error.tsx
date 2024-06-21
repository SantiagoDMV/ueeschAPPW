import React from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "../styles/pestañas/ErrorPage.module.css";
import Layout from "@/componentes/layout/Layout";

const Error = ({ statusCode, usuarioCookie, setUsuarioCookie, error, moodle }: any) => {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={styles.contenedorError}>
        <div className={styles.contenedorInformacionEstado}>
          <h1>Error {statusCode}</h1>
          <AiOutlineExclamationCircle size={48} color="#FF0000" />
        </div>
        <div className={styles.contenedorInformacion}>
          <h4>Unidad educativa especializada sordos de Chimborazo</h4>
          <p>
            Lo sentimos, pero la página que estás buscando en la Unidad
            Educativa Especializada Sordos de Chimborazo no ha sido
            encontrada. Puede ser que la dirección sea incorrecta o que la
            página haya sido eliminada. Te recomendamos verificar la URL o
            regresar a la página de inicio. Si el problema persiste, por favor,
            ponte en contacto con el administrador del sitio para obtener
            asistencia.
          </p>
          {error && (
            <div className={styles.errorDetails}>
              <h3>Detalles del error:</h3>
              <p>{error.message}</p>
              <pre>{error.stack}</pre>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, error: err };
};

export default Error;
