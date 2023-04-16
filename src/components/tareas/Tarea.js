import React from 'react'

export const Tarea = ({ proyecto, tarea, eliminarTarea, guardarTareaActual, actualizarTarea }) => {

    const handleEiminar = (id) => {
        eliminarTarea(id, proyecto._id);
        // obtenerTareas(proyecto.id);
    }

    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        
        actualizarTarea(tarea, proyecto._id)
    }

    //Agregar una tarea actual cuando el usuario desee editarla
    const seleccionarTarea = (tarea) => {
        guardarTareaActual(tarea)
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
                    onClick={ () => seleccionarTarea(tarea) }
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => handleEiminar(tarea._id) }
                > Eliminar</button>

            </div>
        </li>
    )
}
