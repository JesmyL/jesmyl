import { describe, expect, it } from 'vitest';

import { textedChordRegsLazy } from 'shared/utils/cm/com/const';

const textedChordRegExp = textedChordRegsLazy().regExp;

const validTextedChordLines = [
  'C',
  '|G',
  '|C|',
  'D|',
  'Am.-Dm',
  'Am-Dm',
  '-Am.-Dm',
  '|Am.-Dm',
  'Am.-Dm|',
  '|Am.-Dm|',
  'Am.-F.-G.-C',
  'Am..-Dm',
  '..-Dm',
  '.',
  'Am.-.',
  'Am-.',
  'C#m..A...H....E',
  '|.E7..Am|',
  '|C..F-E',
  'H',
  '.E/G#..C#m-E/G#',
  '.D..Hm-A',
  'G7#9',
  'Am7b5',
  'C7b9',
  'Cm7b5.-F7b9',
  'Em9/D',
];

const invalidTextedChordLines = [
  '',
  'Ab.-Db.',
  'Cb',
  'C/E#',
  '|',
  'Am-B',
  'X',
  'C maj7',
  'Cmm',
  'Ddim9',
  'привет',
  '%%%',
  'C;C',
  '..',
  '...',
  '...-.',
  'Am..',
  'Am..-..',
  'Am..-.',
  'Am.-..',
  'A#m7/G#..',
  'Am.',
  'Am.-Dm.',
  'Am..-Dm.',
  '..-Dm.',
  'H.',
  'G7#9.',
  'Am7b5.',
  'C7b9.',
  'Cm7b5.-F7b9.',
  'Em9/D-',
  '|Am7.-Dm7.|E7',
  'Am|-Dm',
  '|Am|-Dm|E',
  'Am.-Dm-',
  'Am-',
];

describe('textedChordRegsLazy', () => {
  it.each(validTextedChordLines)('matches %s', line => expect(line).toMatch(textedChordRegExp));
  it.each(invalidTextedChordLines)('does not match %s', line => expect(line).not.toMatch(textedChordRegExp));
});
