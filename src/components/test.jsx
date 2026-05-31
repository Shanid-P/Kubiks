import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, RotateCcw, Cpu, Palette, CheckCircle2 } from 'lucide-react';

const CUBES_DATA = [
  { size: "2x2", name: "Pocket Cube" },
  { size: "3x3", name: "Rubik's Cube" },
  { size: "4x4", name: "Legend's Cube" },
];

// Define standard Rubik's color options for selection
const SELECTABLE_COLORS = [
  { id: 'W', name: 'White', hex: '#ffffff', charCode: '0' },
  { id: 'Y', name: 'Yellow', hex: '#eab308', charCode: '1' },
  { id: 'G', name: 'Green', hex: '#22c55e', charCode: '2' },
  { id: 'B', name: 'Blue', hex: '#3b82f6', charCode: '3' },
  { id: 'O', name: 'Orange', hex: '#f97316', charCode: '4' },
  { id: 'R', name: 'Red', hex: '#ef4444', charCode: '5' },
];

// Helper to build a clean blank face mapping matrix array
// Order of faces: U, D, F, B, L, R
const createInitialCubeMap = (size) => {
  const totalStickers = size * size * 6;
  // Initialize every sticker to a neutral color or default layout mapping index
  return Array(totalStickers).fill('0');
};

