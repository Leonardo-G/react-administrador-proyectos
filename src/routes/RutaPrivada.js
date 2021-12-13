import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../context/autenticacion/authContext';

export const RutaPrivada = ({ component: Component, ...props}) => {

    const { autenticado, usuarioAutenticado, cargando } = useContext( AuthContext );

    useEffect(() => {
        const token = localStorage.getItem("token")
        usuarioAutenticado(token);
    }, [])
    return (
        <Route { ...props } render={ props => !autenticado && !cargando
            ? <Redirect to="/"/>
            : <Component { ...props }/>
        }

        />
    )
}
