import React, { Component } from 'react';

class SolveButton extends Component {
  onClick = (event) => {
    this.props.handleClickUpdateButton();
    // this.props.handleClickSolveButton();
  }

  render() {
    return (
      <button id="solveButton" type="button" onClick={this.onClick}>
        Solve
      </button>
    )
  }
}

export default SolveButton;