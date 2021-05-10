import React, { useContext, useRef } from "react";
import LineChartContext from "./context";

const Labels = () => {
  const {
    labels,
    xAxisSize,
    leftBorderDistance,
    size,
    fontStyle,
    data,
  } = useContext(LineChartContext);

  const labelsRef = useRef(null);

  const barWidth = xAxisSize / (data.length * 2 + 1);

  return (
    <g
      transform={`translate(${leftBorderDistance + 8}, ${size})`}
      ref={labelsRef}
    >
      {labels.map((label, key) => {
        const currentX = (2 * key + 1) * barWidth;

        return (
          <>
            <path
              d={`M${currentX + 5} ${0} L${currentX + 5} -47`}
              id={`${key}_bar`}
              stroke="black"
            />
            <text
              style={fontStyle}
              x={47}
              y="0"
              textAnchor="end"
              className="bar-chart-label"
            >
              <textPath xlinkHref={`#${key}_bar`} key={`${key}_label`}>
                {label}
              </textPath>
            </text>
          </>
          // <text
          //   style={fontStyle}
          //   x={currentX}
          //   y="-30"
          //   textAnchor="middle"
          //   key={`label_${key}`}
          //   className={"bar-chart-label"}
          // >
          //   {label}
          // </text>
        );
      })}
    </g>
  );
};

export default Labels;
