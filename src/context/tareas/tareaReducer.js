import { AGREGAR_TAREA, ELIMINAR_PROYECTO, ELIMINAR_TAREA, ESTADO_TAREA, TAREAS_PROYECTO, VALIDAR_TAREA } from "../../types"

export const tareaReducer = (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto: state.tareas.filter(tarea => tarea.idProyecto === action.payload)
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareas: [...state.tareas, action.payload],
                errorTarea: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                errorTarea: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== action.payload)
            }
        case ESTADO_TAREA:
            return {
                ...state,
                tareas: state.tareasProyecto.map( tarea => tarea.id === action.payload.id ? action.payload : tarea )
            }
        default:
            return state
    }
}