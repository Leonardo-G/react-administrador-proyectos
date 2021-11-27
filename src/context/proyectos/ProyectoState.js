import React, { useReducer } from "react";
import { AGREGAR_PROYECTO, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTO, PROYECTO_ACTUAL, VALIDAR_FORMULARIO } from "../../types";
import { ProyectoContext } from "./proyectoContext";
import { proyectoReducer } from "./proyectoReducer";
import { v4 as uuidv4 } from 'uuid';

export const ProyectoState = (props) => {
    
    const proyectos = [ 
        { id: 1, nombre: "tienda virtual"},
        { id: 2, nombre: "intranet"},
        { id: 3, nombre: "Diseño de tu sitio web"}
    ]

    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState)

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //Obtener proyectos
    const obtenerProyecto = () => {
        dispatch({
            type: OBTENER_PROYECTO,
            payload: proyectos
        })
    }

    //Agregar nuevo proyecto
    const agregarProyecto = proyecto => {
        proyecto.id = uuidv4();

        //Insertar el proyecto en el state
        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto    
        })
    }

    //Validar formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el Proyecto que el usuario dio click
    const proyectoActual = proyecto => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyecto
        })
    }

    //Elimina eun proyecto
    const eliminarProyecto = id => {
        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: id
        })
    }

    return (
        <ProyectoContext.Provider value={{
            formulario: state.formulario,
            proyectos: state.proyectos,
            errorFormulario: state.errorFormulario,
            proyecto: state.proyecto,
            mostrarFormulario,
            obtenerProyecto,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}>
            {props.children}
        </ProyectoContext.Provider>
    )
}
