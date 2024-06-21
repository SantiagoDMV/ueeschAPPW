import { useEffect, useState, useRef } from 'react';
import estilos from './InformacionUsuariosAsistentes.module.css';
import axios,{AxiosError} from 'axios';
import {AiOutlineQuestion, AiFillCloseCircle} from 'react-icons/ai'
import { SyncLoader } from "react-spinners";
import { Toaster, toast } from "sonner";


export default function InformacionUsuariosAsistentes({ idPublicacion, setEstado,tituloServicio,usuarioCookie }: any) {
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const [usuarios, setUsuarios] = useState<any>();
  const [usuariosLista, setUsuariosLista] = useState<any>();
  const [usuariosSeleccionados, setUsuariosSeleccionados] = useState<any>([]);
  const [usuariosSeleccionadosAgregar, setUsuariosSeleccionadosAgregar] = useState<any>([]);
  const [estadoVentanaEliminacion, setEstadoVentanaEliminacion] = useState<boolean>(false);
  const [estadoVistaAgregar, setEstadoVistaAgregar] = useState<boolean>(false);

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
    
    let loadingToastId: any = null;
    const boton = document.getElementById('botonELiminar') as HTMLButtonElement;
    try {
      boton.disabled =true;
      loadingToastId = toast.info(
        "Eliminando usuario/usuarios, esto puede llevar un momento...",
        {
          style: {
            border: "none",
          },
        }
      );

      setEstadoVentanaEliminacion(false)
      
      await axios.post("/api/publicaciones/servicios", {idsUsuariosEliminar: usuariosSeleccionados , idPublicacion: idPublicacion})
      toast.dismiss(loadingToastId);

      toast.success("El usuarios/usuarios fueron eliminados exitosamente.", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });
      
        obtenerUsuarios()  
        setEstado(false)
      } catch (error) {
        ////////////////////////////////////////////////////////////////////////
        const errorMensaje: any = (error as AxiosError).response?.data;
  
        toast.dismiss(loadingToastId);
  
        toast.error(errorMensaje.mensaje, {
          style: {
            backgroundColor: "rgb(203,90,90)",
            border: "none",
          },
        });
      } finally {
      setUsuariosSeleccionados([])
      boton.disabled =false;
    }
    
  };

  const eliminacionConfirmacion = () => {
    if (usuariosSeleccionados.length === 0){ 

      toast.error('Advertencia. Seleccione al menos un registro para eliminar.', {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
      
      return
    }
    setEstadoVentanaEliminacion(true)
  }
  

  const obtenerListaUsuarios = async () =>{
    setEstadoVistaAgregar(true)
    let loadingToastId: any = null;
    try{
      toast.info("Obteniendo lista de usuarios", {
          style: {
            border: "none",
          },
      });
      const respuesta = await axios.get('/api/usuarios')
      setUsuariosLista(respuesta.data)
      toast.dismiss(loadingToastId);
    } catch (error) {
      ////////////////////////////////////////////////////////////////////////
      const errorMensaje: any = (error as AxiosError).response?.data;

      toast.dismiss(loadingToastId);

      toast.error(errorMensaje.mensaje, {
        style: {
          backgroundColor: "rgb(203,90,90)",
          border: "none",
        },
      });
    } 
    
  }


  const enviarUsuariosLista = async () =>{
    let loadingToastId: any = null;
    const boton = document.getElementById('botonAgregar') as HTMLButtonElement;
    try {
boton.disabled = true;
      if(usuariosSeleccionadosAgregar.length === 0 || !usuariosSeleccionadosAgregar){
        toast.error("Seleccione al menos un usuario.", {
          style: {
            backgroundColor: "rgb(255,165,0)",
            border: "none",
          },
        });
        return
      }

      toast.dismiss(loadingToastId);
      loadingToastId = toast.info(
        'Agregando usuario/usuarios, esto puede llevar un momento...',
        {
          style: {
            border: "none",
          },
        }
      );
      
      await axios.post("/api/publicaciones/servicios", {idsUsuariosAgregar: usuariosSeleccionadosAgregar , idPublicacion: idPublicacion})
      toast.dismiss(loadingToastId);

      toast.success("Asistencia registrada.", {
        style: {
          backgroundColor: "rgb(90,203,154)",
          border: "none",
        },
      });
        obtenerUsuarios()  
        setEstado(false)
      } catch (error) {
        ////////////////////////////////////////////////////////////////////////
        const errorMensaje: any = (error as AxiosError).response?.data;
  
        toast.dismiss(loadingToastId);
  
        toast.error(errorMensaje.mensaje, {
          style: {
            backgroundColor: "rgb(203,90,90)",
            border: "none",
          },
        });
      } finally {
      
      setUsuariosSeleccionadosAgregar([])
      boton.disabled = false;
      
    }
    
  };

  return (
    <>

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
 estadoVistaAgregar && usuariosLista &&
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
<button onClick={()=>(obtenerListaUsuarios())}
id='botonAgregar'>Agregar</button>
<button id='botonELiminar' className={estilos.botonEliminar} onClick={() => eliminacionConfirmacion()}>Eliminar</button>
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
              <td></td>
              <td colSpan={2}>Obteniendo participantes</td>
            </tr>
          ): usuarios.length === 0? 
          <tr>
            <td></td>
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
      <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={3000}
      />
    </>
  );
}
