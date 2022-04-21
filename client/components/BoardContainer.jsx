import React, { Component } from 'react';

import Board from './Board';
import SolveButton from './SolveButton';

class BoardContainer extends Component {
  constructor(props) {
    super(props);
    // state is set on Component mount by calling newGame
    this.state = {
      boxValues: {},
      rowValues: {},
      colValues: {},
      threeX3Values: {}
    };
    // this.handleClickSolveButton = this.handleClickSolveButton.bind(this);
    // this.handleBoxInput = this.handleBoxInput.bind(this);
  }

  render() {
    return (
      <div id="boardContainer" className="container">
        <Board
          boxValues={this.state.boxValues}
          // handleBoxInput={this.handleBoxInput}
        />
        
        <SolveButton
          handleClickUpdateButton={this.props.handleClickUpdateButton}
          // handleClickSolveButton={this.handleClickSolveButton}
        />
      </div>
    );
  }
}

export default BoardContainer;