import React, { useReducer } from "react";
import { FORMULARIO_PROYECTO } from "../../types";
import { ProyectoContext } from "./proyectoContext";
import { proyectoReducer } from "./proyectoReducer";

export const ProyectoState = (props) => {
    const initialState = {
        formulario: false
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    return (
        <ProyectoContext.Provider value={{
            formulario: state.formulario,
            mostrarFormulario
        }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}
