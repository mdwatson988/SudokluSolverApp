import React, { Component } from 'react';

class Box extends Component {
  enforceMinMax = (el) => {
    if (el.value) {
      if (parseInt(el.value) < parseInt(el.min) || parseInt(el.value) > parseInt(el.max)) {
        el.value = this.props.value;
      }
    }
  };

  checkBorder = (row, col) => {
    if ((row === 3 || row === 6) && (col === 3 || col === 6)) return "botRight";
    else if (row === 3 || row === 6) return "bot";
    else if ((col === 3 || col === 6)) return "right";
    else return this.props.boxKey;
  }

  render() {
    return (
      // need to figure out how to use input event listner to get value to state
      <input type="number" min="1" max="9" readOnly={false}
        /*onInput={handleBoxInput}*/
        onKeyUp={this.enforceMinMax(this)}
        id={this.checkBorder(this.props.rowKey, this.props.colKey)}
        className="box">
      </input>
    )
  }
};

export default Box;