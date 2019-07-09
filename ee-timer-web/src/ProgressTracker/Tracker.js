import React, { Component } from 'react';
import { TrackerSlot } from './TrackerSlot.js'

const HOUR_INTERVAL = { hour: 1, min: 0};
const THIRTY_MINUTE_INTERVAL = { hour: 0, min: 30 };

export class Tracker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      start_time_hour: 7,
      start_time_min: 30,
      end_time_hour: 10,
      end_time_min: 30,
      inverval_length: THIRTY_MINUTE_INTERVAL
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("event is:", event.target);

    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    console.log('rerendering');
    console.log('states:', this.state);

    var intervals = getIntervals(
      { hour: parseInt(this.state.start_time_hour), min: parseInt(this.state.start_time_min) },
      { hour: parseInt(this.state.end_time_hour), min: parseInt(this.state.end_time_min) },
      this.state.inverval_length
    )
    console.log('intervals:', intervals);

    var rows = [];
    intervals.forEach( (time_interval) => {
      rows.push(
        <tr>
          <td> {displayTime(time_interval)} </td>
          <td> <TrackerSlot/> </td>
          <td> <TrackerSlot/> </td>
        </tr>
      )
    });

    return (
      <div>
        Start Time Hour:
        <input type='text' name="start_time_hour" value={this.state.start_time_hour} onChange={this.handleChange}/>

        Start Time Min:
        <input type='text' name="start_time_min" value={this.state.start_time_min} onChange={this.handleChange}/>
        <br/>

        End Time Hour:
        <input type='text' name="end_time_hour" value={this.state.end_time_hour} onChange={this.handleChange}/>

        End Time Min:
        <input type='text' name="end_time_min" value={this.state.end_time_min} onChange={this.handleChange}/>
        <br/>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th> Time </th>
              <th> Fails </th>
              <th> Successes </th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }

}

function getIntervals(start_time, end_time, inverval_length) {
  var intervals = [];

  var cur_interval = start_time
  while (getIntValue(cur_interval) < getIntValue(end_time)) {
    // push before incrementing to capture start time and not end time
    intervals.push(cur_interval);
    var new_min = cur_interval.min + inverval_length.min;
    var new_hour = cur_interval.hour + inverval_length.hour;
    if (new_min >= 60) {
      new_hour += 1;
      new_min = new_min % 60;
    }
    cur_interval = { hour: new_hour, min: new_min };
  }
  return intervals
}

function getIntValue(time) {
  return time.hour*60 + time.min;
}

function displayTime(time) {
  var minutes = time.min < 10 ? `0${time.min}` : time.min;
  return `${time.hour}:${minutes}`;
}
