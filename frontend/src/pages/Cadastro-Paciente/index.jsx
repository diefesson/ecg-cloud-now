import React, { UseState, useEffect, Component } from 'react';
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import api from '../../service/api'

import './cadastro-pacientes.scss'


class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            name: '',
            phone: '',
            type: 0,
            idDoc: '',
            state: '',
            city: '',
            idDoc: '',
            address: '',
            password: '',
            confirmPass: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChange = async (e) => {
        await this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    userSubmit(e) {
        e.preventDefault();
    }

    handleAdd() {
        const name = this.state.name;
        const phone = this.state.phone;
        const idDoc = this.state.idDoc;
        const address = this.state.address;
        const state = this.state.state;
        const city = this.state.city;
        const district = this.state.district;
        const email = this.state.email;
        const username = this.state.username;
        const password = this.state.password;
        const type = this.state.type;

        

        api.post(process.env.REACT_APP_ENDPOINT_CREATE_USER,
            { username, email, name, phone, type, idDoc, state, city, district, address, password }).then(() => {
                alert("Conta criada com sucesso!!")
                window.location.replace('/login-paciente')
            }
            ).catch((error) => {
            }
            )
    }

    equalsPass(pass, confirmPass) {
        if (pass !== confirmPass) {
            alert("Senhas diferentes")
        }
        else if (pass === confirmPass && pass.length < 7) {
            alert("Sua senha deve ser maior que 6 caracteres")
        }
        else if (pass === confirmPass && pass.length != 0) {
            this.handleAdd();
        }
    }

    
    render() {
        return (
            <div>
                <main>
                    <div className='register-center'>
                        <h2 className='text-center'>Cadastro</h2>
                        <div className='register-margin'>
                            <form method="post" onSubmit={this.userSubmit}>
                                <div className='name-form'>
                                    <label>Nome Completo</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type="text" name="name"
                                        onChange={this.handleChange} />
                                </div>
                                <div className='line'>
                                    <div className='col-50'>
                                        <div className='name-form'>
                                            <label>CPF</label>
                                        </div>
                                        <div className='input-form-two-elements'>
                                            <input required="required" type="text" name="idDoc"
                                                onChange={this.handleChange} placeholder="_ _ _ . _ _ _ . _ _ _ - _ _" />
                                        </div>
                                    </div>
                                    <div className='col-50 '>
                                        <div className='input-two'>

                                            <div className='name-form '>
                                                <label className=''>Número</label>
                                            </div>
                                            <div className='input-form-two-elements'>
                                                <input required="required" type="text" name="phone"
                                                    onChange={this.handleChange} placeholder="( _ _ ) _ _ _ _ _ - _ _ _ _" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='line'>
                                    <div className='col-50'>
                                        <div className='name-form'>
                                            <label>Cidade</label>
                                        </div>
                                        <div className='input-form-two-elements'>
                                            <input required="required" type="text" name="city"
                                                onChange={this.handleChange} placeholder="Ex: Crateús" />
                                        </div>
                                    </div>
                                    <div className='col-50 '>
                                        <div className='input-two'>

                                            <div className='name-form '>
                                                <label className=''>Estado</label>
                                            </div>
                                            <div className='input-form-two-elements'>
                                                <input required="required" type="text" name="state"
                                                    onChange={this.handleChange} placeholder="Ex: CE" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='line'>
                                    <div className='col-50'>
                                        <div className='name-form'>
                                            <label>Endereço</label>
                                        </div>
                                        <div className='input-form-two-elements'>
                                            <input required="required" type="text" name="address"
                                                onChange={this.handleChange} placeholder="Ex: Rua . . ." />
                                        </div>
                                    </div>
                                    <div className='col-50 '>
                                        <div className='input-two-adress'>

                                            <div className='name-form '>
                                                <label className=''>Bairro</label>
                                            </div>
                                            <div className='input-form-two-elements'>
                                                <input required="required" type="text" name="district"
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='name-form'>
                                    <label>Email</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type='text' name="email"
                                        type="email" onChange={this.handleChange} />
                                </div>
                                <div className='name-form'>
                                    <label>Nome de usuário</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type='text' name="username"
                                        onChange={this.handleChange} />
                                </div>

                                <div className='name-form'>
                                    <label>Senha</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type="text" name="password"
                                        type="password" onChange={this.handleChange} />
                                </div>
                                <div className='name-form'>
                                    <label>Confirmar Senha</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type="text" name="confirmPass"
                                        type="password" onChange={this.handleChange} />
                                </div>

                                <div className='input-form first-button'>
                                    <button className='custom-button-register'
                                        onClick={e => this.equalsPass(this.state.password,
                                            this.state.confirmPass)}
                                    >Cadastrar</button>
                                </div>

                                <div className='name-form text-center'>
                                    <label>Ja possui uma conta?</label>
                                </div>
                                <div className='input-form'>
                                    <Link className='' to='login-paciente'>
                                        <button className='custom-button-register '>Fazer Login</button>
                                    </Link>

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