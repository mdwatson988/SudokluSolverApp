import { SolverValues, SudokuValues } from "./types";

export default class Sudoku {

  private numCoordsStillEmpty: number = 81;
  private valuesNeededInZone: SolverValues; // key is string "r1"/"c7"/"b3", value is set of nums
  private valuesAttemptedAtCoord: SolverValues; // key is coord string "r1c7b3", value is set of nums

  rows: SudokuValues;
  columns: SudokuValues;
  boxes: SudokuValues;

  public constructor ( // invoke by passing sets storing state on front end
    userInputRows: SudokuValues,
    userInputCols: SudokuValues,
    userInputBoxes: SudokuValues
  ) {

    this.rows = userInputRows;
    this.columns = userInputCols;
    this.boxes = userInputBoxes;

    // populate objects which store data needed by solver
    for (let i = 1; i < 10; i++) {
      const row = "r" + i;
      const column = "c" + i;
      const box = "b" + i;

      // create set for each zone
      this.valuesNeededInZone.set(row, new Set());
      this.valuesNeededInZone.set(column, new Set());
      this.valuesNeededInZone.set(box, new Set());

      // populate each set with values 1-9
      for (let j = 1; j < 10; j++) {
        this.valuesNeededInZone.get(row)?.add(j);
        this.valuesNeededInZone.get(column)?.add(j);
        this.valuesNeededInZone.get(box)?.add(j);
      }
    }

    // update with starting values passed in from front end state
    for (const map of Object.values(this.rows)) {
      for (const [coord, value] of map) {
        this.valuesNeededInZone.get("r" + coord[1])?.delete(value);
        this.numCoordsStillEmpty--;
      }
    }
    for (const map of Object.values(this.columns)) {
      for (const [coord, value] of map) {
        this.valuesNeededInZone.get("c" + coord[3])?.delete(value);
      }
    }
    for (const map of Object.values(this.boxes)) {
      for (const [coord, value] of map) {
        this.valuesNeededInZone.get("b" + coord[5])?.delete(value);
      }
    }
  }


  // finds row/column/box that is closest to being completed
  // and therefore most likely to have correct values guessed
  private _zoneTargetFinder(): string | undefined {
    let currentTarget;
    let minNumToFill: number = 10;

    for (const [zone, set] of this.valuesNeededInZone.entries()) {
      // only choose row or column zone b/c the best specific target coord can be easily chosen
      if (zone[0] !== "b") {
        const numCoordsStillEmpty: number = 9 - set.size;

        if (numCoordsStillEmpty === 0) null;
        else if (numCoordsStillEmpty < minNumToFill) {
          currentTarget = zone;
          minNumToFill = numCoordsStillEmpty;
          if (minNumToFill === 1) break; // zone with 1 to fill is ideal, no need to keep looking
        }
      }
    }
    // returning undefined is unexpected behavior
    return currentTarget ? currentTarget : undefined; // may need to rethink the undefined vs null thing
  }


