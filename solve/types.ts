export interface SudokuValuesObject {
  location: string;
  value: number;
}

type SudokuInputs = Map<string, number>;

export type UserInputArray = readonly SudokuInputs[];

export type SolverInputArray = SudokuInputs[];