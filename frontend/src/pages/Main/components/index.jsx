import React from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import Menu from '../templates/Menu/Menu'

import imgHome from '../assets/ImgHome.png'
import imgAbout from '../assets/AboutUs.png'
import imgMarciel from '../assets/imgMarciel.png'
import imgFelipe from '../assets/imgFelipe.png'
import imgDiefesson from '../assets/imgDiefesson.png'
import imgLuis from '../assets/imgLuis.png'
import imgVictor from '../assets/imgVictor.png'
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'

import './Home.scss'
import '../../../Style.scss'

export default props => {

    return (
        <div>
            <div>
                <header>
                    <Menu />
                </header>
                <div className='line first-page'>
                    <div className='col-50'>
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
                                <Link className='custom-button' type="button" to='login' >
                                    <span className='route-value'>Acessar Plataforma</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-50 img-home'>
                        <img src={imgHome} alt="" />
                    </div>
                </div>
            </div>

            <div>
                <div className='division-page'>
                    <div className='line'>
                        <div className='col-100 text-center'>
                            <p className='custom-font'>Sobre Nós</p>
                        </div>
                    </div>

                    <div className='line'>
                        <div className='col-100 img-about'>
                            <img src={imgAbout} alt="Sobre nós" className='image-center' />
                        </div>
                        <div className='col-100' id='custom-height-faixa' />
                        <div className='col-100 new-colors text-center' >
                            <p>
                                <strong>
                                Somos do curso de Ciência da Computação e desenvolvemos esse sistema 
                       na disciplina de Projeto Integrador e visa coletar  sinais de Eletrocardiograma  
                       em tempo real e integrar a um banco de dados na nuvem. Este site é responsável 
                       por intermediar pacientes e médicos que desejam utilizar esse sistema desenvolvido.
                           </strong>
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div>
                <div className='division-page-other-color' />

                <div className='team'>
                    <div className='col-100 text-center'>
                        <p className='custom-font' id='font-color'>Nosso Time</p>
                    </div>

                    <div className='container'>
                        <div className='marciel'>
                            <div className='photo'>
                                <img src={imgMarciel} alt="Photo" />
                            </div>
                            <div className='text-photo'>
                                <p>
                                    <span className='first-text-teams'><strong>Marciel Barros</strong></span>
                                    <span className='second-text-teams'>Professor Orientador</span>
                                </p>
                                <div className='line redes-sociais'>
                                    <ul>
                                        <li>
                                            <a href="https://github.com/marcielbp" className=''>
                                                 <img src={github} alt="github" /> </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/marcielbp/"
                                             className=''><img src={linkedin} alt="linkedin" /></a>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className='felipe'>
                            <div className='photo'>
                                <img src={imgFelipe} alt="Photo" />
                            </div>
                            <div className='text-photo'>
                                <p>
                                    <span className='first-text-teams'><strong>Adalberto Felipe</strong></span>
                                    <span className='second-text-teams'>Frontend Devoloped</span>
                                </p>
                                <div className='line redes-sociais'>
                                    <ul>
                                        <li>
                                            <a href="https://github.com/FelipePinheiro27" className=''>
                                                <img src={github} alt="github" /> </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/felipe-pinheiro-9551271a8/"
                                             className=''
                                            ><img src={linkedin} alt="linkedin" /></a>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div className='diefesson'>
                            <div className='photo'>
                                <img src={imgDiefesson} alt="Photo" />
                            </div>
                            <div className='text-photo'>
                                <p>
                                    <span className='first-text-teams'><strong>Diefesson Sousa</strong></span>
                                    <span className='second-text-teams'>Backend Devoloped</span>
                                </p>
                                <div className='line redes-sociais'>
                                    <ul>
                                        <li>
                                            <a href="https://github.com/diefesson" className=''
                                            > <img src={github} alt="github" /> </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/diefesson" 
                                            className=''>
                                                <img src={linkedin} alt="linkedin" /></a>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div className='luis'>
                            <div className='photo'>
                                <img src={imgLuis} alt="Photo" />
                            </div>
                            <div className='text-photo'>
                                <p>
                                    <span className='first-text-teams'><strong>Luis Felipe</strong></span>
                                    <span className='second-text-teams'>Frontend Devoloped</span>
                                </p>
                                <div className='line redes-sociais'>
                                    <ul>
                                        <li>
                                            <a href="https://github.com/luisfelipe23" className=''
                                            > <img src={github} alt="github" /> </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/mwlite/in/luis-felipe-torres-7b54731a4"
                                             className=''><img src={linkedin} alt="linkedin" /></a>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className='victor'>
                            <div className='photo'>
                                <img src={imgVictor} alt="Photo" />
                            </div>
                            <div className='text-photo'>
                                <p>
                                    <span className='first-text-teams'><strong>Victor Martins</strong></span>
                                    <span className='second-text-teams'>Backend Devoloped</span>
                                </p>
                                <div className='line redes-sociais'>
                                    <ul>
                                        <li>
                                            <a href="https://github.com/loiola0/" className=''
                                            ><img src={github} alt="github" /></a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/in/victor-martins-734933120/" 
                                            className=''><img src={linkedin} alt="linkedin" /></a>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}