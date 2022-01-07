import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AlertaContext } from '../../context/alertas/alertaContext';
import { AuthContext } from '../../context/autenticacion/authContext';
import { Spinner } from '../UI/Spinner';


export const NuevaCuenta = () => {
    
    //Extraer los valores del context
    const history = useHistory()
    const { alerta, mostrarAlerta } = useContext( AlertaContext );
    const { mensaje, autenticado, registrarUsuario } = useContext( AuthContext )

    const [usuario, setUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    })
    const [spinner, setSpinner] = useState(false)

    const { nombre, email, password, confirmar } = usuario

    useEffect(() => {
        if( autenticado ){
            history.push("/proyectos");
        }

        if( mensaje ){
            mostrarAlerta( mensaje.msg, mensaje.categoria );
        }
        // eslint-disable-next-line
    }, [ mensaje, autenticado ])
    
    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //VAlidar que no haya campos vacios.
        if( nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmar.trim() === "" ){
            return mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
        }

        //Validar email
        // eslint-disable-next-line
        const isEmail = (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,4})$/i).test(email);

        if(!isEmail){
            return mostrarAlerta("Coloca un correo válido", "alerta-error")
        }

        //password minimo de 6 caracteres
        if(password.length < 6){
            return mostrarAlerta("El password debe ser al menos de 6 caracteres", "alerta-error");
        }

        //Los dos passwords son iguales
        if(password !== confirmar){
            return mostrarAlerta("Las constraseñas no son iguales", "alerta-error");
        
        }
        setSpinner(true);

        //pasarle el action
        registrarUsuario({ 
            nombre,
            email, 
            password 
        });
        setSpinner(false)
    }

    return (
        <div className="form-usuario">
            {
                spinner &&
                <Spinner />
            }
            {
                alerta 
                ?   <div className={`alerta ${alerta.categoria}`}>
                        { alerta.msg }
                    </div>  
                :   null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            name="nombre"
                            id="nombre"
                            type="text"
                            placeholder="Tu Nombre"
                            onChange={handleChange}
                            value={nombre}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            name="email"
                            id="email"
                            type="email"
                            autoComplete="username"
                            placeholder="Tu email"
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Tu Password"
                            autoComplete="new-password"
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            name="confirmar"
                            id="confirmar"
                            type="password"
                            placeholder="Repite tu password"
                            autoComplete="new-password"
                            onChange={handleChange}
                            value={confirmar}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>
                <Link to="/" className="enlace-cuenta">
                    Volver a inicar sesión
                </Link>
            </div>
        </div>
    )
}

