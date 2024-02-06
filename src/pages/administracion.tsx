import React from 'react'
import Opciones from '../componentes/layout/secciones/OpcionesAdministracion'
import Layout from '@/componentes/layout/Layout'

export default function administracion({usuarioCookie,setUsuarioCookie}:any) {
  return (
    <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie}>
      <Opciones/>
    </Layout>
  )
}
