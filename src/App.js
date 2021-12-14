import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Login } from "./components/auth/Login";
import { NuevaCuenta } from "./components/auth/NuevaCuenta";
import { Proyectos } from "./components/proyectos/Proyectos";
import { AlertaState } from "./context/alertas/AlertaState";
import { AuthState } from "./context/autenticacion/AuthState";
import { ProyectoState } from "./context/proyectos/ProyectoState";
import { TareaState } from "./context/tareas/TareaState";
import { RutaPrivada } from "./routes/RutaPrivada";
import { RutaPublica } from "./routes/RutaPublica";

function App() {

  return (
    <ProyectoState>
      <TareaState>
        <AuthState>
          <AlertaState>
            <Router>
              <Switch>
                <RutaPublica exact path="/" component={ Login }/>
                <Route exact path="/nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path="/proyectos" component={Proyectos}/>
              </Switch>
            </Router>
          </AlertaState>
        </AuthState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
