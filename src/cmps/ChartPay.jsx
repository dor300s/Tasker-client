import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
import cssVar from '../styles/setup/variable.js'

const data = {
	labels: [
		'Todo',
		'In progress',
		'Done'
	],
	datasets: [{
		data: [10, 5, 2],
		backgroundColor: [
			cssVar.$clrChart8,
			cssVar.$clrChart7,
			cssVar.$clrChart6

		],
		hoverBackgroundColor: [
			`darken($color: ${cssVar.$clrChart8}, $amount: 15%)`,
			`darken($color: ${cssVar.$clrChart7}, $amount: 15%)`,
			`darken($color: ${cssVar.$clrChart6}, $amount: 15%)`
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