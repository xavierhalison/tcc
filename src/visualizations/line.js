import React from "react";

export default function LineChart({ size, datasets, labels }) {
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
    let labelList = [];
    let counter = 0;

    for (let index = 0; index <= xAxisSize; index += xAxisSize / (labels.length - 1)) {
      labelList.push(
        <text style={fontStyle} x={index} y="-30" textAnchor="middle" key={`label_${counter}`}>
          {labels[counter]}
        </text>
      );
      counter++;
    }


    return (
      <g transform={`translate(${leftBorderDistance}, ${size})`}>
        {labelList}
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

  const Line = ({ line }) => {
    const dotXBase = xAxisSize / (labels.length - 1);

    return (
      <g transform={`translate(${leftBorderDistance}, ${topBorderDistance})`}>
        {line.map((l, key) => {
          const y = (l * yAxisSize) / topLimit;
          return (
            <>
              <circle cx={key * dotXBase} cy={-y} r="5" fill="red">{l}</circle>
            </>
          )
        })}
      </g>

    )
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
      <Line line={datasets[0]} />
    </svg>
  );
}
