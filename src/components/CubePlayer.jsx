import { useEffect, useRef } from "react";
import { TwistyPlayer } from "cubing/twisty";

export default function CubePlayer() {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const player = new TwistyPlayer({
      puzzle: "3x3x3",
    //   alg: "R U R' U'",
      controlPanel: "none",
      background: "none",
    });

    playerRef.current = player;

    if (containerRef.current) {
      containerRef.current.appendChild(player);
    }

    return () => {
      player.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "600px",
        height: "600px",
      }}
    />
  );
}