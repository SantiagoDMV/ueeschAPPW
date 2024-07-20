import Layout from "@/componentes/layout/Layout";
import estilos from "../../styles/pestañas/ReporteNotas.module.css";
import Cabecera from "../../componentes/Reporte/Cabecera/Cabecera";
import { PDFViewer, Document, Page, View, Text } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReporteNotas({
  usuarioCookie,
  setUsuarioCookie,
  id,
  curso,
  moodle,
}: any) {
  const [tareas, setTareas] = useState<any>();
  const [cursoFullname, setCursoFullName] = useState<string>("");
  const [moduloInf, setModuloInf] = useState<any>();
  const [promedio, setPromedio] = useState<any>();
  const [notaMasBaja, setNotaMasBaja] = useState<any>();
  const [notaMasAlta, setNotaMasAlta] = useState<any>();
  const [numeroTareas, setNumeroTareas] = useState<any>();
  const [cursosUser, setCursosUser] = useState<any>();
  const [informacionCursoUsuario, setInformacionCursoUsuario] = useState<any>();
  const [usuariosInformacion, setUsuariosInformacion] = useState<any>();
  const [tareasItems, setTareasItems] = useState<any>();
  const [vectorTareas, setVectorTareas] = useState<any>([]);
  const [vectorTareasT, setVectorTareasT] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      await obtenerInformacionCursosUser();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await obtenerTareasMoodle();
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (tareas) {
        await mostrarTareas();
      }
    }
    fetchData();
  }, [tareas]);

  useEffect(() => {
    async function fetchData() {
      if (!moduloInf) {
        await obtenerModulosMoodle();
      }
    }
    fetchData();
  }, [moduloInf]);

  useEffect(() => {
    async function fetchData() {
      if (!moduloInf) {
        await obtenerInformacionCurso();
      }
    }
    fetchData();
  }, [id]);

  const obtenerInformacionCursosUser = async () => {
    try {
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/moodle/usuario_cursos`,
        { idUsuario: id }
      );
      setCursosUser(respuesta.data);
      console.log("Éxito al obtener los cursos del usuario", respuesta.data);
    } catch (error) {
      console.log("Error al intentar obtener los cursos del usuario: ", error);
    }
  };

  const obtenerInformacionCurso = async () => {
    try {
      setInformacionCursoUsuario(null);
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/moodle/core_enrol_get_enrolled_users`,
        { cursoId: curso, id_moodle: id }
      );
      setUsuariosInformacion(respuesta.data.cursosUSer);
      setInformacionCursoUsuario(respuesta.data.informacionUsuario);
      console.log("Éxito al obtener la información del curso", respuesta.data);
    } catch (error) {
      console.log("Error al intentar obtener la información del usuario: ", error);
    }
  };

  const obtenerTareasMoodle = async () => {
    try {
      const respuesta = await axios.get(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=${curso}&userid=${id}`
      );
      setTareas(respuesta.data.tables[0].tabledata);
      setCursoFullName(
        cursosUser &&
          cursosUser.map((e: any) => {
            if (e.id === curso) {
              return e.fullname;
            }
          })
      );
      console.log("Éxito al obtener las tareas de Moodle", respuesta.data);
    } catch (error) {
      console.log("Error al intentar conseguir las notas del curso: ", error);
    }
  };

  const obtenerModulosMoodle = async () => {
    try {
      const respuesta = await axios.get(
        `${moodle.host}/webservice/rest/server.php?wstoken=${moodle.token}&wsfunction=core_course_get_contents&moodlewsrestformat=json&courseid=${curso}`
      );
      if (!respuesta.data.errorcode) {
        setModuloInf(respuesta.data);
        console.log("Éxito al obtener los módulos de Moodle", respuesta.data);
      } else {
        setModuloInf(null);
        console.log("Error al obtener los módulos de Moodle: ", respuesta.data);
      }
    } catch (error) {
      console.log("Error al intentar conseguir los módulos del curso: ", error);
    }
  };

  const extraerIds = (datos: any) => {
    const urls: any = [];
    let nota = 0;
    let suma = 0;
    let numTareas = 0;
    let notaMasBaja = 0;
    let notaMasAlta = 0;
    setVectorTareas([]);
    datos.forEach((item: any) => {
      const { itemname } = item;
      if (itemname && itemname.content) {
        const matches = itemname.content.match(/href="(https:\/\/[^"]+)"/);
        if (matches && matches[1]) {
          urls.push(matches[1]);
          const { grade } = item;

          if (grade.content !== "-") {
            nota = parseFloat(grade.content);
          } else {
            nota = 0;
          }
          suma += nota;
          numTareas += 1;

          if (nota < notaMasBaja) {
            notaMasBaja = nota;
          }
          if (nota > notaMasAlta) {
            notaMasAlta = nota;
          }

          const objetoTarea = {
            nombre: matches[1],
            nota: nota,
          };

          setVectorTareas((prevState: any) => [...prevState, objetoTarea]);
        }
      }
    });
    const promedio = numTareas > 0 ? suma / numTareas : 0;
    setPromedio(promedio);
    setNumeroTareas(numTareas);
    setNotaMasBaja(notaMasBaja);
    setNotaMasAlta(notaMasAlta);

    console.log("Éxito al extraer IDs", urls);

    return urls;
  };

  const mostrarTareas = async () => {
    const urlsFiltradas = extraerIds(tareas);

    if (!moduloInf) {
      await obtenerModulosMoodle();
    }

    const vectorTareasConNombres = vectorTareas.map((tarea: any) => {
      let nombreTarea = "";
      moduloInf &&
        moduloInf.forEach((modulo: any) => {
          for (let i = 0; i < modulo.modules.length; i++) {
            if (tarea.nombre === modulo.modules[i].url) {
              nombreTarea = modulo.modules[i].name;
              break;
            }
          }
        });
      return { nombre: nombreTarea, nota: tarea.nota };
    });

    setVectorTareasT(vectorTareasConNombres);
    console.log("Éxito al mostrar tareas", vectorTareasConNombres);
  };

  return (
    <>
      {usuarioCookie && (
        <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
          <div className={estilos.contendorPrincipalReporte}>
            <PDFViewer style={{ minWidth: "100%", minHeight: "calc(100vh - 4rem)" }}>
              <Document>
                <Page size={"A4"} style={{ padding: "25px" }}>
                  <Cabecera usuario={{ nombre: usuarioCookie.nombre, apellido: usuarioCookie.apellido}} />
                  <View style={{ marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                      Información del estudiante
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Nombre: {informacionCursoUsuario && informacionCursoUsuario.fullname}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Email: {informacionCursoUsuario && informacionCursoUsuario.email}
                    </Text>
                    <Text style={{ fontSize: 14, marginBottom: 10 }}>
                      Cédula: {usuarioCookie.cedula}
                    </Text>

                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                      Reporte de Notas del Curso {cursoFullname && cursoFullname}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Este informe presenta un resumen de las notas de los estudiantes en el curso {cursoFullname && cursoFullname},
                      así como información sobre tareas faltantes y otros detalles relevantes.
                    </Text>
                  </View>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                      Resumen de Notas del Estudiante
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Número de tareas en el curso: {numeroTareas && numeroTareas}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Nota más baja: {notaMasBaja && notaMasBaja}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Nota más alta: {notaMasAlta && notaMasAlta}
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                      Promedio de notas: {promedio && promedio.toFixed(2)}
                    </Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>
                      Detalle de Tareas
                    </Text>
                    {vectorTareasT && vectorTareasT.map((tarea: any, index: number) => (
                      <Text key={index} style={{ fontSize: 14 }}>
                        {tarea.nombre}: {tarea.nota}
                      </Text>
                    ))}
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </Layout>
      )}
    </>
  );
}
