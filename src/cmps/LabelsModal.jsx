import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'

class LabelsModal extends Component {

    onLabelClick = (color) =>{
        const { card , board } = this.props
        let label ={
            title: '' ,
            color
        }
        card.labels.push(label)
        this.props.saveBoard(board)
    }

    render() {
        return (
            <div className="card-labels-modal flex column align-center">
                <h3>Labels</h3>
                <div className="card-label" style={{width:"80%" , height:"30px" , backgroundColor:"#61BD4F"}} 
                onClick={()=>this.onLabelClick('#61BD4F')}></div>

                <div className="card-label" style={{width:"80%" , height:"30px" , backgroundColor:"#F2D600"}}
                onClick={()=>this.onLabelClick('#F2D600')}></div>

                <div className="card-label" style={{width:"80%" , height:"30px" , backgroundColor:"#FF9F1A"}} 
                onClick={()=>this.onLabelClick('#FF9F1A')}></div>

                <div className="card-label" style={{width:"80%" , height:"30px" , backgroundColor:"#EB5A46"}} 
                onClick={()=>this.onLabelClick('#EB5A46')}></div>

                <div className="card-label" style={{width:"80%" , height:"30px" , backgroundColor:"#0079BF"}} 
                onClick={()=>this.onLabelClick('#0079BF')}></div>

                <div className="card-label" style={{width:"80%" , height:"30px" , backgroundColor:"#FF78CB"}} 
                onClick={()=>this.onLabelClick('#FF78CB')}></div>
                
            </div>
        )
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(LabelsModal)