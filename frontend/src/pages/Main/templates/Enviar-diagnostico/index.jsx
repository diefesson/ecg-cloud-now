import React, { Component } from 'react'
import Patient from '../../../../service/users'

import './style.scss'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patient: ""
        }
    }

    componentDidMount = async function () {
        const patientId = localStorage.getItem('patientId');
        const response = await Patient.byId(patientId);
        this.setState({ patient: response.data.user.name });
    }

    handleChange = async (e) => {
        await this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className='border-send-appointment'>
                <div className='name-patient'>
                    <strong>Paciente:</strong> {this.state.patient}
                </div>
                <form action="">
                    <div>
                        <div className='name-input-diagnostico'>
                            Conclusões
                    </div>
                        <div className='input-send-diagnostico'>
                            <textarea name="" placeholder='Digite suas conclusões baseadas no eletrocardiograma...'
                                required cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div>
                        <div className='name-input-diagnostico'>
                            Receita
                    </div>
                        <div className='input-send-diagnostico'>
                            <textarea required name="" placeholder='Digite os medicamentos a serem tomados...'
                                cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div className='inputs-diagnosticos'>
                        <div>
                            <input required type="text" placeholder="Glicemia..." />
                        </div>
                        <div>
                            <input required type="text" placeholder="Pressão Arterial..." />
                        </div>
                        <div>
                            <input required type="text" placeholder="Temp Corporal..." />
                        </div>
                    </div>
                    <div className='upload-ecg'>
                        <input required type="file" />
                    </div>
                    <div className='input-submit-diagnostico'>
                        <input type="submit" value="Enviar" />
                    </div>
                </form>
            </div>
        )
    }
}

export default index;

