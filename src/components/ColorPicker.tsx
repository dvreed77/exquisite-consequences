import React from "react";
import classNames from "classnames";
import { colorOptions } from "../utils/colorOptions";

export function ColorPicker({
  inputColor,
  color,
  setColor,
}: {
  inputColor: string;
  color: string;
  setColor: any;
}) {
  const colors = colorOptions(inputColor || "red");

  return (
    <div className="w-full">
      <h1>Pick a Color</h1>
      <div className="flex flex-row">
        {colors.map((c, idx) => (
          <div
            key={idx}
            className={classNames("flex-grow h-20 border-4", {
              "border-white": c !== color,
              "border-black": c === color,
            })}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
    </div>
  );
}
