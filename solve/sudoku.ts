import { CoordValues, AttemptedValues, SudokuValues } from "./types";

export default class Sudoku {

  private unavailableCoords: Set<string>;
  private availableValues: CoordValues;
  private attemptedValues: AttemptedValues;

  private rows: SudokuValues;
  private columns: SudokuValues;
  private boxes: SudokuValues;

  public constructor(
    userInputRows: SudokuValues,
    userInputCols: SudokuValues,
    userInputBoxes: SudokuValues
  ) {

    this.rows = userInputRows;
    this.columns = userInputCols;
    this.boxes = userInputBoxes;

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

    for (const map of Object.values(this.rows)) {
      for (const [coord, value] of map) {
        this.unavailableCoords.add(coord);
        this.availableValues["r" + coord[1]].delete(value);
        numLeftToFill--;
      }
    }
    for (const map of Object.values(this.columns)) {
      for (const [coord, value] of map) {
        this.availableValues["c" + coord[3]].delete(value);
      }
    }
    for (const map of Object.values(this.boxes)) {
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

  private _addValue(targetCoord, targetValue) {
    this.solverRows['r' + targetCoord[1]] = targetValue
    this.solverCols['c' + targetCoord[3]] = targetValue
    this.solverBoxes['b' + targetCoord[5]] = targetValue

    this.attemptedValues[targetCoord].add(targetValue)


  }

  private _removeValue() {

  }

  public solve() {
    // break out if no user input
    //if (numLeftToFill === 81) return None;
  }
}