function SolverPage() {
  const [selectedSize, setSelectedSize] = useState(3); // 2 or 3
  const [activePaintColor, setActivePaintColor] = useState(SELECTABLE_COLORS[2]); // Default Green
  const [cubeStateMap, setCubeStateMap] = useState(() => createInitialCubeMap(3));
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Reset cube layout when changing geometry size
  useEffect(() => {
    setCubeStateMap(createInitialCubeMap(selectedSize));
  }, [selectedSize]);

  // Load AnimCube3 script asset on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/AnimCube3.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Update canvas state string properties
  useEffect(() => {
    if (!isScriptLoaded || !window.AnimCube3) return;

    // Hex string map: White, Yellow, Green, Blue, Orange, Red
    const colorsParam = "ffffff" + "eab308" + "22c55e" + "3b82f6" + "f97316" + "ef4444";
    const parsedStateLayout = cubeStateMap.join('');

    const params = `id=cubeViewer
      &size=${selectedSize}
      &repeat=1
      &speed=15
      &buttonbar=1
      &bgcolor=ffffff00
      &transparent=1
      &colors=${colorsParam}
      &cube=${parsedStateLayout}`;

    window.AnimCube3(params);
  }, [cubeStateMap, selectedSize, isScriptLoaded]);

  // Handler to paint an individual tile item state array
  const handleStickerClick = (index) => {
    const updatedMap = [...cubeStateMap];
    updatedMap[index] = activePaintColor.charCode;
    setCubeStateMap(updatedMap);
  };

  const handleResetCube = () => {
    setCubeStateMap(createInitialCubeMap(selectedSize));
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 antialiased selection:bg-orange-500/30">
      {/* Visual background atmospheric elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Panel: Options & Selections */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-orange-500 uppercase bg-orange-500/10 px-3 py-1 rounded-full">
                Custom Mapping Tool
              </span>
              <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Paint Your Cube
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Select a configuration dimension, choose your paint brush color palette, and edit your custom cube arrangement layout state pattern dynamically.
              </p>
            </div>

            <div className="bg-[#111622] border border-slate-800/60 rounded-2xl p-5 shadow-xl space-y-5">

              {/* Option Size Selection */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Layers className="w-3.5 h-3.5 text-orange-500" />
                  <h3>1. Size Selection</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 bg-[#090D16] p-1.5 rounded-xl border border-slate-800/40">
                  {CUBES_DATA.map((cube) => {
                    const sizeNum = parseInt(cube.size.charAt(0));
                    const isSelected = selectedSize === sizeNum;
                    return (
                      <button
                        key={cube.size}
                        onClick={() => setSelectedSize(sizeNum)}
                        className="relative py-2 rounded-lg text-sm font-bold transition-colors"
                        style={{ color: isSelected ? "#fff" : "#64748b" }}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeSizeTab"
                            className="absolute inset-0 bg-[#171E2E] border border-slate-700/50 rounded-lg shadow-sm"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{cube.size}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Brush Palette Component Panel */}
              <div className="space-y-3 pt-3 border-t border-slate-800/40">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Palette className="w-3.5 h-3.5 text-orange-500" />
                  <h3>2. Select Paint Color</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {SELECTABLE_COLORS.map((color) => {
                    const isBrushActive = activePaintColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => setActivePaintColor(color)}
                        className={`group relative flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all text-xs font-medium ${isBrushActive
                            ? 'bg-[#171E2E] border-slate-600'
                            : 'bg-[#090D16]/60 border-slate-800/60 hover:border-slate-700'
                          }`}
                      >
                        <span
                          className="w-5 h-5 rounded-md block shadow-inner border border-black/20"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className={isBrushActive ? 'text-white font-bold' : 'text-slate-400'}>
                          {color.name}
                        </span>
                        {isBrushActive && (
                          <span className="absolute top-1 right-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 fill-[#171E2E]" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Operation Command Action Footprints */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-4 py-3 rounded-xl shadow-lg shadow-orange-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm">
                <Cpu className="w-4 h-4" /> Compute Solution
              </button>
              <button
                onClick={handleResetCube}
                className="bg-slate-800/40 hover:bg-slate-800 text-slate-300 border border-slate-700/50 font-medium px-4 py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Center Column: Interactive Flat Pattern Painting Matrix Canvas Map */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-[#111622] border border-slate-800/60 p-6 rounded-2xl shadow-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6 block self-start">
              3. Flat Texture Input Editor Map
            </span>

            {/* Flat net visual layout schema representing unfolded 3D model */}
            <div className="flex flex-col items-center gap-2 select-none">

              {/* Up Face Grid Matrix Block */}
              <div
                className="grid gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-lg"
                style={{ gridTemplateColumns: `repeat(${selectedSize}, minmax(0, 1fr))` }}
              >
                {Array(selectedSize * selectedSize).fill(null).map((_, i) => {
                  const baseIdx = i;
                  const currentThemeCode = cubeStateMap[baseIdx];
                  const hexMatch = SELECTABLE_COLORS.find(c => c.charCode === currentThemeCode)?.hex || '#1e293b';
                  return (
                    <button
                      key={`U-${i}`}
                      onClick={() => handleStickerClick(baseIdx)}
                      className="w-7 h-7 rounded-sm border border-black/40 transition-transform active:scale-90"
                      style={{ backgroundColor: hexMatch }}
                    />
                  );
                })}
              </div>

              {/* Middle row belt connection block container loop (Left, Front, Right, Back side layout elements) */}
              <div className="flex gap-2">
                {/* Loop 4 sides across lateral axis */}
                {['L', 'F', 'R', 'B'].map((side, sideIdx) => (
                  <div
                    key={side}
                    className="grid gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-lg"
                    style={{ gridTemplateColumns: `repeat(${selectedSize}, minmax(0, 1fr))` }}
                  >
                    {Array(selectedSize * selectedSize).fill(null).map((_, i) => {
                      // Offset sequence coordinate indices calculation parsing logic arrays matches AnimCube map layout schema
                      const baseIdx = (selectedSize * selectedSize) + (sideIdx * selectedSize * selectedSize) + i;
                      const currentThemeCode = cubeStateMap[baseIdx];
                      const hexMatch = SELECTABLE_COLORS.find(c => c.charCode === currentThemeCode)?.hex || '#1e293b';
                      return (
                        <button
                          key={`${side}-${i}`}
                          onClick={() => handleStickerClick(baseIdx)}
                          className="w-7 h-7 rounded-sm border border-black/40 transition-transform active:scale-90"
                          style={{ backgroundColor: hexMatch }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Down Face Grid Matrix Block */}
              <div
                className="grid gap-1 bg-slate-900/60 p-1 border border-slate-800 rounded-lg"
                style={{ gridTemplateColumns: `repeat(${selectedSize}, minmax(0, 1fr))` }}
              >
                {Array(selectedSize * selectedSize).fill(null).map((_, i) => {
                  const baseIdx = (selectedSize * selectedSize * 5) + i;
                  const currentThemeCode = cubeStateMap[baseIdx];
                  const hexMatch = SELECTABLE_COLORS.find(c => c.charCode === currentThemeCode)?.hex || '#1e293b';
                  return (
                    <button
                      key={`D-${i}`}
                      onClick={() => handleStickerClick(baseIdx)}
                      className="w-7 h-7 rounded-sm border border-black/40 transition-transform active:scale-90"
                      style={{ backgroundColor: hexMatch }}
                    />
                  );
                })}
              </div>

            </div>

            <p className="text-[11px] text-slate-500 mt-6 text-center leading-relaxed">
              Tap tiles above using your active brush color to reproduce your physical cube configuration.
            </p>
          </div>

          {/* Right Column: Dynamic WebGL Canvas 3D Preview Window */}
          <div className="lg:col-span-4 flex justify-center items-center relative">
            <div className="relative w-full aspect-square bg-gradient-to-b from-[#121824] to-[#0E131F] border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-center justify-center group overflow-hidden">

              {/* Corner Accent Design Details */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 border-t border-l border-slate-700" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 border-t border-r border-slate-700" />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 border-b border-l border-slate-700" />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 border-b border-r border-slate-700" />

              {/* WebGL Target Render Viewport Component */}
              <div
                id="cubeViewer"
                className="w-full h-full min-w-[240px] min-h-[240px] transition-transform duration-500 group-hover:scale-102"
              />

              <div className="absolute top-3 right-3 bg-slate-900/80 border border-slate-800 px-2.5 py-0.5 rounded-md text-[10px] font-medium text-slate-400">
                3D Preview
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default SolverPage;