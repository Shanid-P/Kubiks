import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CUBES_DATA = [
  { size: "2x2", name: "Pocket Cube", img: "2x2.png" },
  { size: "3x3", name: "Rubik's Cube", img: "3x3.png" },
  { size: "4x4", name: "Legend's Cube", img: "4x4.png" },
];

const SELECTABLE_COLORS = [
  { id: "W", name: "White", hex: "#ffffff" },
  { id: "Y", name: "Yellow", hex: "#eab308" },
  { id: "G", name: "Green", hex: "#22c55e" },
  { id: "B", name: "Blue", hex: "#3b82f6" },
  { id: "O", name: "Orange", hex: "#f97316" },
  { id: "R", name: "Red", hex: "#ef4444" },
];

// Mapping to standard layout faces
const faceData = [
  { id: 0, face: "top" },    // U
  { id: 1, face: "right" },  // R
  { id: 2, face: "front" },  // F
  { id: 3, face: "bottom" }, // D
  { id: 4, face: "left" },   // L
  { id: 5, face: "back" },   // B
];

const stickers = [
  { id: 0 }, { id: 1 }, { id: 2 },
  { id: 3 }, { id: 4 }, { id: 5 },
  { id: 6 }, { id: 7 }, { id: 8 }
];

const charMap = {
  W: "U",
  R: "R",
  G: "F",
  Y: "D",
  O: "L",
  B: "B",
};

function SolverPage() {
  const [isSelected, setSelectedSize] = useState("3x3");
  const [activeColor, setActivePaintColor] = useState("W");
  const [solution, setSolution] = useState("");
  const [rotation, setRotation] = useState({ x: -25, y: -45 });

  const [colorCode, setColorCode] = useState([
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'], // 0: Top (U)
    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'], // 1: Right (R)
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'], // 2: Front (F)
    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'], // 3: Bottom (D)
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], // 4: Left (L)
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'], // 5: Back (B)
  ]);

  const workerRef = useRef(null);
  const cubeRef = useRef(null);

  // Core Facelet Array Transformer for AnimCube3 format configuration
  const generateFacelets = () => {
    // AnimCube expects array sequences order: U, D, F, B, L, R
    const animCubeOrder = [
      colorCode[0], // U
      colorCode[3], // D
      colorCode[2], // F
      colorCode[5], // B
      colorCode[4], // L
      colorCode[1]  // R
    ];

    const faceTransforms = {
      up:    [6, 7, 8, 3, 4, 5, 0, 1, 2], // 90 deg clockwise
      down:  [0, 3, 6, 1, 4, 7, 2, 5, 8],
      front: [0, 3, 6, 1, 4, 7, 2, 5, 8],
      back:  [0, 3, 6, 1, 4, 7, 2, 5, 8],
      left:  [2, 1, 0, 5, 4, 3, 8, 7, 6], // Horizontal reflection
      right: [0, 3, 6, 1, 4, 7, 2, 5, 8],
    };

    const faceNames = ["up", "down", "front", "back", "left", "right"];

    const transformedFaces = animCubeOrder.map((faceArr, index) => {
      const faceName = faceNames[index];
      const transform = faceTransforms[faceName];
      return transform.map(i => faceArr[i]);
    });

    return transformedFaces.flat().join("");
  };

