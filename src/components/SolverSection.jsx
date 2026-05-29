import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);


function SolverSection() {

  return (
    <div className=" bg-[#0B0F19] text-white selection:bg-orange-500/30 w-full py-10">
      {/* Hero Content */}
    
        <main className="px-40 items-center justify-center gap-12 pt-14 pb-10 w-full">
            <div className="flex flex-col gap2 w-full items-center justify-center">
                <h2 className="text-sm tracking-[0.2em] font-bold text-gray-400 mb-2 uppercase">Get SOlved</h2>
                <h1 className="text-6xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">Your FASTEST Path <br />to a
                 <span className='text-7xl'>
                        <span className="text-yellow-400"> S</span>
                        <span className="text-red-500">o</span>
                        <span className="text-blue-500">l</span>
                        <span className="text-green-500">v</span>
                        <span className="text-orange-500">e</span>
                        <span className="text-yellow-400">d </span>
                    </span>
                Cube</h1>
            </div>
            <p className="text-lg w-150 text-center justify-self-center mt-5 text-gray-400">No matter the scramble, our state-of-the-art solver can analyze and guide you to
a complete solution in under 20 moves. Experience the algorithm that master
cubers use.</p>
            <div className="flex flex-wrap items-center justify-center gap-10 mt-15">

                <div className="flex border-1 border-white/10 px-8 py-3.5 gap-4  rounded-xl bg-white/10 w-90">
                    <div className="w-[60%] flex items-center justify-center">
                        <img src="/assets/machine-learning.png" alt="" />
                    </div>
                    <div className="text">
                        <span className="text-lg font-medium text-white">Instant Algorithms</span>
                        <p className="text-md text-gray-400">Simply input your scrambled state and get step-by-step- novies</p>
                    </div>
                </div>

                <div className="flex border-1 border-white/10 px-8 py-3.5 gap-4  rounded-xl bg-white/10 w-90">
                    <div className="w-[60%] flex items-center justify-center">
                        <img src="/assets/self-improvement.png" alt="" />
                    </div>
                    <div className="text">
                        <span className="text-lg font-medium text-white">Instant Algorithms</span>
                        <p className="text-md text-gray-400">Simply input your scrambled state and get step-by-step- novies</p>
                    </div>
                </div>
                <div className="flex border-1 border-white/10 px-8 py-3.5 gap-4  rounded-xl bg-white/10 w-90">
                    <div className="w-[60%] flex items-center justify-center">
                        <img src="/assets/problem-solving.png" alt="" />
                    </div>
                    <div className="text">
                        <span className="text-lg font-medium text-white">Instant Algorithms</span>
                        <p className="text-md text-gray-400">Simply input your scrambled state and get step-by-step- novies</p>
                    </div>
                </div>
                
               
                
            </div>
        </main>
    </div>
  );
}

export default SolverSection;
