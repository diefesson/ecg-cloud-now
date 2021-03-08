import React from 'react'

import './style.scss'

import Menu from '../Main/templates/Menu-Vertical/paciente/Menu-Vertical'
import Card from '../Main/templates/Cards/Minhas-consultas/index'
import Logout from '../Main/templates/Logout/index'
import BadRequest from '../Main/templates/Redirect/index'


export default props => {
    const session = localStorage.getItem('session')
    const type = localStorage.getItem("type")
    if (session === "true" && type === '0') {
        return (
            <div className='flex'>
                <Menu />
                <div className='grid-minhas-consultas'>
                    <div>
                        <Logout />
                    </div>
                    <div className='margin-minhas-consultas'>
                        <h2>Minhas consultas</h2>
                    </div>
                    <div className='grid-preview grid-consultas'>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
                            <Card />
                        </div>
                        <div className='card-position-consultas'>
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