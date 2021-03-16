import React, { useEffect, useRef } from "react";

export default function SVG({ size, data }) {
  const r = size / 2;

  function getCordinates() {
    const total = data.reduce((a, b) => a + b, 0);

    let currentY1 = r;

    const cordinates = data.map((el) => {
      const c = {
        perc: el / total,
        a: (el / total) * 360,
        y1: currentY1,
        x2: r * Math.cos((el / total) * 360),
        y2: r * Math.sin((el / total) * 360),
      };

      return c;
    });

    return cordinates;
  }

  const x0 = 0;
  const y0 = 0;
  const x1 = 0;
  const y1 = size / 2;
  const x2 = r * Math.cos(45);
  const y2 = r * Math.sin(45);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${r}, ${r})`}>
        <path
          d={`M ${x0} ${y0}
              L ${x1} -${y1}
              A ${r} ${r} 0 0 1 ${x2} -${y2}
              Z`}
          stroke="black"
          fill="green"
          stroke-width="2"
          fill-opacity="0.5"
        />
        <path d="M 0 0" />
      </g>
    </svg>
  );
}
