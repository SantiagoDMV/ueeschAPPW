import styles from "./NavIzquierdo.module.css";
import Link from "next/link";
export default function NavIzquierdo({ usuario, setUsuarioCookie }: any) {
  
  return (
    <div className={styles.contenedorNav}>
      <h3>Secciones</h3>
      <p><Link className={styles.link} href={"/matriculate"}>Requisitos de Matriculación</Link></p>
      <p><Link className={styles.link} href={"/entendiendo-la-perdida-auditiva"}>Entendiendo la perdida auditiva</Link></p>
      <p><Link className={styles.link} href={"/aprendizaje"}>Aprendizaje de lenguaje de señas</Link></p>
    </div>
  );
}
