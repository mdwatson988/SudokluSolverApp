import React, { Component } from 'react';
import Box from './Box';

class Board extends Component {

  render() {
    const boxes = [];
    
    function determine3x3(row, col) {
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

    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        const threeX3 = determine3x3(i, j)
        boxes.push(<Box
          boxKey={`r${i}c${j}b${threeX3}`} // used to set ID of individual boxes in box component
          key={`r${i}c${j}b${threeX3}`} // used by React's virtual DOM
          handleBoxInput={this.props.handleBoxInput}
        />);
      }
    }
    
    return (
      <div id="board">
        {boxes}
      </div>
    )
  }
};

export default Board;