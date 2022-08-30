import { ZoneValues, SudokuValues } from "./types";

export default class Sudoku {

  private unavailableCoords: Set<string>; // is this ever used?
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

  private _determineBox(row: number, col:number): number {
    if (row <= 3) {
      if (col <= 3) return 1
      else if (col <= 6) return 2
      else return 3
    }
    else if (row <= 6) {
      if (col <= 3) return 4
      else if (col <= 6) return 5
      else return 6
    }
    else {
      if (col <= 3) return 7
      else if (col <= 6) return 8
      else return 9
    }
  };

  // finds row/column/box that is closest to being completed
  // and therefore most likely to have correct values guessed
  private _zoneTargetFinder(): string | null {
    let currentTarget;
    let minNumToFill = 10;

    for (const [zone, set] of this.availableValues.entries()) {
      const numLeftToFill = 9 - set.size;

      if (numLeftToFill === 0) null;
      else if (numLeftToFill < minNumToFill) {
        currentTarget = zone;
        minNumToFill = numLeftToFill;
        if (minNumToFill === 1) break; // zone with 1 to fill is ideal, no need to keep looking
      }
    }

    if (currentTarget) return currentTarget;
    else {
      console.log('Problem finding target zone');
      return null;
    }
  }

  // determines exact coordinate for guess within target row/column/box
  // finds which column is closest to completed within target row
  // or vice versa
  private _targetFinder() {
    const targetZone = this._zoneTargetFinder();
    let target: string;

    if (targetZone) {
       // find available space in row or column within target zone closest to being completed
      function rowOrColumn(noIntersect: Set<number>, rowsOrColumns: SudokuValues): string {
        let minSize = 10
        let results;
        for (const [num, map] of Object.entries(rowsOrColumns)) {
          if (noIntersect.has(Number(num))) {
            if (map.size < minSize) {
              minSize = map.size
              results = num;
              if (minSize === 1) break;
            }
          }
        }
        return results;
      }

      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      if (targetZone[0] === "r") {
      // this tracks all occupied columns in target row
      const occupiedColumns = new Set();
        for (const coord of this.rows[targetZone[1]].keys()) {
          occupiedColumns.add(Number(coord[3]))
        }

        // https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
        const noIntersect = new Set(nums.filter(x => !occupiedColumns.has(x))) // potential column numbers to choose from

        const colNum = rowOrColumn(noIntersect, this.columns);
        const boxNum = this._determineBox(Number(targetZone[1]), Number(colNum));
        target = "r" + targetZone[1] + "c" + colNum + "b" + boxNum;
      }

      else if (targetZone[0] === "c") {
        const occupiedRows = new Set();
        for (const coord of this.columns[targetZone[1]].keys()) {
          occupiedRows.add(Number(coord[1]))
        }

        const noIntersect = new Set(nums.filter(x => !occupiedRows.has(x))) // potential row numbers to choose from
        
        const rowNum = rowOrColumn(noIntersect, this.rows);
        const boxNum = this._determineBox(Number(rowNum), Number(targetZone[1]));
        target = "r" + rowNum + "c" + targetZone[1] + "b" + boxNum;
      }

      else { // target is a box
        const occupiedRows = new Set();
        const occupiedColumns = new Set();

        for (const coord of this.boxes[targetZone[1]].keys()) {
          occupiedRows.add(Number(coord[1]));
          occupiedColumns.add(Number(coord[3]));
        }

        // how to make sure column and row match up within box?
        // i.e. row 3 has open spaces in spots 1 and 3
        // don't want to choose row 3 as closest row to being filled
        // then column 2 as closest column to be filled
        // then find that row 3, col 2 already has a value

        target = "r" + "c" + "b" + targetZone[1];
      }
      return target;
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