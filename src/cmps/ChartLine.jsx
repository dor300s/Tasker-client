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
            backgroundColor: `rgba(${cssVar.$clrChart8}, 0.4)`,
            borderColor: `rgba(${cssVar.$clrChart8}, 1)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${cssVar.$clrChart8}, 1)`,
            pointBackgroundColor: cssVar.$clrChart8,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${cssVar.$clrChart8},1)`,
            pointHoverBorderColor: `rgba(${cssVar.$clrChart8},1)`,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 2, 5, 1, 6, 5, 2]
        }, {
            label: 'In progress',
            fill: false,
            lineTension: 0.5,
            backgroundColor: `rgba(${cssVar.$clrChart7}, 0.4)`,
            borderColor: `rgba(${cssVar.$clrChart7}, 1)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${cssVar.$clrChart7}, 1)`,
            pointBackgroundColor: cssVar.$clrChart7,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${cssVar.$clrChart7},1)`,
            pointHoverBorderColor: `rgba(${cssVar.$clrChart7},1)`,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [3, 4, 1, 3, 4, 5, 6]
        }, {
            label: 'Done',
            fill: false,
            lineTension: 0.5,
            backgroundColor: `rgba(${cssVar.$clrChart6}, 0.4)`,
            borderColor: `rgba(${cssVar.$clrChart6}, 1)`,
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: `rgba(${cssVar.$clrChart6}, 1)`,
            pointBackgroundColor: cssVar.$clrChart6,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: `rgba(${cssVar.$clrChart6},1)`,
            pointHoverBorderColor: `rgba(${cssVar.$clrChart6},1)`,
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