import { LOGIN_ERROR, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types"

export const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTRO_EXITOSO:
                localStorage.setItem("token", action.payload.token);
                return{
                    ...state,
                    autenticado: true,
                    mensaje: null
                }
            
        case REGISTRO_ERROR || LOGIN_ERROR:
            localStorage.removeItem("token")
            return {
                ...state,
                token: null,
                mensaje: action.payload
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload
            }
        default:
            return state
    }
}