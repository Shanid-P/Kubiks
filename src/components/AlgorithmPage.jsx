import React, { useEffect, useRef, useState } from "react";


// Algorithm learning page using AnimCube3
export default function AlgorithmPage() {
  const cubeRef = useRef(null);

  // Load AnimCube3 script once
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/AnimCube3.js";
    script.async = true;
    script.onload = () => {
      if (window.AnimCube3) {
        // Show a static cube on load
        renderCube();
        setScriptReady(true);
      } else {
        console.error("AnimCube3 script loaded but window.AnimCube3 is undefined");
      }
    };
    script.onerror = () => {
      console.error("Failed to load AnimCube3 script at /AnimCube3.js");
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Track script readiness
  const [scriptReady, setScriptReady] = useState(false);
  // Track the move requested by the user
  const [currentMove, setCurrentMove] = useState("");

  // Helper to render cube with optional moves
  const renderCube = (moves = "") => {
    const container = document.getElementById("algoCube");
    if (!container) return;
    container.innerHTML = "";
    const facelets = "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";
    const encodedMoves = encodeURIComponent(moves).replace(/%20/g, '+');
    const params = `id=algoCube&facelets=${facelets}&colorscheme=wrgyob&cubecolor=000000&run=1&move=${encodedMoves}&bgcolor=ffffff00&transparent=1`;
    console.log("AnimCube params:", params);
    if (window.AnimCube3) {
      window.AnimCube3(params);
    } else {
      console.error("AnimCube3 is not available – ensure /AnimCube3.js is loaded correctly");
    }
  };

  // Trigger cube render whenever a new move is set and the script is ready
  useEffect(() => {
    if (scriptReady && currentMove) {
      renderCube(currentMove);
    }
  }, [scriptReady, currentMove]);

  // Track user-entered move sequence
  const [inputMove, setInputMove] = useState("");

  // Handler for custom input submission
  const handleCustomRun = () => {
    if (inputMove.trim()) {
      setCurrentMove(inputMove.trim());
    }
  };
  const handleMoveClick = (move) => {
    // Store the move; renderCube will be called by the effect above
    setCurrentMove(move);
  };

  return (
    <div className="min-h-screen bg-[#0a0c12] text-slate-100 antialiased flex flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold mb-8">Cube Algorithms Playground</h1>
      <div className="flex gap-4 mb-6">
        {/* Custom move input */}
        <div className="flex gap-2 mb-6 items-center">
          <input
            type="text"
            placeholder="Enter moves e.g. R U R'"
            value={inputMove}
            onChange={(e) => setInputMove(e.target.value)}
            className="bg-[#1e1e1e] text-white px-3 py-2 rounded-md focus:outline-none"
          />
          <button
            onClick={handleCustomRun}
            className="bg-[#0066ff] hover:bg-[#0055cc] text-white font-bold px-4 py-2 rounded-md transition-colors"
          >
            Run Moves
          </button>
        </div>
        {/* Basic move buttons */}
        {[
          "R",
          "R'",
          "U",
          "U'",
          "F",
          "F'",
          "L",
          "L'",
          "D",
          "D'",
        ].map((mv) => (
          <button
            key={mv}
            onClick={() => handleMoveClick(mv)}
            className="bg-[#FF5800] hover:bg-[#e64f00] text-black font-bold px-5 py-2.5 rounded-md transition-colors"
          >
            {mv}
          </button>
        ))}
      </div>
      {/* Pattern buttons */}
      <div className="flex gap-4 mb-8">
        {/* Run full algorithm button */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => handleMoveClick("R U R' U' F R F'")}
            className="bg-[#32CD32] hover:bg-[#2eb92e] text-white font-bold px-6 py-2.5 rounded-md transition-colors"
          >
            Run Full Algorithm
          </button>
          <button
            onClick={() => handleMoveClick("")}
            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold px-6 py-2.5 rounded-md transition-colors"
          >
            Reset
          </button>
        </div>
        <button

          onClick={() => handleMoveClick(seq)}
          className="bg-[#1e90ff] hover:bg-[#1c7cd6] text-white font-medium px-4 py-2 rounded-md transition-colors"
        >
          {/* {seq} */} SEq
        </button>

      </div>
      {/* Cube container */}
      <div className="relative w-96 h-96">
        <div id="algoCube" ref={cubeRef} className="w-full h-full" />
      </div>
    </div>
  );
}
