import React, { useRef } from "react";

export default function Bar({ data, size, color, labels }) {
  const gapNumber = data.length + 1;

  // largura das barras
  const barWidth = (size * 0.5) / data.length;

  // largura dos espaços entre as barras
  const gapWidth = (size - barWidth * data.length) / gapNumber;

  // valor da maior barra
  const highestBar = Math.max(...data);

  const longestLabel = labels.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });

  // tamanho (visual) da maior barra
  const highestBarHeight = size * 1;

  const dataNumberLength = highestBar.toString().length;
  const baseNumber = Math.pow(10, dataNumberLength - 1);

  const chartBaseValue = Math.ceil(highestBar / baseNumber) * baseNumber;

  const barsArea = size - longestLabel.length * 8;

  const labelsArea = size - barsArea;

  const getBarHeight = (value) => {
    return (value * barsArea) / chartBaseValue;
  };

  const getCurrentX = (k) => {
    return (k + 1) * gapWidth + k * barWidth;
  };

  const Bars = () => {
    return (
      <g transform={`translate(${0}, ${barsArea})`}>
        {data.map((value, key) => {
          const barHeight = getBarHeight(value);

          return (
            <rect
              x={getCurrentX(key)}
              y={`-${barHeight}`}
              width={barWidth}
              height={barHeight}
              fill={color || "black"}
              id={`bar_${key}`}
              key={key}
            />
          );
        })}
      </g>
    );
  };

  const Labels = () => {
    const style = {
      fontFamily: "monospace",
      fontSize: "10px",
    };
    return (
      <g transform={`translate(${0}, ${barsArea})`}>
        {labels.map((value, key) => {
          const pathStart = getCurrentX(key);
          const pathEnd = pathStart + barWidth * 0.66;
          const hypotenuse = Math.sqrt(
            Math.pow(labelsArea, 2) + Math.pow(barWidth * 0.66, 2)
          );

          console.log(hypotenuse);

          return (
            <>
              <path
                d={`M${pathStart} ${labelsArea} L${pathEnd} 0`}
                // stroke="black"
                id={`${key}_path`}
              />
              <text style={style} x={hypotenuse - 10} y="0" textAnchor="end">
                <textPath xlinkHref={`#${key}_path`} id={`${key}_label`}>
                  {value}
                </textPath>
              </text>
            </>
          );
        })}
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
      <Labels />
      <Bars />
    </svg>
  );
}
