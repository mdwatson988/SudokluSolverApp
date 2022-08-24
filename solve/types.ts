type SudokuInputs = Map<string, number>;

export interface SudokuValues {
  key: number; // number of row/column/box
  value: SudokuInputs; // (box label: value in box)
};

export type ZoneValues = Map<string, Set<number> >;