import Nav from "./Nav/Nav";
import style from "../estilos/Layout.module.css";
import ChatAyuda from "../chatAyuda/ChatAyuda";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineWhatsApp, AiOutlineFacebook, AiOutlineLeft, AiOutlineTwitter, AiOutlineRight } from "react-icons/ai";

export default function Layout({ children, usuario, setUsuarioCookie }: any) {
  const router = useRouter();

  const [mostrarOpcionesCompartir, setMostrarOpcionesCompartir] = useState<boolean>(false);

  return (
    <>
      <div className={style.layout}>
        <div className={style.nav}>
          <Nav usuario={usuario} setUsuarioCookie={setUsuarioCookie} />

          <div className={style.hijos}>
            <div className={style.contenedorBotonesCompartir}>
              {mostrarOpcionesCompartir ? (
                <AiOutlineLeft
                  className={style.botonAbrirOpcionesDeCompartir}
                  onClick={() => setMostrarOpcionesCompartir(!mostrarOpcionesCompartir)}
                />
              ) : (
                <AiOutlineRight
                  className={style.botonAbrirOpcionesDeCompartir}
                  onClick={() => setMostrarOpcionesCompartir(!mostrarOpcionesCompartir)}
                />
              )}

              <div className={`${style.botonesCompartir} ${mostrarOpcionesCompartir ? style.mostrar : ''}`}>
                <AiOutlineFacebook
                  className={style.cotonCompartirFacebook}
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

                <AiOutlineTwitter
                  className={style.cotonCompartirTwitter}
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

                <AiOutlineWhatsApp
                  className={style.cotonCompartirWhatsapp}
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
              </div>
            </div>

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
