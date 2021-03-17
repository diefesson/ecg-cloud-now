import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import './style.scss'


export default props => {
    return (
        <Link className='reset-link-menu' to='detalhes-consulta'>
            <div className='card-minhas-consultas'>
                <div className='disable-card'>
                    <div className='body-card'>
                        <div className='text-center'>
                            Consulta #{props.consulta}
                        </div>
                        <div className='text-center'>
                            Data: {props.date}

                        </div>
                        <div className='text-center'>
                            Horário: {props.time}
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}