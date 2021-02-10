import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Main/components';
import LoginMedico from './pages/Login-Medico';
import LoginPaciente from './pages/Login-Paciente';

function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login-medico" component={LoginMedico}></Route>
                <Route path="/login-paciente" component={LoginPaciente}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;