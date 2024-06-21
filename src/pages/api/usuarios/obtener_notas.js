import {ObtenerInformacionCookie} from "../../../../servicios/cookies/manejoCookies"
import axios from "axios"
export default async function obtener_notas(req,res) {
  const user = ObtenerInformacionCookie(req)
  const respuesta = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=core_user_get_users&moodlewsrestformat=json&criteria[0][key]=username&criteria[0][value]=${user.cedula}`)
  const notasUser = await axios.get(`${process.env.MOODLE_HOST}/webservice/rest/server.php?wstoken=${process.env.TOKEN_MOODLE}&wsfunction=gradereport_user_get_grades_table&moodlewsrestformat=json&courseid=2&userid=${respuesta.data.users[0].id}`)
  console.log(notasUser.data)
  //return res.status(200).json({id:respuesta.data.users[0].id})
}
