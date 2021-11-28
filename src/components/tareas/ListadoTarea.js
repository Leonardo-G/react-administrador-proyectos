import React, { useContext } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext'
import { TareaContext } from '../../context/tareas/tareaContext';
import { Tarea } from './Tarea'

export const ListadoTarea = () => {

    const { proyecto, eliminarProyecto } = useContext(ProyectoContext);
    const { tareasProyecto } = useContext(TareaContext)

    //Si no hay proyectoseleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    const handleEliminarProyecto = () => {
        eliminarProyecto( proyecto.id )
    }

    return (
        <>
            <h2>Proyecto { proyecto.nombre }</h2>

            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0
                    ?   <li className="tarea"><p>No hay tareas</p></li>

                    :   tareasProyecto.map( (tarea, idx) => (
                        <Tarea key={ idx } tarea={ tarea }/>
                    ) )
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ handleEliminarProyecto }
            >
                Eliminar Proyecto &times;
            </button>
        </>
    )
}
