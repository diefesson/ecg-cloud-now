import React from 'react'

import './style.scss'

import Menu from '../Main/templates/Menu-Vertical/paciente/Menu-Vertical'
import Agendar from '../Main/templates/Agendar-consulta/index'
import Logout from '../Main/templates/Logout/index'


export default props => {
    return (
        <div className='flex'>
            <Menu />
            <div className='grid-consulta'>
                <div>
                    <Logout/>
                </div>
                <div>
                    <h2>Agendar Consultas</h2>
                </div>
                <div>
                    <Agendar/>
                </div>
            </div>
        </div>
    )
}