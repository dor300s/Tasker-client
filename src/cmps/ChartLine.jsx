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
            backgroundColor: cssVar.$clrChart1,
            borderColor: cssVar.$clrChart1,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: cssVar.$clrChart1,
            pointBackgroundColor: cssVar.$clrChart1,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: cssVar.$clrChart1,
            pointHoverBorderColor: cssVar.$clrChart1,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 2, 5, 1, 6, 5, 2]
        }, {
            label: 'In progress',
            fill: false,
            lineTension: 0.5,
            backgroundColor: cssVar.$clrChart2,
            borderColor: cssVar.$clrChart2,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: cssVar.$clrChart2,
            pointBackgroundColor: cssVar.$clrChart2,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: cssVar.$clrChart2,
            pointHoverBorderColor: cssVar.$clrChart2,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 4, 1, 3, 4, 5, 6]
        }, {
            label: 'Done',
            fill: false,
            lineTension: 0.5,
            backgroundColor: cssVar.$clrChart3,
            borderColor: cssVar.$clrChart3,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: cssVar.$clrChart3,
            pointBackgroundColor: cssVar.$clrChart3,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: cssVar.$clrChart3,
            pointHoverBorderColor: cssVar.$clrChart3,
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
                <h2>Task amount to day</h2>
                <Line data={data} />
            </div>
        );
    }
};