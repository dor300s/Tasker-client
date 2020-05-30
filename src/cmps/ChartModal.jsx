import React, { Component } from 'react'
import ChartBar from '../cmps/ChartBar.jsx';
import ChartPay from '../cmps/ChartPay.jsx';
import ChartLine from '../cmps/ChartLine.jsx';


export default class ChartModal extends Component {
    state = {
        isCartModalOpen: false
    }
    
    componentDidMount() {
        document.addEventListener("mousedown", this.closeStatisticModal, false);
        document.addEventListener("keydown", this.closeStatisticModal, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.closeStatisticModal, false);
        document.removeEventListener("keydown", this.closeStatisticModal, false);
    }

    closeStatisticModal = (ev) => {
        ev.stopPropagation();
        if (!this.node.contains(ev.target) || ev.keyCode === 27) {
            this.setState({ isCartModalOpen: false })
        }
    }

    onChartClick = () => {
        this.setState(prevState => ({ isCartModalOpen: !prevState.isCartModalOpen }))
    }

    render() {
        const { isCartModalOpen } = this.state;


        return (
            <div className={`chart-container `}>
                <div className="nav-chart-btn chart" onClick={this.onChartClick}></div>
                <div className={`screen  ${(isCartModalOpen) ? "modal-open" : ""} `}>
                    <div ref={node => this.node = node} className="chart-modal flex wrap">
                        <ChartPay />
                        <ChartLine />
                        <ChartLine />
                        <ChartLine />
                        {/* <ChartBar /> */}
                    </div>
                </div>

            </div>
        )
    }
}
