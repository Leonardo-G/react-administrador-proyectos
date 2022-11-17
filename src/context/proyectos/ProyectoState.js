import React, { useReducer } from "react";
import { AGREGAR_PROYECTO, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTO, PROYECTO_ACTUAL, PROYECTO_ERROR, VALIDAR_FORMULARIO } from "../../types";
import { ProyectoContext } from "./proyectoContext";
import { proyectoReducer } from "./proyectoReducer";

export const ProyectoState = (props) => {
    
    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
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
    const obtenerProyecto = async () => {
        try {
            const resultado = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/proyectos`, {
                method: "GET",
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                }
            })
            const respuesta = await resultado.json();

            if ( !resultado.ok ){
                throw new Error()
            }
            
            dispatch({
                type: OBTENER_PROYECTO,
                payload: respuesta
            })
        } catch (error) {
            
        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {

        try {
            const respuesta = await fetch( `${process.env.REACT_APP_BACKEND_URL}/api/proyectos`, {
                method: "POST",
                body: JSON.stringify( proyecto ),
                headers: {
                    "x-auth-token": localStorage.getItem("token"),
                    "Accept": "application/json",
                    'Content-Type': 'application/json'
                }
            })
            const resultado = await respuesta.json();
            
            //Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado   
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: PROYECTO_ERROR,
                payload: {
                    msg: "Hubo un error al eliminar el proyecto. Intente de nuevo más tarde",
                    categoria: "alerta-error"
                }
            })
        }

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
    const eliminarProyecto = async id => {
        try {
            const respuesta = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/proyectos/${id}`, {
                method: "DELETE",
                headers:{
                    "x-auth-token": localStorage.getItem("token"),
                }
            })
            if(!respuesta.ok){
                throw new Error()
            }
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: id
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: PROYECTO_ERROR,
                payload: {
                    msg: "Inicie sesión",
                    categoria: "alerta-error"
                }
            })
        }
        
    }

    return (
        <ProyectoContext.Provider value={{
            formulario: state.formulario,
            proyectos: state.proyectos,
            errorFormulario: state.errorFormulario,
            proyecto: state.proyecto,
            mensaje: state.mensaje,
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
