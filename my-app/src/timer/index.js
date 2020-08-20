import React, { Component } from 'react';

class TimerContainer extends Component {
    state = {
        showTimer : true
    };
    render(){
        const { showTimer } = this.state;
        return(
            <div>
                <input 
                    type="button" 
                    value="Toggle Timer" 
                    onClick={ () => this.setState({ showTimer : !showTimer }) } />
                { showTimer ? <Timer/> : null }
            </div>
        )
    }
}

class Timer extends Component{
    state = { 
        currentTime : ''
    }

    timerId = null;

    componentDidMount(){
        console.log('timer mounted');
        this.timerId = setInterval(() => {
            this.setState({currentTime : (new Date()).toString()});
        }, 1000)
    }

    componentWillUnmount(){
        console.log('timer will unmount');
        if (this.timerId)
            clearInterval(this.timerId);
    }

    shouldComponentUpdate(){
        /* console.log(arguments);
        return false; */
        return true;
    }

    componentWillUpdate(){
        //console.log('timer will be updated');
    }

    render(){
        return(
            <div>{this.state.currentTime}</div>
        )
    }
}

export default TimerContainer