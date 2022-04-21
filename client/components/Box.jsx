import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      // need to figure out how to use input event listner to get value to state
      <input type="number" min="1" max="9"
        onChange={this.props.handleBoxInput}
        id={this.props.boxKey}
        className="box"
        readOnly={false}>
      </input>
    )
  }
};

export default Box;