export const replaceWordOccurrence = (text: string, word: string, occurrence: number, replacement: string) => {
  let pos = -1;

  for (let i = 0; i <= occurrence; i++) {
    pos = text.indexOf(word, pos + 1);
    if (pos < 0) return text;
  }

  return text.slice(0, pos) + replacement + text.slice(pos + word.length);
};
