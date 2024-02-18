import estilos from "../../estilos/Secciones/OpcionesAdministracion.module.css";
import gestionMoodle from "../../../../public/imagenes/administracion/seguimientoAcademico.jpg";
import gestionUsuarios from "../../../../public/imagenes/administracion/gestionUsuarios.jpg";
import gestionPublicaciones from "../../../../public/imagenes/administracion/gestionPublicaciones.jpg";
import Image from "next/image";
export default function OpcionesAdministracion() {
  return (
    <>
      <div className={estilos.contenedorAdministracion}>
        <div className={estilos.contenedorAdministracionOpciones}>
          <div className={estilos.opcionAdministracion}>
            <div className={estilos.opcionAdministracionIzquierda}>
              <div
                className={
                  estilos.opcionAdministracionIzquierdaContenedorImagen
                }
                onClick={() => (window.location.href = `/gestionusuarios`)}
              >
                <Image
                  className={estilos.imgGestion}
                  src={gestionUsuarios}
                  alt="imgGestionUsusarios"
                    layout="responsive"
                />
              </div>
            </div>
            <div
              className={estilos.opcionAdministracionDerecha}
              onClick={() => (window.location.href = `/gestionusuarios`)}
            >
              <h3>Gestionar usuarios del sitio</h3>
              <p>
                Este panel se centra en la administración de usuarios dentro de
                la aplicación. Puede incluir funcionalidades como la creación de
                nuevos usuarios, la gestión de roles y permisos, y la capacidad
                de realizar cambios en la información de la cuenta.
              </p>
            </div>
          </div>

          <div className={estilos.opcionAdministracion}>
            <div className={estilos.opcionAdministracionIzquierda}>
              <div
                className={
                  estilos.opcionAdministracionIzquierdaContenedorImagen
                }
                onClick={() => (window.location.href = `/publicaciones-servicios`)}
              >
                <Image
                  className={estilos.imgGestion}
                  src={gestionPublicaciones}
                  alt="imgGestionPublicaciones"
                  layout="responsive"
                />
              </div>
            </div>
            <div
              className={estilos.opcionAdministracionDerecha}
              onClick={() => (window.location.href = `/publicaciones-servicios`)}
            >
              <h3>Publicaciones y servicios</h3>
              <p>
                El panel de publicaciones y servicios se ocupa de las funciones
                relacionadas con el contenido que se comparte en la aplicación.
                Esto podría incluir la creación, edición y eliminación de
                publicaciones.
              </p>
            </div>
          </div>
          <div className={estilos.opcionAdministracion}>
            <div className={estilos.opcionAdministracionIzquierda}>
              <div
                className={
                  estilos.opcionAdministracionIzquierdaContenedorImagen
                }
                onClick={() =>
                    (window.location.href = `/seguimiento`)
                  }
              >
                <Image
                  className={estilos.imgGestion}
                  src={gestionMoodle}
                  alt="imgGestionMoodle"
                  layout="responsive"
                />
              </div>
            </div>
            <div
              className={estilos.opcionAdministracionDerecha}
              onClick={() => (window.location.href = `/seguimiento`)}
            >
              <h3>Control Semestral de Estudiantes (MOODLE)</h3>
              <p>
                El panel Control Semestral de Estudiantes está diseñado para proporcionar una visión integral y eficiente del progreso académico de los estudiantes durante el semestre en curso. Este sistema facilita la gestión de información clave, como registros de notas, asistencia, comunicación y más, sin centrarse en una estructura académica tradicional. Su objetivo es brindar una plataforma intuitiva y ágil para estudiantes y profesores, mejorando la experiencia educativa y simplificando la administración del semestre.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
