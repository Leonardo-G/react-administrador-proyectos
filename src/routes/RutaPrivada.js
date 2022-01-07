import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from '../context/autenticacion/authContext';

export const RutaPrivada = ({ component: Component, ...props}) => {

    const { usuarioAutenticado } = useContext( AuthContext );

    useEffect(() => {
        const token = localStorage.getItem("token")
        usuarioAutenticado(token);

        //eslint-disable-next-line
    }, [])
    return (
        <Route { ...props } render={ props => !localStorage.getItem("token")
            ? <Redirect to="/"/>
            : <Component { ...props }/>
        }

        />
    )
}
