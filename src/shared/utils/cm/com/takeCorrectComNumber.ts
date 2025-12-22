export const takeCorrectComNumber = (comIndex: number) => (comIndex > 403 || comIndex > 665 ? comIndex + 1 : comIndex);

export const takeCorrectComIndex = (comPosition: number) =>
  comPosition > 403 || comPosition > 665 ? comPosition - 1 : comPosition;
