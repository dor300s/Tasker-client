import React from 'react';

export default class DndAddBtn extends React.Component {
    state = {
        showInput: false
    }

    openForm = () => {
        this.setState({ showInput: true })
    }


    render() {
        const { list } = this.props;
        const { showInput } = this.state;
        const txt = list ? 'Add Card' : 'Add list'

        return (
            <div>
                {!showInput ? <button onClick={this.openForm}>{txt}</button> :
                    <input placeholder={`${txt} title`} />}
            </div>
        )
    }
}