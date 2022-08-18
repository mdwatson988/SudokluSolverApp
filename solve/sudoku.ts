import { SudokuValuesObject, UserInputArray, SolverInputArray } from "./types";

export default class Sudoku {

  private unavailableCoords: Set<string>;
  private availableValues: SudokuValuesObject;

  public constructor(
    userInputRows: UserInputArray,
    userInputCols: UserInputArray,
    userInputBoxes: UserInputArray
  ) {

    const solverRows: SolverInputArray = userInputRows.slice();
    const solverCols: SolverInputArray = userInputCols.slice();
    const solverBoxes: SolverInputArray = userInputBoxes.slice();

    for (let i = 1; i < 10; i++) {
      const row = "r" + i
      const column = "c" + i
      const box = "b" + i
      for (let j = 1; j < 10; j++) {
        this.availableValues[row].add(j)
        this.availableValues[column].add(j)
        this.availableValues[box].add(j)
      }
    }

    let numLeftToFill: number = 81;

    for (const map of userInputRows) {
      for (const [coord, value] of map) {
        this.unavailableCoords.add(coord);
        this.availableValues["r" + coord[1]].delete(value);
        numLeftToFill--;
      }
    }
    for (const map of userInputCols) {
      for (const [coord, value] of map) {
        this.availableValues["c" + coord[3]].delete(value);
      }
    }
    for (const map of userInputBoxes) {
      for (const [coord, value] of map) {
        this.availableValues["b" + coord[5]].delete(value);
      }
    }
  }

  // finds row/column/box that is closest to being completed
  // and therefore most likely to have correct values guessed
  private _macroTargetFinder() {

  }

  // determines exact coordinate for guess within target row/column/box
  private _microTargetFinder() {

  }

  private _guessTargetValue() {

  }

  private _addValue() {

  }

  private _removeValue() {

  }

  public solve() {
    // break out if no user input
    //if (numLeftToFill === 81) return None;
  }
}