import React, { useContext, useRef } from "react";
import LineChartContext from "./context";

const Labels = () => {
  const { labels, xAxisSize, leftBorderDistance, size, fontStyle, data } =
    useContext(LineChartContext);

  const labelsRef = useRef(null);

  const barWidth = xAxisSize / (data.length * 2 + 1);

  const calcTextSize = (text) => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const a = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const body = document.querySelector("body");

    a.textContent = "fevereiro";
    a.style.fontFamily = "monospace";
    a.style.fontSize = "10";
    a.classList = ["calc-bbox"];

    svg.classList = ["calc-bbox"];
    svg.appendChild(a);

    body.appendChild(svg);

    const bbox = a.getBBox();

    const bboxes = document.querySelectorAll(".calc-bbox");
    bboxes.forEach((b) => b.parentNode.removeChild(b));

    return bbox;
  };

  console.log(calcTextSize(), "aki");

  return (
    <g
      transform={`translate(${leftBorderDistance + 8}, ${size - 10})`}
      ref={labelsRef}
    >
      {labels.map((label, key) => {
        const currentX = (2 * key + 1) * barWidth;

        return (
          <>
            <path
              d={`M${currentX + 5} ${0} L${currentX + 5} -${
                calcTextSize().width
              }`}
              id={`${key}_bar`}
            />
            <text
              style={fontStyle}
              x={calcTextSize().width}
              y="0"
              textAnchor="end"
              className="bar-chart-label"
            >
              <textPath xlinkHref={`#${key}_bar`} key={`${key}_label`}>
                {label}
              </textPath>
            </text>
          </>
        );
      })}
    </g>
  );
};

export default Labels;
