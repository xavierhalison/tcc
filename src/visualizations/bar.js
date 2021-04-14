import React, { useState } from "react";
import { generateUID } from "../utils/helpers";

export default function Bar({ data, size, color, labels }) {
  const chartArea = size * 0.9;

  const gapNumber = data.length + 1;

  // largura das barras
  const barWidth = (chartArea * 0.5) / data.length;

  // largura dos espaços entre as barras
  const gapWidth = (chartArea - barWidth * data.length) / gapNumber;

  // valor da maior barra
  const highestBar = Math.max(...data);

  const longestLabel = labels.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });

  const dataNumberLength = highestBar.toString().length;
  const baseNumber = Math.pow(10, dataNumberLength - 1);

  const chartBaseValue = Math.ceil(highestBar / baseNumber) * baseNumber;

  const barsArea = chartArea - longestLabel.length * 8;

  const labelsArea = chartArea - barsArea;

  const getBarHeight = (value) => {
    return (value * barsArea) / chartBaseValue;
  };

  const getCurrentX = (k) => {
    return (k + 1) * gapWidth + k * barWidth;
  };

  const fontStyle = {
    fontFamily: "monospace",
    fontSize: "10px",
  }

  const [focusedBar, setFocusedBar] = useState(null);

  const GetFocusedBar = () => {
    if (!focusedBar) {
      return <></>;
    }

    const value = data[focusedBar];
    const barHeight = getBarHeight(value);
    const x = getCurrentX(focusedBar);

    return (
      <g transform={`translate(${size - chartArea}, ${barsArea + (size - chartArea)})`}>
        <rect x={getCurrentX(focusedBar) - 7}
          y={`-${barHeight + 20}`}
          width={40}
          height={20}
          fill="white"
          stroke="black">
        </rect>
        <text style={fontStyle} x={`${x}`} y={-(barHeight + 5)} textAnchor="start">{value}</text>
        <path d={`M${x} -${barHeight} L0 -${barHeight}`} stroke={color} strokeDasharray="2,3" />
      </g>
    )
  }

  const Marks = () => {

    const marks = [];

    for (let index = 0; index < chartBaseValue; index += (chartBaseValue / 10)) {

      const markX = index === 0 ? chartArea : 0;
      const barHeight = getBarHeight(index);

      marks.push(
        <>
          <text style={fontStyle} x="-10" y={-barHeight + 3} textAnchor="end">{index}</text>
          <path d={`M-5 -${barHeight} L${markX} -${barHeight}`} stroke="black" />
        </>
      )
    }

    const baseHeight = getBarHeight(chartBaseValue);

    marks.push(
      <>
        <text style={fontStyle} x="-10" y={-baseHeight + 3} textAnchor="end">{chartBaseValue}</text>
        <path d={`M-5 -${baseHeight} L5 -${baseHeight}`} stroke="black" />
      </>
    );

    return marks;
  }

  const Bars = () => {

    return (
      <>
        <g transform={`translate(${size - chartArea}, ${barsArea + (size - chartArea)})`}>
          <Marks />
          <path d={`M0 0 L0 -${getBarHeight(chartBaseValue)}`} stroke="black" />
          {data.map((value, key) => {
            const barHeight = getBarHeight(value);

            return (
              <>
                <rect
                  x={getCurrentX(key)}
                  y={`-${barHeight}`}
                  width={barWidth}
                  height={barHeight}
                  fill={color || "black"}
                  id={`bar_${key}`}
                  key={key}
                  onMouseOver={() => setFocusedBar(key)}
                  onMouseOut={() => setFocusedBar(null)}
                  stroke={focusedBar === key ? "black" : "transparent"}
                />
              </>
            );
          })}
        </g>
      </>
    );
  };

  const Labels = () => {
    return (
      <g transform={`translate(${size - chartArea}, ${barsArea + (size - chartArea)})`}>
        {labels.map((value, key) => {
          const pathStart = getCurrentX(key);
          const pathEnd = pathStart + barWidth;
          const hypotenuse = Math.sqrt(
            Math.pow(labelsArea, 2) + Math.pow(barWidth, 2)
          );

          const uid = generateUID();

          return (
            <React.Fragment key={key}>
              <path
                d={`M${pathStart} ${labelsArea} L${pathEnd} 0`}
                id={`${uid}`}
              />
              <text style={fontStyle} x={hypotenuse - 10} y="0" textAnchor="end">
                <textPath xlinkHref={`#${uid}`} key={`${key}_label`}>
                  {value}
                </textPath>
              </text>
            </React.Fragment>
          );
        })}
      </g>
    );
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <Labels />
      <Bars />
      <GetFocusedBar />
    </svg>
  );
}
