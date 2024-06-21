const pool = require('./conexion/db');

async function obtenerUltimaImportacion() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM importacion_usuarios ORDER BY creado_en DESC LIMIT 1;"
        );
        return rows[0] || null;
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
        return rows[0] || null;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function crearUltimaImportacion(id_usuario) {
    let connection;
    const fecha_actual = new Date();
    const fecha_actual_local = fecha_actual.toLocaleString(); // Para incluir la hora
    try {
        connection = await pool.getConnection();
        await connection.query(
            "INSERT INTO importacion_usuarios (id_usuario, creado_en) VALUES (?, ?);",
            [id_usuario, fecha_actual]
        );
        return {
            valor: true,
            mensaje: fecha_actual_local
        };
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    obtenerUltimaImportacion,
    buscarUsuarioEmail,
    crearUltimaImportacion
};
