import estilos from "../Modulo.module.css"
import { useState } from "react"
import { rolesUsuarios } from "../../../../constantes/reportes"
import { iconoCerrarBasico } from "../../../../constantes/iconos"

export default function ModuloFIltros({ usuariosR, cache, setCache,datosFiltros }: any) {

    const [filtrosRoles, setFiltrosRoles] = useState<any>(rolesUsuarios)
    const [agregarFiltrosRoles, setAgregarFiltrosRoles] = useState<any>([])

    const agregarFiltro = (e: any, tipoFiltro: string) => {

        switch (tipoFiltro) {
        case "rol": let indice = rolesUsuarios.indexOf(e) + 1;
        if (usuariosR) {
            const x = usuariosR.filter((s: any) => (
                s.id_rol === indice
            ))
            if (x[0]) {
                setCache([...cache, x[0]]);
                const filtro = filtrosRoles.filter((rol: any) => (rol !== e))
                setFiltrosRoles(filtro)
                setAgregarFiltrosRoles([...agregarFiltrosRoles, e])
            }
            else
                console.log("No existe usuarios con ese filtro")
        }
        break;
    }


}


const quitarFiltro = (e: any,tipoFiltro:string) => {

    switch (tipoFiltro) {
    case "rol":let indice = rolesUsuarios.indexOf(e) + 1;
    if (cache) {
        const x = cache.filter((s: any) => (
            s.id_rol !== indice
        ))
        if (x[0]) {
            setCache(x)
            const filtro = rolesUsuarios.filter((rol: any) => (rol === e))
            setFiltrosRoles([...filtrosRoles, filtro[0]])

            const y = agregarFiltrosRoles.filter((rol: any) => (rol !== e))
            setAgregarFiltrosRoles(y)
        }
        else {
            setAgregarFiltrosRoles([])
            setFiltrosRoles(rolesUsuarios)
            setCache([])
        }
    }
    break;
}
}

return (
    <div className={estilos.contenedorModulo}>
        <h4>Filtros</h4>
        {
            agregarFiltrosRoles && <>
                {

                    agregarFiltrosRoles.map((e: any, index: number) => (
                        <div className={estilos.contenedorOpciones} key={index}>
                            <button className={estilos.botonEliminar} onClick={() => quitarFiltro(e,"rol")}>{e}
                                {iconoCerrarBasico}
                            </button>
                        </div>
                    ))
                }
            </>
        }

        <p>Rol</p>
        {filtrosRoles.map((e: any, index: number) => (
            <div className={estilos.opcionesFiltros} key={index}>
                <label onClick={() => agregarFiltro(e, "rol")}>{e}</label>
            </div>
        ))}


    </div>

)
}
