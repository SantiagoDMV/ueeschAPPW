-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "id_moodle" INTEGER,
    "id_rol" INTEGER NOT NULL,
    "cedula_usuario" TEXT NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "apellido_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "password_usuario" TEXT NOT NULL,
    "imagen_usuario" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3),
    "eliminado_en" TIMESTAMP(3),
    "ultimo_acceso" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "rol" (
    "id_rol" SERIAL NOT NULL,
    "nombre_rol" TEXT NOT NULL,
    "descripcion_rol" TEXT,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "tipo_multimedia" (
    "id_tipo_multimedia" SERIAL NOT NULL,
    "descripcion_tipo" TEXT NOT NULL,

    CONSTRAINT "tipo_multimedia_pkey" PRIMARY KEY ("id_tipo_multimedia")
);

-- CreateTable
CREATE TABLE "multimedia" (
    "id_multimedia" SERIAL NOT NULL,
    "id_tipo_multimedia" INTEGER NOT NULL,
    "ruta_multimedia" TEXT NOT NULL,
    "id_publicacion" INTEGER NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "multimedia_pkey" PRIMARY KEY ("id_multimedia")
);

-- CreateTable
CREATE TABLE "asistencia_servicio" (
    "id_asistencia_servicio" SERIAL NOT NULL,
    "id_servicio" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "asistencia_servicio_pkey" PRIMARY KEY ("id_asistencia_servicio")
);

-- CreateTable
CREATE TABLE "publicacion" (
    "id_publicacion" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_tipo_publicacion" INTEGER NOT NULL,
    "titulo_publicacion" TEXT NOT NULL,
    "contenido_publicacion" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizado_en" TIMESTAMP(3),
    "eliminado_en" TIMESTAMP(3),

    CONSTRAINT "publicacion_pkey" PRIMARY KEY ("id_publicacion")
);

-- CreateTable
CREATE TABLE "tipo_publicacion" (
    "id_tipo_publicacion" SERIAL NOT NULL,
    "nombre_tipo_publicacion" TEXT NOT NULL,
    "descripcion_tipo_publicacion" TEXT NOT NULL,

    CONSTRAINT "tipo_publicacion_pkey" PRIMARY KEY ("id_tipo_publicacion")
);

-- CreateTable
CREATE TABLE "importacion_usuarios" (
    "id_importacion" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "importacion_usuarios_pkey" PRIMARY KEY ("id_importacion")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_usuario_key" ON "usuario"("email_usuario");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multimedia" ADD CONSTRAINT "multimedia_id_tipo_multimedia_fkey" FOREIGN KEY ("id_tipo_multimedia") REFERENCES "tipo_multimedia"("id_tipo_multimedia") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multimedia" ADD CONSTRAINT "multimedia_id_publicacion_fkey" FOREIGN KEY ("id_publicacion") REFERENCES "publicacion"("id_publicacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia_servicio" ADD CONSTRAINT "asistencia_servicio_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asistencia_servicio" ADD CONSTRAINT "asistencia_servicio_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "publicacion"("id_publicacion") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "publicacion" ADD CONSTRAINT "publicacion_id_tipo_publicacion_fkey" FOREIGN KEY ("id_tipo_publicacion") REFERENCES "tipo_publicacion"("id_tipo_publicacion") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "importacion_usuarios" ADD CONSTRAINT "importacion_usuarios_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
