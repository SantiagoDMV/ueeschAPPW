import { useEffect, useState, useRef } from 'react';
import estilos from './InformacionUsuariosAsistentes.module.css';
import axios,{AxiosError} from 'axios';
import MensajeError from "@/componentes/mensajes/MensajeError/MensajeError";
import MensajeCargando from "@/componentes/mensajes/MensajeCargando/MensajeCargando";
import MensajeExito from "@/componentes/mensajes/MensajeExito/MensajeExito";
import {AiOutlineQuestion, AiFillCloseCircle} from 'react-icons/ai'
import { SyncLoader } from "react-spinners";


export default function InformacionUsuariosAsistentes({ idPublicacion, setEstado,tituloServicio }: any) {
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const [usuarios, setUsuarios] = useState<any>();
  const [usuariosLista, setUsuariosLista] = useState<any>();
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<any>([]);
  const [usuariosSeleccionadosAgregar, setUsuariosSeleccionadosAgregar] = useState<any>([]);
  const [estadoVentanaEliminacion, setEstadoVentanaEliminacion] = useState<boolean>(false);
  const [estadoVistaAgregar, setEstadoVistaAgregar] = useState<boolean>(false);

////////////////////////////////////////////////////////////////////////
const [mensajeErrorEstado, setMensajeErrorEstado] = useState({
  estado: false,
  titulo: '',
  informacion: ''
})
const [mensajeCargando,setMensajeCargando] = useState<any>({
  estado:false,
  mensaje: ''
})

const [mensajeExito,setMensajeExito] = useState<any>({
  estado:false,
  mensaje: ''
})
const timeoutId = useRef<NodeJS.Timeout | null>(null);
////////////////////////////////////////////////////////////////////////


  const obtenerUsuarios = async () => {
    try {
      const respuesta = await axios.post('/api/publicaciones/servicios', {
        idPublicacionAsistentes: idPublicacion,
      });

      setUsuarios(respuesta.data.datos);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };


  const seleccionUsuarios = (value: any) => {
    if (usuariosSeleccionados.includes(value)) {
      setUsuariosSeleccionados(usuariosSeleccionados.filter((userid:any) => userid !== value));
    } else {
      // Agregar ids a la variable
      setUsuariosSeleccionados([...usuariosSeleccionados, value]);
    }

  };


  const seleccionUsuariosAgregar = (value: any) => {

    if (usuariosSeleccionadosAgregar.includes(value)) {
      setUsuariosSeleccionadosAgregar(usuariosSeleccionadosAgregar.filter((userid:any) => userid !== value));
    } else {
      // Agregar ids a la variable
      setUsuariosSeleccionadosAgregar([...usuariosSeleccionadosAgregar, value]);
    }

  };



  const eliminarEnvioDatos = async () => {
    try {
      setEstadoVentanaEliminacion(false)
      setMensajeCargando({
        estado:true,
        mensaje: 'Eliminando usuario/usuarios, esto puede llevar un momento...'
      })
      await axios.post("/api/publicaciones/servicios", {idsUsuariosEliminar: usuariosSeleccionados , idPublicacion: idPublicacion})
      setMensajeExito({
        estado: true,
        mensaje: 'El usuarios/usuarios fueron eliminados exitosamente'
      });
        obtenerUsuarios()  
      } catch (error) {
        ////////////////////////////////////////////////////////////////////////
      const errorMensaje:any = (error as AxiosError).response?.data;    
      setMensajeCargando({
        estado:false,
        mensaje: ''
      })
      if(timeoutId.current){
      clearTimeout(timeoutId.current)
      }
  
      setMensajeErrorEstado({
        estado:true,
        titulo: 'Error',
        informacion:errorMensaje.mensaje
      })
  
      timeoutId.current = setTimeout(() => {
        setMensajeErrorEstado({
          estado:false,
          titulo:'',
          informacion:''
        })
      }, 3000);
    } finally {
      
      setUsuariosSeleccionados([])

      setTimeout(() => {
        setMensajeExito({
          estado: false,
          mensaje: ''
        });
      }, 3000);
      
      setTimeout(() => {
        setMensajeExito({
          estado: false,
          mensaje: ''
        });
      }, 3000);
  
      setMensajeCargando({
        estado: false,
        mensaje: ''
      });
    }
    
  };

  const eliminacionConfirmacion = () => {
    if (usuariosSeleccionados.length === 0){ 

      setMensajeErrorEstado({
        estado:true,
        titulo:'Advertencia',
        informacion:'Seleccione al menos un registro para eliminar.'
      })

      timeoutId.current = setTimeout(() => {
        setMensajeErrorEstado({
          estado:false,
          titulo:'',
          informacion:''
        })
      }, 3000);
      
      return
    }
    setEstadoVentanaEliminacion(true)
  }
  

  const obtenerListaUsuarios = async () =>{
    setEstadoVistaAgregar(true)
    const respuesta = await axios.get('/api/usuarios')
    setUsuariosLista(respuesta.data)
  }


  const enviarUsuariosLista = async () =>{
    try {
      setEstadoVistaAgregar(false)
      setMensajeCargando({
        estado:true,
        mensaje: 'Agregando usuario/usuarios, esto puede llevar un momento...'
      })
      await axios.post("/api/publicaciones/servicios", {idsUsuariosAgregar: usuariosSeleccionadosAgregar , idPublicacion: idPublicacion})
      setMensajeExito({
        estado: true,
        mensaje: 'El usuarios/usuarios fueron agregados exitosamente'
      });
        obtenerUsuarios()  
      } catch (error) {
        ////////////////////////////////////////////////////////////////////////
      const errorMensaje:any = (error as AxiosError).response?.data;    
      setMensajeCargando({
        estado:false,
        mensaje: ''
      })
      if(timeoutId.current){
      clearTimeout(timeoutId.current)
      }
  
      setMensajeErrorEstado({
        estado:true,
        titulo: 'Error',
        informacion:errorMensaje.mensaje
      })
  
      timeoutId.current = setTimeout(() => {
        setMensajeErrorEstado({
          estado:false,
          titulo:'',
          informacion:''
        })
      }, 3000);
    } finally {
      
      setUsuariosSeleccionadosAgregar([])

      setTimeout(() => {
        setMensajeExito({
          estado: false,
          mensaje: ''
        });
      }, 3000);
      
      setTimeout(() => {
        setMensajeExito({
          estado: false,
          mensaje: ''
        });
      }, 3000);
  
      setMensajeCargando({
        estado: false,
        mensaje: ''
      });
    }
    
  };



  return (
    <>
<MensajeCargando informacion={mensajeCargando.mensaje} estado={mensajeCargando.estado}/>
    <MensajeExito informacion={mensajeExito.mensaje} estado={mensajeExito.estado}/>
    <MensajeError estado={mensajeErrorEstado.estado} titulo={mensajeErrorEstado.titulo} informacion={mensajeErrorEstado.informacion}/>


{ estadoVentanaEliminacion &&
    <div className={estilos.fondo}>
    <div className={estilos.contenedorMensaje} id="contenedor">
    <AiOutlineQuestion className={estilos.iconoMensajeExito}/>
    <div className={estilos.contenedorInformacion}>
    <div className={estilos.informacion}>
        <p>La eliminación de los registros seleccionados es irreversible. ¿Desea continuar con esta acción?</p>
    </div>
    <div className={estilos.botonesConfirmacionEliminacion}>
        <button onClick={eliminarEnvioDatos}>Confirmar</button>
        <button onClick={()=>setEstadoVentanaEliminacion(false)} autoFocus>Cancelar</button>
    </div>
  </div>
  </div>
</div>
    }

{
 estadoVistaAgregar &&
    <div className={estilos.fondo}>
    <div className={estilos.contenedorMensajeAgregar} id="contenedor">
    <div className={estilos.contenedorInformacion}>
    <div className={estilos.informacionAgregar}>
        <p>Escoja los usuarios que desea agregar</p>
        <div className={estilos.OpcionesAgregar}>
        <button onClick={()=>enviarUsuariosLista()}>Agregar</button>
        <button onClick={()=>{setUsuariosLista([]);setEstadoVistaAgregar(false)}}>Cancelar</button>
        </div>
    </div>
    <div className={estilos.contenedorTablaUsuariosListaAgregar}>
      <table className={`${estilos.tablaInformacionAsistentes} ${estilos.tablaAgregar}`}>
        <thead>
          <tr>
            <th></th>
            <th>Nombre Completo</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {!usuariosLista?
          <tr>
            <td>Obteniedo Usuarios</td>
          </tr>
          :
          usuariosLista && usuariosLista.map((e:any,index:number)=>(
          <tr key={index}>
            <td className={estilos.filas}>
                  <input
                    onChange={() =>
                      seleccionUsuariosAgregar(
                        e.id_usuario
                      )
                    }
                    type="checkbox"
                    name="check"
                    id="check"
                  />
                </td>
            <td>{e.nombre_usuario} {e.apellido_usuario}</td>
            <td>{e.email_usuario}</td>
          </tr>
          ))
          
          }

        </tbody>
      </table>
    </div>
    <div className={estilos.botonesConfirmacionEliminacion}>
        {/* <button onClick={eliminarEnvioDatos}>Confirmar</button>
        <button onClick={()=>setEstadoVentanaEliminacion(false)} autoFocus>Cancelar</button> */}
    </div>
  </div>
  </div>
</div>
    }


{!usuarios? (
    <div className={estilos.contenedorCargandoUsuarios}>
    <h2>Obteniendo participantes</h2>
    <h3>Servicio: {tituloServicio}</h3>
<SyncLoader color={"#558"} loading={true} size={30} />
    </div>
    
): 
<div className={estilos.contenedorPrincipalListaAsistentes}>

<div className={estilos.contenedorOpcionesVentana}><AiFillCloseCircle onClick={()=>setEstado(false)} className={estilos.iconoCerrar}/></div>
<div className={estilos.contenedorInformacionTextoOpciones}>
  <p>Servicio: {tituloServicio}</p>
  <p>Aquí puedes gestionar la lista de asistentes para este servicio. Agrega nuevos usuarios para que participen o elimina a aquellos que ya no deben estar.</p>
</div>
<div className={estilos.contenedorOpcionesLista}>
<button onClick={()=>(obtenerListaUsuarios())}>Agregar</button>
<button className={estilos.botonEliminar} onClick={() => eliminacionConfirmacion()}>Eliminar</button>
</div>

      <table className={estilos.tablaInformacionAsistentes}>
        <thead>
          <tr>
            <th className={estilos.contenedorCheckAsistentes}></th>
            <th>Asistentes</th>
            <th>Email</th>
          </tr>
          
        </thead>
        <tbody>
          {!usuarios? (
            <tr>
              <td colSpan={2}>Obteniendo participantes</td>
            </tr>
          ): usuarios.length === 0? 
          <tr>
              <td colSpan={2}>No existen participantes</td>
            </tr>
          :(
            usuarios && usuarios.length > 0 && usuarios.map((e: any, index: number) => (
              <tr key={index}>
                <td className={estilos.filas}>
                  <input
                    onChange={() =>
                      seleccionUsuarios(
                        e.id_usuario
                      )
                    }
                    type="checkbox"
                    name="check"
                    id="check"
                  />
                </td>
                <td>
                  {e.nombre_usuario} {e.apellido_usuario}
                </td>
                <td>
                  {e.email_usuario}
                </td>
              </tr>
            ))
          )}

        </tbody>
      </table>
      </div>}
    </>
  );
}