  // determines exact coordinate for guess within target row/column/box
  // finds which column is closest to completed within target row or vice versa
  // returning null is expected behavior, returning undefined is not
  private _coordTargetFinder(targetZone: string | undefined): string | null | undefined {
    if (!targetZone) {
      console.log("Unable to find target zone")
      return undefined;
    }

    function _determineBox(row: number, col:number): number {
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

      // find available space in row or column within target zone closest to being completed
    function _rowOrColumn(noIntersect: Set<number>, rowsOrColumns: SudokuValues): string {
      let minSize = 10
      let results;
      for (const [num, map] of Object.entries(rowsOrColumns)) {
        if (noIntersect.has(Number(num))) {
          if (map.size < minSize) {
            minSize = map.size
            results = num;
            if (map.size === 1) break;
          }
        }
      }
      return results;
    }

    const occupied = new Set();
    let rowNumber;
    let colNumber;

    if (targetZone[0] === "r") { // target is a row
      rowNumber = targetZone[1];
      for (const coord of this.rows[targetZone[1]].keys()) {
        occupied.add(Number(coord[3]))
      }
    }

    else { // target is a column
      colNumber = targetZone[1];
      for (const coord of this.columns[targetZone[1]].keys()) {
        occupied.add(Number(coord[1]))
      }
    }

    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const noIntersect = new Set(nums.filter(x => !occupied.has(x))) // potential row/column numbers to choose from
    // https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript

    targetZone[0] === "r"
      ? colNumber = _rowOrColumn(noIntersect, this.columns) // this could evaluate to undefined
      : rowNumber = _rowOrColumn(noIntersect, this.rows); // this could evaluate to undefined

    // if unable to find row/col, solve f'n will have to remove
    // this function returning null is expected behavior
    if (!rowNumber || !colNumber) return null;

    const boxNum = _determineBox(Number(rowNumber), Number(colNumber));

    return "r" + rowNumber + "c" + colNumber + "b" + boxNum;
  }


  private _guessTargetValue(targetCoord: string | undefined): number | string | undefined {
    // this is unexpected behavior, solve f'n checks for null target coord prior to guessing value
    if (targetCoord === undefined) {
      console.log("Unable to find target coords");
      return undefined;
    }

    const possRowVals: Set<number> = this.valuesNeededInZone["r" + targetCoord[1]]
    const possColVals: Set<number> = this.valuesNeededInZone["c" + targetCoord[3]]
    const possBoxVals: Set<number> = this.valuesNeededInZone["b" + targetCoord[5]]

    // set of all values which still fit within row/col/box constraints at target coord
    const possibleValues: Set<number> = [possRowVals, possColVals, possBoxVals]
      .reduce((a, b) => new Set([...a].filter(x => b.has(x))));

    // if no possible values found, solve f'n will need to remove previous node and guess new value
    if (possibleValues.size === 0) return "No value possible";

    // guess and return first value which is possible and hasn't been attempted
    const valuesAttemptedAtCoord: Set<number> = this.valuesAttemptedAtCoord[targetCoord];
    for (const value of possibleValues) {
      if (!valuesAttemptedAtCoord.has(value)) return value;
    }

    // if all possible values for target have been attempted
    // solve f'n must remove the node previous to target and try new value there
    return "All potential values attempted"
  }


  private _addValue(targetCoord: string, targetValue: number): void {
    // add value to coordinate in each row/column/box
    this.rows[targetCoord[1]].set(targetCoord, targetValue);
    this.columns[targetCoord[3]].set(targetCoord, targetValue);
    this.boxes[targetCoord[5]].set(targetCoord, targetValue);
    
    this.valuesNeededInZone.get("r" + targetCoord[1])?.delete(targetValue);
    this.valuesNeededInZone.get("c" + targetCoord[3])?.delete(targetValue);
    this.valuesNeededInZone.get("b" + targetCoord[5])?.delete(targetValue);

    this.valuesAttemptedAtCoord[targetCoord].add(targetValue);

    this.numCoordsStillEmpty--;
  }


  private _removeValue(targetCoord: string): void {
    const valueRemoved = this.rows[targetCoord[1]].get(targetCoord);

    this.rows[targetCoord[1]].delete(targetCoord);
    this.columns[targetCoord[3]].delete(targetCoord);
    this.boxes[targetCoord[5]].delete(targetCoord);

    this.valuesNeededInZone.get("r" + targetCoord[1])?.add(valueRemoved);
    this.valuesNeededInZone.get("c" + targetCoord[3])?.add(valueRemoved);
    this.valuesNeededInZone.get("b" + targetCoord[5])?.add(valueRemoved);

    this.numCoordsStillEmpty++;
  }


  public solve(coordsWhereSolverAddedValue: string[] = []): SudokuValues[] | undefined {
    // break out if no user input, this is unexpected behavior
    if (this.numCoordsStillEmpty === 81) {
      console.log("No values received from front end when sudoku object was instantiated")
      return undefined;
    }

    // base case
    if (this.numCoordsStillEmpty === 0) return [this.rows, this.columns, this.boxes]

    const targetZone = this._zoneTargetFinder();
    const targetCoord = this._coordTargetFinder(targetZone);

    // if no target coord found, values guessed by solve f'n need to be removed for new guesses
    if (!targetCoord) {
      const mostRecentTargetCoord = coordsWhereSolverAddedValue.pop();

      if (mostRecentTargetCoord) {
        this._removeValue(mostRecentTargetCoord);
        const newTargetValue = this._guessTargetValue(mostRecentTargetCoord);

        if (typeof newTargetValue === "number") { // another possible value can be tried at most recent target
          this._addValue(mostRecentTargetCoord, newTargetValue);
          coordsWhereSolverAddedValue.push(mostRecentTargetCoord);
        }

        else { // no more possible values at that location, need to remove next most recent value added by solve f'n
          this.valuesAttemptedAtCoord[mostRecentTargetCoord].clear(); // reset attempted values at that coord
          const nextMostRecentTargetCoord = coordsWhereSolverAddedValue.pop();
          if (nextMostRecentTargetCoord) this._removeValue(nextMostRecentTargetCoord)
        }
      }
    }
    else { // target coord found, need to guess value at target coord

    }

    return this.solve(coordsWhereSolverAddedValue); // recursively add more values
  }
}