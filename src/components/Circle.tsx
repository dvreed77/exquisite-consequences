import React from "react";
// import { drag as d3Drag } from "d3-drag";
import * as d3 from "d3";
export const Circle = React.memo(
  ({
    idx,
    cx
    cy,
    r,
    onStartDrag,
  }: {
    idx: string | number;
    cx: number;
    cy: number;
    r: number;
    onStartDrag: any;
  }) => {
    

    // React.useEffect(() => {
    //   const node = circleRef.current;

    //   node?.parentElement?.addEventListener(
    //     "mousemove",
    //     ({ clientX, clientY }) => {
    //       console.log(dragging);
    //       if (dragging) {
    //         console.log("dave");
    //         setCoordinates([clientX - origin.x, clientY - origin.y]);
    //       }
    //     }
    //   );
    //   // console.log();
    // }, []);

    //   d3.select(node).call(d3.drag().on("start", () => console.log("start")));

    //   d3.select(node).call(
    //     d3.drag().on("drag", () => {
    //       const me = d3.select(this);
    //       // console.log(me);
    //       // console.log(d3.event.x);
    //       me.attr("cx", d3.event.x);
    //       me.attr("cy", d3.event.y);
    //     })
    //   );
    // }, []);

    // React.useEffect(() => {
    //   console.log("useEffect");
    //   setCenter([initialCx, initialCy]);
    // }, [initialCx, initialCy]);

    // function onMove({ clientX, clientY }) {
    //   console.log(dragging);
    //   if (dragging) {
    //     console.log("dave");
    //     setCoordinates([clientX - origin.x, clientY - origin.y]);
    //   }
    // }

    return (
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill="red"
        // onMouseDown={({ clientX, clientY }) => {
        //   console.log("mD");
        //   setOrigin({ x: clientX, y: clientY });
        //   setDragging(true);
        // }}
        // onMouseMove={onMove}
        onMouseDown={(e) => onStartDrag(e, idx)}
        onTouchStart={(e: React.TouchEvent<SVGCircleElement>) => {
          console.log(e instanceof TouchEvent)
          onStartDrag(e, idx)
        }}
      />
    );
  }
);
