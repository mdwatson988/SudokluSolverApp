import React, { Component } from 'react';

class Box extends Component {
  render() {
    return (
      <input type="number" min="1" max="9"
        onChange={this.props.handleBoxInput}
        id={this.props.key}
        className="box"
        readOnly={false}>
      </input>
    )
  }
};

export default Box;