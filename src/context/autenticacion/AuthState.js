import React, { useReducer } from 'react'
import { LOGIN_ERROR, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types'
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
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await fetch(`http://localhost:4000/api/usuarios`, {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            //Rechazar promesa en caso de error
            if(!respuesta.ok){
                const err = await respuesta.json()
                throw(err)
            }
            
            const data = await respuesta.json();

            usuarioAutenticado(data.token);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: data
            })
        } catch (error) {
            console.log(error);

            dispatch({
                type: REGISTRO_ERROR,
                payload: {
                    msg: error.msg,
                    categoria: "alerta-error"
                }
            })
        }
    }

    const usuarioAutenticado = async (token) => {
        const getToken = localStorage.getItem("token");

        try {
            const respuesta = await fetch(`http://localhost:4000/api/auth`, {
                method: "GET",
                headers: {
                    "x-auth-token": token || getToken
                }
            });
            const { usuario } = await respuesta.json();
            console.log(usuario);
            dispatch({
                type: OBTENER_USUARIO,
                payload: usuario
            })
        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
