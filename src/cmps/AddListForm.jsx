import React, { Component } from "react";

export class AddListForm extends Component {
    state = {
        addlistForm: false,
        newlistTitle: '',
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
    }


    componentWillUnmount() {
        document.removeEventListener("keydown", this.escFunction, false);
    }


    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({ addlistForm: false, newlistTitle: '' })
        }
    }

    openForm = () => {
        this.setState({ addlistForm: true });
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        this.setState({ newlistTitle: value })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        this.createNewlist();
    }

    handleBlur = () => {
        if (this.state.newlistTitle) this.createNewlist();
        else this.setState({ addlistForm: false });
    }

    createNewlist() {
        const title = { title: this.state.newlistTitle }
        this.props.onAddList(this.state.newlistTitle)
        this.setState({ addlistForm: false, newlistTitle: ''})


    }


    render() {
        const { addlistForm, newlistTitle } = this.state
        return (
            <React.Fragment>
                <div className="card-list-container card-list-wrap card-preview add-list flex justify-center align-center" onClick={this.openForm} >
                    {!addlistForm ? <div className="">Add new list</div> :
                        <form onSubmit={this.handleSubmit}>
                            <input placeholder="add list ..." value={newlistTitle} onChange={this.handleChange} autoFocus onBlur={this.handleBlur} />
                        </form>}
                </div>
            </React.Fragment>
        )
    }
}