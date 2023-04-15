import React, { useReducer } from 'react'
import { CERRAR_SESION, LOGIN_ERROR, LOGIN_EXITOSO, OBTENER_USUARIO, REGISTRO_ERROR, REGISTRO_EXITOSO } from '../../types'
import { AuthContext } from './authContext'
import { authReducer } from './authReducer'

export const AuthState = ({ children }) => {

    const initialState = {
        token: localStorage.getItem("token"),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer( authReducer, initialState );

    //funciones
    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
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
            const respuesta = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, {
                method: "GET",
                headers: {
                    "x-auth-token": token || getToken
                }
            });

            if(!respuesta.ok){
                throw new Error()
            }

            const { usuario } = await respuesta.json();
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

    //Cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {

            const respuesta = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( datos )
            })
            const resultado = await respuesta.json();

            if(!respuesta.ok){
                console.log(respuesta.ok);
                throw( resultado );
            }
            
            //Si todo sale bien
            dispatch({
                type: LOGIN_EXITOSO,
                payload: resultado
            })
            
            usuarioAutenticado(resultado.token)

        } catch (error) {
            console.log(error);

            dispatch({
                type: LOGIN_ERROR,
                payload: {
                    msg: error.msg,
                    categoria: "alerta-error"
                }
            })
        }
    }

    //Cierra la sesión del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider 
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}
