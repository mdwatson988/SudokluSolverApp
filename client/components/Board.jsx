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
          threeX3Key={this.props.determine3x3(i, j)}
          /*boxKey={`r${i}c${j}`}*/
          handleBoxInput={this.props.handleBoxInput}
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
};

export default Board;