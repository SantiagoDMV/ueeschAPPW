import Nav from "./Nav/Nav";
import style from  '../estilos/Layout.module.css'
import ChatAyuda from "../chatAyuda/ChatAyuda";

export default function Layout({ children, usuario,setUsuarioCookie}: any) {

  return (
    <>
    
    <div className={style.layout}>
      <div className={style.nav}>
        
        <Nav usuario={usuario} setUsuarioCookie={setUsuarioCookie}/>
        
        <div className={style.hijos}>
          <div className={style.chatAyuda}><ChatAyuda/></div>
          {children}
        </div>
      </div>
    </div>
    

    </>
  );
}
