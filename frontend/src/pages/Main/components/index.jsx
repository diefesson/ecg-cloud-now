import React from 'react'

import imgHome from '../assets/ImgHome.png'
import './Home.scss'

function Home () {
    return (
        <div>
            <div>
                <h1>Menu</h1>
                <div className='line'>
                    <div className='col-50 '>
                        <div className='esp-left'>
                            <div>
                                <h1>Uma Plataforma Focada em
                            <span>Armazenar Dados ECG</span>
                                </h1>

                            </div>
                            <div className='line text'>
                                <p>Você é um médico buscando um lugar para armazenar dados <span> cardíacos de seus pacientes?  Você é um paciente e quer </span>
                                    <span> saber como vai a saúde de seu coração? </span>
                                    <span> Uma série de alternativas em armazenamento de dados ECG,</span>
                       seja você um médico ou um paciente.</p>
                            </div>
                            <div className='line'>
                                <input className='custom-button' type="button" value="Sou Médico" />
                                <input className='custom-button' type="button" value="Sou Paciente" />
                            </div>
                        </div>
                    </div>
                    <div className='col-50'>
                        <img src={imgHome} alt="" />
                    </div>
                </div>
            </div>

            <div>
                <div className='division-page'>
                    <div className='line'>
                        <div className='text-center'>
                            <h1>Sobre Nós</h1>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Home;