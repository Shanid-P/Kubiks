import React, { useEffect } from "react";
import { Play } from "lucide-react";
import { useFormStatus } from "react-dom";

const patternsData = [
  { id: 'checkerboard', title: 'THE CHECKERBOARD', moves: 'M2 E2 S2', diff: 'EASY', diffClass: 'bg-[#153b21] text-[#4ade80]', action: 'LEARN', actionIcon: '>', actionColor: 'text-gray-300', actionHover: 'hover:text-white', showPlay: false, move: 'M2 E2 S2' },
  { id: 'cross', title: 'THE CROSS', moves: 'U F B R L D2', diff: 'MEDIUM', diffClass: 'bg-[#502e12] text-[#f59e0b]', action: 'LEARN', actionIcon: '>', actionColor: 'text-gray-300', actionHover: 'hover:text-white', showPlay: false, move: 'U F B R L D2' },
  { id: 'snake', title: 'THE SNAKE', moves: "R U F2 D' B' R' ...", diff: 'EXPERT', diffClass: 'bg-[#4d1616] text-[#ef4444]', action: 'LEARN', actionIcon: '>', actionColor: 'text-gray-300', actionHover: 'hover:text-white', showPlay: false, move: "R U F2 D' B' R' U' F' B D' R'" },
  { id: 'saltry', title: 'THE SALTRY', moves: 'U L2 L D2', diff: 'EASY', diffClass: 'bg-[#153b21] text-[#4ade80]', action: 'LEARN', actionIcon: '>', actionColor: 'text-gray-300', actionHover: 'hover:text-white', showPlay: false, move: 'U L2 L D2' },
  { id: 'twisted', title: 'TWISTED CUBE', moves: "R U F2 D' B' R' ...", diff: 'EXPERT', diffClass: 'bg-[#4d1616] text-[#ef4444]', action: 'LEARN', actionIcon: '>', actionColor: 'text-[#ef4444]', actionHover: 'hover:text-[#dc2626]', showPlay: false, move: "F B' U F U F U L B L2 B' U F' L U L' B" },
  { id: 'python', title: 'PYTHON', moves: 'R F TL L', diff: 'EXPERT', diffClass: 'bg-[#4d1616] text-[#ef4444]', action: 'LEARN', actionIcon: '>', actionColor: 'text-[#ef4444]', actionHover: 'hover:text-[#dc2626]', showPlay: false, move: "F2 R' B' U R' L F' L F' B D' R B L2" },
];

