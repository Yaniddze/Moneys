// eslint-disable-next-line no-shadow
export enum Screens {
  Mobile = 0,
  Tablet = 600,
  PC = 1200,
}

const keys = Object.keys(Screens)
  .filter((key) => typeof Screens[key as any] === 'number');

export const SortedScreensValues: Array<number> = keys
  // eslint-disable-next-line radix
  .map((key) => parseInt(Screens[key as any], 0))
  .sort((a, b) => (b - a));
