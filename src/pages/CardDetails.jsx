import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal({ history, currBoard, cardId }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    let currCard;
    currBoard.cardLists.forEach(cardList => {
        cardList.cards.forEach(card => {
            if (card.id === cardId) currCard = card;
        })
    })

    const handleClose = () => {
        history.goBack()
    };

    return (
        <div>
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                open={true} onClose={handleClose}>
                <div style={modalStyle} className={classes.paper}>

                    <h2>Simple React Modal</h2>
                    <h2>{currCard.id}</h2>
                    <h2>{currCard.id}</h2>
                    <h2>{currCard.id}</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan odio enim, non pharetra est ultrices et.
                    </p>


                </div>
            </Modal>
        </div>
    );
}












/* import React from 'react';
import Modal from '@material-ui/core/Modal';

export default class CardDetails extends React.Component {
    render() {
        const { currBoard, cardId } = this.props
        console.log(currBoard.cardLists);

        let currCard;
        currBoard.cardLists.forEach(cardList => {
            cardList.cards.forEach(card => {
                if (card.id === cardId) currCard = card;
            })
        })
        console.log(currCard);


        return (
            <div>
                <h2>CardDetails</h2>
                <h2>{currCard.id}</h2>
            </div>
        )
    }
} */