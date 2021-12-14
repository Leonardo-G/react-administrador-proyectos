import React, { useReducer } from 'react'
import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from '../../types'
import { TareaContext } from './tareaContext'
import { tareaReducer } from './tareaReducer'

const initialState = {
    tareasProyecto: [],
    errorTarea: false,
    tareaSeleccionada: null
}

export const TareaState = ({children}) => {

    //Crear disptach y state
    const [state, dispatch] = useReducer(tareaReducer, initialState)

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async id => {
        try {
            const respuesta = await fetch(`http://localhost:4000/api/tareas/${id}`, {
                method: "GET",
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                }
            })
            const resultado = await respuesta.json();
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try {
            const respuesta = await fetch("http://localhost:4000/api/tareas", { 
                method: "POST",
                body: JSON.stringify(tarea),
                headers: {
                    // "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token")
                }
            })
            const resultado = await respuesta.json();
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por su id
    const eliminarTarea = async id => {
        try {
            const respuesta = await fetch(`http://localhost:4000/api/tareas/${id}`, {
                method: "DELETE",
                headers: {
                    "x-auth-token": localStorage.getItem("token")
                }
            })
            console.log(respuesta)
            const resultado = await respuesta.json();
            console.log(resultado)
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    }


    //Extrae una tarea para edicion
    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //Edita o modifica una tarea
    const actualizarTarea = async tarea => {
        console.log(tarea._id)
        try {
            const respuesta = await fetch(`http://localhost:4000/api/tareas/${tarea._id}`, {
                method: "PUT",
                body: JSON.stringify(tarea),
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token")
                }
            })
            const resultado = await respuesta.json()
            console.log(resultado)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: tarea
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            { children }
        </TareaContext.Provider>
    )
}
