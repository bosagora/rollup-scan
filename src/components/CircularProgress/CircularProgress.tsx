import * as React from "react";
import "./CircularProgress.scss";
const CircularProgress = (props: any) => {
  // Size of the enclosing square
  const sqSize = props.sqSize;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (props.sqSize - props.strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * props.percentage) / 100;

  return (
    <svg width={props.sqSize} height={props.sqSize} viewBox={viewBox}>
      <circle
        className="circle-background"
        cx={props.sqSize / 2}
        cy={props.sqSize / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
      />
      <circle
        className={props.color}
        cx={props.sqSize / 2}
        cy={props.sqSize / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
        // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        className="circle-value"
        x="50%"
        y="45%"
        dy=".1em"
        textAnchor="middle"
      >
        {`${props.percentage}%`}
      </text>
      <text
        className="circle-text"
        x="50%"
        y="60%"
        dy=".1em"
        textAnchor="middle"
      >
        {`Most Voted on`}
      </text>
    </svg>
  );
};

export default CircularProgress;
