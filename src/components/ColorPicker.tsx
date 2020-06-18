import React from "react";
import classNames from "classnames";
import { colorOptions } from "../utils/colorOptions";

export function ColorPicker({
  lastColor,
  color,
  setColor,
}: {
  lastColor: string;
  color: string;
  setColor: any;
}) {
  const [colors, setColors] = React.useState<string[]>([]);

  React.useEffect(() => {
    const colors_ = colorOptions(lastColor || "red");
    setColors(colors_);
    setColor(colors_[Math.floor(Math.random() * colors.length)]);
  }, [lastColor]);

  return (
    <div className="w-full">
      <h1 className="text-center">Pick a Color</h1>
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
