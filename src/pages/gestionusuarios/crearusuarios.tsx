import axios, { AxiosError } from "axios";
import { useState, useRef } from "react";
import styles from "../../styles/pestañas/Usuarios/CrearUsuarios.module.css";
import MensajeError from "../../componentes/mensajes/MensajeError/MensajeError";
import MensajeCargando from "../../componentes/mensajes/MensajeCargando/MensajeCargando";
import MensajeExito from "../../componentes/mensajes/MensajeExito/MensajeExito";
import Layout from "@/componentes/layout/Layout";
import { AiOutlineClose } from "react-icons/ai";

export default function CrearUsuarios({
  usuarioCookie,
  setUsuarioCookie,
  moodle
}: any) {
  //  const [createpassword, setCreatepassword] = useState(false);
  const [indexU, setIndex] = useState(1);
  const [usuarios, setUsuarios] = useState([
    {
      //id_moodle: idMoodle,
      //cedula_usuario: '',
      //nombre_usuario: '',
      //apellido_usuario: '',
      //email_usuario: '',
      index_usuario: 1,
      id_rol: 4,
      cedula_usuario: "",
      //password : '',
      nombre_usuario: "",
      apellido_usuario: "",
      email_usuario: "",
      //[username]
      //[password]
      //[firstname]
      //[lastname]
      //[email]
    },
  ]);

  ////////////////////////////////////////////////////////////////////////
  const [mensajeErrorEstado, setMensajeErrorEstado] = useState({
    estado: false,
    titulo: "",
    informacion: "",
  });
  const [mensajeCargando, setMensajeCargando] = useState<any>({
    estado: false,
    mensaje: "",
  });

  const [mensajeExito, setMensajeExito] = useState<any>({
    estado: false,
    mensaje: "",
  });
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  ////////////////////////////////////////////////////////////////////////

  const escucharCambio = (e: any, index: number) => {
    const nuevosUsuarios: any = [...usuarios];
    nuevosUsuarios[index][e.target.name] = e.target.value;
    setUsuarios(nuevosUsuarios);
  };

  const agregarUsuario = () => {
    //setUsuarios([...usuarios, { id_moodle: idMoodle, cedula_usuario: '', nombre_usuario: '', apellido_usuario: '', email_usuario_usuario: '', password_usuario: '', password_usuario_confirmar: '' }]);

    const index = indexU + 1;
    setIndex(index);
    setUsuarios([
      ...usuarios,
      {
        index_usuario: index,
        id_rol: 4,
        cedula_usuario: "",
        nombre_usuario: "",
        apellido_usuario: "",
        email_usuario: "",
      },
    ]);
  };

  const eliminarUsuario = (index: number) => {
    if (usuarios.length === 1) return;
    const nuevosUsuarios = [...usuarios];
    nuevosUsuarios.splice(index, 1);
    setUsuarios(nuevosUsuarios);
  };

  const limpiarCampos = () => {
    setIndex(1);

    setUsuarios([
      {
        index_usuario: 1,
        id_rol: 4,
        cedula_usuario: "",
        nombre_usuario: "",
        apellido_usuario: "",
        email_usuario: "",
      },
    ]);
  };

  const envioDatos = async (e: any) => {
    e.preventDefault();

    try {
      setMensajeCargando({
        estado: true,
        mensaje: "Registrando usuarios, esto puede llevar un momento...",
      });

      await axios.post("/api/usuarios", { usuariosAmbosSistemas: usuarios });

      //limpiarCampos();
      setMensajeExito({
        estado: true,
        mensaje: "Los usuarios fueron registrados exitosamente",
      });
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      const errorMensaje: any = (error as AxiosError).response?.data;
      setMensajeCargando({
        estado: false,
        mensaje: "",
      });
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      setMensajeErrorEstado({
        estado: true,
        titulo: "Error",
        informacion: errorMensaje.mensaje,
      });

      timeoutId.current = setTimeout(() => {
        setMensajeErrorEstado({
          estado: false,
          titulo: "",
          informacion: "",
        });
      }, 3000);
    } finally {
      setTimeout(() => {
        setMensajeExito({
          estado: false,
          mensaje: "",
        });
      }, 3000);

      setTimeout(() => {
        setMensajeCargando({
          estado: false,
          mensaje: "",
        });
      }, 3000);
    }
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={styles.contenedorPrincipalCrearUsuario}>
        <MensajeCargando
          informacion={mensajeCargando.mensaje}
          estado={mensajeCargando.estado}
        />
        <MensajeExito
          informacion={mensajeExito.mensaje}
          estado={mensajeExito.estado}
        />
        <MensajeError
          estado={mensajeErrorEstado.estado}
          titulo={mensajeErrorEstado.titulo}
          informacion={mensajeErrorEstado.informacion}
        />

        <form className={styles.formulario} onSubmit={envioDatos}>
          <div className={styles.informacionRegistro} id="presentacion">
            <h2>Agregar usuarios</h2>

            <div className={styles.contenedorInformacionRoles}>
              <h4>Roles en el Sistema:</h4>
              {/* <ul>
                {usuarioCookie && usuarioCookie.rol === 1 && (
                  <li>
                    <span>Administradores:</span> Asociados al número 2. Tiene
                    un nivel elevado de acceso al sistema y puede realizar
                    configuraciones, gestionar usuarios, y administrar todas las
                    funcionalidades del sistema, pero con ciertas restricciones.
                  </li>
                )}
                <li>
                  <span>Docentes:</span> Asociados al número 3. Tienen acceso al
                  seguimiento del curso y al seguimiento de sus estudiantes en
                  los cursos que imparten. También pueden realizar publicaciones
                  en el sistema.
                </li>
                <li>
                  <span>Estudiantes:</span> Asociados al número 4. Pueden
                  revisar su propio seguimiento actual de los cursos que están
                  cursando.
                </li>
                <li>
                  <span>Representantes:</span> Asociados al número 5.
                  Responsables de estudiantes menores de edad, con acceso al
                  seguimiento de los cursos de sus hijos.
                </li>
              </ul> */}
<ul>
                {usuarioCookie && usuarioCookie.rol === 1 && (
                  <li>
                    <span>Administradores:</span> Asociados al número 2
                  </li>
                )}
                <li>
                  <span>Docentes:</span> Asociados al número 3
                </li>
                <li>
                  <span>Estudiantes:</span> Asociados al número 4
                </li>
                <li>
                  <span>Representantes:</span> Asociados al número 5
                </li>
              </ul>

              <div className={styles.contenedorPInf}>
                <p className={styles.pInf}>
                  Los usuarios con roles de estudiante y docente serán creados
                  en Moodle para acceder a las funciones educativas adicionales.
                </p>
              </div>
            </div>

            <div className={styles.botonesRadio}>
              <p>
                Para todos los usuarios agregados, la contraseña
                predeterminada será su número de cédula.
              </p>
            </div>
          </div>

          <div className={styles.formulariocampos}>
            <div className={styles.opciones} id="opciones">
              <div className={styles.contenedorbtn}>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={agregarUsuario}
                >
                  Agregar Usuario
                </button>
                <button
                  type="submit"
                  className={styles.btn}
                  name="submitbutton"
                  id="id_submitbutton"
                >
                  Registrar usuarios
                </button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Rol</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Cédula</th>
                  <th>Email</th>
                  {/* <th>Contraseña</th>
                <th>Confirmar Contraseña</th> */}
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={index}>
                    <td className={styles.contendorNumeroEstudiante}>
                      {index + 1}
                    </td>
                    <td className={styles.contendorNumeroRoles}>
                      {usuarioCookie && usuarioCookie.rol !== 1 ? (
                        <input
                          type="number"
                          name="id_rol"
                          value={usuario.id_rol}
                          onChange={(e) => escucharCambio(e, index)}
                          min="3"
                          max="5"
                        />
                      ) : (
                        <input
                          type="number"
                          name="id_rol"
                          value={usuario.id_rol}
                          onChange={(e) => escucharCambio(e, index)}
                          min="2"
                          max="5"
                        />
                      )}
                    </td>

                    <td>
                      <input
                        type="text"
                        name="nombre_usuario"
                        value={usuario.nombre_usuario}
                        onChange={(e) => escucharCambio(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="apellido_usuario"
                        value={usuario.apellido_usuario}
                        onChange={(e) => escucharCambio(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="cedula_usuario"
                        value={usuario.cedula_usuario}
                        onChange={(e) => escucharCambio(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="email"
                        name="email_usuario"
                        value={usuario.email_usuario}
                        onChange={(e) => escucharCambio(e, index)}
                      />
                    </td>
                    {/* <td>
                    <input type="password" name="password_usuario" value={usuario.password_usuario} onChange={(e) => escucharCambio(e, index)} />
                  </td>
                  <td>
                    <input type="password" name="password_usuario_confirmar" value={usuario.password_usuario_confirmar} onChange={(e) => escucharCambio(e, index)} />
                  </td> */}
                    <td>
                      <button
                        type="button"
                        onClick={() => eliminarUsuario(index)}
                      >
                        <AiOutlineClose />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </Layout>
  );
}
