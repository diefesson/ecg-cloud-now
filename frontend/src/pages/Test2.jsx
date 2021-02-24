import React, { Component } from 'react'

export default class Test2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            endereco: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    handleChange(e){
        this.setState({...this.state, nome: e.target.value})
    }

    handleAdd() {
        console.log(this.state.nome)
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.nome} onChange={ this.handleChange } />
                <input type="button" onClick={this.handleAdd} id="" />
            </div>
        )
    }

}

