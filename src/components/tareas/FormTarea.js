import React, { useContext } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext'

export const FormTarea = () => {

    const { proyecto } = useContext( ProyectoContext );

    //Si no hay proyecto seleccionado
    if(!proyecto) return null;
    

    return (
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea"
                        name="nombre"
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
        </div>
    )
}
