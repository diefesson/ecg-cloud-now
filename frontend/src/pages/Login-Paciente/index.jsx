import React from 'react';
import './login-paciente.scss';
import imgPaciente from './44305.png';

function LoginPaciente() {
    return (
        <div className="conteudo">
            <div className="container1">
                <img src={imgPaciente} alt="Login Paciente"/>
                <div className="container2">
                    <div className="titulo">
                        <h1>BEM-VINDO</h1>
                    </div>
                    <div className="login">
                        <div className="login-email">
                            <input type="text" placeholder="Nome de Usuário" />
                        </div>
                        <div className="login-senha">
                            <input type="password" placeholder="Senha" />
                        </div>
                    </div>
                    <div className="botao-entrar">
                        <button type="submit">ENTRAR</button>
                    </div>
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
    );
};

export default LoginPaciente;