import React from "react";
import { ColorPicker } from "./ColorPicker";

export function DrawingArea({
  lastColor,
  setCanvasSize,
  lastStroke,
  stroke,
  setStroke,
  color,
  setColor,
}: {
  lastColor: string;
  setCanvasSize: any;
  lastStroke: any;
  stroke: any;
  setStroke: any;
  color: any;
  setColor: any;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [drawingOn, setDrawingOn] = React.useState(false);

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
    }
  }, []);

  React.useEffect(() => {
    drawLast(lastStroke);
  }, [lastStroke]);

  function drawLast(lastStroke: number[][]) {
    if (!lastStroke || lastStroke.length === 0) return;

    const canvas = canvasRef?.current;

    if (canvas) {
      const canvasWidth = canvas.width;
      const expandedStroke = lastStroke.map(([x, y]) => [
        x * (canvasWidth as number),
        y * (canvasWidth as number),
      ]);
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.beginPath();
      context.moveTo(expandedStroke[0][0], expandedStroke[0][1]);
      for (let i = 1; i < lastStroke.length; i++) {
        context.lineTo(expandedStroke[i][0], expandedStroke[i][1]);
      }

      context.strokeStyle = "#ccc";
      context.stroke();
    }
  }
  function startDrawing() {
    setStroke([]);

    const canvas = canvasRef?.current;

    if (canvas) {
      const context = canvas.getContext("2d") as CanvasRenderingContext2D;
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawLast(lastStroke);
    }
    setDrawingOn(true);
  }

  function stopDrawing() {
    setDrawingOn(false);
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
      <h1>Draw a Line with a circle on the end</h1>
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
        <ColorPicker inputColor={lastColor} color={color} setColor={setColor} />
      </div>
    </div>
  );
}
