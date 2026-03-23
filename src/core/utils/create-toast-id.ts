export const createToastRandomId = (): string =>
  Math.random().toString(36).substring(2, 9);
