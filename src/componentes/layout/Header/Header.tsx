import style from "./Header.module.css";
//import RedesSociales from "./RedesSociales";

export default function Header() {
  return (
    <div className={style.contenedorHeader}>
      <div className={style.contenedorSuperior}>
        <div className={style.contenidoPrincipalHeader}>
          <h3>Unidad Educativa Especializada Sordos de Chimborazo</h3>
          <p>La educación es el arma más poderosa que puedes usar</p>
          <p>para cambiar el mundo</p>  
        </div>
      </div>
    </div>
  );
}
