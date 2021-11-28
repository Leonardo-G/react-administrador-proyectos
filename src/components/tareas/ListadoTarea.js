import React, { useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { ProyectoContext } from '../../context/proyectos/proyectoContext'
import { TareaContext } from '../../context/tareas/tareaContext';
import { Tarea } from './Tarea'

export const ListadoTarea = () => {
    const { proyecto, eliminarProyecto } = useContext(ProyectoContext);
    const { tareasProyecto, eliminarTarea, obtenerTareas, cambiarEstadoTarea } = useContext(TareaContext)

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

                    :   <TransitionGroup>
                            {tareasProyecto.map( tarea => (
                                <CSSTransition key={ tarea.id } timeout={200} classNames="tarea">
                                    <Tarea tarea={ tarea } eliminarTarea={ eliminarTarea } obtenerTareas={ obtenerTareas } proyecto={ proyecto } cambiarEstadoTarea={ cambiarEstadoTarea }/>
                                </CSSTransition>
                            ) )}
                        </TransitionGroup>
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
