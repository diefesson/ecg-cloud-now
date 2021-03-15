import React from 'react'

import './Grids.scss'

import Card from '../Cards/Cards'

// VISUALIZAR DIAGNÓSTICOS

export default props => {
    return (
        <div className='grid-preview'>
            <div className='grid'>
                <div className='card-position'>
                    <Card />
                </div>
                <div className='card-position'>
                    <Card />
                </div>
                <div className='card-position'>
                    <Card />
                </div >
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

    )
}