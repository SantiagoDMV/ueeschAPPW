const pool = require('./conexion/db');

async function buscarUsuarioId(idUser, id_publicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM asistencia_servicio WHERE id_servicio = ? AND id_usuario = ? LIMIT 1;",
            [id_publicacion, idUser]
        );
        return rows[0] || null;
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

async function mostrarServicios() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM publicacion WHERE id_tipo_publicacion = 1 ORDER BY id_publicacion DESC;"
        );
        return rows;
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

module.exports = {
    buscarUsuarioId,
    agregarUsuariosNuevosServicio,
    agregarUsuarioServicio,
    mostrarServicios,
    mostrarAsistentesServicio,
    eliminarAsistentes,
    obtenerDetallesUsuarios
};
