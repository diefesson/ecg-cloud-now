import React from 'react'

import Menu from './Main/templates/Menu-Vertical/Menu-Vertical'
// import Card from './Main/templates/Cards/Cards'
import Grid from './Main/templates/Grids/Grids'


export default props => {
    return(
        <div className='flex'>
                <Menu/>
                <Grid/>
        </div>
    )
}