import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2';
import cssVar from '../styles/setup/variable.js'


let colorPalate = [cssVar.$clrChart1, cssVar.$clrChart2, cssVar.$clrChart3, cssVar.$clrChart4, cssVar.$clrChart5, cssVar.$clrChart6, cssVar.$clrChart7, cssVar.$clrChart8, cssVar.$clrChart9, cssVar.$clrChart10]


export default class ChartPay extends Component {

	updateData = () => {
		const { currBoard } = this.props;
		let data = {
			labels: [],
			datasets: null,
		}
		data.labels = currBoard.cardLists.map(cardList => cardList.title)
		const cardLength = currBoard.cardLists.map(cardList => cardList.cards.length)
		data.datasets = [{
			data: cardLength,
			backgroundColor: colorPalate,
			hoverBackgroundColor: colorPalate,
		}]
		return data
	}


	render() {
		return (
			<div className="chart-pay">
				<h2>Cards per list</h2>
				<Pie data={this.updateData()} /* options={{ animation:{animateRotat: true}, }} */ />
			</div>
		);
	}
};