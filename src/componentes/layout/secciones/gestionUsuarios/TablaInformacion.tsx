import { userInfo } from "os";
import estilos from "../../../estilos/Secciones/InformacionUser.module.css"
import { AiTwotoneEdit,AiOutlineLoading3Quarters,AiOutlineUndo } from "react-icons/ai" 
export default function TablaInformacion({mostrarUsuariosEliminados,infUsers,seleccionUsuarios, actualizacionEstado, usuarioCookie,restaurarUsuario}:any) {
    const accesoUltimo = (fechaString: any) => {
      if(!fechaString) return 'Nunca'
        const fecha = new Date(fechaString);
        const opciones: any = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: 'UTC'
        };
    
        return fecha.toLocaleDateString('es-ES', opciones);
      }

    return (
    <table className={estilos.tabla}>
    <thead>
      <tr>

        
        {
          !mostrarUsuariosEliminados &&
          <th className={estilos.filaHead}></th>
        }
        <th className={estilos.filaHead}>Id</th>
        <th className={estilos.filaHead}>Id_Rol</th>
        <th className={estilos.filaHead}>Nombre</th>
        <th className={estilos.filaHead}>Cédula</th>
        <th className={estilos.filaHead}>Email</th>
        {
          !mostrarUsuariosEliminados?
          <th className={estilos.filaHead}>Ultimo acceso</th>
          :
          <th className={estilos.filaHead}>Eliminado_en</th>
        }
        
        <th className={estilos.filaHead}></th>
      </tr>
    </thead>
    <tbody>
    {
        !infUsers ?
        <tr className={estilos.filastr}>
            <td className={estilos.filas}>
            <div className={estilos.seccionPublicacionesCarga}>
              <p>Obteniendo Usuarios</p>
              <div className={estilos.circuloCarga}>
                <AiOutlineLoading3Quarters className={estilos.iconoCarga} />
              </div>
            </div>
              </td>
          </tr>
        : infUsers.length === 0 ?
        <tr className={estilos.filastr}>
            <td className={estilos.filas}> <p className={estilos.mensajeListaVacia}>La lista de usuarios está vacía</p></td>
          </tr>
        : 
        (infUsers) ? (
          infUsers.map((e: any, index: number) => (
            
            <tr className={estilos.filastr} key={index}>   
                  <>


                  {
          !mostrarUsuariosEliminados &&
          <td className={estilos.filas}>
          {
            (e.id_usuario > -1)
              &&
              (
                <input
                  onChange={() => seleccionUsuarios(`${e.id_usuario}`, `${e.id_moodle}`,`${e.id_rol}`, `${e.eliminado_en}`)}
                  type="checkbox" name="check" 
                  id={`check-${index}`}
                  />
              )
              
          }
        </td>

        }


                    <td className={estilos.filas}>{e.id_usuario}</td>
                    <td className={estilos.filas}>{e.id_rol}</td>
                    <td className={estilos.filas}>{e.nombre_usuario} {e.apellido_usuario}</td>
                    <td className={estilos.filas}>{e.cedula_usuario}</td>
                    <td className={estilos.filas}>{e.email_usuario}</td>

  {
          !mostrarUsuariosEliminados?
          <td className={estilos.filas}>{accesoUltimo(e.ultimo_acceso)}</td>
          :
          <td className={estilos.filas}>{accesoUltimo(e.eliminado_en)}</td>
        }


                    

                    {
                      (!e.eliminado_en) ? 
                      (usuarioCookie && (usuarioCookie.id === e.id_usuario)) ? 
                      <td className={estilos.filas}><AiTwotoneEdit onClick={() => actualizacionEstado(e.id_usuario)} className={estilos.iconoActualizar} /></td>
                      :
                      (
                      (usuarioCookie && usuarioCookie.rol === 1) ? 
                      (
                        <td className={estilos.filas}><AiTwotoneEdit onClick={() => actualizacionEstado(e.id_usuario)} className={estilos.iconoActualizar} /></td>
                      )
                      :
                       (e.id_rol > 2) && (usuarioCookie.rol !== 1) && 
                        (
                          <td className={estilos.filas}><AiTwotoneEdit onClick={() => actualizacionEstado(e.id_usuario)} className={estilos.iconoActualizar} /></td>
                        )
                      )
                      :
                      <td className={estilos.filas}><AiOutlineUndo onClick={()=>restaurarUsuario(e.id_usuario)} className={estilos.iconoActualizar} /></td>
                    }

                  </>
            </tr>
                  
          ))
        ) :
          (
            <tr className={estilos.filastr}>
              <td className={estilos.filas}>Cargando usuarios</td>
            </tr>
          )

      }
    </tbody>
  </table>

  )
}
