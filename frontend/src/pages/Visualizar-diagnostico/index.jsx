import React from 'react'

import './style.scss'

import Menu from '../Main/templates/Menu-Vertical/paciente/Menu-Vertical'
import Card from '../Main/templates/Cards/Cards'
import Logout from '../Main/templates/Logout/index'
import BadRequest from '../Main/templates/Redirect/index'


export default props => {
    const session = localStorage.getItem('session')
    const type = localStorage.getItem("type")
    if (session === "true" && type === '0') {
        return (
            <div className='flex'>
                <Menu />
                <div className='grid-visualizar-diagnostico'>
                    <div>
                        <Logout />
                    </div>
                    <div className='margin-visualizar-diagnostico'>
                        <h2>Diagnósticos Recebidos</h2>
                    </div>
                    <div className='grid-preview grid'>
                        <div className='card-position'>
                            <Card />
                        </div>
                        <div className='card-position'>
                            <Card />
                        </div>
                        <div className='card-position'>
                            <Card />
                        </div>
                        <div className='card-position'>
                            <Card />
                        </div>
                        <div className='card-position'>
                            <Card />
                        </div>
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