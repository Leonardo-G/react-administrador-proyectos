import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AlertaContext } from '../../context/alertas/alertaContext';
import { AuthContext } from '../../context/autenticacion/authContext';
import { Spinner } from '../UI/Spinner';


export const Login = () => {

    const history = useHistory()
    const { alerta, mostrarAlerta } = useContext(AlertaContext);
    const { mensaje, autenticado, iniciarSesion } = useContext(AuthContext)
    const [usuario, setUsuario] = useState({
        email: "",
        password: ""
    });
    const [spinner, setSpinner] = useState(false)
    const { email, password } = usuario;

    useEffect(() => {
        if( autenticado ){
            history.push("/proyectos");
        }

        if( mensaje ){
            mostrarAlerta( mensaje.msg, mensaje.categoria );
            setSpinner(false);
        }
        //eslint-disable-next-line
    }, [ mensaje, autenticado ])

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSpinner(true)

        //VAlidar que no haya campos vacios.
        if(email.trim() === "" || password.trim() === ""){
            mostrarAlerta("Todos los campos son obligatorios");
            return;
        }

        // Pasarlo al action
        iniciarSesion({ email, password });
    }

    return (
        <div className="form-usuario">
            {
                alerta 
                ?   <div className={`alerta ${alerta.categoria}`}>
                        { alerta.msg }
                    </div>  
                :   null
            }
            {
                spinner &&
                <Spinner />
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            name="email"
                            id="email"
                            type="email"
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
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <div className="campo-form">
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>
                <Link to="/nueva-cuenta" className="enlace-cuenta">
                    Nueva Cuenta
                </Link>
            </div>
        </div>
    )
}
