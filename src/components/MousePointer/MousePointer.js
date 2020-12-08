import React, { useEffect, useState } from "react";
import AdornoComponent from "../Adorno/AdornoComponent";

function MousePointer() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updatePosition = (e) => {
      setCoords({
        x: (100 * e.clientX) / window.innerWidth,
        y: (100 * e.clientY) / window.innerHeight,
      });
    };
    // crear un listener de on mouse move
    document.addEventListener("mousemove", updatePosition);
    return () => document.removeEventListener("mousemove", updatePosition);
  }, []);
  return <AdornoComponent x={coords.x} y={coords.y} message="" size={2} />;
}

export default MousePointer;
