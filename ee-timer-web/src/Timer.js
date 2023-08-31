import React, { Component } from 'react';

const DEFAULT_STARTING_TIME = 360;
var alarm = new Audio('http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a');

export class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSeconds: DEFAULT_STARTING_TIME,
      running: true,
      start: Date.now(),
      alarm: false
    };
  }

  componentDidMount() {
     var intervalId = setInterval(() => {

      var diff = (DEFAULT_STARTING_TIME - ((Date.now() - this.state.start) / 1000)) | 0;

      if(!this.state.running){
        if (this.state.alarm) {
          alarm.play();
        }
        return
      }

      if (diff <= 0 && this.state.running) {
        this.setState({ running: false });
        this.setState({ currentSeconds: 0 });
        this.setState({ alarm: true });
        alarm.play();
      }

      if (this.state.running) {
        this.setState({ currentSeconds: diff });
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
          this.setState({ currentSeconds: DEFAULT_STARTING_TIME, running: true })
          this.setState({ start: Date.now() })
        }}> Success </button>
        <button onClick={() => {
          //TODO: increase failure count
          this.setState({ currentSeconds: DEFAULT_STARTING_TIME, running: true })
          this.setState({ start: Date.now() })
        }}> Failed </button>
      </div>
    );
  }

}
