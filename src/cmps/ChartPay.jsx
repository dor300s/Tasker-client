import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';

const data = {
	labels: [
		'Todo',
		'In progress',
		'Done'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};



export default class ChartPay extends Component {

  render() {
    return (
      <div className="chart-pay">
        <h2>Pie Example</h2>
        <Pie data={data} />
      </div>
    );
  }
};