import React, { UseState, useEffect, Component } from 'react';
import api from '../../service/api'


import './cadastro-pacientes.scss'


class index extends Component {

    constructor(props){
        super(props)
        this.state = {
            cpf: '',
            name: '',
            sexo: '',
            details: '',
            email: '',
            phone: '',
            adress: 'Crateús, Ceará',
            cep: '',
            cns: '',            
            senha: ''
          }

          this.handleChange = this.handleChange.bind(this);
          this.handleAdd = this.handleAdd.bind(this);     
    }

    handleChange(e){
            this.setState({...this.state, nome: e.target.value})
    }

    handleAdd() {
        api.post()
    }


    render() {
        return (
            <div>
                <main>
                    <div className='register-center'>
                        <h2>Cadastro</h2>
                        <div className='register-margin'>
                            <form method="post" action="">
                                <div className='name-form'>
                                    <label>Nome Completo</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type="text" value={this.state.nome}
                                     onChange={ this.handleChange }/>
                                </div>
                                <div className='name-form'>
                                    <label>CPF</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type="text"
                                        placeholder="_ _ _ . _ _ _ . _ _ _ - _ _" />
                                </div>
                                <div className='line'>
                                    <div className='col-50'>
                                        <div className='name-form'>
                                            <label>Sexo</label>
                                        </div>
                                        <div className='input-form-two-elements'>
                                            <select required="required">
                                                <option value="0">Masculino</option>
                                                <option value="0">Feminino</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col-50 '>
                                        <div className='input-two'>

                                            <div className='name-form '>
                                                <label className=''>Número</label>
                                            </div>
                                            <div className='input-form-two-elements'>
                                                <input required="required" type="text"
                                                    placeholder="( _ _ ) _ _ _ _ _ - _ _ _ _" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='line'>
                                    <div className='col-50'>
                                        <div className='name-form'>
                                            <label>Município</label>
                                        </div>
                                        <div className='input-form-two-elements'>
                                            <input required="required" type="text" value='Crateús' />
                                        </div>
                                    </div>
                                    <div className='col-50 '>
                                        <div className='input-two'>

                                            <div className='name-form '>
                                                <label className=''>Estado</label>
                                            </div>
                                            <div className='input-form-two-elements'>
                                                <input required="required" type="text" value='Ceará' />
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
                                            <input required="required" type="text" />
                                        </div>
                                    </div>
                                    <div className='col-50 '>
                                        <div className='input-two-adress'>

                                            <div className='name-form '>
                                                <label className=''>Complemento</label>
                                            </div>
                                            <div className='input-form-two-elements'>
                                                <input required="required" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='name-form'>
                                    <label>Email</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type='text' placeholder="" />
                                </div>

                                <div className='name-form'>
                                    <label>Senha</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type="text" placeholder="" />
                                </div>
                                <div className='name-form'>
                                    <label>Confirmar Senha</label>
                                </div>
                                <div className='input-form'>
                                    <input required="required" type="text" placeholder="" />
                                </div>

                                <div className='input-form first-button'>
                                    <button className='custom-button-register'>Cadastrar</button>
                                </div>

                                <div className='name-form text-center'>
                                    <label>Ja possui uma conta?</label>
                                </div>
                                <div className='input-form'>
                                    <button className='custom-button-register'>Fazer Login</button>
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