import estilos from "../styles/pestañas/Login.module.css";
import FormularioLogin from "../componentes/layout/Formularios/FormularioLogin";

export default function Login({setUsuario}:any) {
  return (
    <>
     <div  className={estilos.contenedorFormulario}>
      <FormularioLogin styles={estilos} setUsuario={setUsuario}/>
     </div>
     </>
  );
}

