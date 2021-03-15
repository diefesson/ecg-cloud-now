import { Component } from 'react'

import EcgChart from '../EcgChart'

import Consulta from '../service/consulta'
import Medico from '../service/medico'

class Test extends Component {
    state = {
        consultas: [],
        medico: ''
    }

    componentDidMount = async function () {
        const response = await Consulta.list();
        this.setState({ consultas: response.data.appointments });
    }

    componentDidMount(id) {
        this.getName(id);
      }

    getName = async function (id) {
        const response = await Medico.byId(id);
        console.log(response.data.user.name)
    }

    render() {
        const { consultas } = this.state
        return (
            <div>
                {consultas.map(consulta => (
                    <div>
                        {/* {this.componentDidMount(consulta.medicId)} */}
                    </div>

                ))}

                {/* <h1>ECG do paciente 4</h1>

                <div className='dado-ecg'>
                    <EcgChart sampleId="18" className='dado'/>
                </div> */}


            </div>
        )
    }

}

export default Test;