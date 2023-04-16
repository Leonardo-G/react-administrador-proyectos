import React, { useContext } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext'
import { TareaContext } from '../../context/tareas/tareaContext';
import { Tarea } from './Tarea'

export const ListadoTarea = () => {
    const { proyecto, eliminarProyecto } = useContext(ProyectoContext);
    const { 
        tareasProyecto, 
        eliminarTarea, 
        obtenerTareas, 
        guardarTareaActual, 
        actualizarTarea 
    } = useContext(TareaContext)
    //Si no hay proyectoseleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>;

    const handleEliminarProyecto = () => {
        console.log(proyecto._id)
        eliminarProyecto( proyecto._id )
    }


    return (
        <>
            <h2>Proyecto { proyecto.nombre }</h2>

            <ul className="listado-tareas">
                {
                    tareasProyecto.length === 0
                    ?   <li className="tarea"><p>No hay tareas</p></li>

                    :   
                            tareasProyecto.map( tarea => (
                                    <Tarea 
                                        key={ tarea._id } 
                                        tarea={ tarea } 
                                        eliminarTarea={ eliminarTarea } 
                                        obtenerTareas={ obtenerTareas } 
                                        proyecto={ proyecto } 
                                        actualizarTarea={ actualizarTarea } 
                                        guardarTareaActual={ guardarTareaActual }
                                    />
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
