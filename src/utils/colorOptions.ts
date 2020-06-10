import color from "color";
import { randomNormal } from "d3-random";
export function colorOptions(inputColor_: string) {
  const inputColor = color(inputColor_);

  const outputColors = [];

  for (let i = -2; i <= 2; i++) {
    const angle = randomNormal(20 * i, 5)();
    outputColors.push(inputColor.rotate(angle).string());
  }

  return outputColors;
}
