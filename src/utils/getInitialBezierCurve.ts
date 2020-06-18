const padding = 0.1;
const armLength = 0.3;

export const getInputBezier = () => [
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
