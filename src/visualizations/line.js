import React from "react";

export default function LineChart({ size, datasets, labels, colors }) {
  const getHighestValue = () => {
    const allSets = [];

    datasets.map((set) => allSets.push(...set));

    return Math.max(...allSets);
  };

  const leftBorderDistance = size * 0.1;
  const topBorderDistance = size * 0.9;

  const dataNumberLength = getHighestValue().toString().length;
  const baseNumber = Math.pow(10, dataNumberLength - 1);
  const topLimit = Math.ceil(getHighestValue() / baseNumber) * baseNumber;

  const yAxisSize = topBorderDistance - size * 0.05;
  const xAxisSize = size - leftBorderDistance - size * 0.05;

  const fontStyle = {
    fontFamily: "monospace",
    fontSize: "10px",
  }

  const Labels = () => {
    const xBase = xAxisSize / (labels.length - 1);

    return (
      <g transform={`translate(${leftBorderDistance}, ${size})`}>
        {labels.map((label, key) => (
          <text style={fontStyle} x={xBase * key} y="-30" textAnchor="middle" key={`label_${key}`}>
            {label}
          </text>
        ))}
      </g>
    );
  }

  const Marks = () => {
    let marks = [];

    let counter = 0;

    for (let index = 0; index <= yAxisSize; index += yAxisSize / 10) {
      marks.push(
        <React.Fragment key={`mark_${counter}`}>
          <path d={`M-5 -${index} L5 -${index} Z`} stroke="black" />
          <text style={fontStyle} x="-10" y={-index + 3} textAnchor="end">
            {(topLimit / 10) * counter}
          </text>
        </React.Fragment>
      );

      counter++;
    }

    return <g>{marks}</g>;
  };

  const Line = ({ line, color }) => {
    const dotXBase = xAxisSize / (labels.length - 1);

    return (
      <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
        {line.map((l, key) => {
          const getY = (lValue) => { return (lValue * yAxisSize) / topLimit }
          const getX = (keyValue) => { return keyValue * dotXBase }

          const l2 = line[key + 1];

          return (
            <React.Fragment key={`lineFrag_${key}`}>
              {l2 && <line x1={getX(key)} y1={-getY(l)} x2={getX(key + 1)} y2={-getY(l2)} stroke={color} />}
              <circle cx={getX(key)} cy={-getY(l)} r="3" fill={color}>{l}</circle>
            </React.Fragment>
          )
        })}
      </g>
    )
  }

  const LineGroup = () => {
    return (
      <g transform={`translate(${0}, ${0})`}>
        {datasets.map((line, key) => <Line line={line} color={colors[key]} key={`line_${key}`} />)}
      </g>
    );
  }

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
      <Labels />
      <LineGroup />
    </svg>
  );
}
