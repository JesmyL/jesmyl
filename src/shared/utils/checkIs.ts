export const checkIsStartsWith = <Start extends string>(value: string, start: Start): value is `${Start}${string}` =>
  value.startsWith(start);
