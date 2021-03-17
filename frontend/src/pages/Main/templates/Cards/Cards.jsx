import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import './Cards.scss'

import Calendar from './assets/calendar.png'

export default props => {
    return (
        <Link className='reset-link-menu cards' to='diagnostico'>
        <div className='hover-card'>
            </div>

            <div className='disable-card'>
                <div className='head-card text-center'>
                    <h4>Médico responsável</h4>
                </div>
                <hr />
                <div className='body-card'>
                    <div>
                        <p>Glicemia: &emsp; &emsp; &emsp; **</p>
                    </div>
                    <div>
                        <p>Pressão Arterial:  &emsp;**</p>
                    </div>
                </div>
                <div className='date-card'>
                    <img src={Calendar} className='calendar-card' alt="calendar" />
                    <label className='label'>**/**/****</label>
                </div>
            </div>
        </Link>
    )
}