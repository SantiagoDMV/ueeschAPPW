import { AiOutlineBars, AiOutlineUser, AiOutlineDown } from "react-icons/ai";
import Link from "next/link";
import styles from "./Nav.module.css";
import axios from "axios";
//import logo from "../../../../public/imagenes/nav/logoUnidad.png";
import Image from "next/image";
import logoUnidad from '../../../../public/imagenes/logoUnidadColor.png'
import { useEffect,useState } from "react";

export default function Nav({ usuario,setUsuarioCookie }: any) {
  useEffect(()=>{
    obtenerLogo();
  },[])

  const [logo, setLogo] = useState<any>();

  const obtenerLogo = async() =>{
    try {
      const respuestaMision = await axios.get('https://ueeschstrapi.onrender.com/api/informacions/7?[fields][0]=nombre&[fields][1]=contenido')
      setLogo(respuestaMision.data.data.attributes.contenido)
    } catch (error) {
      setLogo("https://res.cloudinary.com/dxopgkamj/image/upload/v1719795537/logoUnidad_sd3gm9.png")
    }
        
  }
  const masOpciones = (nombre: any) => {
    if (nombre === "servicios")
      if (
        document.getElementById("ulCompuestoServicios")!.style.display ===
        "block"
      )
        document.getElementById("ulCompuestoServicios")!.style.display = "none";
      else
        document.getElementById("ulCompuestoServicios")!.style.display =
          "block";

    if (nombre === "usuario")
      if (document.getElementById("ulCompuestoUser")!.style.display === "block")
        document.getElementById("ulCompuestoUser")!.style.display = "none";
      else document.getElementById("ulCompuestoUser")!.style.display = "block";
  };
  const menosOpciones = (nombre: any) => {
    if (nombre === "servicios")
      document.getElementById("ulCompuestoServicios")!.style.display = "none";
    if (nombre === "usuario")
      document.getElementById("ulCompuestoUser")!.style.display = "none";
  };

  const cerrarSesion = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sesiones`);
      setUsuarioCookie(null)
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div className={styles.contenedorNav}>
      <nav className={styles.Nav}>
        <div className={styles.contenedorLogo}>
          <img
            className={styles.logoUnidad}
            src={logo}
            // src={logoUnidad}
            width={65}
            height={60}
            //quality={100}
            //priority
            alt="Logo_Unidad"
          />

          <AiOutlineBars
            onMouseEnter={() => masOpciones("navBar")}
            onMouseLeave={() => menosOpciones("navBar")}
            className={styles.iconoBar}
          />
        </div>

        <div className={styles.navContenido}>
          
        <div className={styles.iconos}>
            <div
              onClick={() => masOpciones("usuario")}
              className={styles.contenedorLinkCompuesto}
            >
              {usuario ? (
                <div className={styles.iconosNav} id="iconosNav">
                  <div className={styles.iconosIcono}>
                    {usuario.nombre} {usuario.apellido}
                    <AiOutlineUser className={styles.iconoUser} />
                  </div>
                  <ul className={styles.ulCompuestoUser} id="ulCompuestoUser">
                    <li>
                      <Link className={styles.linksIconos} href={"/perfil"}>
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        onClick={cerrarSesion}
                        className={styles.linksIconos}
                      >
                        Salir
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className={styles.iconosNav} id="iconosNav">
                  <div className={styles.iconosIcono}>
                    <button className={styles.botonIconoLogin}>INGRESAR</button>
                    {
                      //<AiOutlineUser className={styles.iconoUser} />
                    }
                  </div>
                  <ul className={styles.ulCompuestoUser} id="ulCompuestoUser">
                    <li className={styles.ulCompuestoUserLi}>
                      <Link className={styles.linksIconos} href={"/login"}>
                        Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className={styles.links} id="links">
            <Link className={styles.link} href={"/"}>
              Inicio
            </Link>

            {/* <div
              onClick={() => masOpciones("servicios")}
              className={styles.contenedorLinkCompuesto}
            >
              <div className={styles.link}>
                Servicios
              </div>
              <ul id="ulCompuestoServicios" className={styles.ulServicios}>
                <li>Servicio 1</li>
                <li>Servicio 1</li>
              </ul>
            </div> */}

<Link className={styles.link} href={"/servicios"}>
              Servicios
            </Link>

            <Link className={styles.link} href={"https://eduinclusivaec.com/"}>
              Moodle
            </Link>

            <Link className={styles.link} href={"/publicaciones"}>
              Publicaciones
            </Link>

            <Link
              className={`${styles.link} ${styles.linkContactanos}`}
              href={"/contactanos"}
            >
              Contáctanos
            </Link>
          </div>

          
        </div>
      </nav>
    </div>
  );
}
