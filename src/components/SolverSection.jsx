import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

function SolverSection() {
  return (
    <section className="bg-[#0B0F19] text-white py-16 lg:py-24 px-5 sm:px-8 md:px-15">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-xs md:text-sm tracking-[0.25em] font-bold text-gray-400 uppercase">
            Get Solved
          </h2>

          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight">
            Your Fastest Path
            <br />
            to a
            <span>
              <span className="text-yellow-400"> S</span>
              <span className="text-red-500">o</span>
              <span className="text-blue-500">l</span>
              <span className="text-green-500">v</span>
              <span className="text-orange-500">e</span>
              <span className="text-yellow-400">d </span>
            </span>
            Cube
          </h1>

          <p className="max-w-3xl mt-6 text-base md:text-lg text-gray-400 leading-relaxed">
            No matter the scramble, our state-of-the-art solver can analyze
            and guide you to a complete solution in under 20 moves.
            Experience the algorithm that master cubers use.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-14">

          <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <img
              src="/assets/machine-learning.png"
              alt=""
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div>
              <h3 className="text-lg font-semibold">
                Instant Algorithms
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Input your scramble and receive optimized
                step-by-step solving instructions instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <img
              src="/assets/self-improvement.png"
              alt=""
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div>
              <h3 className="text-lg font-semibold">
                Learn Faster
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Understand every move and improve your
                solving skills with guided solutions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <img
              src="/assets/problem-solving.png"
              alt=""
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div>
              <h3 className="text-lg font-semibold">
                Smart Solver
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Built using advanced solving techniques to
                deliver accurate and efficient solutions.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
export default SolverSection;
