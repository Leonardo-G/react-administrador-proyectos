import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const RutaPublica = ({ component: Component, ...rest}) => {

    const token = localStorage.getItem("token");

    return (
        <Route { ...rest } render={ () => (
             token ? <Redirect to="/proyectos"/>
                   : <Component { ...rest }/>
        )}

        />
    )
}
