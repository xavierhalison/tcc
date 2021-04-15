import React from "react";

export default function LineChart({ size, datasets, labels }) {
  const getHighestValue = () => {
    const allSets = [];

    datasets.map((set) => allSets.push(...set));

    return Math.max(...allSets);
  };

  const leftBorderDistance = size * 0.15;
  const topBorderDistance = size * 0.8;

  const dataNumberLength = getHighestValue().toString().length;
  const baseNumber = Math.pow(10, dataNumberLength - 1);
  const topLimit = Math.ceil(getHighestValue() / baseNumber) * baseNumber;

  const yAxisSize = topBorderDistance - size * 0.05;
  const xAxisSize = size - leftBorderDistance - size * 0.05;

  const Marks = (number) => {
    const marks = [];

    let counter = 0;

    console.log((topLimit / counter).toFixed(0));

    for (let index = 0; index <= yAxisSize; index += yAxisSize / 10) {
      marks.push(
        <>
          <path d={`M-5 -${index} L5 -${index} Z`} stroke="black" />
          <text x="-10" y={-index + 5} textAnchor="end">
            {(topLimit / counter).toFixed(0)}
          </text>
        </>
      );

      counter++;
    }

    return <g>{marks}</g>;
  };

  const Rulers = () => {
    return (
      <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
        <path d={`M0 0 L0 -${yAxisSize} Z`} stroke="black" />
        <path d={`M0 0 L${xAxisSize} 0 Z`} stroke="black" />
        <Marks />
      </g>
    );
  };

  return (
    <svg
      style={{ border: "1px solid black" }}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <Rulers />
    </svg>
  );
}
