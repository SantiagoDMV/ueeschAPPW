-- HACER UN TRIGGER QUE SE ACTIVE CUANDO SE CAMBIE LA CONTRASEÑA DEL USUARIO
--CAMBIA DE LA TABLA USUARIO ENTONCES TAMBIEN CAMBIA EN CUENTA

--ADMINISTRADOR
INSERT INTO public.usuario(
  id_usuario,id_rol, id_moodle, cedula_usuario, nombre_usuario, apellido_usuario, email_usuario, password_usuario, imagen_usuario, "creado_en", "actualizado_en", "eliminado_en", ultimo_acceso)
	VALUES (1,1,14,'1724008071', 'Santiago', 'Melena', 'santyago3525@outlook.com', '$2a$08$jSKtYdaK1DmdfWUCgVYCm.G0zA/piaFrJ6ogTzOKmY8LXohAJ6S/S', 'http://drive.google.com/uc?export=view&id=1C1YbQTRAlEQ3UT-CgXPGWH3JMw8pVBuK','2024-01-28',null,null,null);


-- Insertar registros en la tabla "rol"
INSERT INTO "rol" ("id_rol", "nombre_rol", "descripcion_rol")
VALUES 
  (1, 'SuperAdministrador', 'El Super Administrador tiene el máximo nivel de acceso al sistema y puede realizar configuraciones avanzadas, gestionar usuarios, y administrar todas las funcionalidades del sistema.'),
  (2, 'Administrador', 'El Administrador tiene un nivel elevado de acceso al sistema y puede realizar configuraciones, gestionar usuarios, y administrar todas las funcionalidades del sistema, pero con ciertas restricciones en comparación con el Super Administrador.'),
  (3, 'Profesor', 'Los Profesores tienen acceso al seguimiento del curso y al seguimiento de sus estudiantes en los cursos que imparten. También pueden realizar publicaciones en el sistema.'),
  (4, 'Estudiante', 'Los Estudiantes pueden revisar su propio seguimiento actual de los cursos que están cursando.'),
  (5, 'Representante', 'Los Representantes son responsables de estudiantes menores de edad, con acceso al seguimiento de los cursos de sus hijos.');
  
-- Insertar registros en la tabla "tipo_multimedia"
INSERT INTO "tipo_multimedia" ("descripcion_tipo") VALUES
  ('Imagen'),
  ('Video')


-- Insertar tipos de publicación para una unidad educativa
INSERT INTO tipo_publicacion (nombre_tipo_publicacion, descripcion_tipo_publicacion)
VALUES
  ('servicio', 'Información sobre servicios disponibles en la unidad educativa, como asesorías, apoyo, etc.'),
  ('anuncio', 'Anuncios importantes y comunicados para la comunidad educativa.'),
  ('noticia', 'Noticias relevantes sobre eventos, logros o novedades en la unidad educativa.')



--ELIMINAR USUARIO

--DROP TRIGGER IF EXISTS trigger_eliminar_cuenta ON cuenta;
--DROP FUNCTION IF EXISTS eliminar_cuenta_al_eliminar_usuario() CASCADE;
-------------------------------------------------------------------------
