import React from 'react';
import { Layers, Search, LayoutGrid, RotateCw } from 'lucide-react';

const algorithmsData = [
  {
    id: 'f2l',
    title: 'First Two Layers (F2L)',
    count: '41 Algorithms',
    desc: 'Learn to solve the first two layers simultaneously. Mastering intuitive and algorithmic F2L drastically reduces your solve time.',
    icon: <Layers className="w-6 h-6 text-blue-500" />,
    color: 'border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-500/30'
  },
  {
    id: 'oll',
    title: 'Orientation of Last Layer (OLL)',
    count: '57 Algorithms',
    desc: 'Orient the top layer so all pieces of the top face have the same color facing upwards in just one algorithm.',
    icon: <LayoutGrid className="w-6 h-6 text-yellow-500" />,
    color: 'border-yellow-500/20 bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-500/30'
  },
  {
    id: 'pll',
    title: 'Permutation of Last Layer (PLL)',
    count: '21 Algorithms',
    desc: 'Permute the correctly oriented pieces of the last layer to finish the cube. The final step for speedsolvers.',
    icon: <RotateCw className="w-6 h-6 text-red-500" />,
    color: 'border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/30'
  },
  {
    id: 'beginner',
    title: 'Beginner Method',
    count: '7 Core Algs',
    desc: "Just starting out? Learn the fundamental algorithms to solve the Rubik's Cube step-by-step with the layer-by-layer method.",
    icon: <Search className="w-6 h-6 text-green-500" />,
    color: 'border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/30'
  }
];

const Algorithms = () => {
  return (
    <div id="learn" className="w-full bg-[#0B0F19] py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-5 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-sm tracking-[0.2em] font-bold text-gray-400 uppercase">Algorithm Database</h2>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">
              Learn the
               {/* <span className="text-[#FF5800]">Moves</span>. */}
                <span className=''>
                <span className="text-yellow-400"> M</span>
                <span className="text-red-500">O</span>
                <span className="text-blue-500">V</span>
                <span className="text-green-500">E</span>
                <span className="text-orange-500">S </span>
            </span>
            .
            </h1>
            <p className="text-gray-400 mt-2 max-w-xl text-lg font-medium">
              Access our comprehensive library of speedcubing algorithms. From beginner basics to full CFOP, we have every sequence you need to reach sub-10.
            </p>
          </div>
          
          <button className="flex-shrink-0 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-lg transition-all hover:scale-[1.02]">
            View Full Library
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {algorithmsData.map((alg) => (
            <div 
              key={alg.id} 
              className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer group ${alg.color}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#0B0F19] border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  {alg.icon}
                </div>
                <span className="bg-[#0B0F19] px-4 py-1.5 rounded-full text-xs font-bold text-gray-400 tracking-wider uppercase border border-white/5">
                  {alg.count}
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3">
                {alg.title}
              </h3>
              
              <p className="text-gray-400 font-medium leading-relaxed">
                {alg.desc}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest group-hover:text-[#FF5800] transition-colors">
                Start Learning <span className="text-[#FF5800] text-lg leading-none">&gt;</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Algorithms;
