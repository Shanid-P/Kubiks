import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play } from 'lucide-react';
import { useNavigate } from "react-router-dom";


//  “Dark Neural Lab” (Best for a premium tech feel)

// This is sleek, modern, and perfect for an algorithm-heavy tool.

// Background: #0B0F19 (deep navy-black)
// Surface/Card: #111827
// Primary Accent: #3B82F6 (electric blue)
// Secondary Accent: #22C55E (soft neon green)
// Text Primary: #E5E7EB
// Text Muted: #9CA3AF




const Hero = () => {

  const navigate = useNavigate();


  const cubeRef = useRef(null);

  // Helper to generate random Rubik's moves
  const generateRandomMoves = (length = 5) => {
    const faces = ['R', 'L', 'U', 'D', 'F', 'B'];
    const modifiers = ['', "'", '2'];
    let moves = [];
    for (let i = 0; i < length; i++) {
      const move = faces[Math.floor(Math.random() * faces.length)] +
        modifiers[Math.floor(Math.random() * modifiers.length)];
      moves.push(move);
    }
    let rmove = moves.reverse();
    console.log("moves", moves);
    console.log("rmoves", moves.reverse());
    moves.push(...[...moves].reverse());
    console.log("full moves", moves);
    return moves.join('');
  };


  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/AnimCube3.js';
    script.async = true;

    script.onload = () => {
      if (window.AnimCube3) {
        const moves = generateRandomMoves(15);

        // FIX 1: Use bgcolor=ffffff00 AND add &transparent=1
        // FIX 2: Added 'repeat=1' and 'speed=20' for auto-rotation
        const params = `id=heroCube
      &demo=${moves}
      &repeat=1
      &speed=18
      &buttonbar=0
      &bgcolor=ffffff00
      &transparent=1`;

        window.AnimCube3(params);

        // window.AnimCube3(`
        //   id=heroCube
        //   &move=${moves}
        //   &repeat=1
        //   &speed=18
        //   &buttonbar=0
        //   &bgcolor=000000
        // `);

      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script to avoid duplicates on re-render
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);



  return (
    <div className="min-h-screen bg-[#0B0F19] text-white selection:bg-orange-500/30">
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

        <button 
         onClick={() => navigate('/solve')}
        className=" bg-[#FF5800] hover:bg-[#e64f00] text-black text-xs font-bold px-6 py-2.5 rounded-sm uppercase tracking-widest transition-all">
          Solve Now
        </button>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center pt-20">

    
      <main className="max-w-7xl mx-auto px-5 grid lg:grid-cols-3 items-center gap-12 pt-14 pb-10">

        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="">
            <span className=" text-6xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase">Stuck <br />on your <br />
              <span className='text-8xl'>
                <span className="text-yellow-400">C</span>
                <span className="text-red-500">U</span>
                <span className="text-blue-500">B</span>
                <span className="text-green-500">E </span>
                <span className="text-orange-500">?</span>
                </span>
            </span>
            {/* <br />
            <span className="text-6xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase">
              We've got the <span className="text-7xl">moves</span>.
            </span> */}
          </h1>

          <p className="max-w-md text-gray-400 text-lg leading-relaxed font-medium">
            Master the Rubik's Cube instantly with our powerful algorithmic solver.
            Solve any scrambled 3x3 in under 20 moves. Start now!
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="flex items-center gap-2 bg-[#FF5800] hover:bg-[#e64f00] text-black font-bold px-8 py-4 rounded-sm transition-all group">
              START SOLVING NOW
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* <button className="flex items-center gap-2 border border-white/20 hover:bg-white/5 px-8 py-4 rounded-sm transition-all">
              LEARN THE ALGORITHMS
            </button> */}
          </div>

        </motion.div>

        {/* Right 3D Visual (Mockup) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative  self-baseline"
        >
          {/* Subtle Glow Background */}
          {/* <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" /> */}
          <div className="absolute w-[500px] h-[500px]
                  rounded-full
                  bg-blue-500/20
                  blur-3xl
                  animate-pulse" />

          {/* The Cube Image/Element */}
          <div className="relative z-10 flex justify-center items-center ">
            {/* <img 
               src="/path-to-your-cube-render.png" 
               alt="3D Rubik's Cube" 
               className="w-full max-w-lg drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rotate-12 hover:rotate-0 transition-transform duration-700"
             /> */}
            {/* <video src="/assets/cube-animation.mp4"></video> */}


            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '500px',
              // background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
            }}
              className='relative z-20 '>
              <div
                id="heroCube"
                className='relative z-20'
                ref={cubeRef}
                style={{ width: '500px', height: '500px' }}
              ></div>
            </div>

            {/* Floating Decorative Elements */}
            {/* <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 flex items-center justify-center animate-bounce">
              <Play className="text-[#FF5800] fill-[#FF5800] w-8 h-8" />
            </div> */}
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 justify-end"
        >


          <h1 className="text-right">
            
            <span className="text-6xl md:text-6xl font-black leading-[0.9] tracking-tighter uppercase">
              We've <br />
              got the 
              <br />
              {/* <span className="text-7xl">moves</span>. */}
              <span className='text-8xl'>
                <span className="text-yellow-400">M</span>
                <span className="text-red-500">O</span>
                <span className="text-blue-500">V</span>
                <span className="text-green-500">E </span>
                <span className="text-orange-500">S </span>
                </span>
            </span>
          </h1>


<p className="max-w-md text-gray-400 text-lg leading-relaxed font-medium text-right">
            Master the Rubik's Cube instantly with our powerful algorithmic solver.
            Solve any scrambled 3x3 in under 20 moves. Start now!
          </p>


<button className="flex items-center justify-self-end gap-2 border border-white/20 hover:bg-white/5 px-8 py-4 rounded-sm transition-all">
              LEARN THE ALGORITHMS
            </button>

        </motion.div>
        
      </main>
      {/* Color Palette Preview */}
          <div className="flex items-center gap-4 pt-8 border-t border-white/5">
            <div className="flex -space-x-2">
              {['#C41E3A', '#FF5800', '#FFD500', '#009E60', '#0051BA', '#FFFFFF'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#121212]"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Your Choice Always Matters</span>
          </div>
          </div>


          {/* <div className="solver-section">

          </div>
          <div className="patterns">

          </div>
          <div className="learn-algorithm">

          </div>
          <div className="feedback">

          </div>
          <footer className='text-center py-3 px-10'>
            <div className="border-t border-white/5 my-5"></div>
            All Rights Reserved | Developed in 2026
          </footer> */}
    </div>
  );
};

export default Hero;






