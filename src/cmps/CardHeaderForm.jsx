import React, { Component } from "react";

export class CardHeaderForm extends Component {
    state = {
        cardTitle: '',
    }


    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    onSubmit = () => {
        this.props.offEditCardHeader(this.props.cardId, this.props.ListId,this.state.cardTitle)
        this.setState({ cardTitle: "" })
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.onSubmit()
        }
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ cardTitle: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.onSubmit();
    }

    handleBlur = () => {
       this.onSubmit()
    }


    render() {
        const { cardTitle } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="add card ..." value={cardTitle} onChange={this.handleChange} autoFocus onBlur={this.handleBlur} />
                </form>
            </React.Fragment>
        )
    }
}