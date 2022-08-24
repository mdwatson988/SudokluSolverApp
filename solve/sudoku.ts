import { ZoneValues, SudokuValues } from "./types";

export default class Sudoku {

  private unavailableCoords: Set<string>;
  private availableValues: ZoneValues;
  private attemptedValues: ZoneValues;
  private numLeftToFill: number = 81;

  rows: SudokuValues;
  columns: SudokuValues;
  boxes: SudokuValues;

  public constructor(
    userInputRows: SudokuValues,
    userInputCols: SudokuValues,
    userInputBoxes: SudokuValues
  ) {

    this.rows = userInputRows;
    this.columns = userInputCols;
    this.boxes = userInputBoxes;

    for (let i = 1; i < 10; i++) {
      const row = "r" + i;
      const column = "c" + i;
      const box = "b" + i;

      this.availableValues.set(row, new Set());
      this.availableValues.set(column, new Set());
      this.availableValues.set(box, new Set());

      for (let j = 1; j < 10; j++) {
        this.availableValues.get(row)?.add(j);
        this.availableValues.get(column)?.add(j);
        this.availableValues.get(box)?.add(j);
      }
    }

    for (const map of Object.values(this.rows)) {
      for (const [coord, value] of map) {
        this.unavailableCoords.add(coord);
        this.availableValues.get("r" + coord[1])?.delete(value);
        this.numLeftToFill--;
      }
    }
    for (const map of Object.values(this.columns)) {
      for (const [coord, value] of map) {
        this.availableValues.get("c" + coord[3])?.delete(value);
      }
    }
    for (const map of Object.values(this.boxes)) {
      for (const [coord, value] of map) {
        this.availableValues.get("b" + coord[5])?.delete(value);
      }
    }
  }

  // finds row/column/box that is closest to being completed
  // and therefore most likely to have correct values guessed
  private _zoneTargetFinder(): string | null {
    let currentTarget;
    let minNumToFill = 9;

    this.availableValues.forEach((set, zone) => {
      const numLeftToFill = 9 - set.size;

      if (numLeftToFill === 0) null;
      else if (numLeftToFill < minNumToFill) {
        currentTarget = zone;
        minNumToFill = numLeftToFill;
      }
    })

    if (currentTarget) return currentTarget;
    else {
      console.log('Problem finding target zone');
      return null;
    }
  }

  // determines exact coordinate for guess within target row/column/box
  private _targetFinder() {
    const targetZone = this._zoneTargetFinder();
    let zone;

    if (targetZone) {

      if (targetZone[0] === "r") zone = this.rows[targetZone[1]];
      else if (targetZone[0] === "c") zone = this.columns[targetZone[1]]
      else if (targetZone[0] === "b") zone = this.boxes[targetZone[1]]

      // how to determine coordinate that isn't already part of the map?
      // zone currently contains a map of occupied coords => value at coord
    }

  }

  private _guessTargetValue() {

  }

  private _addValue(targetCoord: string, targetValue: number): void {
    // add value to coordinate in each row/column/box
    this.rows[targetCoord[1]].set(targetCoord, targetValue);
    this.columns[targetCoord[3]].set(targetCoord, targetValue);
    this.boxes[targetCoord[5]].set(targetCoord, targetValue);
    
    this.availableValues.get("r" + targetCoord[1])?.delete(targetValue);
    this.availableValues.get("c" + targetCoord[3])?.delete(targetValue);
    this.availableValues.get("b" + targetCoord[5])?.delete(targetValue);

    this.attemptedValues[targetCoord].add(targetValue);
    this.unavailableCoords.add(targetCoord);

    this.numLeftToFill--;
  }

  private _removeValue(targetCoord: string): void {
    const valueRemoved = this.rows[targetCoord[1]].get(targetCoord);

    this.rows[targetCoord[1]].delete(targetCoord);
    this.columns[targetCoord[3]].delete(targetCoord);
    this.boxes[targetCoord[5]].delete(targetCoord);

    this.availableValues.get("r" + targetCoord[1])?.add(valueRemoved);
    this.availableValues.get("c" + targetCoord[3])?.add(valueRemoved);
    this.availableValues.get("b" + targetCoord[5])?.add(valueRemoved);

    this.unavailableCoords.delete(targetCoord);

    this.numLeftToFill++;
  }

  public solve() {
    // break out if no user input
    if (this.numLeftToFill === 81) return null;

    // does this.unavailableCoords get used???
  }
}