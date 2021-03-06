import React from 'react'

import Menu from './Main/templates/Menu-Vertical/paciente/Menu-Vertical'
// import Card from './Main/templates/Cards/Cards'
// import Grid from './Main/templates/Grids/Grids'
import Consulta from './Main/templates/Agendar-consulta/index'



export default props => {
    return(
        <div className='flex'>
                <Menu/>
                {/* <Grid/> */}
                <Consulta/>
        </div>
    )
}