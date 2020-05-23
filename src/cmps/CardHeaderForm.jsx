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
        this.props.offEditCardHeader(this.state.cardTitle)
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
        if (this.state.cardTitle) this.onSubmit()
        else this.setState({ addCardForm: false });
    }

    createNewCard() {
        const { title } = { title: this.state.cardTitle }
        console.log('creatNewCard', title)
        this.props.onAddCard(this.props.cardListId, title)
        this.setState({ addCardForm: false, cardTitle: '' })


    }


    render() {
        const { cardTitle } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="add card ..." value={cardTitle} onChange={this.handleChange} autoFocus onBlur={this.handleBlur} />
                </form>}
            </React.Fragment>
        )
    }
}