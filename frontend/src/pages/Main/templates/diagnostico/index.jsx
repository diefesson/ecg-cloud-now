import React from 'react'

import './style.scss'

export default props => {
    return (
        <div className='diagnostico-style'>
            <div className='text-diagnostico'>
                <h1>Infelizmente essa ação não pode ser feita :(</h1>
            </div>
            <div className='text-center'>
                <h3>Essa função necessita de profissionais da área de saúde e, além disso,
                necessitam de um aparelho específico para a coleta.
            Agradecemos a sua visita e não esqueça de preencher o <a href="https://docs.google.com/forms/d/e/1FAIpQLSf587OlmayshChBgtbrUcR5OkNDODuaNl6YkD9ZKkmhOfx2VQ/viewform?usp=sf_link">
                        formulário
                     </a>
                </h3>
            </div>
        </div>

    )
}