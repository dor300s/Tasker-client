import React from 'react'
import moment from 'moment'
export class DueDate extends React.Component {

    state = {
        isComplete: false,
        diffDays: null,
        timeStamp: null
        
    }

    componentDidMount(){
        this.getDiffDays()
    }
    
    componentDidUpdate(){
        const { card } = this.props
        if(this.state.timeStamp !== card.dueDate){
            this.getDiffDays()
        } 
    }

    getDiffDays(){
        const { card } = this.props
        let diffDays =  Math.ceil((card.dueDate - Date.now()) / (1000 * 60 * 60 * 24))
        this.setState({diffDays , timeStamp: card.dueDate})
    }

    onComplete = () => {
        this.setState(prevState => ({ isComplete: !prevState.isComplete }), () => console.log(this.state.isComplete))
    }

    render() {
        const { card } = this.props
        const { isComplete , diffDays } = this.state

        return (
            <div className="card-due-date-container">
                <div className="flex ">
                    <span className="due-date"></span>
                    <h4>Due Date</h4>
                </div>
                <div style={{ marginLeft: "42.5px", marginTop: "18px" }} className="flex align-center">
                    <span className={isComplete ? 'due-date-checkbox-complete' : 'due-date-checkbox'} onClick={this.onComplete}> </span>
                    <p>{moment(card.dueDate).format("MMM Do")}</p>
                    {isComplete && <p className="due-date-complete flex align-center">Complete</p>}
                    {!isComplete && <p className="flex align-center"
                    style={{ backgroundColor: `${diffDays >= 4 ? '#F9A602' : '#EC6B59'}` , marginLeft: "5px" , fontWeight: "600" , color:"white"}} >
                        <span className="dueDate" />{diffDays} Days Left</p>}

                </div>
            </div>
        )
    }
}




