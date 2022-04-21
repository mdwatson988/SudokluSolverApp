import React, { Component } from 'react';
import Box from './Box';

class Board extends Component {
  render() {
    const boxes = [];
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        boxes.push(<Box
          rowKey={i}
          colKey={j}
          threeX3Key={this.determine3x3(i, j)}
          boxKey={`r${i}c${j}`}
          value={this.props.boxValues[`r${i}c${j}`]}
          // handleBoxInput={this.props.handleBoxInput}
          key={`r${i}c${j}`}
        />);
      }
    }
    return (
      <div id="board">
        {boxes}
      </div>
    )
  }

  determine3x3 = (row, col) => {
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
};

export default Board;