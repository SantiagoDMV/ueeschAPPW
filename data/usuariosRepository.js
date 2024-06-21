const pool = require('./conexion/db');

async function obtenerUsuarios() {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE eliminado_en IS NULL ORDER BY id_rol ASC, apellido_usuario ASC;"
    );
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function obtenerUsuarioInformacion(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE id_usuario = ?;",
      [id]
    );
    return rows[0]; // Assuming id is unique, return the first row
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function obtenerUsuariosAdmin() {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario ORDER BY id_rol ASC, apellido_usuario ASC;"
    );
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuarioEmail(email) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE email_usuario = ?;",
      [email]
    );
    return rows[0]; // Assuming email is unique, return the first row
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuarioEmailNoEliminados(email) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE email_usuario = ? AND eliminado_en IS NULL;",
      [email]
    );
    return rows[0]; // Assuming email is unique, return the first row
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuarioId(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE id_usuario = ?;",
      [id]
    );
    return rows[0]; // Assuming id is unique, return the first row
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuarioCedula(cedula) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE cedula_usuario = ?;",
      [cedula]
    );
    return rows[0]; // Assuming cedula is unique, return the first row
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuarioIdRol(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE id_rol = ?;",
      [id]
    );
    return rows; // Return all rows matching id_rol
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuarioIdMoodleEstudiante(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE id_moodle = ? AND id_rol = 3;",
      [id]
    );
    return rows[0]; // Assuming id_moodle for student is unique, return the first row
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuariosEmailCedula(email, cedula) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE email_usuario = ? OR cedula_usuario = ?;",
      [email, cedula]
    );
    return rows; // Return all rows matching email or cedula
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuariosPorEmailYCedula(emails, cedulas) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE email_usuario IN (?) OR cedula_usuario IN (?);",
      [emails, cedulas]
    );
    return rows; // Return all rows matching emails or cedulas
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function buscarUsuarioEmailCedula(email, cedula) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE email_usuario = ? OR cedula_usuario = ?;",
      [email, cedula]
    );
    return rows[0]; // Assuming email or cedula is unique, return the first row
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function crearUsuarioAmbos(idMoodle, hashingPassw, rol_usuario, nombre_usuario, apellido_usuario, cedula_usuario, email_usuario) {
  let connection;
  try {
    connection = await pool.getConnection();
    const imagen_usuario = `${process.env.IMAGEN_PREDT_USER}`;
    const idRol = parseInt(rol_usuario);

    await connection.query("INSERT INTO usuario (id_rol, nombre_usuario, apellido_usuario, cedula_usuario, email_usuario, imagen_usuario, password_usuario, ultimo_acceso, actualizado_en, eliminado_en, id_moodle) VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL, ?)",
      [idRol, nombre_usuario, apellido_usuario, cedula_usuario, email_usuario, imagen_usuario, hashingPassw, idMoodle === -1 ? null : idMoodle]);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function crearUsuario(hashingPassw, idRol, userData) {
  let connection;
  try {
    connection = await pool.getConnection();
    const imagen_usuario = `${process.env.IMAGEN_PREDT_USER}`;
    const fecha_actual = new Date();

    await connection.query("INSERT INTO usuario (id_rol, nombre_usuario, apellido_usuario, cedula_usuario, email_usuario, imagen_usuario, password_usuario, ultimo_acceso, actualizado_en, eliminado_en) VALUES (?, ?, ?, ?, ?, ?, ?, NULL, NULL, NULL)",
      [idRol, userData.nombre_usuario, userData.apellido_usuario, userData.cedula_usuario, userData.email_usuario, imagen_usuario, hashingPassw]);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function importarUsuariosMoodle(usuariosAModificar, usuariosLocales) {
  let connection;
  try {
    connection = await pool.getConnection();
    const imagen_usuario = `${process.env.IMAGEN_PREDT_USER}`;
    const fecha_actual = new Date();

    const updates = [];
    const creates = [];

    for (const usuarioMoodle of usuariosAModificar) {
      const usuarioLocal = usuariosLocales.find(
        (u) => u.email_usuario === usuarioMoodle.email
      );

      if (usuarioLocal) {
        if (
          (usuarioLocal.id_rol !== 1 && usuarioLocal.id_rol !== 2) &&
          (usuarioLocal.id_moodle !== usuarioMoodle.id ||
            usuarioLocal.nombre_usuario !== usuarioMoodle.firstname ||
            usuarioLocal.apellido_usuario !== usuarioMoodle.lastname)
        ) {
          updates.push([
            usuarioMoodle.id,
            usuarioMoodle.firstname,
            usuarioMoodle.lastname,
            usuarioMoodle.email
          ]);
        }
      } else {
        creates.push([
          4,
          usuarioMoodle.firstname,
          usuarioMoodle.lastname,
          usuarioMoodle.email,
          imagen_usuario,
          null,
          null,
          null
        ]);
      }
    }

    if (updates.length > 0) {
      await Promise.all(
        updates.map(([id, firstname, lastname, email]) =>
          connection.query("UPDATE usuario SET id_moodle = ?, nombre_usuario = ?, apellido_usuario = ? WHERE email_usuario = ?",
            [id, firstname, lastname, email])
        )
      );
    }

    if (creates.length > 0) {
      await Promise.all(
        creates.map(([id_rol, nombre_usuario, apellido_usuario, email_usuario, imagen_usuario, ultimo_acceso, cedula_usuario, password_usuario]) =>
          connection.query("INSERT INTO usuario (id_rol, nombre_usuario, apellido_usuario, email_usuario, imagen_usuario, ultimo_acceso, cedula_usuario, password_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [id_rol, nombre_usuario, apellido_usuario, email_usuario, imagen_usuario, ultimo_acceso, cedula_usuario, password_usuario])
        )
      );
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function importarUsuariosMoodleEliminar(usuariosEliminar) {
  let connection;
  try {
    connection = await pool.getConnection();
    const emailsEliminar = usuariosEliminar.map((usuarioLocal) => usuarioLocal.email_usuario);

    if (emailsEliminar.length > 0) {
      await connection.query("DELETE FROM usuario WHERE email_usuario IN (?)",
        [emailsEliminar]
      );
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function actualizarIdMoodle(id_moodle, email) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query("UPDATE usuario SET id_moodle = ? WHERE email_usuario = ?",
      [id_moodle, email]
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function actualizarUsuarioPassword(id_rol, cedula_usuario, email, password_usuario) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query("UPDATE usuario SET id_rol = ?, cedula_usuario = ?, password_usuario = ? WHERE email_usuario = ?",
      [id_rol, cedula_usuario, password_usuario, email]
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function actualizarUsuario(emailActual, rol, cedula, email, nombre, apellido, hashingPassw) {
  let connection;
  try {
    connection = await pool.getConnection();
    const fecha_actual = new Date();
    if (!hashingPassw) {
      await connection.query("UPDATE usuario SET id_rol = ?, email_usuario = ?, nombre_usuario = ?, apellido_usuario = ?, cedula_usuario = ?, actualizado_en = ? WHERE email_usuario = ?",
        [rol, email, nombre, apellido, cedula, fecha_actual, emailActual]
      );
    } else {
      await connection.query("UPDATE usuario SET id_rol = ?, email_usuario = ?, nombre_usuario = ?, apellido_usuario = ?, cedula_usuario = ?, actualizado_en = ?, password_usuario = ? WHERE email_usuario = ?",
        [rol, email, nombre, apellido, cedula, fecha_actual, hashingPassw, emailActual]
      );
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function eliminacionLogicaPorIdMoodle(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const fechaActual = new Date();
    const fechaActualLocal = new Date(
      fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
    );

    await connection.query("UPDATE usuario SET eliminado_en = ? WHERE id_usuario = ?",
      [fechaActualLocal, id]
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function eliminarUsuario(userIds) {
  let connection;
  try {
    connection = await pool.getConnection();
    const fechaActual = new Date();
    const fechaActualLocal = new Date(
      fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
    );
    const userIDS = userIds.map(userId => parseInt(userId, 10));

    await connection.query("UPDATE usuario SET eliminado_en = ? WHERE id_usuario IN (?)",
      [fechaActualLocal, userIDS]
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function cambiarContraseña(email, passw) {
  let connection;
  try {
    connection = await pool.getConnection();
    const fechaActual = new Date();
    const fechaActualLocal = new Date(
      fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
    );

    await connection.query("UPDATE usuario SET password_usuario = ?, actualizado_en = ? WHERE email_usuario = ?",
      [passw, fechaActualLocal, email]
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function actualizarImagenUsuario(idUser, imagen) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query("UPDATE usuario SET imagen_usuario = ? WHERE id_usuario = ?",
      [imagen, idUser]
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function actualizarFechaEliminacion(idUser) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query("UPDATE usuario SET eliminado_en = NULL WHERE id_usuario = ?",
      [idUser]
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function actualizarUltimoAcceso(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const fechaActual = new Date();
    const fechaActualLocal = new Date(
      fechaActual.getTime() - fechaActual.getTimezoneOffset() * 60000
    );

    await connection.query("UPDATE usuario SET ultimo_acceso = ? WHERE id_usuario = ?",
      [fechaActualLocal, id]
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

async function obtenerCuentasVinculadas(id) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM usuario WHERE id_moodle = ?;",
      [id]
    );
    return rows;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioInformacion,
  obtenerUsuariosAdmin,
  buscarUsuarioEmail,
  buscarUsuarioEmailNoEliminados,
  buscarUsuarioId,
  buscarUsuarioCedula,
  buscarUsuarioIdRol,
  buscarUsuarioIdMoodleEstudiante,
  buscarUsuariosEmailCedula,
  buscarUsuariosPorEmailYCedula,
  buscarUsuarioEmailCedula,
  crearUsuarioAmbos,
  crearUsuario,
  importarUsuariosMoodle,
  importarUsuariosMoodleEliminar,
  actualizarIdMoodle,
  actualizarUsuarioPassword,
  actualizarUsuario,
  eliminacionLogicaPorIdMoodle,
  eliminarUsuario,
  cambiarContraseña,
  actualizarImagenUsuario,
  actualizarFechaEliminacion,
  actualizarUltimoAcceso,
  obtenerCuentasVinculadas
};
