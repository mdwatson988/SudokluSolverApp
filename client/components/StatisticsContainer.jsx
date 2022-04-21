import React, { Component } from 'react';

import StatisticsDisplay from "./StatisticsDisplay.jsx";
import ResetButton from "./ResetButton.jsx";

class StatisticsContainer extends Component {
  render() {
    return (
      <div id="statsContainer" className="container">
        <StatisticsDisplay
          solvedToday={this.props.solvedToday}
          solvedThisMonth={this.props.solvedThisMonth}
          solvedTotal={this.props.solvedTotal}
        />
        <ResetButton
          handleClickResetButton={this.props.handleClickResetButton}
        />
      </div>
    );
  }
}

export default StatisticsContainer;