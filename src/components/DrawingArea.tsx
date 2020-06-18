import React from "react";
import { ColorPicker } from "./ColorPicker";

export function DrawingArea({
  lastColor,
  canvasSize,
  setCanvasSize,
  lastStroke,
  stroke,
  setStroke,
  color,
  setColor,
}: {
  lastColor: string;
  canvasSize: number;
  setCanvasSize: any;
  lastStroke: any;
  stroke: any;
  setStroke: any;
  color: any;
  setColor: any;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawingOn, setDrawingOn] = React.useState(false);
  const [startStop, setStartStop] = React.useState({
    start: [0, 0],
    stop: [0, 0],
  });

  const radius = 20;

  React.useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const clientWidth = (canvas.parentElement as HTMLDivElement).clientWidth;
      const clientHeight = (canvas.parentElement as HTMLDivElement)
        .clientHeight;
      const clientSize =
        clientWidth > clientHeight ? clientHeight : clientWidth;
      canvas.width = clientSize;
      canvas.height = clientSize;
      setCanvasSize(clientSize);

      const offset = 100;

      const angle = 2 * Math.PI * Math.random();
      const mx = clientSize / 2;
      const my = clientSize / 2;
      const r = clientSize / 2 - offset;

      setStartStop({
        start: [mx - r * Math.cos(angle), my - r * Math.sin(angle)],
        stop: [mx + r * Math.cos(angle), my + r * Math.sin(angle)],
      });
    }
  }, []);

  function clear() {
    const canvas = canvasRef?.current;

    if (canvas) {
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawCircles();
      setStroke([]);
    }
  }

  React.useEffect(() => {
    clear();
  }, [startStop]);

  function drawCircles() {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;

      context.beginPath();
      context.arc(
        startStop.start[0],
        startStop.start[1],
        radius,
        0,
        2 * Math.PI
      );
      context.strokeStyle = "green";
      context.lineWidth = 4;
      context.stroke();

      context.strokeStyle = "red";
      context.lineWidth = 4;
      context.strokeRect(
        startStop.stop[0] - radius,
        startStop.stop[1] - radius,
        2 * radius,
        2 * radius
      );
    }
  }

  function startDrawing(event: React.TouchEvent | React.MouseEvent) {
    let cX, cY;
    event.persist();
    if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
      cX = event.nativeEvent.touches[0].clientX;
      cY = event.nativeEvent.touches[0].clientY;
    } else if (event.nativeEvent instanceof MouseEvent) {
      cX = event.nativeEvent.clientX;
      cY = event.nativeEvent.clientY;
    } else {
      return;
    }
    const node = canvasRef.current;
    if (node) {
      const { x: rX, y: rY } = node.getBoundingClientRect();
      const x = cX - rX;
      const y = cY - rY;

      const offset = 100;
      const radius = 20;

      const sX = startStop.start[0];
      const sY = startStop.start[1];

      const d = Math.sqrt(Math.pow(x - sX, 2) + Math.pow(y - sY, 2));

      if (d < radius) {
        setStroke([]);

        setDrawingOn(true);
      }
    }
  }

  function stopDrawing(event: React.TouchEvent | React.MouseEvent) {
    let cX, cY;
    event.persist();
    if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
      cX = event.nativeEvent.touches[0].clientX;
      cY = event.nativeEvent.touches[0].clientY;
    } else if (event.nativeEvent instanceof MouseEvent) {
      cX = event.nativeEvent.clientX;
      cY = event.nativeEvent.clientY;
    } else {
      return;
    }
    const node = canvasRef.current;
    if (node) {
      const { x: rX, y: rY } = node.getBoundingClientRect();
      const x = cX - rX;
      const y = cY - rY;

      const offset = 100;
      const radius = 20;

      const sX = startStop.stop[0];
      const sY = startStop.stop[1];

      const d = Math.sqrt(Math.pow(x - sX, 2) + Math.pow(y - sY, 2));

      if (d > radius) {
        clear();
      }
      setDrawingOn(false);
    }
  }

  function draw(event: React.TouchEvent | React.MouseEvent) {
    let cX, cY;
    event.persist();
    if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
      cX = event.nativeEvent.touches[0].clientX;
      cY = event.nativeEvent.touches[0].clientY;
    } else if (event.nativeEvent instanceof MouseEvent) {
      cX = event.nativeEvent.clientX;
      cY = event.nativeEvent.clientY;
    } else {
      return;
    }
    if (drawingOn) {
      const node = canvasRef.current;
      if (node) {
        const { x: rX, y: rY } = node.getBoundingClientRect();
        const x = cX - rX;
        const y = cY - rY;
        setStroke((stroke: number[][]) => {
          stroke.push([x, y]);
          const context = canvasRef?.current?.getContext("2d");

          const idx = stroke.length - 2;
          if (context && idx >= 0) {
            context.beginPath();
            context.moveTo(stroke[idx][0], stroke[idx][1]);
            context.lineTo(stroke[idx + 1][0], stroke[idx + 1][1]);
            context.lineWidth = 5;
            context.strokeStyle = color;
            context.stroke();
          }
          return stroke;
        });
      }
    }
  }

  return (
    <div className="flex-grow flex flex-col">
      <h1 className="text-center">
        Draw a Line or Curve from the{" "}
        <span className="font-semibold" style={{ color: "green" }}>
          Green
        </span>{" "}
        Circle to the{" "}
        <span className="font-semibold" style={{ color: "red" }}>
          Red
        </span>{" "}
        Square
      </h1>
      <div className="flex-grow">
        <canvas
          className="border rounded select-none mx-auto"
          style={{ touchAction: "none" }}
          ref={canvasRef}
          width={300}
          height={300}
          onTouchStart={startDrawing}
          onMouseDown={startDrawing}
          onTouchEnd={stopDrawing}
          onMouseUp={stopDrawing}
          onTouchMove={draw}
          onMouseMove={draw}
        ></canvas>
      </div>
    </div>
  );
}
