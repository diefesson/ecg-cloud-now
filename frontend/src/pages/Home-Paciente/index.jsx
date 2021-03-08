import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import './home-page.scss'
import Consulta from './assets/consulta.png'
import Logout from '../Main/templates/Logout/index'
import Menu from '../Main/templates/Menu-Vertical/paciente/Menu-Vertical'
import BadRequest from '../Main/templates/Redirect/index'


export default props => {
    const session = localStorage.getItem('session')
    const type = localStorage.getItem("type")
    if (session === "true" && type === '0') {
        return (
            <div className='flex'>
                <Menu />
                <section className='grid-home-page grid-template-rows'>
                    <div className='esp-logout'>
                        <Logout />
                    </div>

                    <div className='faixa-home-paciente'>
                        <div className='alinhamento-textos-faixa'>
                            <p className='texto-faixa-paciente'><strong>Agende de forma</strong></p>
                            <span><p className='texto-faixa-paciente'>
                                <strong>rápida a sua consulta</strong> </p></span>
                            <div className='conhecer-pacientes-faixa'>
                                <Link className='reset-link-menu' to='agendar'>
                                    <div>
                                        <a href=""><strong>MARCAR CONSULTA > </strong> </a>
                                    </div>
                                </Link>
                            </div>

                        </div>
                        <div className='img-faixa-paciente'>
                            <img src={Consulta} alt="img consulta" />
                        </div>
                    </div>
                    <div className='sobre-home'>
                        <h1>SOBRE O PI-ECG</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sem nisl,
                        pharetra id mi ac, efficitur viverra urna. Proin mauris felis, rhoncus nec iaculis
                        eu, condimentum vitae nisi. In hac habitasse platea dictumst. Curabitur gravida
                        leo accumsan, pulvinar quam et, suscipit turpis. Mauris vestibulum luctus eros,
                        et molestie arcu luctus ultricies. Etiam cursus ante interdum nisl tristique varius.
                        Quisque pulvinar, nulla in fermentum mollis, purus erat molestie risus, quis
                        fermentum eros diam non nisl. Etiam non enim non lacus sodales viverra. Fusce
                        rhoncus mauris quis vulputate congue. Curabitur luctus molestie dui quis
accumsan. Fusce ullamcorper pharetra ipsum id congue.</p>
                    </div>
                </section>
            </div>
        )
    }

    if (session != "true" || type === '1') {
        return (
            <BadRequest />
        )
    }
}