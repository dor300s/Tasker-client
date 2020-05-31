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
			cssVar.$clrChart9,
			cssVar.$clrChart10,
			cssVar.$clrChart8,
		],

		hoverBackgroundColor: [
			`rgba(${cssVar.$clrChart9}, 0.8)`,
			`rgba(${cssVar.$clrChart10}, 0.8)`,
			`rgba(${cssVar.$clrChart8}, 0.8)`,
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