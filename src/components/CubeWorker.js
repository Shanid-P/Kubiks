/**
 * CubeWorker.js
 *
 * cubejs is a pure CommonJS package.  Its solve.js does:
 *
 *   Cube = typeof globalThis !== 'undefined' && globalThis.Cube
 *          ? globalThis.Cube
 *          : require('./cube');
 *
 * In a Vite ES-module worker bundle `require` does not exist, so if
 * globalThis.Cube is not set the line throws.
 *
 * Fix: import cube.js (the class only, no side-effects) first, pin it on
 * globalThis so that solve.js picks it up from there instead of calling
 * require(), then import the full cubejs entry which triggers solve.js.
 */

let Cube = null;

self.onmessage = async (e) => {
  const state = e.data;

  try {
    if (!Cube) {
      // Step 1 – load the Cube class module (no solve tables yet)
      const cubeMod = await import("cubejs/lib/cube");
      const CubeClass = cubeMod.default ?? cubeMod;

      // Step 2 – expose it on globalThis so solve.js can find it
      globalThis.Cube = CubeClass;

      // Step 3 – load the full cubejs entry; this triggers solve.js which
      // reads globalThis.Cube instead of calling require('./cube')
      const fullMod = await import("cubejs");
      Cube = fullMod.default ?? fullMod;

      if (!Cube || typeof Cube.fromString !== "function") {
        throw new Error("cubejs failed to load – Cube.fromString is missing");
      }

      // Build the solver lookup tables (runs once, takes ~1-2 s)
      Cube.initSolver();
    }

    if (!state || typeof state !== "string" || state.length !== 54) {
      throw new Error("Invalid cube state: expected 54-char string");
    }

    const cube = Cube.fromString(state);
    const solution = cube.solve();

    self.postMessage({ success: true, solution: solution || "" });

  } catch (err) {
    self.postMessage({ success: false, error: err?.message ?? String(err) });
  }
};