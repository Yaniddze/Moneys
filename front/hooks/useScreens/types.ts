// eslint-disable-next-line no-shadow
export enum MinWidths {
  Mobile = 0,
  Tablet = 600,
  PC = 1200,
}

const keys = Object.keys(MinWidths)
  .filter((key) => typeof MinWidths[key as any] === 'number');

export const SortedScreensValues: Array<number> = keys
  // eslint-disable-next-line radix
  .map((key) => parseInt(MinWidths[key as any], 0))
  .sort((a, b) => (b - a));
