import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/autenticacion/authContext'

export const Barra = () => {

    const { usuarioAutenticado, usuario } = useContext( AuthContext );

    useEffect(() => {
        
        //Revisar si tenemos un token
        const token = localStorage.getItem("token");
        if(token){
            usuarioAutenticado()
        }
    }, [])

    return (
        <header className="app-header">
            {
                usuario &&

                <p className="nombre-usuario">Hola <span>{ usuario.nombre }</span></p>
            }
        
            <nav className="nav-principal">
                <a href="#!">Cerrar Sesión</a>
            </nav>
        </header>
    )
}
