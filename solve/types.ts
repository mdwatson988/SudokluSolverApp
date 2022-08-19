export interface CoordValues {
  location: string;
  value: number;
}

export type AttemptedValues = Map<string, Set<number> >;

type SudokuInputs = Map<string, number>;

export interface SudokuValues {
  key: number;
  value: SudokuInputs;
};