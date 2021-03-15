import React from 'react'
import User from '../../../../service/users'

import './style.scss'
import Logout from './assets/logout.png'

export default props=> {
    const logout = () =>  {
        localStorage.clear();
        User.logout();
    }

    return(
        <div className='username-home'>
                    <p className="username-top-logout">{localStorage.getItem('username')} </p>
                    <a href="/login-paciente" onClick={logout}> <img src={Logout} alt="Logout" /></a>
        </div>
    )
}