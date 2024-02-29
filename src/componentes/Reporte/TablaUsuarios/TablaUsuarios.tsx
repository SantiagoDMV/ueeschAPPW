import estilos from "./TablaUsuarios.module.css"
import {formatearFecha} from "../../../../util/formatearFecha"
import {View, Text } from "@react-pdf/renderer"

export default function Usuarios({usuariosR, columnasUsuarios}: any) {
  
	return (
		<>
			{
				usuariosR ?
					<div className={estilos.contenedorReporte}>
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
																columnasUsuarios.map((e: any, index: number) => (
																	<>
																		{
																			index !== columnasUsuarios.length - 1 ?
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
															usuariosR.map((e: any, index: number) => (
																<View key={index}
																	style={{
																		fontSize: 12,
																		flexDirection: "row",
																	}}>

																	{
																		columnasUsuarios.map((c: any, indexC: number) => (
																			<>
																				{
																					indexC !== columnasUsuarios.length - 1 ?
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
																								c === 'Nombres' ?
																									<Text> {e.nombre_usuario} {e.apellido_usuario}</Text>
																									:
																								c === 'Cédula' ?
																									<Text> {e.cedula_usuario}</Text>
																									:
																									c === 'Email' ?
																										<Text>{e.email_usuario}</Text>
																										:
																										c === 'Rol' ?
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
																																:e.id_rol === 4 ?
																																"Representante"
																																:
																																'No definido'
																												}
																											</Text>
																											:
																											c === 'Fecha de registro' ?
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
																								c === 'Nombres' ?
																								<Text> {e.nombre_usuario} {e.apellido_usuario}</Text>
																								:
																							c === 'Cédula' ?
																								<Text> {e.cedula_usuario}</Text>
																								:
																								c === 'Email' ?
																									<Text>{e.email_usuario}</Text>
																									:
																									c === 'Rol' ?
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
																															:e.id_rol === 4 ?
																															"Representante"
																															:
																															'No definido'
																											}
																										</Text>
																										:
																										c === 'Fecha de registro' ?
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
					</div>

					:
					""
			}
		</>

	)
}
