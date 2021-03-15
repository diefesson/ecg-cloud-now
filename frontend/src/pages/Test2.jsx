import React, { Component, UseState, useEffect} from 'react';

import Medico from '../service/medico'
import Consulta from '../service/consulta'


class Test2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            doctors: [],
            doctorId: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange = async (e) => {
        await this.setState({
            ...this.state,
            doctorId: e.target.value
        })
    }

    componentDidMount = async function () {
        const medicos = await Medico.list()
        this.setState({ doctors: medicos.data.users });
    }

    create(){
        const medicId = this.state.doctorId;
        const patientId = localStorage.getItem('id');
        Consulta.save(medicId, patientId)
    }
    
    render() {
        const { doctors } = this.state;
        return (
            <div>  
                <select className='button-select-consulta' onChange={this.handleChange}>
                {doctors.map(doctor => (
                    <option key={doctor.userId} value={doctor.userId} 
                    className='text-center' >
                        {doctor.name}</option>
                    ))}
                </select>
                <input type="button" onClick={() => this.create()}/>
            </div>
        )
    }

}

export default Test2;

