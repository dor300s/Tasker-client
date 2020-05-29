import React, { Component } from 'react'
import ChartBar from '../cmps/ChartBar.jsx';


export default class ChartModal extends Component {
    state = {
        isCartModalOpen: false
    }

    onChartClick = () => {
        this.setState(prevState => ({ isCartModalOpen: !prevState.isCartModalOpen }))
    }

    render() {
        const {isCartModalOpen} = this.state;


        return (
            <div className={`chart-container `}>
                <div className="nav-chart-btn chart" onClick={this.onChartClick}></div>
                <div className={`chart-modal ${(isCartModalOpen) ? "modal-open" : ""}`}>
                    <ChartBar />
                </div>
            </div>
        )
    }
}
