import React from 'react'
import $ from 'jquery';


import './Menu.scss'
import '../../../Style.scss'

import Logo from '../assets/Logo.png'

export default props => {
    function down(params) {
        if (params === 'about') {
            $("html, body").animate({
                scrollTop: 910
            }, 2000);
        }
        else {
            if (params === 'team') {
            $("html, body").animate({
                scrollTop: 1830
            }, 2000);
        }
    }
    }
    return (
        <header>
            <div className='container'>
                <img
                    src={Logo}
                    alt="Rocketseat"
                />
                <div className="menu-section">
                    <div className="menu-toggle">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a href="#" >Home</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => down('about')}>Sobre Nós</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => down('team')}>Nossa Equipe</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}