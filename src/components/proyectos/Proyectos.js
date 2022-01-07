import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/autenticacion/authContext'
import { Barra } from '../layout/Barra'
import { Sidebar } from '../layout/Sidebar'
import { FormTarea } from '../tareas/FormTarea'
import { ListadoTarea } from '../tareas/ListadoTarea'

export const Proyectos = () => {

    const { usuarioAutenticado } = useContext( AuthContext )

    useEffect(() => {
        //Revisar si tenemos un token
        const token = localStorage.getItem("token");
        if(token){
            usuarioAutenticado(token)
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTarea />
                    </div>
                </main>
            </div>
        </div>
    )
}
