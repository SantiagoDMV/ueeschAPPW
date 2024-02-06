import Cabecera from "../Cabecera/Cabecera";
import TablaPublicaciones from "../TablaUsuarios/TablaPublicaciones";
import { PDFViewer, Document, Page } from "@react-pdf/renderer";
import { View, Text } from "@react-pdf/renderer";

export default function ReporteUsuarios({
  usuarioSesion,
  informacionUsuarios,
  columnasUsuarios,
  usuarioCreador
}: any) {
  
  return (

    <PDFViewer style={{ minWidth: "100%", minHeight: "calc(100vh - 4rem)" }}>
      <Document>
        <Page size={"A4"} style={{ padding: "15px" }}>
          <Cabecera usuario={usuarioCreador} />

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Informe de Publicaciones del Sistema
            </Text>
            <Text style={{ fontSize: 14 }}>
            Este informe proporciona detalles sobre las publicaciones en el
              sistema, incluyendo información como títulos, fechas y autores.
            </Text>
          </View>

          <TablaPublicaciones
            usuariosR={informacionUsuarios}
            columnasUsuarios={columnasUsuarios}
          />
        </Page>
      </Document>
    </PDFViewer>
  );
}
