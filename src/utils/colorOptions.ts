import color from "color";

export function colorOptions(inputColor_: string) {
  const inputColor = color(inputColor_);

  const outputColors = [];

  for (let i = -2; i <= 2; i++) {
    const angle = 20 * i;
    outputColors.push(inputColor.rotate(angle).string());
  }

  return outputColors;
}
