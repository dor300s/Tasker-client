import React, { Component } from 'react'
import moment from 'moment'
import { Bar } from 'react-chartjs-2';
import cssVar from '../styles/setup/variable.js'


// let data = {
//     labels: ['23/5', '24/5', '25/5', '26/5', '27/5', '28/5', '29/5'],
//     datasets: [
//         {
//             label: 'Dor Ben Itzhak',
//             backgroundColor: cssVar.$clrChart3,
//             borderColor: cssVar.$clrChart3,
//             borderWidth: 1,
//             hoverBackgroundColor: cssVar.$clrChart3,
//             hoverBorderColor: cssVar.$clrChart3,
//             data: [1, 2, 3, 2, 1, 1, 3]
//         },
//         {
//             label: 'Reem Alon',
//             backgroundColor: cssVar.$clrChart6,
//             borderColor: cssVar.$clrChart6,
//             borderWidth: 1,
//             hoverBackgroundColor: cssVar.$clrChart6,
//             hoverBorderColor: cssVar.$clrChart6,
//             data: [3, 2, 5, 1, 6, 5, 2]
//         }
//     ]
// };


export default class ChartBar extends Component {

    reducerJoinTaskByUser = () => {
        const { currBoard } = this.props
        if (!currBoard) return;

        return currBoard.cardLists.reduce((acc, cardList) => {
            cardList.cards.forEach(card => {
                card.checkList.forEach(checkBox => {
                    if (checkBox.isDone && checkBox.doneBy) {
                        const doneAt = moment(checkBox.doneTime).format("MMM Do")
                        if (!acc[checkBox.doneBy.userName]) {
                            acc[checkBox.doneBy.userName] = {};
                        }
                        if (!acc[checkBox.doneBy.userName][doneAt]) {
                            acc[checkBox.doneBy.userName][doneAt] = [checkBox]
                        }
                        else {
                            acc[checkBox.doneBy.userName][doneAt].push(checkBox);
                        }
                    }

                })
            })
            return acc
        }, {})
    }

    graphColors = () => {
        return [cssVar.$clrChart1, cssVar.$clrChart2, cssVar.$clrChart3, cssVar.$clrChart4, cssVar.$clrChart5, cssVar.$clrChart6, cssVar.$clrChart7, cssVar.$clrChart8, cssVar.$clrChart9, cssVar.$clrChart10]

    }

    updateUsersDoneTaskData = () => {
        let data = {};
        const dateNow = Date.now();
        data.labels = [];
        data.datasets = [];
        for (let step = 5; step > 0; step--) {
            const day = 1000 * 60 * 60 * 24;
            data.labels.push(moment(dateNow - (day * (step-1))).format("MMM Do"))
        }
        let usersDoneCard = this.reducerJoinTaskByUser();
        let colorPalate = this.graphColors();
        for (const userId in usersDoneCard) {
            const dataUserDoneTasks = data.labels.map(label => {
                if (usersDoneCard[userId][label]){
                    return usersDoneCard[userId][label].length
                }else return 0;
                    
            })
            const columnColor = colorPalate.splice(0,1)[0]
            data.datasets.push({
                label: userId,
                backgroundColor: columnColor,
                borderColor: columnColor,
                borderWidth: 1,
                hoverBackgroundColor: columnColor,
                hoverBorderColor: columnColor,
                data: dataUserDoneTasks,
            })
        }
        return data;
    }


    render() {
        const data = this.updateUsersDoneTaskData();
        console.log(data);

        return (
                <div className="chart-bar">
                    <h2>Done tasks by user</h2>
                    <Bar
                        data={data}
                        options={{  
                            maintainAspectRatio: false,

                        }}
                    />
                </div>
        );
    }
}
