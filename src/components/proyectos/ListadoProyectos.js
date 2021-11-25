import React from 'react'
import { Proyecto } from './Proyecto'

export const ListadoProyectos = () => {

    const proyectos = [
        {nombre: "tienda virtual"},
        {nombre: "intranet"},
        {nombre: "Diseño de tu sitio web"},
    ]

    return (
        <ul className="listado-proyectos">
            {proyectos.map(proyecto => (
                <Proyecto proyecto={proyecto}/>
            ))}
        </ul>
    )
}
