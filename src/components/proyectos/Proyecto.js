import React, { useContext } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext'

export const Proyecto = ({proyecto}) => {
    
    const { proyectoActual } = useContext(ProyectoContext);

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => proyectoActual(proyecto.id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    )
}
