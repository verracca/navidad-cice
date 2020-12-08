import React, { useEffect } from "react";
import AdornoComponent from "../Adorno/AdornoComponent";

function MousePointer() {
  useEffect(() => {
    // crear un listener de on mouse move
    document.addEventListener("mousemove", (e) => {
      console.log("---");
      console.log(e.clientX, e.clientY);


    });
    return () => document.removeEventListener("mouseMove");
  });
  return <AdornoComponent x={0} y={0} message="" />;
}

export default MousePointer;
