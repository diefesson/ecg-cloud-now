import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";



export default props => {
    return (
        <Link className='reset-link-menu' to='detalhes-consulta-medico'>
            <div className='card-minhas-consultas'>
                <div className='disable-card'>
                    <div className='body-card'>
                        <div>
                            Consulta #1
                    </div>
                        <div>
                            23-12-2020 10:45
                    </div>
                        <div>
                            Carlos Lopes
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}