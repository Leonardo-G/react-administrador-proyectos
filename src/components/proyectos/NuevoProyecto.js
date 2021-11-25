import React, { useState } from 'react'

export const NuevoProyecto = () => {

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

        //
    }


    return (
        <>
            <buttn
                type="button"
                className="btn btn-block btn-primario"
            >
                Nuevo Proyecto
            </buttn>
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
        </>
    )
}
