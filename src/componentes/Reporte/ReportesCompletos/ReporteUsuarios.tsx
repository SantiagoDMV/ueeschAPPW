import Cabecera from "../Cabecera/Cabecera";
import TablaUsuarios from "../TablaUsuarios/TablaUsuarios";
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
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
            Informe de Usuarios del Sistema
            </Text>
            <Text style={{ fontSize: 14 }}>
            Este informe proporciona detalles sobre los usuarios registrados
              en el sistema, incluyendo información como nombres, roles y
              fechas de registro.
            </Text>
          </View>

          <TablaUsuarios
            usuariosR={informacionUsuarios}
            columnasUsuarios={columnasUsuarios}
          />
        </Page>
      </Document>
    </PDFViewer>
  );
}
