import { AGREGAR_PROYECTO, ELIMINAR_PROYECTO, FORMULARIO_PROYECTO, OBTENER_PROYECTO, PROYECTO_ACTUAL, PROYECTO_ERROR, VALIDAR_FORMULARIO } from "../../types"

export const proyectoReducer = (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
        case OBTENER_PROYECTO:
            return {
                ...state,
                proyectos: action.payload
            }
        case AGREGAR_PROYECTO:
             return {
                 ...state,
                 proyectos: [...state.proyectos, action.payload],
                 formulario: false,
                 errorFormulario: false
             }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorFormulario: true
            }
        case PROYECTO_ACTUAL:
            return {
                ...state,
                proyecto: (state.proyectos.filter(proyecto => proyecto._id === action.payload))[0]
            }
        case ELIMINAR_PROYECTO:
            return {
                ...state,
                proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),
                proyecto: null
            }
        case PROYECTO_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        
        default:
            return state
    }
}