//SI SE AGREGAN MAS COLUMNAS O MAS ROLES TAMBIEN SE DEBE MODIFICAR EL COMPONENTE TABLAUSUARIOS
//TIPOS DE REPORTES ESTABLECIDOS
export const reportesEstablecidos = {
    Usuario:
        ["Usuarios del sistema",
            //"Distribución de ususarios por rol",
        ],
    Publicacion:
        [
            "Publicaciones del sistema",
        ],
    // Multimedia:
    // [
    //     "Contenido multimedia subido",
    //     "Contenido multimedia por publicación",
    //     "Contenido multimedia por tipo",
    // ],
}

//DATOS PARA REPORTES DE USUARIOS

export const columnasUsuarios = [
    "Nombres",
    "Cédula",
    "Email",
    "Rol",
    "Fecha de registro",
]

export const columnasPublicacion = [
    "Autor",
    "Título",
    "Fecha de creación",
    "Tipo de publicación",
]

export const datosFiltrosUsuarios = {
    Rol: [
        "Administrador", //id: 1
        "Docente",       //id: 2
        "Estudiante",    //id: e
        "Padre/Madre",   //id: 4
    ]
}


export const rolesUsuarios = [
    "Administrador", //id: 1
    "Docente",       //id: 2
    "Estudiante",    //id: e
    "Padre/Madre",   //id: 4
]

export const datosFiltrosPublicaciones = {
    Rol: [
        "Servicio", //id: 1
        "Anuncio",       //id: 2
        "Noticia",    //id: e
    ]
}

export const tiposPublicaciones = [
    "Servicio", //id: 1
        "Anuncio",       //id: 2
        "Noticia",    //id: e
]