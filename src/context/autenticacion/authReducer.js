import { LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from "../../types"

export const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_EXITOSO:
        case REGISTRO_EXITOSO:
                localStorage.setItem("token", action.payload.token);
                return{
                    ...state,
                    autenticado: true,
                    mensaje: null
                };
            
        case LOGIN_ERROR:
        case REGISTRO_ERROR:        
            localStorage.removeItem("token");
            console.log(action)
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