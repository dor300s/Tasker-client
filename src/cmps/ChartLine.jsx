import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['23/5', '24/5', '25/5', '26/5', '27/5', '28/5', '29/5'],
    datasets: [
        {
            label: 'Todo',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba($clrChart8,0.4)',
            borderColor: 'rgba($clrChart8,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba($clrChart8,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba($clrChart8,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 2, 5, 1, 6, 5, 2]
        }, {
            label: 'In progress',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba($clrChart7,0.4)',
            borderColor: 'rgba($clrChart7,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba($clrChart7,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba($clrChart7,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 4, 1, 3, 4, 5, 6]
        }, {
            label: 'Done',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba($clrChart6,0.4)',
            borderColor: 'rgba($clrChart6,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba($clrChart6,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba($clrChart6, 1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [1, 2, 3, 2, 1, 1, 3]
        }
    ]
};



export default class ChartLine extends Component {

    render() {
        return (
            <div className="chart-line">
                <h2>Line Example</h2>
                <Line data={data} />
            </div>
        );
    }
};