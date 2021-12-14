import { ACTUALIZAR_TAREA, AGREGAR_TAREA, ELIMINAR_PROYECTO, ELIMINAR_TAREA, ESTADO_TAREA, TAREAS_PROYECTO, TAREA_ACTUAL, VALIDAR_TAREA } from "../../types"

export const tareaReducer = (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasProyecto: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareasProyecto: [...state.tareasProyecto, action.payload],
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
                tareasProyecto: state.tareasProyecto.filter(tarea => tarea.id !== action.payload)
            }
        case ESTADO_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map( tarea => tarea.id === action.payload ? action.payload : tarea )
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tareaSeleccionada: action.payload
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareasProyecto: state.tareasProyecto.map(tarea =>
                tarea.id === action.payload.id ? action.payload : tarea),
                tareaSeleccionada: null
            }
        default:
            return state
    }
}