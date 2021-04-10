import React, { useState } from "react";

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

  const Bars = () => {

    const Marks = () => {

      const marks = [];
      for (let index = 0; index < chartBaseValue; index += (chartBaseValue / 10)) {
        const markX = index === 0 ? chartArea : "5";
        marks.push(
          <>
            <text style={fontStyle} x="-10" y={-getBarHeight(index) + 3} textAnchor="end">{index}</text>
            <path d={`M-5 -${getBarHeight(index)} L${markX} -${getBarHeight(index)}`} stroke="black" />
          </>
        )
      }

      marks.push(
        <>
          <text style={fontStyle} x="-10" y={-getBarHeight(chartBaseValue) + 3} textAnchor="end">{chartBaseValue}</text>
          <path d={`M-5 -${getBarHeight(chartBaseValue)} L5 -${getBarHeight(chartBaseValue)}`} stroke="black" />
        </>
      );

      return marks;
    }

    const focusBar = (key, e) => {
      setFocusedBar(key)
    }

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
                  onMouseOver={(e) => focusBar(key, e)}
                  onMouseOut={() => setFocusedBar(null)}
                  stroke={focusedBar === key ? "black" : "transparent"}
                />
                {focusedBar === key && (
                  <path d={`M${getCurrentX(key)} -${barHeight} L0 -${barHeight}`} stroke={color} strokeDasharray="2,3" />
                )}
                {focusedBar === key && (
                  <text style={fontStyle} x={`${getCurrentX(key)}`} y={-(barHeight + 5)} textAnchor="start">{value}</text>
                )}
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
          const pathEnd = pathStart + barWidth * 0.66;
          const hypotenuse = Math.sqrt(
            Math.pow(labelsArea, 2) + Math.pow(barWidth * 0.66, 2)
          );

          return (
            <React.Fragment key={key}>
              <path
                d={`M${pathStart} ${labelsArea} L${pathEnd} 0`}
                id={`${key}_path`}
              />
              <text style={fontStyle} x={hypotenuse - 10} y="0" textAnchor="end">
                <textPath xlinkHref={`#${key}_path`} key={`${key}_label`}>
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
