import React, { Component } from 'react';

class ResetButton extends Component {
  render() {
    return (
      <button id="resetButton" type="button" onClick={this.props.handleClickResetButton}>
        Clear Statistics
      </button>
    )
  }
}

export default ResetButton;