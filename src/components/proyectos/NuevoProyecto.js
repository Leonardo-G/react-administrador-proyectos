import React, { useContext, useState } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext';

export const NuevoProyecto = () => {
    
    //Obtener el state del formulario
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = useContext( ProyectoContext )

    const [proyecto, setProyecto] = useState({
        nombre: ""
    });

    const { nombre } = proyecto

    const handleProyecto = (e) => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //El usuario envia un proyecto
    const handleSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto
        if(nombre === "") {
            
            mostrarError();
            return;
        }

        //agregar al state
        agregarProyecto(proyecto);

        //Reiniciar FORM
        setProyecto({
            nombre: ""
        })
    }


    return (
        <>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ mostrarFormulario }
            >
                Nuevo Proyecto
            </button>
            {
                formulario && 

                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit={handleSubmitProyecto}
                >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Proyecto"
                        name="nombre"
                        onChange={handleProyecto}
                        value={nombre}
                    />

                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
                </form>
            }
            {
                errorFormulario && <p className="mensaje error">El nombre es obligatorio</p>
            }
        </>
    )
}
