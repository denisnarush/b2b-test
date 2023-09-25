import { randomInt } from './random-int';

export function randomColor(): string {
  const variant = randomInt(3);
  return [randomRGBColor, randomHEXColor, randomMAPColor][variant]();
}

function randomRGBColor(): string {
  return `rgb(${randomInt(255)}, ${randomInt(255)}, ${randomInt(255)})`;
}

function randomHEXColor(): string {
  return `#${randomInt(16777215).toString(16)}`;
}

function randomMAPColor(): string {
  const map = ['green', 'red'];
  const variant = randomInt(map.length);
  return map[variant];
}
