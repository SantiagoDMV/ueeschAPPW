import { useEffect, useState } from "react";
import axios from "axios";
import estilos from "../../../estilos/ServiciosMoodle/Modulos.module.css";

export default function InformacionUserMoodle({
  cursoId,
  moodle,
  obtenerTareasMoodle,
  tareas,
  setTareas,
}: any) {
  const [moduloInf, setModuloInf] = useState<any>();

  useEffect(() => {
    obtenerModulosMoodle();
  }, []);

  const obtenerModulosMoodle = async () => {
    axios
      .get(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=${cursoId}`
      )
      .then((respuesta) => {
        if (respuesta.data.errorcode) {
          setModuloInf(null);
          return;
        }
        setModuloInf(respuesta.data);
      })
      .catch((error) => {
        console.log(
          "Error al intentar conseguir los modulos del curso: ",
          error
        );
      });
  };

  
//   const obtenerTareasMoodle = async () => {
//     try {
//       const respuesta = await axios.get(
//         `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=${cursoId}&userid=${userId}`
//       );
//       return respuesta.data.tables[0].tabledata;
//     } catch (error) {
//       console.log("Error al intentar conseguir las notas del curso: ", error);
//     }

//     //console.log(respuesta.data.tables[0].tabledata)
//     //>1 y <que el final  comocomienza desde 0 seria < final-1
//     //nota grade o percentage

//     //console.log(respuesta.data.tables[0].tabledata[2].grade.content)
//     //nombre de la tarea itemname
//     //console.log(respuesta.data.tables[0].tabledata[3].itemname.content)
//   };
//   //TODAS NOTAS DE TODOS LOS ESTUDIANTES POR CURSO
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=2

  //TODAS LAS NOTAS DE UN ESTUDIANTE ESPECIFICO POR CURSO
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=2&userid=16

  //UNA NOTAS DE CADA ESTUDIANTES POR TAREA
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=mod_assign_get_grades&moodlewsrestformat=json&assignmentids[0]=2

  //OBTENER NOMBRES DE LAS TAREAS
  //http://localhost/webservice/rest/server.php?wstoken=74a43c7eab5aaf63cb95b13c32950f08&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=2

  // Función para extraer IDs de itemname.content
  const extraerIds = (datos: any) => {
    const urls: any = [];

    datos.forEach((item: any) => {
      const { itemname } = item;

      if (itemname && itemname.content) {
        // Encuentra coincidencias con el patrón de URL
        const matches = itemname.content.match(/href="(http:\/\/[^"]+)"/);

        if (matches && matches[1]) {
          // Agrega la URL completa al array
          urls.push(matches[1]);
        }
      }
    });
    return urls;
  };

  const mostrarTareas = async (id: any, elemento: string) => {
    let respuestaTareas: any;

    if (!tareas) {
      respuestaTareas = await obtenerTareasMoodle();
      setTareas(respuestaTareas);
    }

    let urlsFiltradas: any;

    if(tareas)
    urlsFiltradas = extraerIds(tareas);
else if (respuestaTareas)
urlsFiltradas = extraerIds(respuestaTareas);

    const div = document.getElementById(`${elemento}`);
    let listaTareas = document.createElement("ul");

    if (document.getElementById("prueba")) {
      document.getElementById("prueba")?.remove();
      return;
    }

    if (moduloInf[id].modules.length === 0) return;

    for (let i = 0; i < moduloInf[id].modules.length; i++) {
      let nota = document.createElement("p");
      let a = document.createElement("a");
      let listaTareasItem = document.createElement("li");
      let img = document.createElement("img");

      if (urlsFiltradas.includes(moduloInf[id].modules[i].url)) {
        if (tareas)
        nota.innerText = `${tareas[i+1].grade.content}`;
        else if (respuestaTareas)
        nota.innerText = `${respuestaTareas[i+1].grade.content}`;
        nota.style.padding = "0.5rem";
        nota.style.minWidth = "10%";
        nota.style.backgroundColor = "#ebe8e3";
        nota.style.marginRight = "1.5rem";
        nota.style.display = "flex";
        nota.style.justifyContent = "center";
        nota.style.borderRadius = "50px";
      }

      img.src = `${moduloInf[id].modules[i].modicon}`;
      img.alt = `iconoActividad`;
      img.style.paddingRight = "1rem";

      
      a.innerText = `${moduloInf[id].modules[i].name}`;
      if(moduloInf[id].modules[i].url){
        a.href = `${moduloInf[id].modules[i].url}`;
        a.target = "_blank";
      }else{
        a.removeAttribute('href'); // Elimina el atributo href
      }
      a.appendChild(img);
      a.style.width = "100%";
      a.style.height = "100%";
      a.style.display = "flex";
      a.style.alignItems = "center";
      a.style.justifyContent = "start";
      a.style.padding = "1rem";
      a.style.flexDirection = "row-reverse";
      a.style.paddingLeft = "3rem";

      listaTareasItem.appendChild(a);
      listaTareasItem.style.display = "flex";
      listaTareasItem.style.alignItems = "center";
      listaTareasItem.appendChild(nota);
      listaTareas.appendChild(listaTareasItem);
    }
    listaTareas.style.backgroundColor = "white";
    listaTareas.id = "prueba";
    div?.appendChild(listaTareas);
  };

  return (
    <div className={estilos.contenedorModulos}>
      <ul>
        {moduloInf ? (
          moduloInf.map((e: any, index: number) => (
            <div key={index} id={`liTarea${e.id}`}>
              <li
                onClick={() => mostrarTareas(index, `liTarea${e.id}`)}
                className={estilos.contenedorItems}
              >
                {e.name}
              </li>
            </div>
          ))
        ) : (
          <p className={estilos.contenedorCargando}>Cargando módulos ...</p>
        )}
      </ul>
    </div>
  );
}
