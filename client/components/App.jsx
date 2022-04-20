import React, { Component } from 'react';
import Board from './Board.jsx';
import SolveButton from './SolveButton.jsx';
import StatisticsContainer from './StatisticsContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solvedToday: null,
      solvedThisMonth: null,
      solvedTotal: null,
    }
    // bind the "this" internal to handleClickResetButton method to always refer to this statistic component, not to the button itself
    this.handleClickResetButton = this.handleClickResetButton.bind(this);
  }

  statsGetURL = 'http://localhost:3000/statistics';
  statsResetURL = 'http://localhost:3000/statistics/clear';

  componentDidMount() {
    fetch(this.statsGetURL)
      .then(response => response.json())
      .then(stats => this.setState({ solvedToday: stats.solvedToday, solvedThisMonth: stats.solvedThisMonth, solvedTotal: stats.solvedTotal }))
      .catch(err => console.log(`error when fetching/setting stats state: ${err}`));
  }

  render() {
    return(
      <div>
        <h1 id = 'app'>Sudoku Solver</h1>
        {/* <Board /> */}
        <StatisticsContainer
          solvedToday={this.state.solvedToday}
          solvedThisMonth={this.state.solvedThisMonth}
          solvedTotal={this.state.solvedTotal}
          handleClickResetButton={this.handleClickResetButton}
        />
      </div>
    );
  }

  handleClickResetButton(event) {
    fetch(this.statsResetURL)
      .then(response => response.json())
      .then(stats => this.setState({ solvedToday: stats.solvedToday, solvedThisMonth: stats.solvedThisMonth, solvedTotal: stats.solvedTotal }))
      .catch(err => console.log(`error when resetting stats state: ${err}`));
  }
}

export default App;