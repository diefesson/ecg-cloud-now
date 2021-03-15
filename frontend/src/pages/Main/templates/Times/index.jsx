import React, { Component } from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import Consulta from '../../../../service/consulta'

import './style.scss'

class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            times: [],
            hours: 0,
            minutes: 0
        }
    }

    componentDidMount = async function () {
        const medicId = localStorage.getItem("medicId")
        const date = localStorage.getItem("date")
        const response = await Consulta.listByTime(medicId, date)
        this.setState({ times: response.data.available_times });
    }

    setTimes = function (hours, minutes) {
        this.setState({ hours: hours });
        this.setState({ minutes: minutes });
    }

    create() {
        const patientId = localStorage.getItem('id');
        const medicId = localStorage.getItem('medicId');
        const time = localStorage.getItem('date') + 'T' + this.state.hours + ':' + this.state.minutes +
            "+00:00";
        if (this.state.hours !== 0) {
            alert("Consulta criada com sucesso!!")
            Consulta.save(medicId, patientId, time)
        }
        else if (this.state.hours === 0) {
            alert("Consulta NÃO criada pois o horário não foi marcado!!")
        }

    }

    render() {
        const { times } = this.state;
        return (
            <div className='borda-consulta-times'>
                <div className='agroup-times'>
                    {times.map(time => {
                        const newDate = new Date(time);
                        const hours = newDate.getHours() + 3
                        const minutes = newDate.getMinutes()
                        return (
                            <div className='button-times-click'>
                                <input type="button" value={newDate.getHours() + ":" +
                                    minutes} name='time' onClick={() => this.setTimes(hours, minutes)} />
                            </div>
                        )
                    })}
                </div>
                <div className='submit-times'>
                    <hr />
                    <Link className='reset-link-menu input-submite' to='home-paciente'
                        onClick={() => this.create()}>
                        <h4>AGENDAR CONSULTA</h4>
                    </Link>
                </div>
            </div>
        )
    }

}

export default index;
