import React from "react";
import color from "color";
import { data } from "./data";

const bezShapes = data.reduce((bezArray, { bezierShape }) => {
  if (bezierShape) {
    bezArray.push(JSON.parse(bezierShape));
  }
  return bezArray;
}, [] as any[]);

function drawBezierPath(context, bezierShape, x0, y0, inputColor, scale) {
  context.save();
  context.translate(x0, y0);

  try {
    context.beginPath();
    context.moveTo(bezierShape[0].pt[0] * scale, bezierShape[0].pt[1] * scale);

    for (let i = 1; i < bezierShape.length; i++) {
      context.bezierCurveTo(
        bezierShape[i - 1].armB[0] * scale,
        bezierShape[i - 1].armB[1] * scale,
        bezierShape[i].armA[0] * scale,
        bezierShape[i].armA[1] * scale,
        bezierShape[i].pt[0] * scale,
        bezierShape[i].pt[1] * scale
      );
    }

    context.bezierCurveTo(
      bezierShape[bezierShape.length - 1].armB[0] * scale,
      bezierShape[bezierShape.length - 1].armB[1] * scale,
      bezierShape[0].armA[0] * scale,
      bezierShape[0].armA[1] * scale,
      bezierShape[0].pt[0] * scale,
      bezierShape[0].pt[1] * scale
    );

    context.fillStyle = color(inputColor).rotate(180).toString();
    context.fill();
  } catch (err) {
    console.log("error with path");
  }
  context.restore();
}

export function Output2() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const context = canvasRef.current?.getContext("2d");

    // context?.fillStyle = "red";
    // context?.fillRect(0, 0, 300, 300);

    for (let idx = 0; idx < bezShapes.length; idx++) {
      drawBezierPath(
        context,
        bezShapes[idx],
        0,
        0,
        color("green")
          .rotate(10 * Math.random())
          .alpha(0.04)
          .toString(),
        300
      );
    }
  }, []);

  return (
    <div>
      <canvas
        className="mx-auto"
        ref={canvasRef}
        width={300}
        height={300}
      ></canvas>
    </div>
  );
}
