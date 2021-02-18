import { Component } from 'react'

import api from '../service/api'



class Test extends Component {
    state = {
        pacientes: [],
    }

    componentDidMount = async function () {


        const response = await api.get('' + process.env.REACT_APP_ENDPOINT_TODOS_PACIENTES);
        // console.log(response.data)

        this.setState({ pacientes: response.data });
    }

    render() {
        const { pacientes } = this.state;
            console.log(pacientes)
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
            </div>
        )
    }

}

export default Test;