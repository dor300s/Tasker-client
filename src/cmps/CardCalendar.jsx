import React, { Component } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class CardCalendar extends Component {

    state = {
        date: new Date(),
        formattedDate: ''
    }

    onChange = date => this.setState({ date }, this.formatDate)

    formatDate = () => {
        const { date } = this.state
        const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        this.setState({ formattedDate: `${month}-${day}` })
    }

    render() {
        const { formattedDate } = this.state
        return (
            <div className="card-calendar-container">
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                    minDate={new Date()}
                />
                {formattedDate && <div className="flex justify-center">
                    {/* <h4>Date picked: {formattedDate}</h4> */}
                    <button className="date-confirm" onClick={() => this.props.onDatePicked(formattedDate)}>Confirm</button>
                </div>}
            </div>
        );
    }
}
