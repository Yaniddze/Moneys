export enum Screens {
  Mobile = 0,
  Tablet = 600,
  PC = 800,
}

const keys = Object.keys(Screens)
  .filter((key) => typeof Screens[key as any] === 'number');

export const SortedScreensValues: Array<number> = keys
  .map((key) => parseInt(Screens[key as any], 0))
  .sort((a, b) => (b - a));
