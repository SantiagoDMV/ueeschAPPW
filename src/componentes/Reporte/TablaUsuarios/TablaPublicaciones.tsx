import estilos from "./TablaUsuarios.module.css"
import {formatearFecha} from "../../../../util/formatearFecha"
import {View, Text } from "@react-pdf/renderer"

export default function Publicaciones({usuariosR, columnasUsuarios}: any) {
  
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
																					key={`${index}${e}`}
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
																<View key={`${index}${e.titulo_publicacion}`}
																	style={{
																		fontSize: 12,
																		flexDirection: "row",
																	}}>

																	{
																		columnasUsuarios.map((c: any, indexC: number) => (
																			<>
																				{
																					indexC !== columnasUsuarios.length - 1 ?
																					<View key={`${indexC}${c}`}
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
																								c === 'Autor' ?
																									<Text> {e.id_usuario}</Text>
																									:
																								c === 'Título' ?
																									<Text> {e.titulo_publicacion}</Text>
																										:
																										c === 'Tipo de publicación' ?
																											<Text>
																												{
																													e.id_tipo_publicacion === 1 ?
																														"Servicio"
																														:
																														e.id_tipo_publicacion === 2 ?
																															"Anuncio"
																															:
																															e.id_tipo_publicacion === 3 ?
																																"Noticia"
																																:
																																'No definido'
																												}
																											</Text>
																											:
																											c === 'Fecha de creación' ?
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
																								c === 'Autor' ?
																									<Text> {e.id_usuario}</Text>
																									:
																								c === 'Título' ?
																									<Text> {e.titulo_publicacion}</Text>
																										:
																										c === 'Tipo de publicación' ?
																											<Text>
																												{
																													e.id_tipo_publicacion === 1 ?
																														"Servicio"
																														:
																														e.id_tipo_publicacion === 2 ?
																															"Anuncio"
																															:
																															e.id_tipo_publicacion === 3 ?
																																"Noticia"
																																:
																																'No definido'
																												}
																											</Text>
																											:
																											c === 'Fecha de creación' ?
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
