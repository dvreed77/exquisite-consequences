import React from "react";

function drawPath(context, path, x0, y0, color) {
  context.save();
  context.translate(x0, y0);

  try {
    context.beginPath();
    context.moveTo(path[0][0], path[0][1]);

    for (let i = 0; i < path.length; i++) {
      context.lineTo(path[i][0], path[i][1]);
    }

    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
  } catch (err) {
    console.log("error with path");
  }
  context.restore();
}
export function Output({ db }: { db: firebase.firestore.Firestore }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await db
        .collection("test")
        .orderBy("createdAt", "desc")
        .limit(25)
        .get();

      const data: any[] = [];
      result.forEach((doc) => {
        data.push(doc.data());
      });

      const context = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;

      const cellSize = 300 / 5;

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          const idx = i * 5 + j;
          const d = data[idx];

          const path = JSON.parse(d.stroke).map(([x, y]) => [
            x * cellSize,
            y * cellSize,
          ]);

          drawPath(context, path, i * cellSize, j * cellSize, d.color || "red");
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
