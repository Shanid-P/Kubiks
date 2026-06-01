import React, { useEffect, useState, useRef } from "react";
import { motion, transform } from "framer-motion";
import { Layers, RotateCcw, Cpu, Palette, CheckCircle2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Solver } from "rubiks-cube-solver";



import { TwistyPlayer } from "cubing/twisty";


import CubePlayer from "./CubePlayer";

import { Link } from "react-router-dom";


// import Cube from "cubejs";




// let solverInitialized = false;

// const state =
// "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";






// let cubeState = [
//   'flulfbddr', // front
// 'rudrruddl', // right
//   'dbbburrfb', // up
//   'llffdrubf', // down
//   'rludlubrf', // left
//   'lubfbfudl' // back
// ].join('');



const CUBES_DATA = [
  { size: "2x2", name: "Pocket Cube", img: "2x2.png" },
  { size: "3x3", name: "Rubik's Cube", img: "3x3.png" },
  { size: "4x4", name: "Legend's Cube", img: "4x4.png" },
];

// Define standard Rubik's color options for selection
const SELECTABLE_COLORS = [
  { id: "W", name: "White", hex: "#ffffff", charCode: "0" },
  { id: "Y", name: "Yellow", hex: "#eab308", charCode: "1" },
  { id: "G", name: "Green", hex: "#22c55e", charCode: "2" },
  { id: "B", name: "Blue", hex: "#3b82f6", charCode: "3" },
  { id: "O", name: "Orange", hex: "#f97316", charCode: "4" },
  { id: "R", name: "Red", hex: "#ef4444", charCode: "5" },
];

let faceData = [
  { id: 0, face: "top" },
  { id: 1, face: "right" },
  { id: 2, face: "front" },
  { id: 3, face: "bottom" },
  { id: 4, face: "left" },
  { id: 5, face: "back" },
]

// let faceData = [
//   { id: 0, face: "front" },
//   { id: 1, face: "right" },
//   { id: 2, face: "top" },
//   { id: 3, face: "bottom" },
//   { id: 4, face: "left" },
//   { id: 5, face: "back" },
// ];

let w = 50;
let initial = 50;
const stickers = [
  { id: 0, top: initial, left: initial },
  { id: 1, top: initial, left: initial + w },
  { id: 2, top: initial, left: initial + 2 * w },

  { id: 3, top: initial + w, left: initial },
  { id: 4, top: initial + w, left: initial + w },
  { id: 5, top: initial + w, left: initial + 2 * w },

  { id: 6, top: initial + 2 * w, left: initial },
  { id: 7, top: initial + 2 * w, left: initial + w },
  { id: 8, top: initial + 2 * w, left: initial + 2 * w },
];

// let colorCode = [
//     ['W', 'W', 'W', 'W', 'W','W','W', 'W', 'W'],
//     ['R', 'R', 'R', 'R', 'R','R','R', 'R', 'R'],
//     ['G', 'G', 'G', 'G', 'G','G','G', 'G', 'G'],
//     ['Y', 'Y', 'Y', 'Y', 'Y','Y','Y', 'Y', 'Y'],
//     ['O', 'O', 'O', 'O', 'O','O','O', 'O', 'O'],
//     ['B', 'B', 'B', 'B', 'B','B','B', 'B', 'B'],
// ];
let faceletColor;

