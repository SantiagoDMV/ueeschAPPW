import estilos from "../estilos/Reportes/ReporteUsuarioRegistrado.module.css"
import { Document, PDFViewer, Page, View, Text } from "@react-pdf/renderer"

import ReporteCabecera from "./ReporteCabecera"

export default function ReporteUsuarioRegistrados({filtroRoles,columnas, usuariosR, usuario }: any) {

	let usuariosArray = usuariosR;
	const formatearFecha = (fechaString: any) => {
		const fecha = new Date(fechaString);

		const dia = fecha.getDate().toString().padStart(2, '0');
		const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
		const anio = fecha.getFullYear().toString().slice(-2);
		const hora = fecha.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

		const fechaFormateada = `${dia}/${mes}/${anio} ${hora}`;
		return fechaFormateada
	}

	return (
		<>
			{
				usuariosR ?
					<div className={estilos.contenedorReporte}>
						<PDFViewer style={{ minWidth: "100%", minHeight: "calc(100vh - 4rem)" }}>
							<Document>
								<Page size={"A4"} style={{ padding: "15px" }}>
									<View>
										<ReporteCabecera usuario={usuario} />
										<View
										>
											{
												usuariosR ?
													<View
														style={{

															marginTop: 20,

														}}
													>
														<View
															style={{
																display: "flex",
																flexDirection: "row",
																fontSize: 12,
															}}>
															{
																columnas.map((e: any, index: number) => (
																	<>
																		{
																			index !== columnas.length - 1 ?
																				<Text
																					key={index}
																					style={{
																						flexBasis: 0,
																						flexGrow: 1,
																						border: "1px solid black",
																						borderRight: "none",
																						padding: 10
																					}}
																				>
																					{e}
																				</Text>
																				:
																				<Text
																					key={index}
																					style={{
																						flexBasis: 0,
																						flexGrow: 1,
																						border: "1px solid black",
																						padding: 10
																					}}
																				>
																					{e}
																				</Text>
																		}
																	</>
																))

															}
														</View>


														{
															usuariosArray.map((e: any, index: number) => (
																<View key={index}
																	style={{
																		fontSize: 12,
																		flexDirection: "row",
																	}}>

																	{
																		columnas.map((c: any, indexC: number) => (
																			<>
																				{
																					indexC !== columnas.length - 1 ?
																						<View key={indexC}
																							style={{
																								flexBasis: 0,
																								flexGrow: 1,
																								border: "1px solid black",
																								borderTop: "none",
																								borderRight: "none",
																								padding: 10,
																								textAlign:"left"
																							}}>
																							{
																								c === "Nombre" ?
																									<Text> {e.nombre_usuario} {e.apellido_usuario} {filtroRoles[index]}</Text>
																									:
																									c === "Cédula" ?
																									<Text> {e.cedula_usuario}</Text>
																									:
																									c === "Email"
																										?
																										<Text>{e.email_usuario}</Text>
																										:
																										c === "Rol"
																											?
																											<Text>
																												{
																													e.id_rol === 1 ?
																														"Administrador"
																														:
																														e.id_rol === 2 ?
																															"Profesor"
																															:
																															e.id_rol === 3 ?
																																"Estudiante"
																																:
																																"Padre/Madre"
																												}
																											</Text>
																											:
																											c === "Fecha de registro"
																												?
																												<Text> {formatearFecha(e.creado_en)}</Text>
																												:
																												""
																							}
																						</View>
																						:
																						<View key={indexC}
																							style={{
																								flexBasis: 0,
																								flexGrow: 1,
																								border: "1px solid black",
																								borderTop: "none",
																								padding: 10,
																							}}>
																							{
																								c === "Nombre" ?
																									<Text> {e.nombre_usuario} {e.apellido_usuario}</Text>
																									:
																									c === "Cédula" ?
																									<Text> {e.cedula_usuario}</Text>
																									:
																									c === "Email"
																										?
																										<Text> {e.email_usuario}</Text>
																										:
																										c === "Rol"
																											?
																											<Text>
																												{
																													e.id_rol === 1 ?
																														"Administrador"
																														:
																														e.id_rol === 2 ?
																															"Profesor"
																															:
																															e.id_rol === 3 ?
																																"Estudiante"
																																:
																																"Padre/Madre"
																												}
																											</Text>
																											:
																											c === "Fecha de registro"
																												?
																												<Text> {formatearFecha(e.creado_en)}</Text>
																												:
																												""
																							}
																						</View>

																				}

																			</>
																		))
																	}
																</View>
															))
														}


													</View>
													: "Esperando datos"}
										</View>
									</View>
								</Page>
							</Document>
						</PDFViewer>
					</div>

					:
					""
			}
		</>

	)
}
