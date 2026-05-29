import Cube from "cubejs";

let initialized = false;

self.onmessage = (e) => {
  const state = e.data;

  try {

    if (!initialized) {
      Cube.initSolver();
      initialized = true;
    }

    const cube = Cube.fromString(state);

    const SOLVED_STATE =
  "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";

let solution;

if (state === SOLVED_STATE) {
  solution = " ";
} else {
  solution = cube.solve();
}

    self.postMessage({
      success: true,
      solution,
    });

  } catch (err) {

    self.postMessage({
      success: false,
      error: err.message,
    });

  }
};