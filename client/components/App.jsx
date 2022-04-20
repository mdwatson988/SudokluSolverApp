import React, { Component } from 'react';
import Board from './Board.jsx';
import SolveButton from './SolveButton.jsx';
import Statistics from './Statistics.jsx';

class App extends Component {
  render() {
    return(
      <div>
        <h1 id = 'app'>Sudoku Solver</h1>
        {/* <Board /> */}
        {/* <Statistics /> */}
      </div>
    );
  }
}

export default App;