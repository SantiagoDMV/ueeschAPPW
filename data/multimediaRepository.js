const pool = require('./conexion/db');
async function mostrarMultimedia() {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM multimedia ORDER BY id_multimedia DESC;"
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function obtenerImagenes(datos) {
    let connection;
    try {
        connection = await pool.getConnection();
        const ids = datos.map((idObj) => idObj.id_publicacion);
        const [rows] = await connection.query(
            "SELECT * FROM multimedia WHERE id_publicacion IN (?) ORDER BY id_publicacion DESC;",
            [ids]
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function obtenerImagenesIdPublicacion(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM multimedia WHERE id_publicacion = ? ORDER BY id_publicacion DESC;",
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

async function crearMultimediaServidor(tipo, multimedia, id_publicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const tipoMultimedia = tipo === 'image' ? 1 : tipo === 'video' ? 2 : 3;
        await connection.query(
            "INSERT INTO multimedia (id_tipo_multimedia, ruta_multimedia, id_publicacion) VALUES (?, ?, ?);",
            [tipoMultimedia, multimedia, id_publicacion || null]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function crearMultimedia(tipos, multimediaArray, id_publicacion) {
    let connection;
    try {
        connection = await pool.getConnection();
        const queries = multimediaArray.map((multimedia, i) => {
            const tipoMultimedia = tipos[i] === 'image' ? 1 : tipos[i] === 'video' ? 2 : 3;
            return connection.query(
                "INSERT INTO multimedia (id_tipo_multimedia, ruta_multimedia, id_publicacion) VALUES (?, ?, ?);",
                [tipoMultimedia, multimedia, id_publicacion || null]
            );
        });
        await Promise.all(queries);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function eliminarMultimedia(multimediaArray) {
    let connection;
    try {
        connection = await pool.getConnection();
        const ids = multimediaArray.map((obj) => obj.id_multimedia);
        await connection.query(
            "DELETE FROM multimedia WHERE id_multimedia IN (?);",
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

async function eliminarMultimediaRutas(rutas) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(
            "DELETE FROM multimedia WHERE ruta_multimedia IN (?);",
            [rutas]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function eliminarMultimediaIds(ids) {
    let connection;
    try {
        connection = await pool.getConnection();
        const intIds = ids.map(id => parseInt(id, 10));
        await connection.query(
            "DELETE FROM multimedia WHERE id_publicacion IN (?);",
            [intIds]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function eliminarMultimediaIdUnico(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(
            "DELETE FROM multimedia WHERE id_publicacion = ?;",
            [id]
        );
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function ObtenerUrlsEliminacionMultimediaIds(ids) {
    let connection;
    try {
        connection = await pool.getConnection();
        const intIds = ids.map(id => parseInt(id, 10));
        const [rows] = await connection.query(
            "SELECT * FROM multimedia WHERE id_publicacion IN (?);",
            [intIds]
        );
        return rows;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        if (connection) connection.release();
    }
}

async function ObtenerUrlsEliminacionMultimediaIdUnico(id) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM multimedia WHERE id_publicacion = ?;",
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

async function buscarRutas(rutas) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query(
            "SELECT * FROM multimedia WHERE ruta_multimedia IN (?);",
            [rutas]
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
    mostrarMultimedia,
    obtenerImagenes,
    obtenerImagenesIdPublicacion,
    crearMultimediaServidor,
    crearMultimedia,
    eliminarMultimedia,
    eliminarMultimediaRutas,
    eliminarMultimediaIds,
    eliminarMultimediaIdUnico,
    ObtenerUrlsEliminacionMultimediaIds,
    ObtenerUrlsEliminacionMultimediaIdUnico,
    buscarRutas
};
