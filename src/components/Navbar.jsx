import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    "Home",
    "Solver",
    "Learn",
    "Timer",
    "Tutorials",
    "About",
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0B0F19]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-12 md:px-6 lg:px-8 h-18 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              className="h-10 md:h-11"
              src="/assets/logo image.png"
              alt="Kubiks"
            />
            <img
              className="h-9 md:h-9"
              src="/assets/logo txt.png"
              alt="Kubiks"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <button
  onPointerDown={() => navigate("/solve")}
  className="hidden min-[475px]:block bg-[#FF5800] hover:bg-[#e64f00] text-black text-[10px] md:text-xs font-bold px-4 md:px-6 py-2.5 rounded-sm uppercase tracking-widest transition-all"
>
  Solve Now
</button>

            {/* Mobile Hamburger */}
            <button
              onPointerDown={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-slate-700 text-white"
            >
              <FontAwesomeIcon
                icon={menuOpen ? "xmark" : "bars"}
                className="text-lg"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-80" : "max-h-0"
          }`}
        >
          <div className="px-4 pb-5 pt-2 bg-[#0B0F19]/95 backdrop-blur-xl border-t border-white/5">
            <div className="flex flex-col gap-1">


<div className="mb-3 min-[475px]:hidden">
  <button
    onClick={() => {
      navigate("/solve");
      setMenuOpen(false);
    }}
    className="w-full bg-[#FF5800] hover:bg-[#e64f00] text-black text-sm font-bold py-3 rounded-lg uppercase tracking-wider"
  >
    Solve Now
  </button>
</div>


              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                >
                  {item}
                </a>
              ))}

            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-18" />
    </>
  );
}

export default Navbar;