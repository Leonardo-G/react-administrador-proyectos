import React, { useContext } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext'
import { TareaContext } from '../../context/tareas/tareaContext';

export const Proyecto = ({proyecto}) => {
    
    const { proyectoActual } = useContext(ProyectoContext);
    const { obtenerTareas } = useContext(TareaContext);
    

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id)  //Fijar proyecto actual
        obtenerTareas(id);  //Filtrar las tareas cuando se seleccione el proecto
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto.id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    )
}
