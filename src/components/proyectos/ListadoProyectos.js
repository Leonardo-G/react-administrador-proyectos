import React, { useContext, useEffect } from 'react'
import { ProyectoContext } from '../../context/proyectos/proyectoContext'
import { Proyecto } from './Proyecto'

export const ListadoProyectos = () => {
    
    //Extraer proyectos de state initial
    const { proyectos, obtenerProyecto } = useContext( ProyectoContext );
    
    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyecto()
    }, [])

    //Revisa si proyecto tiene contenido
    if( proyectos.length === 0 ) return <p>No hay proyectos, comienze creando uno </p>;


    return (
        <ul className="listado-proyectos">
            {proyectos.map(proyecto => (
                <Proyecto key={ proyecto.id } proyecto={ proyecto} />
            ))}
        </ul>
    )
}
