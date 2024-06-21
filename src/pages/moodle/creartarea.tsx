import { useState, useEffect } from "react";
import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/Moodle/CrearCurso.module.css";
import axios from "axios";
import { Toaster, toast } from "sonner";

export default function CrearTarea({
  usuarioCookie,
  setUsuarioCookie,
  moodle,
}: any) {
  useEffect(() => {
    obtenerInformacionCursos();
  }, [usuarioCookie]);

  const [cursos, setCursos] = useState<any>();
  const [secciones, setSecciones] = useState<any>();

  const obtenerInformacionCursos = async () => {
    if (usuarioCookie) {
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/moodle/usuario_cursos`,
        { idUsuario: usuarioCookie.id_moodle }
      );

      const respuestaTodosLosCursos = await axios.get(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_courses&moodlewsrestformat=json`
      );

      const cursosInformacion = respuestaTodosLosCursos.data.filter(
        (curso: any) => {
          return respuesta.data.some((cursoCoincide: any) => {
            return cursoCoincide.id === curso.id;
          });
        }
      );

      setCursos(cursosInformacion);
    }
  };

  const [tarea, setTarea] = useState({
    course: "",
    name: "",
    intro: "",
    duedate: "",
    allowsubmissionsfromdate: "",
    sectionid: "",
  });

  // Manejador para cambiar los valores del curso
  const cursoSeleccionado = (e: any) => {
    const cursosInformacion = cursos.filter(
      (curso: any) => curso.id === parseInt(e)
    );
    if (
      cursosInformacion.length > 0 &&
      cursosInformacion[0].numsections !== undefined
    ) {
      setSecciones(cursosInformacion[0].numsections);
    } else {
      setSecciones(0); // Establecer secciones en 0 si no se encontró ninguna información de curso o si numsections es undefined
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "course") {
      cursoSeleccionado(value);
    }

    if (name === "allowsubmissionsfromdate" || name === "duedate") {
      // Obtener la fecha y hora actual
      const currentDateTime = new Date();
      const currentYear = currentDateTime.getFullYear();
      const currentMonth = currentDateTime.getMonth();
      const currentDay = currentDateTime.getDate();
      const currentHour = currentDateTime.getHours();
      const currentMinutes = currentDateTime.getMinutes();

      // Convertir las fechas a objetos Date
      const selectedDate = new Date(value);
      const startDate = new Date(tarea.allowsubmissionsfromdate);
      const endDate = new Date(tarea.duedate);

      // Validar que la fecha seleccionada no sea anterior a la fecha actual
      if (selectedDate < currentDateTime) {
        toast.error("La fecha no puede ser anterior a la fecha actual.");
        return;
      }

      // Validar que la fecha de cierre de la tarea sea posterior a la fecha de inicio de la tarea
      if (
        name === "duedate" &&
        tarea.allowsubmissionsfromdate &&
        selectedDate < startDate
      ) {
        toast.error(
          "La fecha de cierre de la tarea debe ser posterior a la fecha de inicio de la tarea."
        );
        return;
      }

      // Validar que la fecha de inicio de la tarea sea anterior a la fecha de cierre de la tarea
      if (
        name === "allowsubmissionsfromdate" &&
        tarea.duedate &&
        selectedDate > endDate
      ) {
        toast.error(
          "La fecha de inicio de la tarea debe ser anterior a la fecha de cierre de la tarea."
        );
        return;
      }

      // Validar los minutos si la fecha es la misma que la actual
      if (
        selectedDate.getFullYear() === currentYear &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getDate() === currentDay &&
        (selectedDate.getHours() < currentHour ||
          (selectedDate.getHours() === currentHour &&
            selectedDate.getMinutes() < currentMinutes))
      ) {
        toast.error(
          "La hora seleccionada debe ser posterior a la hora actual."
        );
        return;
      }
    }

    // Validar otros campos obligatorios si es necesario

    setTarea({ ...tarea, [name]: value });
  };

  const handleSubmitMoodle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nuevaPestana = window.open(
      `${moodle.host}/course/modedit.php?add=assign&type&course=${tarea.course}&section=${tarea.sectionid}&return=0&sr=0&beforemod=0`,
      "_blank"
    );
    if (nuevaPestana) {
      nuevaPestana.focus(); // Enfocar la nueva pestaña si se abrió correctamente
    } else {
      alert(
        "No se pudo abrir una nueva pestaña. Es posible que tu navegador esté bloqueando las ventanas emergentes."
      );
    }
  };

  // Manejador para enviar los datos del curso
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let loadingToastId: any = null;
    e.preventDefault();

    const boton = document.getElementById(
      "botonCrearCurso"
    ) as HTMLButtonElement;
    try {
      boton.disabled = true;

      if (!tarea.course || !tarea.sectionid || !tarea.name) {
        loadingToastId = toast.info(
          "Por favor, Llene todos los campos (obligatorios) para continuar",
          {
            style: {
              border: "none",
              backgroundColor: "rgb(255, 165, 0)",
            },
            closeButton: true,
            duration: 8000,
          }
        );

        return;
      }

      loadingToastId = toast.info(
        "Creando tarea, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      const assignmentData = {
        course: 123, // ID del curso donde deseas crear la tarea
        name: "Tarea de ejemplo", // Nombre de la tarea
        intro: "Descripción de la tarea", // Descripción de la tarea
        duedate: "2024-02-25T23:59:59", // Fecha de cierre de la tarea (en formato ISO 8601)
        allowsubmissionsfromdate: "2024-02-20T00:00:00", // Fecha de inicio de la tarea (en formato ISO 8601)
      };

      const config = {
        headers: {
          Authorization: `Bearer ${moodle.token}`,
          "Content-Type": "application/json",
        },
      };

      console.log(tarea);

      axios.post(
        `${moodle.host}/webservice/rest/server.php`,
        {
          wstoken: moodle.token,
          wsfunction: "mod_assign_add_instance",
          moodlewsrestformat: "json",
          assignment: assignmentData,
        },
        config
      );

      //axios.get(`${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_create_categories&moodlewsrestformat=json&categories[0][name]=${curso.name}&categories[0][idnumber]=${curso.idnumber}&categories[0][description]=${curso.description}`);

      toast.dismiss(loadingToastId);

      toast.success("La categoría fue creada exitosamente", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
        closeButton: true,
        duration: 8000,
      });

      // setTarea({
      //     course: "",
      //     name: "",
      //     intro: "",
      //     duedate: "",
      //     allowsubmissionsfromdate: "",
      //     sectionid: ''
      //   })
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("Ha ocurrido un error al crear la categoría.", {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    } finally {
      boton.disabled = false;
    }
  };

  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
      <div className={estilos.contenedorCrearCurso}>
        <h2>Crear Tarea</h2>
        {/* <form className={estilos.formularioCrearCurso} onSubmit={handleSubmit}> */}
        <form
          className={estilos.formularioCrearCurso}
          onSubmit={handleSubmitMoodle}
        >
          <div className={estilos.formGroup}>
            <label htmlFor="course">Curso (obligatorio)</label>
            <select
              id="course"
              name="course"
              value={tarea.course}
              onChange={(e: any) => handleChange(e)}
            >
              <option value="">Seleccionar Curso</option>
              {cursos &&
                cursos.map((c: any, index: number) => (
                  <option key={index} value={`${c.id}`}>
                    {c.fullname}
                  </option>
                ))}
            </select>
          </div>

