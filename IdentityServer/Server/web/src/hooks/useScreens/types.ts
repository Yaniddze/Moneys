export enum Screens {
  Mobile = 600,
  Desktop = 100000,
}

const keys = Object.keys(Screens)
  .filter((key) => typeof Screens[key as any] === 'number');

export const SortedScreensValues: Array<number> = keys
  .map((key) => parseInt(Screens[key as any], 0))
  .sort((a, b) => (a - b));
