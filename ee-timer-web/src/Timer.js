import React, { Component } from 'react';

const DEFAULT_STARTING_TIME = 600;

export class Timer extends Component {

  constructor(props) {
    super(props);
    this.alarm = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
    this.state = {
      currentSeconds: DEFAULT_STARTING_TIME,
      running: true
    };
  }

  componentDidMount() {
     var intervalId = setInterval(() => {

       if (this.state.currentSeconds === 0) {
         this.setState({ running: false });
         this.alarm.play();
       }

       if (this.state.running) {
         this.setState({ currentSeconds: this.state.currentSeconds -1 });
       }
     }, 1000);
  }

  timer() {
     this.setState({ currentSeconds: this.state.currentSeconds -1 });
  }

  getTimeInMinutes() {
    return `${Math.floor(this.state.currentSeconds/60)}:${this.state.currentSeconds % 60}`
  }

  render() {
    return (
      <div>
        <h1 className="display-1">
          {this.getTimeInMinutes()}
        </h1>
        <button onClick={() => {
          this.setState({ running: !this.state.running })
        }}> {(this.state.running) ? 'pause' : 'play'} </button>

        <button onClick={() => {
          //TODO: increase success count
          this.setState({ currentSeconds: DEFAULT_STARTING_TIME })
        }}> Success </button>
        <button onClick={() => {
          //TODO: increase failure count
          this.setState({ currentSeconds: DEFAULT_STARTING_TIME })
        }}> Failed </button>
      </div>
    );
  }

}
