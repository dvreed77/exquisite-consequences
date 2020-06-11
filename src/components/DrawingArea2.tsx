import React from "react";
import { path as d3Path } from "d3-path";
import { Circle } from "./Circle";

function createPath(shape: any, scale = 1) {
  var path = d3Path();

  path.moveTo(shape[0].pt[0] * scale, shape[0].pt[1] * scale);

  for (let i = 1; i < shape.length; i++) {
    path.bezierCurveTo(
      shape[i - 1].armB[0] * scale,
      shape[i - 1].armB[1] * scale,
      shape[i].armA[0] * scale,
      shape[i].armA[1] * scale,
      shape[i].pt[0] * scale,
      shape[i].pt[1] * scale
    );
  }

  path.bezierCurveTo(
    shape[shape.length - 1].armB[0] * scale,
    shape[shape.length - 1].armB[1] * scale,
    shape[0].armA[0] * scale,
    shape[0].armA[1] * scale,
    shape[0].pt[0] * scale,
    shape[0].pt[1] * scale
  );

  return path;
}

const padding = 0.1;
const armLength = 0.3;

const getInputBezier = () => [
  {
    pt: [0.5, padding],
    armA: [0.5 - armLength, padding],
    armB: [0.5 + armLength, padding],
  },
  {
    pt: [1 - padding, 0.5],
    armA: [1 - padding, 0.5 - armLength],
    armB: [1 - padding, 0.5 + armLength],
  },
  {
    pt: [0.5, 1 - padding],
    armA: [0.5 + armLength, 1 - padding],
    armB: [0.5 - armLength, 1 - padding],
  },
  {
    pt: [padding, 0.5],
    armA: [padding, 0.5 + armLength],
    armB: [padding, 0.5 - armLength],
  },
];
export function DrawingArea2({ inputPts }: { inputPts: number[] }) {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [editPoints, setEditPoints] = React.useState(0);
  const [canvasSize, setCanvasSize] = React.useState<number>(1);

  const maxEditPoints = 0.2;

  const [circles, setCircles] = React.useState([
    [100, 100],
    [200, 200],
  ]);

  const [bezierShape, setBezierShape] = React.useState(getInputBezier());

  const resetShape = () => {
    // console.log(inputBezierShape);
    setEditPoints(0);
    setBezierShape(getInputBezier());
  };

  React.useEffect(() => {
    const svgElement = svgRef.current;

    if (svgElement) {
      const clientWidth = (svgElement.parentElement as HTMLDivElement)
        .clientWidth;
      const clientHeight = (svgElement.parentElement as HTMLDivElement)
        .clientHeight;
      const canvasSize =
        clientWidth < clientHeight ? clientHeight : clientWidth;
      svgElement.setAttribute("width", `${canvasSize}px`);
      svgElement.setAttribute("height", `${canvasSize}px`);

      setCanvasSize(canvasSize);
    }
  }, []);

  const onStartDrag = (
    event: React.MouseEvent | React.TouchEvent,
    ptId: string
  ) => {
    const node = svgRef.current;

    const idx = parseInt(ptId.split(".")[0]);
    const ptT = ptId.split(".")[1] as "pt" | "armA" | "armB";
    const startEditPts = editPoints;

    let origin = [0, 0],
      oPos = bezierShape[idx][ptT] as number[];

    const onMouseMove = (event: MouseEvent | TouchEvent) => {
      let cX: number, cY: number;
      if (window.TouchEvent && event instanceof TouchEvent) {
        cX = event.touches[0].clientX;
        cY = event.touches[0].clientY;
      } else if (event instanceof MouseEvent) {
        cX = event.clientX;
        cY = event.clientY;
      } else {
        return;
      }

      const curPos = [
        oPos[0] + cX / canvasSize - origin[0] / canvasSize,
        oPos[1] + cY / canvasSize - origin[1] / canvasSize,
      ];

      const d = Math.sqrt(
        Math.pow(oPos[0] - curPos[0], 2) + Math.pow(oPos[1] - curPos[1], 2)
      );

      const curEditPoints = Math.min(startEditPts + d, maxEditPoints);

      setEditPoints(curEditPoints);

      if (curEditPoints < maxEditPoints) {
        setBezierShape((bezierShape) =>
          bezierShape.map((pt, idx_) => {
            if (idx === idx_) {
              pt[ptT] = curPos;
            }
            return pt;
          })
        );
      } else {
        svgRef.current?.removeEventListener("mousemove", onMouseMove);
        svgRef.current?.removeEventListener("mouseup", onMouseUp);
        svgRef.current?.removeEventListener("touchmove", onMouseMove, false);
        svgRef.current?.removeEventListener("touchend", onMouseUp, false);
      }
    };

    const onMouseUp = (event: MouseEvent | TouchEvent) => {
      svgRef.current?.removeEventListener("mousemove", onMouseMove);
      svgRef.current?.removeEventListener("mouseup", onMouseUp);
      svgRef.current?.removeEventListener("touchmove", onMouseMove, false);
      svgRef.current?.removeEventListener("touchend", onMouseUp, false);
    };

    let cX, cY;
    if (window.TouchEvent && event.nativeEvent instanceof TouchEvent) {
      cX = event.nativeEvent.touches[0].clientX;
      cY = event.nativeEvent.touches[0].clientY;
    } else if (event.nativeEvent instanceof MouseEvent) {
      cX = event.nativeEvent.clientX;
      cY = event.nativeEvent.clientY;
    } else {
      return;
    }

    origin = [cX, cY];

    node?.addEventListener("mousemove", onMouseMove, false);
    node?.addEventListener("mouseup", onMouseUp, false);

    node?.addEventListener("touchmove", onMouseMove, false);
    node?.addEventListener("touchend", onMouseUp, false);
  };

  return (
    <div className="flex-grow flex flex-col select-none">
      <div className="flex-grow select-none">
        <svg
          className="select-none"
          ref={svgRef}
          style={{ touchAction: "none" }}
        >
          <g>
            <path
              d={`${createPath(bezierShape, canvasSize).toString()}`}
              fill="none"
              stroke="black"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            {bezierShape.map(({ pt, armA, armB }, idx) => {
              return (
                <g key={idx}>
                  <line
                    x1={pt[0] * canvasSize}
                    y1={pt[1] * canvasSize}
                    x2={armA[0] * canvasSize}
                    y2={armA[1] * canvasSize}
                    stroke="red"
                  />

                  <line
                    x1={pt[0] * canvasSize}
                    y1={pt[1] * canvasSize}
                    x2={armB[0] * canvasSize}
                    y2={armB[1] * canvasSize}
                    stroke="red"
                  />
                  <Circle
                    idx={`${idx}.pt`}
                    cx={pt[0] * canvasSize}
                    cy={pt[1] * canvasSize}
                    r={6}
                    onStartDrag={onStartDrag}
                  />
                  <Circle
                    idx={`${idx}.armA`}
                    cx={armA[0] * canvasSize}
                    cy={armA[1] * canvasSize}
                    r={6}
                    onStartDrag={onStartDrag}
                  />
                  <Circle
                    idx={`${idx}.armB`}
                    cx={armB[0] * canvasSize}
                    cy={armB[1] * canvasSize}
                    r={6}
                    onStartDrag={onStartDrag}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div>
        Edit Points Left: {Math.round(maxEditPoints * 100 - editPoints * 100)}
        <button
          onClick={resetShape}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded leading-normal text-base ml-1"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
