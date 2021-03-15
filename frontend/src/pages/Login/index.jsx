import React, { Component } from 'react';

import './login.scss';
import imgPaciente from './44305.png';

import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";


import api from '../../service/session';

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
        try{
            api.login(this.state.form)
        }catch(err){
                console.log(err)
        }
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
                                        placeholder="Nome de Usuário" required onChange={this.userChange} />
                                </div>
                                <div className="login-senha">
                                    <input type="password" placeholder="Senha"
                                        onChange={this.userChange} required name="password" />
                                </div>
                            </div>
                            <div className="botao-entrar">
                                <button type="submit" onClick={this.buttonSubmit}>ENTRAR</button>
                            </div>
                        </form>
                        <div className="cadastro">
                            <h4>Não tem conta?</h4>
                            <Link className='reset-link' to='opcao-cadastro'>
                                <button>CADASTRE-SE</button>
                            </Link>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
};

export default Login;