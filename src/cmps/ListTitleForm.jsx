import React, { Component } from "react";

export class ListTitleForm extends Component {

    state = {
        cardListTitle: this.props.cardList.title

    }
   
    componentDidMount() {
        document.addEventListener("mousedown", this.escFunction, false);
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.escFunction, false);
        document.removeEventListener("keydown", this.escFunction, false);
    }


    handleChange = (ev) => {
        ev.stopPropagation()
        this.setState({ cardListTitle: ev.target.value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        let { card } = this.props
        card.title = this.state.title;
        this.setState({ editTitleMode: false })
        this.onSubmit();
    }

    onSubmit = () => {
        this.props.offEditListTitle(this.props.cardList.id, this.state.cardListTitle)
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.onSubmit()
        }
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ cardListTitle: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.onSubmit();
    }


    render() {
        const { cardListTitle } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input placeholder="Edit title..." value={cardListTitle} onChange={this.handleChange} autoFocus onBlur={this.onSubmit} />
                </form>
            </React.Fragment>
        )
    }
}