function Patterns() {

  useEffect(() => {
    // We check if AnimCube3 is loaded.
    const initializeCubes = () => {
      if (window.AnimCube3) {
        // Initialize huge Left Cube
        window.AnimCube3(`id=cube_in_cube&demo=FLFU'RUF2L2U'L'BD'B'L2U&repeat=0&speed=18&buttonbar=0&bgcolor=ffffff00&transparent=1`);

        // Initialize grid cubes
        patternsData.forEach(p => {
          window.AnimCube3(`id=${p.id}&demo=${p.move}&repeat=0&speed=18&buttonbar=0&bgcolor=ffffff00&transparent=1`);
        });
      }
      // setTimeout(10000);
    };

    if (window.AnimCube3) {
      initializeCubes();

    } else {
      const script = document.createElement('script');
      script.src = '/AnimCube3.js';
      script.async = true;
      script.onload = initializeCubes;
      document.body.appendChild(script);
    }
  }, []);



  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-orange-500/30 w-full py-20 relative overflow-hidden">
      {/* Background SVG Curve / Glow Elements */}
      <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none overflow-hidden z-0">
        <svg viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-20 opacity-30 w-full mix-blend-screen text-[#FF5800]" preserveAspectRatio="none">
           <path d="M0,300 C320,100 420,500 720,300 C1020,100 1200,400 1440,200" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
           <path d="M0,400 C400,200 600,600 960,300 C1200,100 1340,300 1440,250" stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.4"/>
           <path d="M0,200 C300,400 500,100 800,250 C1100,400 1250,150 1440,200" stroke="#EAB308" strokeWidth="2" fill="none" opacity="0.4"/>
        </svg>
      </div>

      <main className="max-w-7xl mx-auto px-5 items-center justify-center gap-12 pt-14 pb-10 w-full relative z-10">
        <div className="flex flex-col gap-2 w-full items-start justify-center mb-10">
          <h2 className="text-sm tracking-[0.2em] font-bold text-gray-400 mb-2 uppercase">The Pattern Gallery</h2>
          <h1 className="text-6xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
            Unleash the
            <span className='ml-4'>
                <span className="text-yellow-400">P</span>
                <span className="text-red-500">A</span>
                <span className="text-blue-500">T</span>
                <span className="text-green-500">T</span>
                <span className="text-yellow-400">E</span>
                <span className="text-blue-500">R</span>
                <span className="text-red-500">N</span>
                <span className="text-green-500">S</span>
                <span className="text-white">.</span>
            </span>
            <br />
            Beyond the solve.
          </h1>
          <p className="text-lg md:text-xl max-w-2xl text-start mt-8 text-gray-400 font-medium">
            Master the Rubik's Cube as an art form. Study move-by-move algorithms for
            iconic, decorative patterns. Start transforming your solve today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 items-stretch">
          
          {/* Left Column (1/3) - Cube in a Cube */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-between lg:h-full group">
            <h3 className="text-3xl font-black uppercase tracking-tight text-white w-full text-left leading-tight drop-shadow-md">CUBE IN A<br/>CUBE</h3>
            
            <div className="flex-1 w-full flex items-center justify-center my-6 min-h-[250px]">
              <div id="cube_in_cube" style={{ width: '220px', height: '220px' }}></div>
            </div>

            <div className="w-full flex items-end justify-between mt-auto">
               <button className="text-white font-medium hover:text-gray-300 transition-colors flex items-center gap-1">
                 Learn (move-by-move) <span className="text-red-500 font-bold ml-1">&gt;</span>
               </button>
               <button className="w-12 h-12 bg-white/10 hover:bg-white/20 transition-colors rounded-xl flex items-center justify-center">
                 <Play className="w-5 h-5 text-white ml-1 fill-white/80" />
               </button>
            </div>
          </div>

          {/* Right Column (2/3) - 2x3 Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            
            {patternsData.map((pattern) => (
              <div key={pattern.id} className="flex flex-col relative group rounded-2xl">
                  <div className="flex justify-between items-start">
                     {/* Text Elements */}
                     <div className="flex flex-col gap-1.5 flex-1 z-10 relative">
                        <h4 className="text-base font-bold text-white uppercase tracking-tight">{pattern.title}</h4>
                        <p className="text-xs text-gray-400 font-mono tracking-widest">{pattern.moves}</p>
                        <div className={`mt-2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-max ${pattern.diffClass}`}>
                           {pattern.diff}
                        </div>
                        
                        <button className={`mt-4 text-xs font-semibold uppercase tracking-wide flex items-center gap-1 w-max ${pattern.actionColor} ${pattern.actionHover}`}>
                           {pattern.action} <span className="text-red-500 text-sm ml-1">{pattern.actionIcon}</span>
                        </button>
                     </div>

                     {/* Right Side Cube Render */}
                     <div className="relative w-24 h-24 -mt-4 mr-0 z-0">
                        <div id={pattern.id} style={{ width: '100%', height: '100%' }}></div>
                     </div>
                  </div>

                  {/* Optional Overlay / Play button below cube for some items */}
                  <div className="w-full flex justify-end">
                     {/* Placeholder to keep layout spacing if some items have Play buttons below them */}
                     <div className="w-24 mt-2 flex justify-center">
                        {pattern.showPlay && (
                          <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider transition-colors">
                             <Play className="w-3 h-3 fill-white" />
                             PLAY
                          </button>
                        )}
                     </div>
                  </div>
              </div>
            ))}
            
          </div>
        </div>
      </main>
    </div>
  );
}

export default Patterns;
