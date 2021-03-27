import React from "react";

export default function Bar({ data, size, color, labels }) {
  /**
   * Todas as propriedades do ǵráfico
   * @returns Object
   */
  const getChartProperties = () => {
    // número de espaços entre as barras
    const gapNumber = data.length + 1;

    // largura das barras
    const barWidth = (size * 0.5) / data.length;

    // largura dos espaços entre as barras
    const gapWidth = (size - barWidth * data.length) / gapNumber;

    // valor da maior barra
    const highestBar = Math.max(...data);

    // tamanho (visual) da maior barra
    const highestBarHeight = size * 1;

    const dataNumberLength = highestBar.toString().length;
    const baseNumber = Math.pow(10, dataNumberLength - 1);

    const chartBaseValue = Math.ceil(highestBar / baseNumber) * baseNumber;

    return {
      gapNumber,
      gapWidth,
      barWidth,
      highestBar,
      highestBarHeight,
      chartBaseValue,
    };
  };

  const getBarHeight = (value) => {
    const { chartBaseValue } = getChartProperties();
    return (value * size) / chartBaseValue;
  };

  const getCurrentX = (k) => {
    const { gapWidth, barWidth } = getChartProperties();
    return (k + 1) * gapWidth + k * barWidth;
  };

  const Bars = () => {
    const { barWidth } = getChartProperties();

    return (
      <g transform={`translate(${0}, ${size})`}>
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
