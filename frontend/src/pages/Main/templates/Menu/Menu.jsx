// import React from 'react'
// import $ from 'jquery';


// import './Menu.scss'
// import Logo from '../../assets/Logo.png'

// export default props => {
//     function down(params) {
//         if (params === 'about') {
//             $("html, body").animate({
//                 scrollTop: 910
//             }, 2000);
//         }
//         else {
//             if (params === 'team') {
//             $("html, body").animate({
//                 scrollTop: 1830
//             }, 2000);
//         }
//     }
//     }
//     return (
//         <header>
//             <div className='container'>
//                 <img
//                     src={Logo}
//                     alt="ECG-NOW"
//                 />
//                 <div className="menu-section">
//                     <div className="menu-toggle">
//                         <div className="one"></div>
//                         <div className="two"></div>
//                         <div className="three"></div>
//                     </div>
//                     <nav>
//                         <ul>
//                             <li>
//                                 <a href="#" >Home</a>
//                             </li>
//                             <li>
//                                 <a href="#" onClick={() => down('about')}>Sobre Nós</a>
//                             </li>
//                             <li>
//                                 <a href="#" onClick={() => down('team')}>Nossa Equipe</a>
//                             </li>
//                         </ul>
//                     </nav>
//                 </div>
//             </div>
//         </header>
//     )
// }

import React, {useState} from 'react'
import $ from 'jquery';

import './Menu.scss'
import Logo from '../../assets/Logo.png'

export default props => {
    function down(params) {
        if (params === 'about') {
            $("html, body").animate({
                scrollTop: 850
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
                    alt="ECG-NOW"
                />

                <div className="menu-section">
                    <input type="checkbox" id="menu-toggle"/>
                    <div className="hamburguer">
                        <label for="menu-toggle">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </label>   
                        <div className = "drop"></div> 
                        <div className="menu-nav">
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
                </div>
            </div>
        </header>
    )
}