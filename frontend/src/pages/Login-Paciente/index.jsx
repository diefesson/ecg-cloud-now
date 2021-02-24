import React, { Component } from 'react';

import './login-paciente.scss';
import imgPaciente from './44305.png';

import Conjunto from '../conjunto'

import api from '../../service/api';





class Login extends Component {

    state = {
        form: {
            "username": '',
            "password": '',
        },
    }

    userSubmit(e) {
        e.preventDefault();
    }

    buttonSubmit = () => {
        api.post(process.env.REACT_APP_ENDPOINT_CREATE_SESSION, this.state.form).then(
            response => {
                let data
                if(response.config.data){
                        data = this.state.form.username
                    localStorage.setItem('app-token', data)
                    alert("Seja bem vindo!")
                    // History.push(Conjunto)
                    
                }
            }
        ).catch((error) => {
            alert("Username ou senha incorretos!")
            }
        )
    }

    userChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <div className="conteudo">
                <div className="container1">
                    <img src={imgPaciente} alt="Login Paciente" />
                    <div className="container2">
                        <div className="titulo">
                            <h1>BEM-VINDO</h1>
                        </div>
                        <form onSubmit={this.userSubmit}>
                            <div className="login">
                                <div className="login-email">
                                    <input type="text" name="username"
                                        placeholder="Nome de Usuário" onChange={this.userChange} />
                                </div>
                                <div className="login-senha">
                                    <input type="password" placeholder="Senha"
                                        onChange={this.userChange} name="password" />
                                </div>
                            </div>
                            <div className="botao-entrar">
                                <button type="submit" onClick={this.buttonSubmit}>ENTRAR</button>
                            </div>
                        </form>
                        <div className="login-ajuda">
                            <nav>
                                <ul>
                                    <li>Lembre de Mim</li>
                                    <li>Esqueceu a Senha?</li>
                                </ul>
                            </nav>
                            <div className="botao-selecionar">
                                <button type="button"></button>
                            </div>
                        </div>
                        <div className="cadastro">
                            <h4>Não tem conta?</h4>
                            <button>CADASTRE-SE</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
};

export default Login;