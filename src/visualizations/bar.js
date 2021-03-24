import React from "react";

export default function Bar({ data, size, color, labels }) {
  const getWidthOfBarsAndGaps = () => {
    const gapNumber = data.length + 1;
    const gapSize = (0.5 * size) / gapNumber;
    const barWidth = (size - size * 0.1 - gapSize * gapNumber) / data.length;

    return [barWidth, gapSize];
  };

  const Ruler = ({ min, max, maxHeight }) => {
    const List = [];

    const base = Math.pow(10, max.toString().length - 1);

    for (let index = 0; index <= 10; index++) {
      const maxBase = Math.ceil(max / base) * base;
      const perc = ((index * 10) / 100) * maxHeight;
      console.log(perc, maxBase);

      List.push(
        <>
          <text
            fill="black"
            textAnchor="end"
            x={-10}
            y={((index * 10) / 100) * maxHeight * -1}
            id={`bar_${min}_label`}
            key={min}
            style={{ fontFamily: "Arial", fontSize: 9 }}
          >
            {(((index * 10) / 100) * max).toFixed(0)}
          </text>
          <path
            d={`M-5 ${((index * 10) / 100) * maxHeight * -1} L5 ${
              ((index * 10) / 100) * maxHeight * -1
            }`}
            stroke="black"
            strokeWidth="0.7"
          />
        </>
      );
    }

    return List;
  };

  const Bars = () => {
    const highestPeak = Math.max(...data);
    const maxSize = size * 0.8;
    const [barsWidth, gapsWidth] = getWidthOfBarsAndGaps();

    const getBarHeight = (value) => {
      return value === highestPeak ? maxSize : (value / highestPeak) * maxSize;
    };

    const getCurrentX = (k) => {
      return (k + 1) * gapsWidth + k * barsWidth;
    };

    return (
      <g transform={`translate(${size - size * 0.9}, ${size - size * 0.1})`}>
        {data.map((value, key) => (
          <>
            <rect
              x={getCurrentX(key)}
              y={`-${getBarHeight(value)}`}
              width={barsWidth}
              height={getBarHeight(value)}
              fill={color || "black"}
              id={`bar_${key}`}
              key={key}
            />
            <text
              fill="black"
              textAnchor="middle"
              x={getCurrentX(key) + barsWidth / 2}
              y={20}
              id={`bar_${key}_label`}
              key={key}
              style={{ fontFamily: "Arial", fontSize: 10 }}
            >
              {labels[key]}
            </text>
          </>
        ))}
        <path
          d={`M0 0 L${size - size * 0.1} 0`}
          stroke="black"
          strokeWidth="0.7"
        />
        <path d={`M0 0 L0 -${maxSize}`} stroke="black" strokeWidth="0.7" />
        <Ruler min={0} max={highestPeak} maxHeight={maxSize} />
      </g>
    );
  };

  return (
    <svg
      style={{ border: `1px solid ${color}` }}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <Bars />
    </svg>
  );
}
