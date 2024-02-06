import styles from "../estilos/Alertas/AlertaCargando.module.css";
import { useState,useEffect } from "react";

export default function AlertaCargando({valor}:any) {
  const [estadoAlertaCargando, setestadoAlertaCargando] = useState(false);

  useEffect(()=>{
    setestadoAlertaCargando(valor)
    if (estadoAlertaCargando === false)
    document.getElementById("alertaCargando")!.style.display = "none";
    else
    document.getElementById("alertaCargando")!.style.display = "block";
  })

  return (
    <div id="alertaCargando" className={styles.contenedorAlertaCargando}>
      <label>Realizando cambios</label>
    </div>
  );
}
