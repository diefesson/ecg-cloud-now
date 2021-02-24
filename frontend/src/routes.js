import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Main/components';
import LoginMedico from './pages/Login-Medico';
import LoginPaciente from './pages/Login-Paciente';
import CadastroPaciente from './pages/Cadastro-Paciente/index';
import CadastroUser from './pages/Cadastro-User/index';
import MenuVertical from './pages/Main/templates/Menu-Vertical/Menu-Vertical';
import Card from './pages/Main/templates/Cards/Cards'
import Test from './pages/Test';
import Test2 from './pages/Test2';
import Conjunto from './pages/conjunto';

function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login-medico" component={LoginMedico}></Route>
                <Route path="/login-paciente" component={LoginPaciente}></Route>
                <Route path="/cadastro-paciente" component={CadastroPaciente}></Route>
                <Route path="/cadastro-user" component={CadastroUser}></Route>

                                {/* Vai sair */}
                <Route path="/card" component={Card}></Route>
                <Route path="/menu-vertical" component={MenuVertical}></Route>
                <Route path="/test" component={Test}></Route>
                <Route path="/test2" component={Test2}></Route>
                <Route path="/conjunto" component={Conjunto}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;