import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import '../Home-Paciente/home-page.scss'
import Consulta from './assets/consulta.png'
import Logout from '../Main/templates/Logout/index'
import Menu from '../Main/templates/Menu-Vertical/medico/menu-Vertical'
import BadRequest from '../Main/templates/Redirect/index'


export default props => {
    const session = localStorage.getItem('session')
    const type = localStorage.getItem("type")
    if (session === "true" && type === '1') {
        return (
            <div className='flex'>
                <Menu />
                <section className='grid-home-page grid-template-rows'>
                    <div className='esp-logout'>
                        <Logout />
                    </div>

                    <div className='faixa-home-paciente'>
                        <div className='alinhamento-textos-faixa'>
                            <p className='texto-faixa-paciente'><strong>Saiba quem deseja se</strong></p>
                            <span><p className='texto-faixa-paciente'>
                                <strong>consultar com você</strong> </p></span>

                            <div className='conhecer-pacientes-faixa'>
                                <Link className='reset-link-menu' to='minhas-consultas-medico'>
                                    <div>
                                        <a href=""><strong>CONHEÇA SEUS PACIENTES > </strong> </a>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='img-faixa'>
                            <img src={Consulta} alt="img consulta" />
                        </div>
                    </div>
                    <div className='sobre-home'>
                        <h1>SOBRE O PI-ECG</h1>
                        <p>É um sistema desenvolvido na Universidade Federal do Ceará campus de Crateús 
                        na disciplina de Projeto Integrador que visa coletar sinais de Eletrocardiograma 
                        em tempo real e integrar a um banco de dados na nuvem. Este site é responsável por intermediar
                        pacientes e médicos que desejam utilizar esse sistema. As funções de 
                        diagnósticos ainda não estão sendo utilizadas, pois necessitam de profissionais da
                        área e, além disso, necessitam de um aparelho específico para a coleta. 
                        (SITE EM FASE DE TESTES, acesse: <a href="https://docs.google.com/forms/d/e/1FAIpQLSf587OlmayshChBgtbrUcR5OkNDODuaNl6YkD9ZKkmhOfx2VQ/viewform?usp=sf_link">este link</a> para preencher um formulário 
                        sobre esse sistema)
                        </p>
                        
                    </div>
                </section>
            </div>
        )
    }
    if (session != "true" || type === '0') {
        return (
            <BadRequest />
        )
    }
}