import React, { Component } from 'react';

class SolveButton extends Component {
  onClick = (event) => {
    if (this.props.ensureValidity()) {
      this.props.handleClickUpdateButton();
      // this.props.handleClickSolveButton();
    }
    else this.props.updateMessage('Unable to solve with invalid number inputs. ')
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