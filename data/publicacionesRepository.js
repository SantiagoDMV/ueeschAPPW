const pool = require('./conexion/db');

async function mostrarPublicaciones() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion WHERE id_tipo_publicacion IN (2, 3) AND eliminado_en IS NULL ORDER BY id_publicacion DESC LIMIT 6;"
        );
        return { valor: true, mensaje: rows };
    } catch (error) {
        console.error(error);
        return { valor: false, mensaje: error };
    } finally {
        if (connection) connection.release();
    }
}

async function mostrarPublicacionesPerfil(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion WHERE id_usuario = ? AND eliminado_en IS NULL ORDER BY id_publicacion DESC;",
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

async function mostrarPublicacionesGestion() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion ORDER BY id_publicacion DESC, eliminado_en DESC;"
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function obtenerDetallesUsuariosGestion(idUsuarios) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT id_usuario, nombre_usuario, apellido_usuario, email_usuario FROM usuario WHERE id_usuario IN (?);",
            [idUsuarios]
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function mostrarAnuncios() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion WHERE id_tipo_publicacion = 2 AND eliminado_en IS NULL ORDER BY id_tipo_publicacion ASC;"
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function mostrarNoticias() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion WHERE id_tipo_publicacion = 3 AND eliminado_en IS NULL ORDER BY creado_en DESC;"
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function mostrarServicios() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion WHERE id_tipo_publicacion = 1 AND eliminado_en IS NULL ORDER BY id_publicacion DESC;"
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function mostrarServiciosUsuarioRegistrado(ids) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion WHERE id_tipo_publicacion = 1 AND eliminado_en IS NULL AND id_publicacion IN (?) ORDER BY id_publicacion DESC;",
            [ids.map(id => parseInt(id, 10))]
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function obtenerPublicacion(idPublicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [row] = await connection.query(
            "SELECT * FROM publicacion WHERE id_publicacion = ?;",
            [idPublicacion]
        );
        return row[0] || null;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function crearPublicacion(idUser, titulo, contenido, id_tipo_publicacion, fecha_eliminacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(
            "INSERT INTO publicacion (id_usuario, id_tipo_publicacion, titulo_publicacion, contenido_publicacion, eliminado_en, actualizado_en) VALUES (?, ?, ?, ?, ?, NULL);",
            [idUser, parseInt(id_tipo_publicacion, 10), titulo, contenido, fecha_eliminacion ? new Date(fecha_eliminacion) : null]
        );
        return result;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function actualizarInformacion(idPublicacion, titulo, contenido, id_tipo_publicacion, fecha_eliminacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(
            "UPDATE publicacion SET titulo_publicacion = ?, contenido_publicacion = ?, id_tipo_publicacion = ?, eliminado_en = ? WHERE id_publicacion = ?;",
            [titulo, contenido, parseInt(id_tipo_publicacion, 10), fecha_eliminacion ? new Date(fecha_eliminacion) : null, idPublicacion]
        );
        return result;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function eliminacionPublicacionLogica(ids) {
    let connection;
    try {
        connection = await pool.getConnection();
        const fechaActualLocal = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        await connection.query(
            "UPDATE publicacion SET eliminado_en = ? WHERE id_usuario IN (?);",
            [fechaActualLocal, ids.map(id => parseInt(id, 10))]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function restauracionPublicacionLogica(ids) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(
            "UPDATE publicacion SET eliminado_en = NULL WHERE id_usuario = ?;",
            [parseInt(ids)]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function eliminarPublicacion(ids) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(
            "DELETE FROM publicacion WHERE id_publicacion IN (?);",
            [ids.map(id => parseInt(id, 10))]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function eliminarPublicacionIdUnico(ids) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(
            "DELETE FROM publicacion WHERE id_publicacion = ?;",
            [ids]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function mostrarAsistentesServicio(idPublicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT id_usuario FROM asistencia_servicio WHERE id_servicio = ? ORDER BY id_asistencia_servicio DESC;",
            [idPublicacion]
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function eliminarAsistentes(idsUsuariosEliminar, idPublicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(
            "DELETE FROM asistencia_servicio WHERE id_servicio = ? AND id_usuario IN (?);",
            [idPublicacion, idsUsuariosEliminar]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function obtenerDetallesUsuarios(idUsuarios) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT id_usuario, nombre_usuario, apellido_usuario, email_usuario FROM usuario WHERE id_usuario IN (?);",
            [idUsuarios]
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function agregarUsuariosNuevosServicio(idsUsuariosAgregar, idPublicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const queries = idsUsuariosAgregar.map(idUsuario => (
            connection.query(
                "INSERT INTO asistencia_servicio (id_servicio, id_usuario) VALUES (?, ?);",
                [idPublicacion, idUsuario]
            )
        ));
        await Promise.all(queries);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function agregarUsuarioServicio(id_publicacion, userId) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [result] = await connection.query(
            "INSERT INTO asistencia_servicio (id_servicio, id_usuario) VALUES (?, ?);",
            [id_publicacion, userId]
        );
        return result;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function buscarUsuarioId(idUser, id_publicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [row] = await connection.query(
            "SELECT * FROM asistencia_servicio WHERE id_servicio = ? AND id_usuario = ?;",
            [id_publicacion, idUser]
        );
        return row[0] || null;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function buscarUsuarioIdRegistrado(idUser) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM asistencia_servicio WHERE id_usuario = ?;",
            [idUser]
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
  mostrarPublicaciones,
  mostrarPublicacionesPerfil,
  mostrarPublicacionesGestion,
  obtenerDetallesUsuariosGestion,
  mostrarAnuncios,
  mostrarNoticias,
  mostrarServicios,
  mostrarServiciosUsuarioRegistrado,
  obtenerPublicacion,
  crearPublicacion,
  actualizarInformacion,
  eliminacionPublicacionLogica,
  restauracionPublicacionLogica,
  eliminarPublicacion,
  eliminarPublicacionIdUnico,
  mostrarAsistentesServicio,
  eliminarAsistentes,
  obtenerDetallesUsuarios,
  agregarUsuariosNuevosServicio,
  agregarUsuarioServicio,
  buscarUsuarioId,
  buscarUsuarioIdRegistrado,
};
