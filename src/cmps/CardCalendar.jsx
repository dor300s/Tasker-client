import React, { Component } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class CardCalendar extends Component {

    state = {
        date: new Date(),
        timeStamp: ''
    }

    onChange = date => this.setState({ date }, this.formatDate)

    formatDate = () => {
        const { date } = this.state
        let timeStamp = date.getTime()
        this.setState({ timeStamp })

    }

    render() {
        const { timeStamp } = this.state
        const { isShown } = this.props
        return (
            <div className={`card-calendar-container ${isShown? 'calendar-fade' : ''}`}>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    minDate={new Date()}
                />
                {timeStamp && <div className="flex justify-center" style={{backgroundColor:"rgba(0, 0, 0, 0.253)"}}>
                    {/* <h4>Date picked: {formattedDate}</h4> */}
                    <button className="date-confirm" onClick={() => this.props.onDatePicked(timeStamp)}>Confirm</button>
                </div>}
            </div>
        );
    }
}
