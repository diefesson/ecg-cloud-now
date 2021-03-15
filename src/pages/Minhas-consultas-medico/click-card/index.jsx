import React from 'react'

import Menu from '../../Main/templates/Menu-Vertical/medico/menu-Vertical'
import Consulta from '../../Main/templates/Info-consulta/medico/index'
import Logout from '../../Main/templates/Logout/index'
import BadRequest from '../../Main/templates/Redirect/index'



export default props => {
    const session = localStorage.getItem('session')
    const type = localStorage.getItem("type")
    if (session === "true" && type === '1') {
        return (
            <div className='flex'>
                <Menu />
                <div className='grid-consulta'>
                    <div className='logout-esp-default'>
                        <Logout />
                    </div>
                    <div>
                        <h2>Consulta</h2>
                    </div>
                    <div>
                        <Consulta />
                    </div>
                </div>
            </div>
        )
    }
    if(session != "true" || type === '0'){
        return (
            <BadRequest/>
        )
    }
}