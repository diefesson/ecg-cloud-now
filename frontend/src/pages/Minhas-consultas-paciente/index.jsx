import React, { Component } from 'react'

import './style.scss'

import Menu from '../Main/templates/Menu-Vertical/paciente/Menu-Vertical'
import Card from '../Main/templates/Cards/Minhas-consultas/index'
import Logout from '../Main/templates/Logout/index'
import BadRequest from '../Main/templates/Redirect/index'
import Paciente from '../../service/pacient'


class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            appointments: [],
        }
    }

    componentDidMount = async function () {
        const id = localStorage.getItem('id')
        const response = await Paciente.listAppointmentPatient(id);
        this.setState({ appointments: response.data.appointments });
    }

    renderInfo(medicId, appointmentId) {
        localStorage.setItem('medicId', medicId)
        localStorage.setItem('appointmentId', appointmentId)
    }

    render() {
        const session = localStorage.getItem('session')
        const type = localStorage.getItem("type")
        const { appointments } = this.state;
        var index = 0;
        if (session === "true" && type === '0') {
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
                        <div className='grid-preview grid-consultas'>
                            {appointments.map(appointment => {
                                { index++ }
                                const newDate = new Date(appointment.time)
                                const day = newDate.getDate();
                                const month = newDate.getMonth() + 1;
                                const hours = newDate.getHours();
                                const minutes = newDate.getMinutes();
                                return (
                                    <div className='card-position-consultas'
                                        onClick={() => this.renderInfo(appointment.medicId,
                                            appointment.appointmentId)}
                                        key={appointment.appointmentId}>
                                        <Card consulta={index} date={day + "/" + month} 
                                        time={hours + ":" + minutes}/>

                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            )
        }
        if (session != "true" || type === '1') {
            return (
                <BadRequest />
            )
        }
    }
}

export default index;