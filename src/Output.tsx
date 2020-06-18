import React from "react";
import color from "color";

function drawPath(context, path, x0, y0, color_) {
  const inputColor = color(color_);
  const a = path[0];
  const b = path[path.length - 1];
  const angle = Math.atan2(b[1] - a[1], b[0] - a[0]);

  context.save();

  context.translate(x0, y0);

  context.translate(15, 15);
  context.rotate(-angle);
  context.translate(-15, -15);

  context.fillStyle = inputColor.lighten(0.7).toString();
  context.fillRect(0, 0, 30, 30);

  try {
    context.beginPath();
    context.moveTo(path[0][0], path[0][1]);

    for (let i = 0; i < path.length; i++) {
      context.lineTo(path[i][0], path[i][1]);
    }

    context.strokeStyle = inputColor.toString();
    context.lineWidth = 2;
    context.stroke();
  } catch (err) {
    console.log("error with path");
  }
  context.restore();
}

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
    // context.lineWidth = 2;
    context.fill();
  } catch (err) {
    console.log("error with path");
  }
  context.restore();
}

const nRows = 10;

export function Output({ db }: { db: firebase.firestore.Firestore }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await db
        .collection("test")
        .orderBy("createdAt", "desc")
        .limit(nRows * nRows)
        .get();

      const data: any[] = [];
      result.forEach((doc) => {
        data.push(doc.data());
      });

      const context = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;

      const cellSize = 300 / nRows;

      for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nRows; j++) {
          const idx = i * nRows + j;
          const d = data[idx];

          const path = JSON.parse(d.stroke).map(([x, y]) => [
            x * cellSize,
            y * cellSize,
          ]);

          try {
            drawPath(
              context,
              path,
              i * cellSize,
              j * cellSize,
              d.color || "red"
            );
          } catch (err) {}

          try {
            const bezierShape = JSON.parse(d.bezierShape);

            drawBezierPath(
              context,
              bezierShape,
              i * cellSize,
              j * cellSize,
              d.color || "red",
              cellSize
            );
          } catch (err) {}
        }
      }
    };
    fetchData();
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
