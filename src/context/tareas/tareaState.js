import React, { useReducer } from 'react'
import { AGREGAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREAS_PROYECTO, VALIDAR_TAREA } from '../../types'
import { TareaContext } from './tareaContext'
import { tareaReducer } from './tareaReducer'

const initialState = {
    tareas: [
        { id: 1, idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { id: 2, idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { id: 3, idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { id: 4, idProyecto: 4, nombre: "Elegir Hosting", estado: true},
        { id: 5, idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { id: 6, idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { id: 7, idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { id: 8, idProyecto: 4, nombre: "Elegir Hosting", estado: true},
        { id: 9, idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { id: 10, idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { id: 11, idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { id: 12, idProyecto: 4, nombre: "Elegir Hosting", estado: true},
        { id: 13, idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { id: 14, idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { id: 15, idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { id: 16, idProyecto: 4, nombre: "Elegir Hosting", estado: true},
    ],
    tareasProyecto: null,
    errorTarea: false
}

export const TareaState = ({children}) => {

    //Crear disptach y state
    const [state, dispatch] = useReducer(tareaReducer, initialState)

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = id => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: id
        })
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }

    //Valida y muestra un error en caso de que sea necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea por su id
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    //Cambia el estado de cada tarea
    const cambiarEstadoTarea = (tarea) => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea
            }}
        >
            { children }
        </TareaContext.Provider>
    )
}
