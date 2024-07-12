import styles from "./NavIzquierdo.module.css";
import Link from "next/link";
export default function NavIzquierdo({ usuario, setUsuarioCookie }: any) {
  
  return (
    <div className={styles.contenedorNav}>
      <h3>Secciones</h3>
      <p><Link className={styles.link} href={"/historia"}>Presentación</Link></p>
      <p><Link className={styles.link} href={"/mision-vision"}>Misión y Visión</Link></p>
      <p><Link className={styles.link} href={"/publicaciones"}>Publicaciones</Link></p>
    </div>
  );
}
