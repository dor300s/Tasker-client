import React, { Component } from "react";

export class AddCardForm extends Component {
    state = {
        addCardForm: false,
        newCardTitle: '',
    }


    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({ addCardForm: false, newCardTitle: '' })
        }
    }

    openForm = () => {
        this.setState({ addCardForm: true });
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ newCardTitle: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.createNewCard();
    }

    handleBlur = () => {
        if (this.state.newCardTitle) this.createNewCard();
        else this.setState({ addCardForm: false });
    }

    createNewCard() {
        const { title } = { title: this.state.newCardTitle }
        console.log('creatNewCard', title)
        this.props.onAddCard(this.props.cardListId, title)
        this.setState({ addCardForm: false, newCardTitle: '' })
    }


    render() {
        const { addCardForm, newCardTitle } = this.state
        return (
            <React.Fragment>
                <div className="card-preview flex justify-center align-center" onClick={this.openForm} >
                    {!addCardForm ? <div className="plus"></div> :
                        <form onSubmit={this.handleSubmit}>
                            <input placeholder="add card ..." value={newCardTitle} onChange={this.handleChange} autoFocus onBlur={this.handleBlur} />
                        </form>}
                </div>
            </React.Fragment>
        )
    }
}