# SudokluSolverApp
JavaScript React sudoku solver, Express server communicating with MongoDB to store/retrieve usage statistics

MVP scope:
  1) Create React front end that has puzzle board, solve button, usage statistics.
  2) Allow users to input a single number into each space. If number input isn’t valid, highlight conflicting number.
  3) Create MongoDB database to store usage statistics and Express server to allow app to update and retrieve statistics: number of puzzles solved today,        this week, total.
  4) Solve button updates usage statistics (without solving the puzzle).
 
Stretch goals:
  1) Implement logic to solve the puzzle.
  2) CSS styling
  3) Mobile friendly
  4) Allow users to play sudoku games in the app. Server requests to an open source Sudoku generator API will offer new puzzles to users.
