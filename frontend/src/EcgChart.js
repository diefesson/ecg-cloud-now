import React from 'react'
import {Chart} from 'chart.js'
import fetch from 'node-fetch'

const SAMPLE_LIMIT = 1000

class EcgChart extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div class="ecg-chart">
            <canvas ref="chart"></canvas>
            </div>
            )
    }

    componentDidMount(){
        this.plotChart()
    }

    componentDidUpdate(prevProps){
        if(this.props.sampleId !== prevProps.sampleId){
            this.plotChart()
        }
    }

    plotChart(){
        var id = this.props.sampleId
        if(id === undefined){
            this.createChart("ECG")
            return
        }

        getSample(id).then((sample) => {
            this.createChart("ECG " + id, sample["raw"], sample["frequency"])
        }).catch((e) => {

            this.createChart("error: " + e)
        })
    }

    createChart(title: string, data: [number] = [0], frequency: number = 250){
        const chart = this.refs.chart
        const context = chart.getContext("2d")

        new Chart(context, {
            type: "line",
            responsive: false,

            data:{
                labels: [...Array(data.length).keys()]
                .slice(0, SAMPLE_LIMIT)
                .map((v) => {return v / frequency}),
                datasets:[{
                    label: title,
                    data: data,

                    lineTension: 0,
                    pointRadius: 0,
                    borderWidth: 1,
                    fill:false,
                    borderColor: "rgb(255, 30, 30)",
                }],
            },

            options: {
                animation: {
                    duration: 0
                },
                hover: {
                    animationDuration: 0
                },
                responsiveAnimationDuration: 0
            }
        })
    }

}


async function getSample(sample_id: number): Sample{
    const response = await fetch("http://3.17.181.0:8080/sample/" + sample_id) // Replace with enviroment variable
    const sample = await response.json()
    sample["raw"] = b64ToData(sample["raw"])
    return sample
}



function b64ToData(b64: string): [Number]{
    const text = atob(b64)
    const data = Array(text.length).fill(0)
    for(let i in data){
        data[i] = text.charCodeAt(i)
    }
    return data
}

export default EcgChart
