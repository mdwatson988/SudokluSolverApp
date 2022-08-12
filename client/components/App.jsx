import React, { Component } from 'react';
import BoardContainer from './BoardContainer';
import StatisticsContainer from './StatisticsContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      solvedToday: null,
      solvedThisMonth: null,
      solvedTotal: null,
    }
    // bind the "this" internal to Button method to always refer to this app component's state, not to the button component itself
    this.handleClickUpdateButton = this.handleClickUpdateButton.bind(this);
    this.handleClickResetButton = this.handleClickResetButton.bind(this);
  }

  statsGetURL = 'http://localhost:3000/statistics';
  statsUpdateURL = 'http://localhost:3000/statistics/update';
  statsResetURL = 'http://localhost:3000/statistics/clear';

  componentDidMount() {
    fetch(this.statsGetURL)
      .then(response => response.json())
      .then(stats => this.setState({ 
          solvedToday: stats.solvedToday, 
          solvedThisMonth: stats.solvedThisMonth, 
          solvedTotal: stats.solvedTotal 
        }))
      .catch(err => console.log(`error when fetching/setting stats state: ${err}`));
  }

  render() {
    return(
      <div id ="app">
        <h1 id="title">Sudoku Solver</h1>
        <BoardContainer
          handleClickUpdateButton={this.handleClickUpdateButton}
        />
        
        <StatisticsContainer
          solvedToday={this.state.solvedToday}
          solvedThisMonth={this.state.solvedThisMonth}
          solvedTotal={this.state.solvedTotal}
          handleClickResetButton={this.handleClickResetButton}
        />
      </div>
    );
  }

  handleClickUpdateButton(event) {
    fetch(this.statsUpdateURL)
      .then(response => response.json())
      .then(stats => this.setState({ 
        solvedToday: stats.solvedToday, 
        solvedThisMonth: stats.solvedThisMonth, 
        solvedTotal: stats.solvedTotal
      }))
      .catch(err => console.log(`error when updating stats state: ${err}`));
  }

  handleClickResetButton(event) {
    fetch(this.statsResetURL)
      .then(response => response.json())
      .then(stats => this.setState({
        solvedToday: stats.solvedToday, 
        solvedThisMonth: stats.solvedThisMonth, 
        solvedTotal: stats.solvedTotal
      }))
      .catch(err => console.log(`error when resetting stats state: ${err}`));
  }
}

export default App;