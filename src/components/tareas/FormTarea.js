import React, { useContext, useEffect, useState } from 'react';
import { ProyectoContext } from '../../context/proyectos/proyectoContext';
import { TareaContext } from '../../context/tareas/tareaContext';

export const FormTarea = () => { 
    
    //State del formularo
    const [tarea, setTarea] = useState({
        nombre: ""
    })

    const { proyecto } = useContext( ProyectoContext );
    const { errorTarea, agregarTarea, validarTarea, obtenerTareas, tareaSeleccionada, actualizarTarea } = useContext( TareaContext )

    //Effect que detecta si hay una nueva tarea seleccionada
    useEffect(() => {
        if(tareaSeleccionada !== null){
            setTarea(tareaSeleccionada)
        }else{
            setTarea({
                nombre: ""
            })
        }
    }, [tareaSeleccionada])

    //Si no hay proyecto seleccionado
    if(!proyecto) return null;

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar 
        if(tarea.nombre.trim() === ""){
            validarTarea();
            return;
        }
        //Si es edicion o es nueva tarea
        if(tareaSeleccionada === null){
            //Agregar una nueva tarea al state
            agregarTarea({
                proyecto: proyecto._id,
                nombre: tarea.nombre
            })
        }else{
            //Actualizar tarea existente
            actualizarTarea(tarea);
        }


        //Obtner tareas y filtrar el proyecto actual
        obtenerTareas(proyecto._id);

        //Reiniciar el form
        setTarea({
            nombre: ""
        });
    }

    return (
        <div className="formulario">
            <form
                onSubmit={ handleSubmit }
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
                        value={ tarea.nombre }
                        onChange={ handleChange }
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={ tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {
                errorTarea && <p className="mensaje error">El nombre de tarea es obligatorio</p>
            }
        </div>
    )
}
