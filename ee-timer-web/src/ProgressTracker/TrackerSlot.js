import React, { Component } from 'react';

export class TrackerSlot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticks: 0
    };
  }

  render() {
    var tickElements = [];
    for (var i = 0; i<this.state.ticks; i++) {
      tickElements.push(<div> X </div>)
    }

    if ( tickElements.length === 0 ) {
      tickElements = <div style={{opacity:0}}> O </div>;
    }

    return (
      <div onClick={(e) => {
        if (e.shiftKey) {
          // if clicked with shiftKey, remove a tick.
          this.setState({ ticks: this.state.ticks - 1 })
        } else {
          this.setState({ ticks: this.state.ticks + 1 })
        }

      }}>
        {tickElements}
      </div>
    );
  }

}
