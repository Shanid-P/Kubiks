import Cube from "cubejs";

let initialized = false;

self.onmessage = (e) => {
  const state = e.data;

  try {

    if (!initialized) {
      Cube.initSolver();
      initialized = true;
    }

    // const cube = new Cube();

    const cube = Cube.fromString(state);

    const SOLVED_STATE =
      "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";

    let solution;

    // if (state === SOLVED_STATE) {
    //   solution = " ";
    // } else {
      solution = cube.solve();
    // }

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


// CubeWorker.js

// let Cube = null;

// self.onmessage = async (e) => {
//   const state = e.data;

//   try {
//     // Lazy-load cubejs safely
//     if (!Cube) {
//       const mod = await import("cubejs");

//       // IMPORTANT: support both export styles
//       Cube = mod.default || mod;

//       if (!Cube || !Cube.fromString) {
//         throw new Error("cubejs failed to load properly");
//       }

//       if (Cube.initSolver) {
//         Cube.initSolver();
//       }
//     }

//     // validate input
//     if (!state || typeof state !== "string" || state.length !== 54) {
//       throw new Error("Invalid cube state");
//     }

//     const cube = Cube.fromString(state);
//     const solution = cube.solve();

//     self.postMessage({
//       success: true,
//       solution: solution || "",
//     });

//   } catch (err) {
//     self.postMessage({
//       success: false,
//       error: err?.message || String(err),
//     });
//   }
// };