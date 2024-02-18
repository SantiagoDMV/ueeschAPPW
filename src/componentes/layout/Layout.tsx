import Nav from "./Nav/Nav";
import Link from "next/link";
import style from "../estilos/Layout.module.css";
import ChatAyuda from "../chatAyuda/ChatAyuda";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  AiOutlineWhatsApp,
  AiOutlineFacebook,
  AiOutlineLeft,
  AiOutlineTwitter,
  AiOutlineRight,
} from "react-icons/ai";

export default function Layout({ children, usuario, setUsuarioCookie }: any) {
  const router = useRouter();

  const [mostrarOpcionesCompartir, setMostrarOpcionesCompartir] =
    useState<boolean>(false);

  return (
    <>
      <div className={style.layout}>
        <div className={style.nav}>
          <Nav usuario={usuario} setUsuarioCookie={setUsuarioCookie} />

          <div className={style.hijos}>

            {
            usuario && (usuario.rol === 1 || usuario.rol === 2) && mostrarOpcionesCompartir &&
            <div className={style.contenedorBotonesCompartir}>
              <div
                className={`${style.botonesCompartir} ${
                  mostrarOpcionesCompartir ? style.mostrar : ""
                }`}
              >
                {mostrarOpcionesCompartir && (
                  <AiOutlineLeft
                    className={style.botonAbrirOpcionesDeCompartir}
                    onClick={() =>
                      setMostrarOpcionesCompartir(!mostrarOpcionesCompartir)
                    }
                  />
                )}

                <Link href={'/gestionusuarios'} className={style.link}><span>Gestión de usuarios</span></Link>
                <Link href={'/publicaciones-servicios'} className={style.link}><span>Publicaciones y servicios</span></Link>
                <Link href={'/seguimiento'} className={style.link}><span>Miembros de moodle</span></Link>
                
                <div className={style.compartirRedesSociales}>
                  <button className={style.cotonCompartirFacebook}>
                    <AiOutlineFacebook
                      className={style.iconoFacebook}
                      onClick={() =>
                        window.open(
                          `http://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            window.location.href
                          )}`,
                          "Compartir en Facebook",
                          "width=800,height=800"
                        )
                      }
                    />
                    <p>Compartir en Facebook</p>
                  </button>

                  <button className={style.cotonCompartirX}>
                    <AiOutlineTwitter
                      className={style.iconoX}
                      onClick={() =>
                        window.open(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                            window.location.href
                          )}`,
                          "Compartir en Twitter",
                          "width=800,height=800"
                        )
                      }
                    />
                    <p>Compartir en X</p>
                  </button>

                  <button className={style.cotonCompartirWhatsapp}>
                    <AiOutlineWhatsApp
                      className={style.iconoWhatsapp}
                      onClick={() =>
                        window.open(
                          `https://api.whatsapp.com/send?text=${encodeURIComponent(
                            window.location.href
                          )}`,
                          "Compartir en WhatsApp",
                          "width=800,height=800"
                        )
                      }
                    />
                    <p>Compartir en Whatsapp</p>
                  </button>
                </div>
              </div>
            </div>
            }

{
            usuario && (usuario.rol === 1 || usuario.rol === 2) && !mostrarOpcionesCompartir &&
              <div className={style.contenedorAbrirOpciones}>
                <AiOutlineRight
                  className={style.botonAbrirOpcionesDeCompartir}
                  onClick={() =>
                    setMostrarOpcionesCompartir(!mostrarOpcionesCompartir)
                  }
                />
              </div>
            
            }
            <div className={style.chatAyuda}>
              <ChatAyuda />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
