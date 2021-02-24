import { Component } from 'react'

import EcgChart from '../EcgChart'

import Paciente from '../service/pacient'   

class Test extends Component {
    state = {
        pacientes: [],
    }

    componentDidMount = async function () {
        const response = await Paciente.list().then();

        this.setState({ pacientes: response.data });
    }

    render() {
        const { pacientes } = this.state;
        return (
            <div>
                <h1>Dados da api de pacientes</h1>


                {pacientes.map(paciente => (


                    <ul key={paciente.paciente_id}>
                        <h3>{paciente.name}</h3>
                        <li className=''>{paciente.email}</li>
                        <li className=''>{paciente.address}</li>
                        <li className=''>{paciente.cep}</li>
                    </ul>

                ))}

                <h1>ECG do paciente 4</h1>

                <div className='dado-ecg'>
                    <EcgChart sampleId="18" className='dado'/>
                </div>


            </div>
        )
    }

}

export default Test;