import { Image, Text, View } from "@react-pdf/renderer"
import imagenLogo from "../../../../public/imagenes/nav/logoUnidad.png"

export default function Cabecera({ usuario }: any) {

    const obtenerFecha = () => {
        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear().toString().slice(-2);
        const hora = fecha.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const fechaFormateada = `${dia}/${mes}/${anio} ${hora}`;
        return fechaFormateada
    }

    return (
        <View style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            border: "1px solid black"
        }}>
            <View
                style={{
                    flexGrow: 1, 
                    flexBasis: 0, 
                    padding: "30px",
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center"
                }}
            >
                <Image
                    style={{ maxWidth: "100px" }}
                    src={`${imagenLogo.src}`} />
            </View>
            <View
                style={{ 
                    flexGrow: 3, 
                    flexBasis: 0,
                    
                    textAlign: "justify",
                    fontSize:"12px"
                 }}
            >
                <Text
                style={{ 
                    fontSize:"14px"
                 }}
                >Unidad Educativa Especializada Sordos de Chimborazo</Text>
                <Text>Reporte de registro de usuarios registrados</Text>

                <Text>Generado por: {usuario.nombre} {usuario.apellido}</Text>
                <Text>Fecha y hora actual: {obtenerFecha()}
                </Text>
            </View>
        </View>
    )
}
