import React from 'react';
import CardDetails from './CardDetails.jsx';

export default class Board extends React.Component {



    render() {
        const { cardId } = this.props.match.params
        return (
            <div>
                {cardId && <CardDetails />}
                <h2>BoardDetails</h2>
            </div>
        )
    }
}