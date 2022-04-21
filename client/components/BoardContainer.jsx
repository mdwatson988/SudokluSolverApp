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
      threeX3Values: {},
      message: '',
    };
    this.handleBoxInput = this.handleBoxInput.bind(this);
    this.ensureValidity = this.ensureValidity.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    // this.handleClickSolveButton = this.handleClickSolveButton.bind(this);
    
  }

  render() {
    return (
      <div id="boardContainer" className="container">
        <Board
          boxValues={this.state.boxValues}
          handleBoxInput={this.handleBoxInput}
          determine3x3={this.determine3x3}
        />

        {/* message only displayed with invalid input */}
        {this.state.message !== '' && <h3 id='message'>{this.state.message}</h3>}
        
        <SolveButton
          handleClickUpdateButton={this.props.handleClickUpdateButton}
          ensureValidity={this.ensureValidity}
          updateMessage={this.updateMessage}
          // handleClickSolveButton={this.handleClickSolveButton}
        />
      </div>
    );
  }

  determine3x3(row, col) {
    if (row <= 3) {
      if (col <= 3) return 1
      else if (col <= 6) return 2
      else return 3
    }
    else if (row <= 6) {
      if (col <= 3) return 4
      else if (col <= 6) return 5
      else return 6
    }
    else {
      if (col <= 3) return 7
      else if (col <= 6) return 8
      else return 9
    }
  };

  resetState() {
    const newBoxValues = {};
    const newRowValues = {};
    const newColValues = {};
    const new3x3Values = {};
    for (let i = 1; i < 10; i++) {
      newRowValues[i] = new Set();
      newColValues[i] = new Set();
      new3x3Values[i] = new Set();
    }
    this.setState({
      boxValues: newBoxValues,
      rowValues: newRowValues,
      colValues: newColValues,
      threeX3Values: new3x3Values,
      message: '',
    })
  }

  componentDidMount() {
    this.resetState();
  }

  handleBoxInput(event) {
    const id = event.target.id
    const rowKey = id[1];
    const colKey = id[3];
    const threeX3Key = this.determine3x3(rowKey, colKey);
    let newBoxValues = this.state.boxValues;
    let newRowValues = this.state.rowValues;
    let newColValues = this.state.colValues;
    let new3x3Values = this.state.threeX3Values;
    const inputValue = Number(event.target.value);

    // logic for removing values from state objects when numbers are deleted
    if (isNaN(event.target.valueAsNumber)) {
      if (this.state.boxValues[id]) {
        newRowValues[rowKey].delete(newBoxValues[id]);
        newColValues[colKey].delete(newBoxValues[id]);
        new3x3Values[threeX3Key].delete(newBoxValues[id]);
        newBoxValues = { ...this.state.boxValues };
        delete newBoxValues[id];
      }
    }

    // adds appropriate values to state with appropriate input if state obj doens't hold values for that box
    // input type disallows non-number inputs, first number to be inputted gets saved as long as isn't 0
    else if (!this.state.boxValues[id] && inputValue != 0) {
      const newBoxValue = {};
      newBoxValue[event.target.id] = inputValue;
      newBoxValues = Object.assign(this.state.boxValues, newBoxValue);
    
      const rowSet = this.state.rowValues[rowKey];
      rowSet.add(inputValue);
      newRowValues = {
        ...this.state.rowValues,
        rowSet,
      }

      const colSet = this.state.colValues[colKey];
      colSet.add(inputValue);
      newColValues = {
        ...this.state.colValues,
        colSet,
      }

      const threeX3Set = this.state.threeX3Values[threeX3Key];
      threeX3Set.add(inputValue);
      new3x3Values = {
        ...this.state.threeX3Values,
        threeX3Set,
      }
    }

    // reset/remove message if invalid inputs are removed
    let newMessage = this.state.message;
    if (this.ensureValidity()) newMessage = '';

    this.setState({
      boxValues: newBoxValues,
      rowValues: newRowValues,
      colValues: newColValues,
      threeX3Values: new3x3Values,
      message: newMessage,
    })
  };

  updateMessage(string) {
    this.setState({message: string})
  }

  ensureValidity() {
    const boxList = document.querySelectorAll('.box');
    for (let i = 0; i < boxList.length; i++) {
      if (!boxList[i].checkValidity()) return false;
    }
    return true;
  }
};

export default BoardContainer;