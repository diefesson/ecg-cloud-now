import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import './style.scss'

export default props => {
    return (
        <div className='bad-request'>
            <div>
                <h1>Error 401</h1>
            </div>
            <div>
                <p>É necessário fazer login para acessar esta página</p>
            </div>
            <div>
                <Link className='redirect-button' to='login'>
                    <p className='label-redirect'>Fazer login</p>
                </Link>
            </div>
        </div>
    )
}