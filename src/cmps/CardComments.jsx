import React, { Component } from 'react'
import { connect } from 'react-redux';
import {CardCommentsList} from './CardCommentsList'

class CardComments extends Component {

    render() {
        const { currUser , card , board } = this.props
        console.log(currUser.imgUrl);
        
        return (
            <div className="card-comments">
                <div className="flex align-center" style={{marginBottom: "15px"}}>
                    <span className="comment" />
                    <h4>Comments</h4>
                </div>
                <div className="card-add-comment flex align-center" style={{marginLeft: "40px" , marginBottom:"15px"}}>
                    <div className="user-profile-comment" style={{
                        backgroundImage: "url(" + `${currUser.imgUrl}` + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} >
                    </div>
                    <input className="user-text-input" type="text"  placeholder={currUser.userName +", whats on your mind?"}/>
                </div>
                    < CardCommentsList card={card} board={board} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currUser: state.user.loggedInUser
    }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CardComments)