function SolverPage() {
  const [isSelected, setSelectedSize] = useState();
  const [activeColor, setActivePaintColor] = useState();
  const [text, setText] = useState("Load Solution");

  //   const [colorCode, setColorCode] = useState([
  //   ['G','G','G','G','G','G','G','G','G'], //f
  //   ['R','R','R','R','R','R','R','R','R'], //r
  //   ['W','W','W','W','W','W','W','W','W'], //u
  //   ['Y','Y','Y','Y','Y','Y','Y','Y','Y'], //d
  //   ['O','O','O','O','O','O','O','O','O'], //l
  //   ['B','B','B','B','B','B','B','B','B'], //b
  // ]);

  const [colorCode, setColorCode] = useState([
    ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
    ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
    ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
    ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
    ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
    ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
  ]);

  const [solution, setSolution] = useState("");



  const workerRef = useRef(null);



  // const handleSolve = () => {
  //   try {
  //     Cube.initSolver();
  //     const facelets = colorCode.flat().join("");

  //     const charMap = {
  //       'W': 'U',
  //       'R': 'R',
  //       'G': 'F',
  //       'Y': 'D',
  //       'O': 'L',
  //       'B': 'B'
  //     };

  //     const cubejsFacelets = [...facelets].map(c => charMap[c] || c).join("");
  //     const cube = Cube.fromString(cubejsFacelets);
  //     const solveMoves = cube.solve();

  //     setSolution(solveMoves || "Cube is already solved!");
  //   } catch (err) {
  //     console.error(err);
  //     setSolution("Invalid cube state! Please check your colors.");
  //   }
  // };


  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
  });

  let handleStickerClick = (pos, side) => {
    console.log(side, pos);

    setColorCode(prev => {
      const updated = [...prev];

      updated[side] = [...updated[side]];

      updated[side][pos] = activeColor || 'W';

      return updated;
    })

    // colorCode[side][pos] = activeColor || 'W';

    //  renderCube();
  };

  const cubeRef = useRef(null);

  const generateFacelets = () => {
    // const front = colorCode[0];
    // const right = colorCode[1];
    // const up = colorCode[2];
    // const down = colorCode[3];
    // const left = colorCode[4];
    // const back = colorCode[5];
    const newColorCode = [
      colorCode[0],
      colorCode[3],
      colorCode[2],
      colorCode[5],
      colorCode[4],
      colorCode[1]
    ]



    let faceTransforms = {
      front: [0, 3, 6, 1, 4, 7, 2, 5, 8],

      right: [0, 3, 6, 1, 4, 7, 2, 5, 8],

      // rotate 90° clockwise
      up: [6, 7, 8, 3, 4, 5, 0, 1, 2],

      // rotate 90° counterclockwise
      down: [0, 3, 6, 1, 4, 7, 2, 5, 8],

      left: [2, 1, 0, 5, 4, 3, 8, 7, 6],

      // horizontal mirror
      back: [0, 3, 6, 1, 4, 7, 2, 5, 8],
    };

    let faceNames = [
      "up",
      "down",
      "front",
      "back",
      "left",
      "right"
    ];


    const transformedFaces = newColorCode.map((faceArr, index) => {
      const faceName = faceNames[index];
      const transform = faceTransforms[faceName];
      console.log(faceName, transform);
      // return transformedFaces.flat().join("");
      return transform
        .map(i => faceArr[i])
      // .join('');
    })

    console.log('rendering sec', transformedFaces)

    // const ordered = [
    //   up,
    //   down,
    //   front,
    //   back,
    //   left,
    //   right,
    // ];

    // return ordered
    //   .flat()
    //   .map(c => charMap[c])
    //   .join("");
    return transformedFaces.flat().join("");
  };


  const handleAnimate = () => {
    // Animate the solution moves using AnimCube3
    // if (!solution) {
    //   console.warn('No solution to animate');
    //   return;
    // }
    // Pass the full solution string to renderCube; AnimCube3 will animate sequentially
    renderCube(solution);
  };


  const renderCube = (moves = '') => {


    //     const frudlbToUdflbr = {
    //   F: "U",
    //   R: "D",
    //   U: "F",
    //   D: "B",
    //   L: "L",
    //   B: "R",
    // };


    // const order = ["F", "R", "U", "D", "L", "B"];

    // const mapped = {
    //   U: data.F,
    //   D: data.R,
    //   F: data.U,
    //   B: data.D,
    //   L: data.L,
    //   R: data.B,
    // };

    //  let  moves = solution;

    const container = document.getElementById("heroCube");

    if (!container) return;

    container.innerHTML = "";

    const facelets = generateFacelets();

    const autoRunParam = moves ? "&run=1" : "";


    //  setTimeout(() => {


    console.log(facelets);
    const params = `id=heroCube
         &facelets=${facelets}
          &repeat=0
          &speed=20
          &buttonbar=1
          &buttonheight=25
          &edit=0
          &move=${moves}
          &bgcolor=ffffff00
          &transparent=1`;

    console.log(params);
    // startAnimation();

    

    window.AnimCube3(params);


    // handleAnimate();

    document.body.style.overflow = 'auto';

    // window.myCube.playAnimation();

  //   setTimeout(() => {

  //     const buttons = container.querySelectorAll("img");
      

  //   }, 500);

  // }, 50);


  };


  // const charMap = {
  //   G: "F",
  //   R: "R",
  //   W: "U",
  //   Y: "D",
  //   O: "L",
  //   B: "B",
  // };

  const charMap = {
    W: "U",
    R: "R",
    G: "F",
    Y: "D",
    O: "L",
    B: "B",
  };

  // useEffect(() => {
  //   Cube.initSolver();
  // }, []);


  const handleSolve = () => {
    // let result = colorCode.map(arr => arr.join(''));


    // const colorCodeModified = [...result].map(c =>{
    //   return c.split('').map(i => charMap[i]).join('');
    // });

    // console.log(colorCodeModified);



    // const colorCodeModified =  [
    //  'rrrffffff',
    //  'bbbrrrrrr',
    //  'uuuuuuuuu',
    //  'ddddddddd',
    //  'fffllllll',
    //  'lllbbbbbb'
    // ]

    const faceTransforms = {
      front: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      right: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      // rotate 90° clockwise
      up: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      // rotate 90° counterclockwise
      down: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      left: [0, 1, 2, 3, 4, 5, 6, 7, 8],

      // horizontal mirror
      back: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };

    const faceNames = [
      "front",
      "right",
      "up",
      "down",
      "left",
      "back"
    ];

    //----------------------------------------------------------------
    //           rubiks cube solver package algorithm based-
    // -----------------------------------------------------------------

    // const transformedFaces = colorCode.map((faceArr, index) => {

    //   const faceName = faceNames[index];

    //   const transform = faceTransforms[faceName];

    //   console.log(faceName, transform);
    //   return transform
    //     // .map(i => charMap[faceArr[i]])
    //     // .join('');
    // });
    const transformedFaces = colorCode.map((faceArr, index) => {
      const faceName = faceNames[index];
      const transform = faceTransforms[faceName];
      console.log(faceName, transform);
      return transform
        .map(i => faceArr[i])
      //     // .join('');
    })

    console.log('transfromed', transformedFaces)

    // let state = transformedFaces.join('');

    // const cubeState = transformedFaces.join('');

    // console.log(cubeState);

    // const solver = new Solver(cubeState);

    // solver.solve();

    // const moves = solver.getMoves();

    // console.log('moves', moves);

    // let newMoves = moves.split(' ').map((elem) => elem.toString().replace('prime', "'")).join(' ');
    // console.log(newMoves)
    // setSolution(newMoves);


    //----------------------------------------------------------------
    //                              Kociemba
    // -----------------------------------------------------------------

    // Cube.initSolver();

    //  const front = colorCode[0];
    //   const right = colorCode[1];
    //   const up = colorCode[2];
    //   const down = colorCode[3];
    //   const left = colorCode[4];
    //   const back = colorCode[5];

    //   // cubejs wants: U R F D L B
    //   const orderedFaces = [
    //     up,
    //     right,
    //     front,
    //     down,
    //     left,
    //     back
    //   ];


    //   const state = orderedFaces
    //     .flat()
    //     .map(c => charMap[c])
    //     .join('');
    console.log('colorcode', colorCode);
    let state = transformedFaces.flat().map(c => charMap[c]).join('');
    // let state = 'LUUBUULUUBBBRRRBBBURRUFFURRRDDFDDRDDFFFLLLFFFLLDBBDLLD';
    console.log('state', state);


    // const state =
    // "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB";

    // const cube = Cube.fromString(state);

    // const solution = cube.solve();

    // console.log('solution to kocimeba', solution);



    // -------------------------
    // VALIDATE COLOR COUNTS
    // -------------------------

    const counts = {};

    for (const ch of state) {
      counts[ch] = (counts[ch] || 0) + 1;
    }

    const valid =
      counts.U === 9 &&
      counts.R === 9 &&
      counts.F === 9 &&
      counts.D === 9 &&
      counts.L === 9 &&
      counts.B === 9;

    if (!valid) {
      setSolution("Invalid cube colors");
      return;
    }

    try {

      // small async break prevents UI freeze
      // setTimeout(() => {

      try {

        // Cube.initSolver();

        //         if (!solverInitialized) {
        //   Cube.initSolver();
        //   solverInitialized = true;
        // }

        //         const cube = Cube.fromString(state);

        //         const solution = cube.solve();

        //         console.log(solution);

        //         setSolution(solution || "Already solved");


        setSolution("Solving...");

        workerRef.current.postMessage(state);

        // renderCube(solution);

      } catch (err) {

        console.log(err);

        setSolution("Invalid cube state");

      }

      // }, 5000);

    } catch (err) {

      console.log(err);

      setSolution("Solver crashed");

    }



  }


  // const cubeFaceletsModified = [...]



  // useEffect(() => {

    // workerRef.current = new Worker(
    //   new URL("./CubeWorker.js", import.meta.url),
    //   { type: "module" }
    // );

    // workerRef.current.onmessage = (e) => {

    //   const data = e.data;

    //         if (data.success) {
    //     setSolution(data.solution || "Already solved");
    //     renderCube(data.solution || "Already solved");
    //   } else {

    //     setSolution("Invalid cube state");

    //     console.log(data.error);

    //   }

    // };


    // const workerRef = useRef(null);

