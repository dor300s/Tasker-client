import React, { Component } from "react";

export class CardHeaderForm extends Component {

    state = {
        cardTitle: this.props.cardHeader,
    }

    // componentDidMount() {
    //     document.addEventListener("mousedown", this.closeCardMenu, false);
    //     document.addEventListener("keydown", this.closeCardMenu, false);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener("mousedown", this.closeCardMenu, false);
    //     document.removeEventListener("keydown", this.closeCardMenu, false);
    // }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }

    closeCardMenu = (e) => {
        if (e.keyCode === 27) {
            this.props.closeMenu();
        }
    }

    activeEditMode = (e) => {
        e.stopPropagation()
        this.setState({ editTitleMode: true })
    }

    handleChange = (e) => {
        e.stopPropagation()
        this.setState({ title: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let { card } = this.props
        card.title = this.state.title;
        this.props.saveCard(card);
        this.setState({ editTitleMode: false })
        this.props.closeMenu();
    }




    onSubmit = () => {
        this.props.offEditCardHeader(this.props.cardId, this.props.cardListId, this.state.cardTitle)
    }

    escFunction = (event) => {
        if(event.keyCode === 13){
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

    moveCaretAtEnd(e) {
        var temp_value = e.target.value
        e.target.value = ''
        e.target.value = temp_value
      }


    render() {
        const { cardTitle } = this.state
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <textarea placeholder="Edit title" onClick={ev => ev.stopPropagation()}
                    value={cardTitle} onChange={this.handleChange} autoFocus onFocus={this.moveCaretAtEnd} onBlur={this.handleBlur} spellCheck="false" />
                </form>
            </React.Fragment>
        )
    }
}