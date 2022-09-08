type SudokuInputs = Map<string, number>;

// for saving values for each row/col/box - matches data type of saved state on front end
export interface SudokuValues { 
  [key: string]: any; // number of row/column/box
  value: SudokuInputs; // (box label: value in box)
};

// for saving data necessary for solver to function
export type SolverValues = Map<string, Set<number> >;