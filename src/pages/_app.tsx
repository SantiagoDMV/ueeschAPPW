import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

export default function App({ Component, pageProps, router }: AppProps) {
  const isLoginPage = router.pathname === "/login";

  const [usuario, setUsuario] = useState<any>(null);


  const moodle = {
    host: process.env.NEXT_PUBLIC_MOODLE_HOST,
    token: process.env.NEXT_PUBLIC_TOKEN_MOODLE,
  };

  const obtenerCookie = async () => {
    try {
      const respuesta = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cookieSession`
      );
      setUsuario(respuesta.data);
    } catch (error) {
      const errorEstado: any = (error as AxiosError).response?.status;
      console.log(errorEstado);
    }
  };

  useEffect(() => {
    obtenerCookie();
  }, []); // La dependencia está vacía para ejecutarse solo una vez al montar el componente

  
  return isLoginPage ? (
    <>
    <Component {...pageProps} setUsuario={setUsuario} />
    </>
  ):<Component {...pageProps} usuarioCookie={usuario} setUsuarioCookie={setUsuario} moodle={moodle}/>  
  
}
