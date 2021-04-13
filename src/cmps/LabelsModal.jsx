import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveBoard } from '../store/actions/boardActions'

class LabelsModal extends Component {

    state = {
        title: '',
        isErrorShown: false
    }

    componentDidMount(){
        document.addEventListener('click', this.onOutSideClick)
    }

    componentWillUnmount(){
        document.removeEventListener('click', this.onOutSideClick)
    }

    onOutSideClick = (e) =>{
      
        if (!this.node.contains(e.target)){
            
            this.props.onClose()
        }
    }

    onLabelClick = (color , title) => {
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
            title,
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
            <div ref={node => this.node = node} className="card-labels-modal flex column align-center">
                <h3 className="labels-header">Labels</h3>
                {isErrorShown && <h5>This label already exist</h5>}

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#61BD4F" }}>
                        <input placeholder="Opt. Add label titles" value={'Frontend'} onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#61BD4F' , 'Frontend')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#F2D600" }}>
                        <input value={'Backend Database'} onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#F2D600','Backend Database')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#FF9F1A" }}>
                        <input value={'Bugs'} onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#FF9F1A','Bugs')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#EB5A46" }}>
                        <input value={'TechDebt'} onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#EB5A46','TechDebt')}>Set</button>
                </div>

                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#0079BF" }}>
                        <input value={'Server'} onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#0079BF','Server')}>Set</button>
                </div>
                
                <div style={{ marginBottom: "10px" }} className="flex space-between align-center">
                    <div className="card-label flex justify-center align-center" style={{ width: "80%", height: "30px", backgroundColor: "#FF78CB" }}>
                        <input value={'User management'} onChange={this.inputHandler} />
                    </div>
                    <button className="label-del-btn" onClick={() => this.onLabelClick('#FF78CB','User management')}>Set</button>
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = {
    saveBoard
}

export default connect(null, mapDispatchToProps)(LabelsModal)