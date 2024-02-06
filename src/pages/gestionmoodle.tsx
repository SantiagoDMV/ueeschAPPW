import InformacionUserMoodle from "../componentes/layout/secciones/Moodle/InformacionModulosMoodle"
import Layout from "@/componentes/layout/Layout"
export default function getionarmoodle({usuarioCookie,setUsuarioCookie}:any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
    <InformacionUserMoodle/>
    </Layout>
  )
}
