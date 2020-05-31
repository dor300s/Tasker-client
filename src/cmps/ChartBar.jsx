import React, { Component } from 'react'
import { connect } from 'react-redux'
// import moment from 'moment'
import { Bar } from 'react-chartjs-2';
import cssVar from '../styles/setup/variable.js'


let data = {
    labels: ['23/5', '24/5', '25/5', '26/5', '27/5', '28/5', '29/5'],
    datasets: [
        {
            label: 'Dor Ben Itzhak',
            backgroundColor: 'rgba(111,11,11,0.2)',
            borderColor: 'rgba(111,11,11,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(111,11,11,0.4)',
            hoverBorderColor: 'rgba(111,11,11,1)',
            data: [1, 2, 3, 2, 1, 1, 3]
        },
        {
            label: 'Reem Alon',
            backgroundColor: 'rgba(222,22,22,0.2)',
            borderColor: 'rgba(222,22,22,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(222,22,22,0.4)',
            hoverBorderColor: 'rgba(222,22,22,2)',
            data: [3, 2, 5, 1, 6, 5, 2]
        }
    ]
};


class ChartBar extends Component {

    state = {
        usersData: null
    }

    componentDidMount() {
        this.setState({ usersData: data })
    }

    // usersDataGenerator = () => {
    //     let data = {};
    //     const dateNow = Date.now()
    //     data.labels = []
    //     for (let step = 5; step > 0; step--) {
    //         const day = 1000 * 60 * 60 * 24;
    //         data.labels.push(moment(dateNow - (day * step)).format("MMM Do"))
    //     }
    //     ;
    //     let usersDoneCard = this.reducerJoinTaskByUser();
    //     for (const userId in usersDoneCard) {
    //         data.datasets.push({
    //             label: usersDoneCard[userId].doneBy.name,
    //             backgroundColor: 'rgba(111,11,11,0.2)',
    //             borderColor: 'rgba(111,11,11,1)',
    //             borderWidth: 1,
    //             hoverBackgroundColor: 'rgba(111,11,11,0.4)',
    //             hoverBorderColor: 'rgba(111,11,11,1)',
    //             data: [65, 59, 80, 81, 56, 55, 40]
    //         })
    //     }

    // }

    // reducerJoinTaskByUser = () => {
    //     const currBoard = this.state;

    //     return currBoard.cardLists.reducer((acc, cardList) => {
    //         cardList.cards.forEach(card => {
    //             card.checkList.forEach(checkBox => {
    //                 if (checkBox.isDone && checkBox.doneBy) {
    //                     if (!acc[checkBox.doneBy.id]) {
    //                         acc[checkBox.doneBy.id] = []
    //                         acc[checkBox.doneBy.id].push(checkBox);
    //                     } else {
    //                         acc[checkBox.doneBy.id].push(checkBox);
    //                     }
    //                 }

    //             })
    //         })
    //         return acc
    //     }, {})
    // }


    render() {
        const { usersData } = this.state;

        
        return (
            (!usersData)? <div>loading</div> :
            <div className="chart-bar">
                <h2>Done tasks by user</h2>
                <Bar
                    data={usersData}
                    width={10}
                    height={1}
                    options={{
                        maintainAspectRatio: false,
                    }
                    }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currBoard: state.boardApp.currBoard,
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChartBar)