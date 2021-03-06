import React from 'react'

import './style.scss'

export default props => {
    return (
        <div className='borda-consulta'>
            <div className='select-consulta'>
                <select className='button-select-consulta'>
                    <option className='text-center'>Selecione um hospital dos listados...</option>
                    <option>Primeira opção</option>
                </select>
            </div>
            <div className='select-consulta'>
                <select className='button-select-consulta' value='Ola'>
                    <option className='text-center'>Selecione um médico de sua preferência...</option>
                </select>
            </div>
            <div className='button-submit-consulta'>
                <button><strong>Agendar</strong></button>
            </div>
        </div>
    )
}