useEffect(() => {
  workerRef.current = new Worker(
    new URL("./CubeWorker.js", import.meta.url),
    { type: "module" }
  );

  workerRef.current.onmessage = (e) => {
    const data = e.data;

    if (data.success) {
      setSolution(data.solution || "Already solved");
      // renderCube(data.solution || "");
    } else {
      console.error(data.error);
      setSolution("Invalid cube state");
    }
  };

  return () => {
    workerRef.current?.terminate();
  };
}, []);

    // return () => {
    //   workerRef.current.terminate();
    // };

  // }, []);




  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/AnimCube3.js";
    script.async = true;

    script.onload = () => {

      if (window.AnimCube3) {

        renderCube();

        // const params = `id=heroCube
        // &repeat=1
        // &speed=18
        // &buttonbar=0
        // &bgcolor=ffffff00
        // &transparent=1`;

        // window.AnimCube3();

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
    <div className="min-h-screen bg-[#080B11] text-slate-100 antialiased selection:bg-orange-500/30 overflow-x-hidden w-full  pt-20">
      {/* Visual background atmospheric elements */}

      {/* Navigation */}
      <nav className=" flex items-center justify-around px-8 py-6 w-full mx-auto fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-1 group cursor-pointer justify-center">
          <img className='h-12' src="/assets/logo image.png" alt="" />
          <img className='h-10' src="/assets/logo txt.png" alt="" />
        </div>

        <div className=" hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          {['Home', 'Solver', 'Learn', 'Timer', 'Tutorials', 'About'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <a
          // onPointerDown={() => navigate('/')}
          href="/"
          className=" bg-[#FF5800] hover:bg-[#e64f00] text-black text-xs font-bold px-6 py-2.5 rounded-sm uppercase tracking-widest transition-all">
          Home
        </a>
        {/* <Link
  to="/"
  className="bg-[#FF5800] hover:bg-[#e64f00] text-black text-xs font-bold px-6 py-2.5 rounded-sm uppercase tracking-widest transition-all"
>
  Home
</Link> */}
      </nav>



      <div className="absolute top-0 left-0 w-full h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      {/* <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" /> */}

      <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center items-center">
        <div className="flex gap-6 lg:flex-row  flex-col lg:items-start w-full items-center">
          <div className=" space-y-6 lg:w-[50%] items-center w-[80%]">
            <div className="flex flex-col items-baseline">
              <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 px-3 py-1 rounded-full">
                Custom your Cube
              </span>
              <h2 className="text-3xl font-black tracking-tight font-extrabold">
                Shape your Cube
              </h2>
              <p className="mt-8 text-sm text-slate-400">
                Select a configuration dimension, choose your paint brush color
                palette, and edit your custom cube arrangement layout state
                pattern dynamically.
              </p>
            </div>
            <div className="flex w-full flex flex-col gap-10 bg-[#111622] border border-slate-800/60 rounded-2xl p-5 shadow-xl space-y-5">
              <div className="size-selector w-full">
                <div className="flex items-center justify-start gap-2">
                  <FontAwesomeIcon
                    icon="cube"
                    className="text-xl text-orange-500"
                  />
                  <span className="text-md text-orange-500">
                    Select the dimension of the Cube
                  </span>
                </div>

                <div className="grid grid-cols-3 w-full gap-2 mt-3 bg-[#090D16] p-1.5 rounded-xl border border-slate-800/40">
                  {CUBES_DATA.map((cube) => {
                    return (
                      <button
                        key={cube.size}
                        onPointerDown={() => setSelectedSize(cube.size)}
                        className="relative py-2 rounded-lg text-sm font-bold transition-colors"
                        style={{
                          color: isSelected == cube.size ? "#fff" : "#64748b",
                        }}
                      >
                        {isSelected == cube.size && (
                          <motion.div
                            layoutId="activeSizeTab"
                            className="absolute inset-0 bg-[#171E2E] border border-slate-700/50 rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        <span className="relative z-10 block mb-3">
                          {cube.size}
                        </span>
                        <span className="relative z-10 flex items-center justify-center">
                          <img className="h-10" src={`assets/${cube.img}`} />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="size-selector w-full">
                <div className="flex items-center justify-start gap-2">
                  <FontAwesomeIcon
                    icon="palette"
                    className="text-xl text-orange-500"
                  />
                  <span className="text-md text-orange-500">
                    Choose the face colours
                  </span>
                </div>

                <div className="grid grid-cols-3 w-full gap-2 mt-3 bg-[#090D16] p-1.5 rounded-xl border border-slate-800/40">
                  {SELECTABLE_COLORS.map((color) => {
                    return (
                      <button
                        key={color.id}
                        onPointerDown={() => setActivePaintColor(color.id)}
                        className={`group relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all text-xs font-medium ${activeColor == color.id
                          ? "bg-[#171E2E] border-slate-600"
                          : "bg-[#090D16]/60 border-slate-800/60 hover:border-slate-700"
                          }`}
                      >
                        {/* {activeColor == color.id && (
                          <motion.div
                            layoutId="activeSizeTab"
                            className="absolute inset-0 bg-[#171E2E] border border-slate-700/50 rounded-lg shadow-sm"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )} */}
                        <span
                          className="relative z-10 w-5 h-5 rounded-md block shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span
                          className={
                            activeColor == color.id
                              ? "relative z-10 text-white font-bold"
                              : "text-slate-400"
                          }
                        >
                          {color.name}
                        </span>
                        {activeColor == color.id && (
                          <span className="z-10 absolute top-1 right-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-[#171E2E]" />
                          </span>
                        )}
                        {/* <span className="relative z-10 flex items-center justify-center">
                          <img className="w-10" src={`assets/${color.img}`} />
                        </span> */}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
            <div className="lg:px-15 py-5 lg:w-[50%] w-[100%] h-full text-center flex flex-col items justify-center overflow-hidden">
            <span className="text-sm text-slate-400">3D Cube</span>
            <div className="relative flex justify-center items-center w-full h-[90%] mt-5 overflow-visible">
              <div
                 onPointerDown={() => {
                  console.log("t")
                  setRotation((prev) => ({
                    ...prev,
                    x: prev.x - 90,
                  }))
                }
                 }
                className="absolute top-0 z-40 bg-[#090D16] px-4 py-4 rounded-xl border border-slate-800/40 text-white cursor-pointer"
              >
                <FontAwesomeIcon icon="angle-up" />
              </div>

              <div
                 onPointerDown={() =>{
                  console.log("b");
                  setRotation((prev) => ({
                    ...prev,
                    x: prev.x + 90,
                  }))
                }
                }
                className="absolute bottom-0 z-40 bg-[#090D16] px-4 py-4 rounded-xl border border-slate-800/40 text-white hover:cursor-pointer"
              >
                <FontAwesomeIcon icon="angle-down" />
              </div>

              <div
                 onPointerDown={() =>{
                  console.log("l");
                  setRotation((prev) => ({
                    ...prev,
                    y: prev.y + 90,
                  }))
                }
                }
                className="absolute left-0 z-40 bg-[#090D16] px-4 py-4 rounded-xl border border-slate-800/40 text-white cursor-pointer"
              >
                <FontAwesomeIcon icon="angle-left" />
              </div>

              <div
                 onPointerDown={() =>{
                  console.log("r")
                  setRotation((prev) => ({
                    ...prev,
                    y: prev.y - 90,
                  }))
                }
              }
                className="absolute right-0 z-40 bg-[#090D16] px-4 py-4 rounded-xl border border-slate-800/40 text-white cursor-pointer"
              >
                <FontAwesomeIcon icon="angle-right" />
              </div>

              <div className="flex w-full py-30  z-0 items-center justify-center">
                
                <div className="scene w-50 h-50 [perspective:600px]">
                  <div className="absolute inset-0 bg-blue-400/70 blur-[120px] rounded-full" />
                  <div
                    className={`cube relative w-full h-full [transform-style:preserve-3d] z-0 transition-transform duration-1000 ease-in-out`}
                    style={{
                      transform: `
      rotateX(${rotation.x}deg)
      rotateY(${rotation.y}deg)
    `,
                    }}
                  >
                    {faceData.map((face) => {
                      return (

                        <div className={`face ${face.face}`}>
                          <div className="grid grid-cols-3 w-full h-full border-4 border-black">
                            {stickers.map((sticker) => {

                              let currentColor = SELECTABLE_COLORS.find(
                                c => c.id === colorCode[face.id][sticker.id]
                              );

                              return (

                                <button
                                  key={sticker.id}
                                  onPointerDown={() => {
                                    let side = face.id;
                                    handleStickerClick(sticker.id, side);
                                  }}
                                  className={`border-4 border-black`}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    top: sticker.top,
                                    left: sticker.left,
                                    backgroundColor: currentColor.name.toLowerCase(),
                                  }}
                                />
                              )
                            })}
                          </div>
                        </div>

                      )
                    })


                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10 w-full gap-5">

              <button
                onPointerDown={() => {
                  setColorCode(
                    [
                      ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
                      ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'],
                      ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'],
                      ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
                      ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'],
                      ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
                    ]
                  );

                }}
                className="bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold px-5 py-2.5 rounded-sm uppercase tracking-widest transition-all"
              >
                <FontAwesomeIcon icon="refresh" />
              </button>

              <button
                onPointerDown ={ () => {
                  handleSolve();
                  
                }}
                className=" bg-[#FF5800] hover:bg-[#e64f00] text-black text-sm font-bold px-6 py-2.5 rounded-sm uppercase tracking-widest transition-all"
              >
                Solve Now!
              </button>

            </div>

          </div>

        </div>


        <div className="flex flex-col md:flex-row items-center justify-between mt-16 w-full bg-[#111622]/40 border border-slate-800/40 p-6 rounded-2xl gap-6">
                  <div className="flex flex-col gap-1 text-left">
                    <p className="text-sm text-slate-500 font-medium text-center md:text-start">Tired of painting configurations manually?</p>
                    <span className="text-2xl md:text-3xl font-black tracking-tight mt-1 text-center md:text-start">
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
                    {window.innerWidth > 950 && ( <img src="/assets/cubeDia.png" className="w-20 object-contain opacity-70" alt="Cube Diagram" />)}
                    <button className="bg-[#0496c7] hover:bg-[#037fa9] text-white sm:text-md text-sm  font-bold px-6 py-3 rounded transition-all whitespace-nowrap">
                      <FontAwesomeIcon icon="expand" className="mr-2" /> Open Scanner
                    </button>
                  </div>
                </div>



       <div className="flex flex-col lg:flex-row w-full mt-12 justify-between gap-10">
                 <div className="flex relative flex-col w-full lg:w-[50%] items-center justify-center bg-[#111622]/30 border border-slate-800/40 rounded-2xl p-6 min-h-[460px]">
                   <div className="absolute w-[340px] h-[340px] rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
                   <div className="relative z-20 flex flex-col items-center justify-center w-full ">
                     <div id="heroCube" ref={cubeRef} style={{ width: '100%', maxWidth: '300px', height: '500px' }} className="relative z-20 "></div>
                     <p className="text-xs text-slate-500 font-medium mt-4">[ Your Live 3D Render Output Viewport ]</p>
                   </div>
                 </div>
       
                 <div className="flex flex-col w-full lg:w-[50%] items-start py-4 ">
                   <div className="flex flex-col gap-3 text-left w-full ">
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
       
                   <div className="flex gap-4 self-start items-start justify-start w-full mt-6">
                     {/* <button
                       onClick={ () =>{
                        handleAnimate();

                        {solution &&  setText("Loaded Solution");}
                       }
                      }
                       className="flex gap-2 items-center justify-center bg-[#FF5800] hover:bg-[#e64f00] text-black text-sm font-black px-6 py-3 rounded uppercase tracking-wider transition-all shadow-md"
                     >
                       <FontAwesomeIcon icon="play" />
                       <span>{text}</span>
                     </button> */}
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
