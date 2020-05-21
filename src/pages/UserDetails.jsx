import React from 'react';
import { getUsers } from '../tempSeviceData/tempUserData.js';
// import { getBoards } from '../tempSeviceData/tempBoardData.js';

let gUsers = getUsers();
console.log(gUsers)
// console.log(getBoards())


export default class UserDetails extends React.Component {


    render() {
        return (
            <div>
                <h2>User Details</h2>
            </div>
        )
    }
}