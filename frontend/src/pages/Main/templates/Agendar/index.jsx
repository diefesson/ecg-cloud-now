import React, { Component } from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import Medico from '../../../../service/medico'
import Consulta from '../../../../service/consulta'



import './style.scss'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doctors: [],
            doctorId: 0,
            date: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = async (e) => {
        await this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    componentDidMount = async function () {
        const medicos = await Medico.list()
        this.setState({ doctors: medicos.data.users });
    }

    newPage() {
        const date = this.state.date;
        const medicId = this.state.doctorId;
        if (date !== "" && medicId !== 0) {
            localStorage.setItem('date', date)
            localStorage.setItem('medicId', medicId)
            window.location = 'horarios-consulta'
        }
        else if (date === "" || medicId === 0) {
            alert("Todos os campos devem ser preenchidos!!")
        }
    }

    render() {
        const { doctors } = this.state;
        const newDate = new Date();
        const year = newDate.getFullYear()
        const month = newDate.getMonth()
        const day = newDate.getDate()
        const today =  year + '-' + month + '-' + day;

        return (
            <div className='borda-consulta'>
                <div className='select-consulta'>
                    <select className='button-select-consulta' disabled>
                        <option className='text-center'>
                            Hospital das Clínicas - Crateús </option>
                    </select>
                </div>
                <div className='select-consulta'>
                    <select className='button-select-consulta' required onChange={this.handleChange}
                        name="doctorId">
                        <option value="" selected disabled> Selecione um dos médicos...</option>

                        {doctors.map(doctor => (
                            <option key={doctor.userId} value={doctor.userId}
                                className='text-center' >
                                {doctor.name}</option>
                        ))}
                    </select>
                </div>
                <div className='select-consulta'>
                    <div className='time-consulta'>
                        <input type="date" required min={today} name="date"
                            onChange={this.handleChange} />
                    </div>
                </div>
                <div className='button-submit-consulta'>
                    <div className='reset-link-menu button-new-page' type='submit' to='horarios-consulta'>
                        <button onClick={() => this.newPage()}><strong>Ver horários</strong></button>
                    </div>
                </div>
            </div>
        )
    }

}

export default index;
