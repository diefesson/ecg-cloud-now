import React from 'react'

import './Cards.scss'

import Calendar from './assets/calendar.png'

export default props => {
    return (
        <div className='cards'>
            <div className='hover-card'>
                    {/* <h3>Ver Diagnóstico</h3> */}
            </div>

            <div className='disable-card'>
                <div className='head-card text-center'>
                    <h4>Dr. {props.name}</h4>
                </div>
                <hr />
                <div className='body-card'>
                    <div>
                        <p>Glicemia: &emsp; &emsp; &emsp; 90</p>
                    </div>
                    <div>
                        <p>Pressão Arterial:  &emsp;120</p>
                    </div>
                </div>
                <div className='date-card'>
                    {/* <div className='align-date-card'> */}
                    <img src={Calendar} className='calendar-card' alt="calendar" />
                    <label className='label'>10/10/2020</label>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}