{tarea.course &&
          <div className={estilos.formGroup}>
            <label htmlFor="sectionid">Sección del curso (obligatorio)</label>
            <select
              id="sectionid"
              name="sectionid"
              value={tarea.sectionid}
              onChange={(e: any) => handleChange(e)}
            >
              <option value="0">General</option>

              {secciones && secciones >= 0 && tarea.course !== "" && (
                <>
                  {[...Array(secciones)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
}

          {/* <div className={estilos.formGroup}>
            <label htmlFor="name">Nombre de la Tarea (obligatorio)</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={tarea.name}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className={estilos.formGroup}>
            <label htmlFor="name">Descripción</label>
            <input
              type="text"
              id="intro"
              name="intro"
              value={tarea.intro}
              onChange={handleChange}
            />
          </div> */}

          {/* <div className={estilos.formGroup}>
            <label htmlFor="allowsubmissionsfromdate">Fecha de inicio de la tarea</label>
            <span>Si no se elige una fecha de inicio de la tarea, la tarea será creada en este momento.</span>
            <input
              type="datetime-local"
              id="allowsubmissionsfromdate"
              name="allowsubmissionsfromdate"
              value={tarea.allowsubmissionsfromdate}
              onChange={handleChange}
            />
          </div>

          <div className={estilos.formGroup}>
            <label htmlFor="duedate">Fecha de cierre de la tarea</label>
            <span>Si no se elige una fecha de cierre de la tarea, la tarea estará disponible indefinidamente.</span>
            <input
              type="datetime-local"
              id="duedate"
              name="duedate"
              value={tarea.duedate}
              onChange={handleChange}
            />
          </div> */}

          <button id="botonCrearCurso" type="submit">
            Ir a crear tarea{" "}
          </button>
        </form>
      </div>
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </Layout>
  );
}