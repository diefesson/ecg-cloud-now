import React from 'react'

import '../Home-Paciente/home-page.scss'
import Consulta from './assets/consulta.png'
import Logout from '../Main/templates/Logout/index'
import Menu from '../Main/templates/Menu-Vertical/medico/menu-Vertical'
import BadRequest from '../Main/templates/Redirect/index'


export default props => {
    console.log(localStorage.getItem('session'))
    if (localStorage.getItem('session') === true) {
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
                                <a href=""><strong>CONHEÇA SEUS PACIENTES > </strong> </a>
                            </div>
                        </div>
                        <div className='img-faixa'>
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
    if(localStorage.getItem('session') != true){
        return (
            <BadRequest/>
        )
    }
}