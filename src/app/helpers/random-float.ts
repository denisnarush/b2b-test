import { randomInt } from './random-int';

export function randomFloat(): string {
  const sign = randomInt(2);
  const intPart = randomInt(4);
  const decPart = Math.random().toFixed(18).substring(2);

  return `${sign ? '' : '-'}${intPart}.${decPart}`;
}
