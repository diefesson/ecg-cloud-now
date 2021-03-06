import React from 'react'

import './style.scss'

import Menu from '../Main/templates/Menu-Vertical/paciente/Menu-Vertical'
import Card from '../Main/templates/Cards/Cards'
import Logout from '../Main/templates/Logout/index'


export default props => {
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
                        <div className='card-position'>
                            <Card />
                        </div>
                    </div>
                </div>
            </div>
    )
}