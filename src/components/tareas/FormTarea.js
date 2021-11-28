import React, { useContext, useState } from 'react';
import { ProyectoContext } from '../../context/proyectos/proyectoContext';
import { TareaContext } from '../../context/tareas/tareaContext';

export const FormTarea = () => {

    const { proyecto } = useContext( ProyectoContext );
    const { errorTarea, agregarTarea, validarTarea, obtenerTareas } = useContext( TareaContext )

    //State del formularo
    const [tarea, setTarea] = useState({
        nombre: ""
    })

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
        //pasar la validacion

        //Agregar una nueva tarea al state
        agregarTarea({
            idProyecto: proyecto.id,
            estado: false,
            nombre: tarea.nombre
        })

        //Obtner tareas y filtrar el proyecto actual
        obtenerTareas(proyecto.id)

        //Reiniciar el form
        setTarea({
            nombre: ""
        })
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
                        value="Agregar tarea"
                    />
                </div>
            </form>
            {
                errorTarea && <p className="mensaje error">El nombre de tarea es obligatorio</p>
            }
        </div>
    )
}
