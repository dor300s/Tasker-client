import React, { Component } from 'react'
import { connect } from 'react-redux'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

class CardCalendar extends Component {

    state = {
        date: new Date(),
        formattedDate: ''
    }

    onChange = date => this.setState({ date },this.formatDate)

    formatDate = () =>{
        const {date} = this.state
        const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        this.setState({formattedDate:`${month}-${day}`})
    }


    render() {
        const {formattedDate} = this.state
        return (
            <div>
                <Calendar
                    onChange={this.onChange}
                    value={this.state.date}
                />
                {formattedDate &&<div className="flex align-center">
                 <h4>Date picked: {formattedDate}</h4>
                <button onClick={() => this.props.onDatePicked(formattedDate)}>Confirm</button>
                </div>}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CardCalendar)