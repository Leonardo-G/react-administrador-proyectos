import React, { useContext, useEffect } from 'react'
import { AlertaContext } from '../../context/alertas/alertaContext';
import { ProyectoContext } from '../../context/proyectos/proyectoContext'
import { Proyecto } from './Proyecto'

export const ListadoProyectos = () => {
    
    //Extraer proyectos de state initial
    const { mensaje, proyectos, obtenerProyecto } = useContext( ProyectoContext );

    const { alerta, mostrarAlerta } = useContext( AlertaContext );
    
    
    //Obtener proyectos cuando carga el componente
    useEffect(() => {
        obtenerProyecto();

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        //eslint-disable-next-line
    }, [mensaje]);

    //Revisa si proyecto tiene contenido
    if( proyectos.length === 0 ) return <p>No hay proyectos, comienze creando uno </p>;


    return (
        <ul className="listado-proyectos">
            {
                alerta &&
                <div className={`alerta ${ alerta.categoria }`}>{ alerta.msg }</div>
            }
            {proyectos.map(proyecto => (
                <Proyecto key={ proyecto._id } proyecto={ proyecto } />
            ))}
        </ul>
    )
}
