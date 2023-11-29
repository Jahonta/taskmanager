export const Colors = ['black', 'yellow', 'blue', 'green', 'pink'] as const;

export type Color = (typeof Colors)[number];