const renderCube = () => {
  const container = document.getElementById("heroCube");
  if (!container) return;

  container.innerHTML = "";
  const facelets = generateFacelets();
  
  const params = `id=heroCube
    &facelets=${facelets}
    &repeat=0
    &speed=20
    &buttonbar=1
    &edit=0
    &bgcolor=ffffff00
    &transparent=1`;

  if (window.AnimCube3) {
    window.myCube = window.AnimCube3(params);

    // Clean up non-standard attributes that trigger React runtime console warnings
    const images = container.querySelectorAll("img");
    images.forEach((img) => {
      if (img.hasAttribute("error")) {
        img.removeAttribute("error");
      }
    });
  }
};
  const handleStickerClick = (pos, side) => {
    setColorCode(prev => {
      const updated = prev.map((arr, idx) => 
        idx === side ? [...arr.slice(0, pos), activeColor || 'W', ...arr.slice(pos + 1)] : arr
      );
      return updated;
    });
  };

  const handleSolve = () => {
    // CRITICAL FIX: Extract flat arrays matching exact order U, R, F, D, L, B for Kociemba standard
    const orderedFacesForKociemba = [
      colorCode[0], // U
      colorCode[1], // R
      colorCode[2], // F
      colorCode[3], // D
      colorCode[4], // L
      colorCode[5]  // B
    ];

    const stateString = orderedFacesForKociemba.flat().map(c => charMap[c]).join('');
    
    // Perform dynamic face counts validation step
    const counts = {};
    for (const ch of stateString) {
      counts[ch] = (counts[ch] || 0) + 1;
    }

    const isValid = counts.U === 9 && counts.R === 9 && counts.F === 9 && counts.D === 9 && counts.L === 9 && counts.B === 9;

    if (!isValid) {
      setSolution("Invalid configuration! Every face color counts must be exactly 9.");
      return;
    }

    setSolution("Solving...");
    if (workerRef.current) {
      workerRef.current.postMessage(stateString);
    }
  };

  
