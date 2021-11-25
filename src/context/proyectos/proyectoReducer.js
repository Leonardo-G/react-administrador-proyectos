import { FORMULARIO_PROYECTO } from "../../types"

export const proyectoReducer = (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formulario: true
            }
            
    
        default:
            return state
    }
}