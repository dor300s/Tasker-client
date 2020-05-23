import React from 'react';

export default class listList extends React.Component {
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
        const list = { title: this.state.newlistTitle }
        this.props.onAddList(list)
        this.setState({ addlistForm: false, newlistTitle: '' })
    }


    render() {
        const { addlistForm, newlistTitle } = this.state
        return (
            <React.Fragment>
                {<div className="list add-list flex justify-center align-center" onClick={this.openForm} ></div>}
                {!addlistForm ? <h3>Create new list</h3> :
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="add list ..." value={newlistTitle} onChange={this.handleChange} autoFocus onBlur={this.handleBlur} />
                    </form>}
            </React.Fragment>
        )
    }
}