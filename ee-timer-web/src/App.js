import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Timer } from './Timer.js'
import { Tracker } from './ProgressTracker/Tracker.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to The EE TIMER!</h1>
        </header>
        <div>
          <div>
            <h2> Energy level: </h2>
            <select name="level">
              <option value="In The Zone">In The Zone</option>
              <option value="high">High</option>
              <option value="average" selected>Average</option>
              <option value="low">Low</option>
              <option value="tired">tired</option>
            </select>
          </div>
          <h2> To Do: </h2>
          <textarea rows="4" cols="100">
          </textarea>
        </div>
        <Timer/>
        <br/>
        <Tracker/>
      </div>
    );
  }
}

export default App;
