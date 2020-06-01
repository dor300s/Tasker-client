import React, { Component } from 'react'
import moment from 'moment'
import { Bar } from 'react-chartjs-2';
import cssVar from '../styles/setup/variable.js'


let data = {
    labels: ['23/5', '24/5', '25/5', '26/5', '27/5', '28/5', '29/5'],
    datasets: [
        {
            label: 'Dor Ben Itzhak',
            backgroundColor: cssVar.$clrChart3,
            borderColor: cssVar.$clrChart3,
            borderWidth: 1,
            hoverBackgroundColor: cssVar.$clrChart3,
            hoverBorderColor: cssVar.$clrChart3,
            data: [1, 2, 3, 2, 1, 1, 3]
        },
        {
            label: 'Reem Alon',
            backgroundColor: cssVar.$clrChart6,
            borderColor: cssVar.$clrChart6,
            borderWidth: 1,
            hoverBackgroundColor: cssVar.$clrChart6,
            hoverBorderColor: cssVar.$clrChart6,
            data: [3, 2, 5, 1, 6, 5, 2]
        }
    ]
};


export default class ChartBar extends Component {
    
    reducerJoinTaskByUser = () => {
        const { currBoard } = this.props
        console.log(currBoard)
        if(!currBoard) return;

        return currBoard.cardLists.reduce((acc, cardList) => {
            cardList.cards.forEach(card => {
                card.checkList.forEach(checkBox => {
                    console.log(checkBox)
                    if (checkBox.isDone && checkBox.doneBy) {
                        if (!acc[checkBox.doneBy.id]) {
                           
                            acc[checkBox.doneBy.id] = [checkBox];
                        } else {
                            acc[checkBox.doneBy.id].push(checkBox);
                        }
                    }

                })
            })
            return acc
        }, {})
    }


    updateUsersDoneTaskData = () => {
        let data = {};
        const dateNow = Date.now()
        data.labels = []
        for (let step = 5; step > 0; step--) {
            const day = 1000 * 60 * 60 * 24;
            data.labels.push(moment(dateNow - (day * step)).format("MMM Do"))
        }

        let usersDoneCard = this.reducerJoinTaskByUser();
        for (const userId in usersDoneCard) {
            data.datasets.push({
                label: usersDoneCard[userId].doneBy.name,
                backgroundColor: 'rgba(111,11,11,0.2)',
                borderColor: 'rgba(111,11,11,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(111,11,11,0.4)',
                hoverBorderColor: 'rgba(111,11,11,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            })
        }
    }


    render() {

        console.log(this.reducerJoinTaskByUser())


        return (
            (!data) ? <div>loading</div> :
                <div className="chart-bar">
                    <h2>Done tasks by user</h2>
                    <Bar
                        data={data}
                        options={{
                            maintainAspectRatio: false,
                        }
                        }
                    />
                </div>
        );
    }
}
