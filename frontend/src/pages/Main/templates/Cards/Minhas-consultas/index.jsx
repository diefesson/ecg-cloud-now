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
                        <div>
                            Consulta #1
                    </div>
                        <div>
                            Dr. João Alves
                    </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}