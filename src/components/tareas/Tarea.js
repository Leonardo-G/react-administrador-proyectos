import React from 'react'

export const Tarea = ({ tarea, eliminarTarea, obtenerTareas, proyecto, cambiarEstadoTarea }) => {

    const handleEiminar = (id) => {
        eliminarTarea(id);
        obtenerTareas(proyecto.id);
    }

    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        cambiarEstadoTarea(tarea)
    }

    return (
        <li className="tarea sombre">
            <p>{ tarea.nombre }</p>
            <div className="estado">
                {
                    tarea.estado 
                    ?   <button
                            type="button"
                            className="completo"
                            onClick={ () => cambiarEstado(tarea) }
                        > Completo</button>
                    
                    :   <button
                            type="button"
                            className="incompleto"
                            onClick={ () => cambiarEstado(tarea) }
                        >Incompleto</button>   

                }
            </div>
            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => handleEiminar(tarea.id) }
                > Eliminar</button>

            </div>
        </li>
    )
}
