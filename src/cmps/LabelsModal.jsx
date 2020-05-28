import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'

class LabelsModal extends Component {

    state = {
        title: '',
        isErrorShown: false
    }

    onLabelClick = (color) => {
        const { card , board } = this.props
        let colorIdx = card.labels.findIndex(label => label.color === color)
        if (colorIdx !== -1){
            this.setState({isErrorShown: true})
            setTimeout(()=>{
                this.setState({isErrorShown: false})
            },1500)
             return
        }
        
        let label ={
            title: this.state.title ,
            color
        }
        card.labels.push(label)
        this.props.saveBoard(board)
    }

    inputHandler = ({ target }) => {
        this.setState({ title: target.value })
    }

    render() {
        const { title , isErrorShown } = this.state
        return (
            <div className="card-labels-modal flex column align-center">
                <h3 className="labels-header">Labels</h3>
                {isErrorShown && <h5>This label already exist</h5>}

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#61BD4F" }}>
                        <input placeholder="Opt. Add label titles" onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#61BD4F')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#F2D600" }}>
                        <input onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#F2D600')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#FF9F1A" }}>
                        <input onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#FF9F1A')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#EB5A46" }}>
                        <input onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#EB5A46')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#0079BF" }}>
                        <input onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#0079BF')}>Set</button>
                </div>
                
                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#FF78CB" }}>
                        <input onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#FF78CB')}>Set</button>
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(LabelsModal)