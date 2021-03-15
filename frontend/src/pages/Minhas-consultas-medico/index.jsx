import React, { Component } from 'react'
import {
    BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";

import './style.scss'

import Menu from '../Main/templates/Menu-Vertical/medico/menu-Vertical'
import Logout from '../Main/templates/Logout/index'
import BadRequest from '../Main/templates/Redirect/index'
import Medico from '../../service/medico'
import User from '../../service/users'


class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
            user: {}
        }
        this.getValuesPatient = this.getValuesPatient.bind(this);
    }

    componentDidMount = async function () {
        const id = localStorage.getItem('id')
        const response = await Medico.listAppointmentMedic(id);
        this.setState({ appointments: response.data.appointments });
    }

    getValuesPatient = async function (id) {
        const response = await User.byId(id);
        this.setState({ user: response.data });
        console.log(response.data);
        return response.data.name
    }

    renderInfo(patientId, appointmentId){
        localStorage.setItem('patientId', patientId)
        localStorage.setItem('appointmentId', appointmentId)
    }

    render() {
        const session = localStorage.getItem('session')
        const type = localStorage.getItem("type")
        if (session === "true" && type === '1') {
            const { appointments } = this.state;
            return (
                <div className='flex'>
                    <Menu />
                    <div className='grid-minhas-consultas'>
                        <div>
                            <Logout />
                        </div>
                        <div className='margin-minhas-consultas'>
                            <h2>Minhas consultas</h2>
                        </div>
                        <div className='borda-meus-pacientes'>
                            <table id="customers">
                                <tr>
                                    <th>Paciente</th>
                                    <th>Data</th>
                                    <th>Hora</th>
                                    <th>Local</th>
                                    <th></th>
                                </tr>
                                {appointments.map(appointment => {
                                    const newDate = new Date(appointment.time)
                                    const day = newDate.getUTCDate();
                                    const month = newDate.getUTCMonth();
                                    const hours = newDate.getUTCHours();
                                    const minutes = newDate.getUTCMinutes();
                                    return (
                                        <tr className='text-center' key={appointment.appointmentId}>
                                            <td>Jose Sebastiao da Silva</td>
                                            <td>{day}/{month}</td>
                                            <td>{hours}:{minutes}</td>
                                            <td>Hospital das Clínicas - Crateús</td>
                                            <td className='table-select-patient '>
                                                <Link className='reset-link-menu' 
                                                onClick={() => 
                                     this.renderInfo(appointment.patientId, appointment.appointmentId)}
                                                    to='detalhes-consulta-medico'>
                                                    <svg width="50" height="32" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M18.623 4.2559C10.7098 4.2559 4.256 10.7099 4.256 18.6229C4.256 26.5361 10.71 32.9899 18.623 32.9899C21.8644 32.9899 24.8513 31.8945 27.2597 30.0719C27.3067 30.13 27.3569 30.1854 27.4101 30.2379L42.3081 45.1359C42.4923 45.328 42.7131 45.4814 42.9574 45.587C43.2017 45.6927 43.4646 45.7486 43.7307 45.7513C43.9969 45.7541 44.2609 45.7037 44.5074 45.6031C44.7538 45.5026 44.9777 45.3538 45.1659 45.1656C45.3541 44.9774 45.5028 44.7535 45.6034 44.5071C45.704 44.2606 45.7544 43.9966 45.7516 43.7305C45.7488 43.4643 45.693 43.2014 45.5873 42.9571C45.4816 42.7128 45.3283 42.4921 45.1362 42.3078L30.2382 27.4098C30.1857 27.3566 30.1303 27.3064 30.0722 27.2594C31.8947 24.851 32.9902 21.8641 32.9902 18.6227C32.9902 10.7095 26.5362 4.25573 18.6232 4.25573L18.623 4.2559ZM18.623 7.8457C24.5962 7.8457 29.4 12.6499 29.4 18.6227C29.4 24.5959 24.5958 29.3997 18.623 29.3997C12.6502 29.3997 7.846 24.5955 7.846 18.6227C7.846 12.6495 12.6502 7.8457 18.623 7.8457V7.8457Z" fill="#555555" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>

                        </div>
                    </div>
                </div>
            )
        }
        if (session != "true" || type === '0') {
            return (
                <BadRequest />
            )
        }
    }
}

export default index;