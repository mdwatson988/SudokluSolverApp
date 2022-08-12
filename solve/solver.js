function solver(userInputRows, userInputCols, userInputBoxes) {

  const solverRows = userInputRows.slice();
  const solverCols = userInputCols.slice();
  const solverBoxes = userInputBoxes.slice();

  const unavailableCoords = new Set();

  const availableValues = {};
  for (let i = 1; i < 10; i++) {
    const row = "r" + str(i)
    const column = "c" + str(i)
    const box = "b" + str(i)
    for (let j = 1; j < 10; j++) {availableValues[rows] = new Set();
      availableValues[row].add(j)
      availableValues[column].add(j)
      availableValues[box].add(j)
    }
  }

  let numLeftToFill = 81;   // reduce numLeftToFill for user inputs

  for (const map of userInputRows) {
    for (const [coord, value] of map) {
      unavailableCoords.add(coord);
      availableValues["r" + coord[1]].delete(value);
      numLeftToFill--;
    }
  }
  for (const map of userInputCols) {
    for (const [coord, value] of map) {
      availableValues["c" + coord[3]].delete(value);
    }
  }
  for (const map of userInputBoxes) {
    for (const [coord, value] of map) {
      availableValues["b" + coord[5]].delete(value);
    }
  }

  // break out if no user input
  if (numLeftToFill === 81) return None;

  
};


export default solver;