const handleAnimate = () => {
  if (!solution || solution === "Solving..." || solution === "Invalid cube state" || solution === "Invalid cube colors") {
    console.warn('No valid solution moves available to animate.');
    return;
  }

  // 1. Build the fresh cube geometry (this automatically strips out the invalid 'error' props)
  renderCube();

  // 2. Play the move sequence programmatically
  setTimeout(() => {
    const container = document.getElementById("heroCube");
    if (!container) return;

    // Synchronize moves string directly into the global AnimCube access configurations
    if (window.acjs_move && window.acjs_move["heroCube"]) {
      window.acjs_move["heroCube"] = solution;
      
      if (typeof window.acjs_initMove === "function") {
        window.acjs_initMove["heroCube"]();
      }
    }

    // Locate the native "Play Forward" button inside the cleansed layout tree
    const images = container.querySelectorAll("img");
    if (images && images.length > 0) {
      // Index 4 is typically the play forward button in AnimCube3's standard layouts
      const playButton = images[4] || images[images.length - 1]; 
      if (playButton) {
        playButton.click();
      }
    }
  }, 50);
};

  // Background Worker initialization hook
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./CubeWorker.js", import.meta.url),
      { type: "module" }
    );

    workerRef.current.onmessage = (e) => {
      const data = e.data;
      if (data.success) {
        setSolution(data.solution || "Already solved");
      } else {
        setSolution("Invalid layout pattern combinations.");
        console.error("Solver Error Message:", data.error);
      }
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  // AnimCube Dynamic Script Loader & Trigger
 useEffect(() => {
  const script = document.createElement("script");
  script.src = "/AnimCube3.js";
  script.async = true;

  script.onload = () => {
    if (window.AnimCube3) {
      // Initialize layout as static when loading colors initially
      renderCube();
    }
  };

  document.body.appendChild(script);

  return () => {
    if (document.body.contains(script)) {
      document.body.removeChild(script);
    }
  };
}, [colorCode]);

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 antialiased selection:bg-orange-500/30">
      <div className="absolute top-50 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center items-center">
        <div className="grid lg:grid-cols-15 gap-6 items-start w-full">
          <div className="col-span-6 space-y-6">
            <div className="flex flex-col items-baseline">
              <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 px-3 py-1 rounded-full">
                Customize your Cube
              </span>
              <h2 className="text-3xl font-black tracking-tight mt-2">
                Shape your Cube
              </h2>
              <p className="mt-4 text-sm text-slate-400">
                Select a configuration dimension, choose your paint brush color
                palette, and edit your custom cube arrangement layout state pattern dynamically.
              </p>
            </div>
            
            <div className="flex w-full flex-col gap-6 bg-[#111622] border border-slate-800/60 rounded-2xl p-5 shadow-xl">
              <div className="size-selector w-full">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon="cube" className="text-xl text-orange-500" />
                  <span className="text-md text-orange-500 font-semibold">
                    Select the dimension of the Cube
                  </span>
                </div>

                <div className="grid grid-cols-3 w-full gap-2 mt-3 bg-[#090D16] p-1.5 rounded-xl border border-slate-800/40">
                  {CUBES_DATA.map((cube) => (
                    <button
                      key={cube.size}
                      onClick={() => setSelectedSize(cube.size)}
                      className="relative py-2 rounded-lg text-sm font-bold transition-colors flex flex-col items-center justify-center"
                      style={{ color: isSelected === cube.size ? "#fff" : "#64748b" }}
                    >
                      {isSelected === cube.size && (
                        <motion.div
                          layoutId="activeSizeTab"
                          className="absolute inset-0 bg-[#171E2E] border border-slate-700/50 rounded-lg shadow-sm"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 block mb-2">{cube.size}</span>
                      <span className="relative z-10 flex items-center justify-center">
                        <img className="h-10 opacity-80" src={`assets/${cube.img}`} alt={cube.name} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="color-selector w-full">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon="palette" className="text-xl text-orange-500" />
                  <span className="text-md text-orange-500 font-semibold">
                    Choose the face colours
                  </span>
                </div>

                <div className="grid grid-cols-3 w-full gap-2 mt-3 bg-[#090D16] p-1.5 rounded-xl border border-slate-800/40">
                  {SELECTABLE_COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setActivePaintColor(color.id)}
                      className={`group relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all text-xs font-medium ${
                        activeColor === color.id
                          ? "bg-[#171E2E] border-slate-600"
                          : "bg-[#090D16]/60 border-slate-800/60 hover:border-slate-700"
                      }`}
                    >
                      <span
                        className="relative z-10 w-5 h-5 rounded-md block shadow-inner border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className={activeColor === color.id ? "relative z-10 text-white font-bold" : "text-slate-400"}>
                        {color.name}
                      </span>
                      {activeColor === color.id && (
                        <span className="z-10 absolute top-1 right-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-[#171E2E]" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-9 space-y-6 px-4 py-5 h-full text-center flex flex-col items-center justify-center">
            <span className="text-sm text-slate-400 font-semibold tracking-wider uppercase">Interactive Painting Panel</span>
            <div className="relative z-10 flex justify-center items-center w-full h-[400px] mt-5">
              <button
                onClick={() => setRotation(p => ({ ...p, x: p.x - 90 }))}
                className="absolute top-0 bg-[#090D16] px-4 py-3 rounded-xl border border-slate-800/40 text-white hover:bg-[#111622] transition-colors"
              >
                <FontAwesomeIcon icon="angle-up" />
              </button>
              <button
                onClick={() => setRotation(p => ({ ...p, x: p.x + 90 }))}
                className="absolute bottom-0 bg-[#090D16] px-4 py-3 rounded-xl border border-slate-800/40 text-white hover:bg-[#111622] transition-colors"
              >
                <FontAwesomeIcon icon="angle-down" />
              </button>
              <button
                onClick={() => setRotation(p => ({ ...p, y: p.y + 90 }))}
                className="absolute left-0 bg-[#090D16] px-4 py-3 rounded-xl border border-slate-800/40 text-white hover:bg-[#111622] transition-colors"
              >
                <FontAwesomeIcon icon="angle-left" />
              </button>
              <button
                onClick={() => setRotation(p => ({ ...p, y: p.y - 90 }))}
                className="absolute right-0 bg-[#090D16] px-4 py-3 rounded-xl border border-slate-800/40 text-white hover:bg-[#111622] transition-colors"
              >
                <FontAwesomeIcon icon="angle-right" />
              </button>

              <div className="flex items-center justify-center scene w-48 h-48 [perspective:800px]">
                <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full" />
                <div
                  className="cube relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-out"
                  style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
                >
                  {faceData.map((face) => (
                    <div key={face.id} className={`face ${face.face}`}>
                      <div className="grid grid-cols-3 w-full h-full border-2 border-black bg-black">
                        {stickers.map((sticker) => {
                          const codeValue = colorCode[face.id]?.[sticker.id] || 'W';
                          const mappedHex = SELECTABLE_COLORS.find(c => c.id === codeValue);
                          return (
                            <button
                              key={sticker.id}
                              onClick={() => handleStickerClick(sticker.id, face.id)}
                              className="border border-black/40 transition-colors focus:outline-none"
                              style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: mappedHex ? mappedHex.hex : "#fff",
                              }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setColorCode([
                  ['W','W','W','W','W','W','W','W','W'],
                  ['R','R','R','R','R','R','R','R','R'],
                  ['G','G','G','G','G','G','G','G','G'],
                  ['Y','Y','Y','Y','Y','Y','Y','Y','Y'],
                  ['O','O','O','O','O','O','O','O','O'],
                  ['B','B','B','B','B','B','B','B','B'],
                ])}
                className="bg-[#171E2E] border border-slate-800 hover:bg-slate-800 text-white text-sm font-bold px-5 py-2.5 rounded transition-all"
                title="Reset Grid Layout"
              >
                <FontAwesomeIcon icon="redo" />
              </button>

              <button
                onClick={handleSolve}
                className="bg-[#FF5800] hover:bg-[#e64f00] text-black text-sm font-black px-8 py-2.5 rounded uppercase tracking-wider transition-all shadow-lg shadow-orange-500/20"
              >
                Solve Now!
              </button>
            </div>
          </div>
        </div>

        {/* Scanner Promotional Row Context Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-16 w-full bg-[#111622]/40 border border-slate-800/40 p-6 rounded-2xl gap-6">
          <div className="flex flex-col gap-1 text-left">
            <p className="text-sm text-slate-500 font-medium">Tired of painting configurations manually?</p>
            <span className="text-2xl md:text-3xl font-black tracking-tight mt-1">
              Scan your 
              <span className="ml-1.5 font-extrabold">
                <span className="text-yellow-400">C</span>
                <span className="text-red-500">U</span>
                <span className="text-blue-500">B</span>
                <span className="text-green-500">E</span>
              </span>
              {" "}with our AI Scanner
            </span>
          </div>
          <div className="flex items-center gap-6">
            <img src="/assets/cubeDia.png" className="w-20 object-contain opacity-70" alt="Cube Diagram" />
            <button className="bg-[#0496c7] hover:bg-[#037fa9] text-white text-md font-bold px-6 py-3 rounded transition-all whitespace-nowrap">
              <FontAwesomeIcon icon="expand" className="mr-2" /> Open Scanner
            </button>
          </div>
        </div>

        {/* 3D Interactive Playback Canvas Section */}
        <div className="flex flex-col lg:flex-row w-full mt-12 justify-between gap-10">
          <div className="flex relative flex-col w-full lg:w-[50%] items-center justify-center bg-[#111622]/30 border border-slate-800/40 rounded-2xl p-6 min-h-[460px]">
            <div className="absolute w-[340px] h-[340px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
            <div className="relative z-20 flex flex-col items-center justify-center w-full">
              <div id="heroCube" ref={cubeRef} style={{ width: '360px', height: '360px' }} className="relative z-20"></div>
              <p className="text-xs text-slate-500 font-medium mt-4">[ Your Live 3D Render Output Viewport ]</p>
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-[50%] items-start justify-between py-4">
            <div className="flex flex-col gap-3 text-left w-full">
              <p className="text-lg font-black uppercase tracking-wider text-slate-400">Computed Engine Solutions</p>
              <div className="bg-[#050607] p-5 border border-slate-800/80 text-orange-400 rounded-xl font-mono tracking-widest text-md w-full h-44 overflow-y-auto shadow-inner">
                {solution ? (
                  <span className="block text-white selection:bg-orange-500/20">{solution}</span>
                ) : (
                  <span className="text-slate-600 font-sans tracking-normal text-sm block">
                    Paint your cube layout config patterns on the structural panel above, then press "Solve Now!" to trigger calculation solutions...
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">Methodology Framework Algorithm: Two-Phase Kociemba Solvers System</p>
            </div>

            <div className="flex gap-4 items-center justify-start w-full mt-6">
              <button
                onClick={handleAnimate}
                className="flex gap-2 items-center justify-center bg-[#FF5800] hover:bg-[#e64f00] text-black text-sm font-black px-6 py-3 rounded uppercase tracking-wider transition-all shadow-md"
              >
                <FontAwesomeIcon icon="play" />
                <span>Animate moves</span>
              </button>
              <button
                onClick={() => {
                  setSolution("");
                  renderCube();
                }}
                className="flex gap-2 items-center justify-center bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold px-5 py-3 rounded uppercase tracking-wider transition-all border border-slate-700"
              >
                <FontAwesomeIcon icon="arrow-right" />
                <span>Clear Playback</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SolverPage;