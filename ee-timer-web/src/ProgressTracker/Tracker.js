import React, { Component } from 'react';
import { TrackerSlot } from './TrackerSlot.js'

const HOUR_INTERVAL = { hour: 1, min: 0};
const THIRTY_MINUTE_INTERVAL = { hour: 0, min: 30 };

export class Tracker extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var start_time = {
      hour: 1,
      min: 0
    }
    var inverval_length = HOUR_INTERVAL
    var end_time = {
      hour: 4,
      min: 30
    }

    var intervals = getIntervals(start_time, end_time, inverval_length)

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
    var new_min = cur_interval.min + inverval_length.min;
    var new_hour = cur_interval.hour + inverval_length.hour;
    if (new_min >= 60) {
      new_hour += 1;
      new_min = new_min % 60;
    }
    cur_interval = { hour: new_hour, min: new_min };
    intervals.push(cur_interval);
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
