import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
import cssVar from '../styles/setup/variable.js'

const data = {
	labels: [
		'Todo',
		'In progress',
	],
	datasets: [{
		data: [10, 5],
		backgroundColor: [
			cssVar.$clrChart9,
			cssVar.$clrChart10,
		],

		hoverBackgroundColor: [
			`rgba(${cssVar.$clrChart9}, 0.8)`,
			`rgba(${cssVar.$clrChart10}, 0.8)`,
		]
	}]
};



export default class ChartPay extends Component {

	render() {
		return (
			<div className="chart-pay">
				<h2>Card popularipopularity</h2>
				<Pie data={data} />
			</div>
		);
	}
};