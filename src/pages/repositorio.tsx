import { useState } from "react";
import Layout from "@/componentes/layout/Layout";
import estilos from '../styles/pestañas/Repositorio.module.css'
import Link from "next/link";
import { Toaster, toast } from "sonner";

export default function Repositorio({ usuarioCookie, setUsuarioCookie, moodle }: any) {
    const [file, setFile] = useState<any>();
    const [informacion, setInformacion] = useState<any>()
    const [habilitado, setHabilitado] = useState<boolean>(false)

    const handleSubmit = async (e: any) => {
        let loadingToastId:any = null;
        setHabilitado(true)
        e.preventDefault();
        if(!file){
            toast.dismiss(loadingToastId);
            loadingToastId = toast.info(
                "Elija un archivo antes",
                {
                    style: {
                        backgroundColor: "rgb(203,90,90)",
                    border: "none",
                    },
                }
            );
            return
        }
        try{
            console.log(file)
            
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'aonjfdy6');
            formData.append('api_key', '933626466352923');

            const apiUrl = 'https://api.cloudinary.com/v1_1/dxopgkamj/video/upload';

            loadingToastId = toast.info(
                "Añadiendo video a cloudinary, esto puede llevar un momento...",
                {
                    style: {
                        border: "none",
                    },
                }
            );
    
    
            const respuesta = await fetch(apiUrl, {
                method: "POST",
                body: formData
            });
            
            const data = await respuesta.json();

            toast.dismiss(loadingToastId);

            toast.success("El video ya se encuentra registrado", {
                style: {
                    backgroundColor: "rgb(90,203,154)",
                    border: "none",
                },
                closeButton: true
            });
    
            console.log(data);
            setInformacion(data)
        }catch(error){
            toast.dismiss(loadingToastId);
            toast.error(`${error}`, {
                style: {
                    backgroundColor: "rgb(203,90,90)",
                    border: "none",
                },
            });
        }
    };

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    return (
        <Layout usuario={usuarioCookie} setUsuarioCookie={setUsuarioCookie} moodle={moodle}>
            <div className={estilos.contenedorPrincipalVenatanaRepositorio}>
            <div className={estilos.contenedorPrincipalRepositorio}>
                <h1>Repositorio Cloudinary</h1>
                <p>
Puedes subir videos directamente a Cloudinary. Selecciona un archivo, haz clic en Enviar y obtendrás un enlace para compartir tu video.
</p>

                <Link 
                className={estilos.linkRepositorio}
                href={'https://console.cloudinary.com/pm/c-dc2c0630a5cf718eb4b3d55b0456e4/media-explorer'}>Ingresar a cloudinary</Link>
                <form onSubmit={handleSubmit}>
                    <input type="file" accept="video/*" 
                    onClick={()=>
                        {
                            setHabilitado(false)
                        setFile(null)
                        setInformacion(null)
                        }
                    }
                    onChange={handleFileChange} />

{informacion &&
                    <div className={estilos.contenedorUrl}>
                        <span>url: </span>
                        <span>{informacion.secure_url}</span>
                    </div>
}
                    <button
                    disabled= {habilitado}
                    >Enviar</button>
                </form>
                {file && (
                    <div className={estilos.vistaPrevia}>
                        <h2>Vista previa del video:</h2>
                        <video controls>
                            <source src={URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </div>
            </div>
            <Toaster
        theme="dark"
        position="bottom-left"
        visibleToasts={3}
        duration={8000}
      />
        </Layout>
    );
}
