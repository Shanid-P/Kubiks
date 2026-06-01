// Use dynamic import to correctly handle cubejs (CommonJS) in a Vite ES module worker
let Cube = null;

self.onmessage = async (e) => {
  const state = e.data;

  try {
    // Lazy-load cubejs with CJS/ESM interop support
    if (!Cube) {
      const mod = await import("cubejs");
      // Handle both ESM default export and CJS module.exports
      Cube = mod.default || mod;

      if (!Cube || !Cube.fromString) {
        throw new Error("cubejs failed to load — Cube is undefined");
      }

      Cube.initSolver();
    }

    if (!state || typeof state !== "string" || state.length !== 54) {
      throw new Error("Invalid cube state string");
    }

    const cube = Cube.fromString(state);
    const solution = cube.solve();

    self.postMessage({
      success: true,
      solution: solution || "",
    });

  } catch (err) {
    self.postMessage({
      success: false,
      error: err?.message || String(err),
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