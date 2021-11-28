import React, { useReducer } from 'react'
import { TAREAS_PROYECTO } from '../../types'
import { TareaContext } from './tareaContext'
import { tareaReducer } from './tareaReducer'

const initialState = {
    tareas: [
        { idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { idProyecto: 4, nombre: "Elegir Hosting", estado: true},
        { idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { idProyecto: 4, nombre: "Elegir Hosting", estado: true},
        { idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { idProyecto: 4, nombre: "Elegir Hosting", estado: true},
        { idProyecto: 1, nombre: "Elegir PLataforma", estado: true},
        { idProyecto: 2, nombre: "Elegir Colores", estado: false},
        { idProyecto: 3, nombre: "Elegir PLataforma de pago", estado: false},
        { idProyecto: 4, nombre: "Elegir Hosting", estado: true},
    ],
    tareasProyecto: null
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

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                obtenerTareas
            }}
        >
            { children }
        </TareaContext.Provider>
    )
}
