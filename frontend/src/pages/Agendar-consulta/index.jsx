import React from 'react'

import './style.scss'

import Menu from '../Main/templates/Menu-Vertical/paciente/Menu-Vertical'
import Agendar from '../Main/templates/Agendar/index'
import Logout from '../Main/templates/Logout/index'
import BadRequest from '../Main/templates/Redirect/index'


export default props => {
    const session = localStorage.getItem('session')
    const type = localStorage.getItem("type")
    if (session === "true" &&  type === '0') {
    return (
        <div className='flex'>
            <Menu />
            <div className='grid-consulta'>
                <div className='logout-esp-default'>
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

    if(session != "true" || type === '1'){
        return (
           <BadRequest/>
        )
    }
}