import React, { Component } from 'react'

import api from '../../service/api'

import './cadastro-user.scss'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            pass: '',
            passconfirm: '',
            users: [],
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleChangeConfirmPass = this.handleChangeConfirmPass.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChangeEmail(e) {
        this.setState({ ...this.state, email: e.target.value })
    }

    handleChangeUserName(e) {
        this.setState({ ...this.state, username: e.target.value })
    }

    handleChangePass(e) {
        this.setState({ ...this.state, pass: e.target.value })
    }

    handleChangeConfirmPass(e) {
        this.setState({ ...this.state, passconfirm: e.target.value })
    }

    handleAdd() {
        const email = this.state.email;
        const username = this.state.username;
        const pass = this.state.pass;
        api.post(process.env.REACT_APP_BACKEND_ADRESS + process.env.REACT_APP_ENDPOINT_CREATE_USERS,
            { email, username, pass })
    }

    equalsPass(pass, confirmPass) {
        if (pass !== confirmPass) {
            alert("Senhas diferentes")
            this.setState({ ...this.state, pass: '' })
            this.setState({ ...this.state, passconfirm: '' })
        }
        else 
        return true
    }


    render() {
        return (
            <div>
                <main>
                    <div className='register-center'>
                        <h2>Cadastro</h2>
                        <div className='register-margin'>
                            <form method="post" action="">
                                <div className='user-space'>
                                    <div className='name-form'>
                                        <label>Email</label>
                                    </div>
                                    <div className='input-form'>
                                        <input required="required" type="email" value={this.state.email}
                                            onChange={this.handleChangeEmail} />
                                    </div>
                                </div>

                                <div className='user-space'>
                                    <div className='name-form'>
                                        <label>Username</label>
                                    </div>
                                    <div className='input-form'>
                                        <input required="required" type="text" value={this.state.username}
                                            onChange={this.handleChangeUserName} />
                                    </div>
                                </div>
                                <div className='user-space'>
                                    <div className='name-form'>
                                        <label>Senha</label>
                                    </div>
                                    <div className='input-form'>
                                        <input required="required" type="password" value={this.state.pass}
                                            onChange={this.handleChangePass} />
                                    </div>
                                </div>

                                <div className='user-space'>
                                    <div className='name-form'>
                                        <label>Confirmar Senha</label>
                                    </div>
                                    <div className='input-form'>
                                        <input required="required" type="password" value={this.state.confirmPass}
                                            onChange={this.handleChangeConfirmPass} />
                                    </div>
                                </div>

                                <div className='user-space-input'>
                                    <div className='input-form first-button'>
                                        <button className='custom-button-register'
                                            onSubmit={this.equalsPass}
                                        >
                                            Cadastrar</button>
                                    </div>

                                    <div className='name-form text-center'>
                                        <label>Ja possui uma conta?</label>
                                    </div>
                                    <div className='input-form'>
                                        <button type="button" 
                                            className='custom-button-register'>Fazer Login</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default index;