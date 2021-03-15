import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Main/components';
import LoginMedico from './pages/Login-Medico';
import LoginPaciente from './pages/Login-Paciente';
import CadastroPaciente from './pages/Cadastro-Paciente/index';
import CadastroMedico from './pages/Cadastro-Medico/index';
import Homemedico from './pages/Home-Medico/index';
import Homepaciente from './pages/Home-Paciente/index';
import Agendar from './pages/Agendar-consulta/index';
import ConsultasPaciente from './pages/Minhas-consultas-paciente/index';
import VisualizarDiagnostico from './pages/Visualizar-diagnostico/index';
import DetalhesConsulta from './pages/Minhas-consultas-paciente/click-card/index';
import DetalhesConsultaMedico from './pages/Minhas-consultas-medico/click-card/index';
import ConsultasMedico from './pages/Minhas-consultas-medico/index';
import TodosPacientes from './pages/Enviar-diagnostico/index';
import EnviarDiagnostico from './pages/Enviar-diagnostico/click/index';
import Times from './pages/Agendar-consulta/click-times/index';

import Card from './pages/Main/templates/Cards/Cards';
import Test from './pages/Test';
import Test2 from './pages/Test2';
import Conjunto from './pages/conjunto';
import Option from './pages/Main/templates/Option/Option';



function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login-medico" component={LoginMedico}></Route>
                <Route path="/login-paciente" component={LoginPaciente}></Route>
                <Route path="/cadastro-paciente" component={CadastroPaciente}></Route>
                <Route path="/cadastro-medico" component={CadastroMedico}></Route>
                <Route path="/opcao-cadastro" component={Option}></Route>
                <Route path="/home-medico" component={Homemedico}></Route>
                <Route path="/home-paciente" component={Homepaciente}></Route>
                <Route path="/agendar" component={Agendar}></Route>
                <Route path="/minhas-consultas-paciente" component={ConsultasPaciente}></Route>
                <Route path="/minhas-consultas-medico" component={ConsultasMedico}></Route>
                <Route path="/visualizar-diagnostico" component={VisualizarDiagnostico}></Route>
                <Route path="/detalhes-consulta" component={DetalhesConsulta}></Route>
                <Route path="/detalhes-consulta-medico" component={DetalhesConsultaMedico}></Route>
                <Route path="/todos-pacientes" component={TodosPacientes}></Route>
                <Route path="/enviar-diagnostico" component={EnviarDiagnostico}></Route>
                <Route path="/horarios-consulta" component={Times}></Route>


                                {/* Vai sair */}
                <Route path="/card" component={Card}></Route>
                <Route path="/test" component={Test}></Route>
                <Route path="/test2" component={Test2}></Route>
                <Route path="/conjunto" component={Conjunto}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;