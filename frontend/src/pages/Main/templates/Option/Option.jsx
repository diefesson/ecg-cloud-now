import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import './Option.scss'

export default props => {
    return (
        <div className='option-card'>
            <div className='options'>
                <div className='option-card-1'>
                    <Link className='reset-link' to='cadastro-medico'>
                        <p className='label-option route-value'>Sou Médico</p>
                    </Link>
                </div>
                <div className="vertical-line"></div>

                <div className='option-card-2'>
                    <Link className='reset-link' to='cadastro-paciente'>
                        <p className='label-option'>Sou Paciente</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}