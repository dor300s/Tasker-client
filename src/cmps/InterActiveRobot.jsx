import React, { Component } from 'react'


export default class InterActiveRobot extends Component {

    state = {
        currTxt: '',
        robotClass: ''
    }

    componentDidMount() {
        let data = [
            `Welcome, ${this.props.user.userName}👋`,
            'This is our demo board',
            'For best expirence, open 2 tabs parallaly',
            'Feel free to cantact us ;)🎉',
            
        ]
        this.setState({ currTxt: data[0] })
        let cnt = 1
        let myInterval = setInterval(() => {
            this.setState({ currTxt: data[cnt] })
            cnt++
            if(cnt > data.length){
                clearInterval(myInterval)
                this.setState({ currTxt: null , robotClass: '' })
            } 
        }, 2000);
     
        setTimeout(() => {
            this.setState({ robotClass: 'opacity-robot' })
        }, 500);

    }

    render() {
        const { user } = this.props
        const { currTxt , robotClass} = this.state

        return (
            <div className={`interactive-robot-container flex justify-center ${robotClass}`} >
                <span className="robot" />
                <span className={`robot-txt-bubble flex align-center justify-center`}>
                    {currTxt && <h3 className={"first-speech" + !currTxt ? 'finish-robot' : '' }>{currTxt}</h3>}
                </span>
            </div>
        )
    }
}
