import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import cssVar from '../styles/setup/variable.js'


const data = {
    labels: ['23/5', '24/5', '25/5', '26/5', '27/5', '28/5', '29/5'],
    datasets: [
        {
            label: 'Todo',
            fill: false,
            lineTension: 0.5,
            backgroundColor: cssVar.$clrChart9,
            borderColor: cssVar.$clrChart9,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: cssVar.$clrChart9,
            pointBackgroundColor: cssVar.$clrChart9,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: cssVar.$clrChart9,
            pointHoverBorderColor: cssVar.$clrChart9,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 2, 5, 1, 6, 5, 2]
        }, {
            label: 'In progress',
            fill: false,
            lineTension: 0.5,
            backgroundColor: cssVar.$clrChart10,
            borderColor: cssVar.$clrChart10,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: cssVar.$clrChart10,
            pointBackgroundColor: cssVar.$clrChart10,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: cssVar.$clrChart10,
            pointHoverBorderColor: cssVar.$clrChart10,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 4, 1, 3, 4, 5, 6]
        }
    ]
};



export default class ChartLine extends Component {

    render() {
        return (
            <div className="chart-line">
                <h2>Task amount to day</h2>
                <Line data={data} />
            </div>
        );
    }
};