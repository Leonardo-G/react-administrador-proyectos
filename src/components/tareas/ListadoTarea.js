import React from 'react'
import { Tarea } from './Tarea'

export const ListadoTarea = () => {

    const tareas = [
        { nombre: "Elegir PLataforma", estado: true},
        { nombre: "Elegir Colores", estado: false},
        { nombre: "Elegir PLataforma de pago", estado: false},
        { nombre: "Elegir Hosting", estado: true},
    ]

    return (
        <>
            <h2>Proyecto: Tienda Virtual</h2>

            <ul className="listado-tareas">
                {
                    tareas.length === 0
                    ?   <li className="tarea"><p>No hay tareas</p></li>

                    :   tareas.map( tarea => (
                        <Tarea tarea={ tarea }/>
                    ) )
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
            >
                Eliminar Proyecto &times;
            </button>
        </>
    )
}
