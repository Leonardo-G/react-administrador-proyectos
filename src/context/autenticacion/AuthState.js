import React, { useReducer } from 'react'
import { AuthContext } from './authContext'
import { authReducer } from './authReducer'

export const AuthState = ({ children }) => {

    const initialState = {
        token: localStorage.getItem("token"),
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    const [state, dispatch] = useReducer( authReducer, initialState );

    //funciones


    return (
        <AuthContext.Provider 
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
