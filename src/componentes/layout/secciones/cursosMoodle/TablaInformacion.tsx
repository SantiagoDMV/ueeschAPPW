import { userInfo } from "os";
import estilos from "../../../estilos/Secciones/InformacionUser.module.css"
import { AiTwotoneEdit,AiOutlineLoading3Quarters,AiOutlineUndo } from "react-icons/ai" 
export default function TablaInformacion({infUsers,datosCategorias,seleccionUsuarios, actualizacionEstado, usuarioCookie,restaurarUsuario}:any) {
  // console.log(infUsers)
  // console.log(datosCategorias)
  
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

        
      <th className={estilos.filaHead}></th>
        <th className={estilos.filaHead}>Id_Curso</th>
        <th className={estilos.filaHead}>Categoría</th>
        <th className={estilos.filaHead}>Nombre</th>
        <th className={estilos.filaHead}>Nombre Corto</th>
        <th className={estilos.filaHead}>Secciones</th>
        
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
            <td className={estilos.filas}> <p className={estilos.mensajeListaVacia}>La lista de cursos está vacía</p></td>
          </tr>
        : 
        (infUsers) ? (
          infUsers.map((e: any, index: number) => (
            
            <tr className={estilos.filastr} key={index}>   
                  <>

                  <td className={estilos.filas}>
                    <input
                      onChange={() =>
                        seleccionUsuarios(
                          `${e.id}`,
                        )
                      }
                      type="checkbox"
                      name="check"
                      id="check"
                    />
                  </td>

                    <td className={estilos.filas}>{e.id}</td>
                    <td className={estilos.filas}>
                      {datosCategorias && datosCategorias.map((c:any)=>{
                        if(c.id === e.categoryid){
                          return c.name
                        }
                      })
                      }
                      </td>
                    <td className={estilos.filas}>{e.fullname}</td>
                    <td className={estilos.filas}>{e.shortname}</td>
                    <td className={estilos.filas}>{e.numsections}</td>

          {/* <td className={estilos.filas}>{accesoUltimo(e.timecreated)}</td> */}
                    {
                      (!e.eliminado_en) ? 
                      (usuarioCookie && (usuarioCookie.id === e.id_usuario)) ? 
                      <td className={estilos.filas}><AiTwotoneEdit onClick={() => actualizacionEstado(e.id)} className={estilos.iconoActualizar} /></td>
                      :
                      (
                      (usuarioCookie && usuarioCookie.rol === 1) ? 
                      (
                        <td className={estilos.filas}><AiTwotoneEdit onClick={() => actualizacionEstado(e.id)} className={estilos.iconoActualizar} /></td>
                      )
                      :
                       (e.id_rol > 2) && (usuarioCookie.rol !== 1) && 
                        (
                          <td className={estilos.filas}><AiTwotoneEdit onClick={() => actualizacionEstado(e.id)} className={estilos.iconoActualizar} /></td>
                        )
                      )
                      :
                      <td className={estilos.filas}><AiOutlineUndo onClick={()=>restaurarUsuario(e.id)} className={estilos.iconoActualizar} /></td>
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
