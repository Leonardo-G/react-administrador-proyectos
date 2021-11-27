import React, { useContext } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext'
import { Tarea } from './Tarea'

export const ListadoTarea = () => {

    const { proyecto } = useContext(ProyectoContext);

    //Si no hay proyectoseleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    const tareas = [
        { nombre: "Elegir PLataforma", estado: true},
        { nombre: "Elegir Colores", estado: false},
        { nombre: "Elegir PLataforma de pago", estado: false},
        { nombre: "Elegir Hosting", estado: true},
    ]

    return (
        <>
            <h2>Proyecto { proyecto.nombre }</h2>

            <ul className="listado-tareas">
                {
                    tareas.length === 0
                    ?   <li className="tarea"><p>No hay tareas</p></li>

                    :   tareas.map( (tarea, idx) => (
                        <Tarea key={ idx + 1 } tarea={ tarea }/>
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
