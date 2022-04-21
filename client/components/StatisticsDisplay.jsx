import React, { Component } from 'react';

class StatisticsDisplay extends Component {
  render() {
    return (
      <>
        <h2 id="statsHeader"><u>Usage Statistics</u></h2>
          <ul id="statsList">
            <li>Solved Today: {this.props.solvedToday}</li>
            <li>Solved This Month: {this.props.solvedThisMonth}</li>
            <li>Solved Total: {this.props.solvedTotal}</li>
          </ul>
      </>
    )
  }
}

export default StatisticsDisplay;