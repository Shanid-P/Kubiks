import Cube from 'cubejs';

try {
  Cube.initSolver();
  let cube = new Cube();
  console.log("Cube instantiated!");
  cube.randomize();
  console.log("Random state:", cube.asString());
  let solveMoves = cube.solve();
  console.log("Solution:", solveMoves);
} catch (e) {
  console.error("Error:", e);
}
