import { describe, expect, it } from 'vitest';
import { makeDiffHtml, stringifyDiffValue } from './tsjrpc.diff';

const preOpen = '<pre style="white-space:pre-wrap">';
const preClose = '</pre>';
const removedOpen = '<span style="color:#c33;background:#fee">';
const addedOpen = '<span style="color:#184;background:#efe">';
const spanClose = '</span>';

describe('stringifyDiffValue', () => {
  it('keeps strings as is', () => {
    expect(stringifyDiffValue('было')).toBe('было');
  });

  it('stringifies primitives and objects', () => {
    expect(stringifyDiffValue(5)).toBe('5');
    expect(stringifyDiffValue(false)).toBe('false');
    expect(stringifyDiffValue({ a: 1 })).toBe('{\n  "a": 1\n}');
  });

  it('normalizes number and its string representation equally', () => {
    expect(stringifyDiffValue(5)).toBe(stringifyDiffValue('5'));
  });

  it('returns null for absent values', () => {
    expect(stringifyDiffValue(undefined)).toBe(null);
    expect(stringifyDiffValue(() => undefined)).toBe(null);
  });
});

describe('makeDiffHtml', () => {
  it('colors only the changed word in the middle of a string', () => {
    expect(makeDiffHtml('hello world foo', 'hello world bar')).toBe(
      `${preOpen}hello world ${removedOpen}foo${spanClose}${addedOpen}bar${spanClose}${preClose}`,
    );
  });

  it('marks an insertion without coloring the surrounding text', () => {
    expect(makeDiffHtml('abc', 'abXYc')).toBe(`${preOpen}ab${addedOpen}XY${spanClose}c${preClose}`);
  });

  it('marks a deletion without coloring the surrounding text', () => {
    expect(makeDiffHtml('abXYc', 'abc')).toBe(`${preOpen}ab${removedOpen}XY${spanClose}c${preClose}`);
  });

  it('interleaves equal and changed characters on substitution', () => {
    expect(makeDiffHtml('cat', 'cut')).toBe(`${preOpen}c${removedOpen}a${spanClose}${addedOpen}u${spanClose}t${preClose}`);
    expect(makeDiffHtml('foo hello bar', 'foo hallo bar')).toBe(
      `${preOpen}foo h${removedOpen}e${spanClose}${addedOpen}a${spanClose}llo bar${preClose}`,
    );
  });

  it('keeps word edits below the 60% threshold fine-grained', () => {
    expect(makeDiffHtml('foo hello world bar', 'foo hallo wurld bar')).toBe(
      `${preOpen}foo h${removedOpen}e${spanClose}${addedOpen}a${spanClose}llo w${removedOpen}o${spanClose}${addedOpen}u${spanClose}rld bar${preClose}`,
    );
  });

  it('replaces a whole word when 1 - equalChars / max(oldLen, newLen) reaches 0.6', () => {
    // 'red' -> 'green': equalChars = 2 ('re'), max length = 5 -> 1 - 2 / 5 === 0.6
    // 'four' -> 'five': equalChars = 1 ('f'), max length = 4 -> 0.75
    expect(makeDiffHtml('foo red bar one two three four', 'foo green bar one two three five')).toBe(
      `${preOpen}foo ${removedOpen}red${spanClose}${addedOpen}green${spanClose} bar one two three ${removedOpen}four${spanClose}${addedOpen}five${spanClose}${preClose}`,
    );
  });

  it('replaces whole lines when a paired line is heavily changed despite common characters', () => {
    // 'aXbcYd' -> 'eXfgYh': equalChars = 2 ('X', 'Y'), max length = 6 -> ~0.67
    expect(makeDiffHtml('start\naXbcYd\nend', 'start\neXfgYh\nend')).toBe(
      `${preOpen}start\n${removedOpen}aXbcYd${spanClose}${addedOpen}eXfgYh${spanClose}\nend${preClose}`,
    );
  });

  it('replaces whole lines at exactly the 60% line threshold (1 - equalChars / max(oldLen, newLen))', () => {
    // 'aXbYd' -> 'eXfYh': equalChars = 2 ('X', 'Y'), max length = 5 -> 1 - 2 / 5 === 0.6
    expect(makeDiffHtml('zero\naXbYd', 'ZERO\neXfYh')).toBe(
      `${preOpen}${removedOpen}zero${spanClose}${addedOpen}ZERO${spanClose}\n${removedOpen}aXbYd${spanClose}${addedOpen}eXfYh${spanClose}${preClose}`,
    );
  });

  it('refines a line pair that stays under the 60% threshold', () => {
    expect(makeDiffHtml('zero\none two hello world\nend', 'ZERO\none two hallo wurld\nend')).toBe(
      `${preOpen}${removedOpen}zero${spanClose}${addedOpen}ZERO${spanClose}\none two h${removedOpen}e${spanClose}${addedOpen}a${spanClose}llo w${removedOpen}o${spanClose}${addedOpen}u${spanClose}rld\nend${preClose}`,
    );
  });

  it('keeps unchanged multiline JSON-ish lines intact', () => {
    const was = '{\n  "name": "Ivan",\n  "email": "ivan@mail.ru"\n}';
    const newV = '{\n  "name": "Ivan",\n  "email": "ivan@mail.com"\n}';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}{\n  "name": "Ivan",\n  "email": "ivan@mail.${removedOpen}ru${spanClose}${addedOpen}com${spanClose}"\n}${preClose}`,
    );
  });

  it('escapes every segment', () => {
    expect(makeDiffHtml('a<b', 'a>c')).toBe(
      `${preOpen}a${removedOpen}&lt;b${spanClose}${addedOpen}&gt;c${spanClose}${preClose}`,
    );
  });

  it('treats UTF-16 code units as diff units', () => {
    expect(makeDiffHtml('привет мир', 'привет год')).toBe(
      `${preOpen}привет ${removedOpen}мир${spanClose}${addedOpen}год${spanClose}${preClose}`,
    );
  });

  it('falls back to whole-middle blocks when the middle exceeds the LCS cap', () => {
    const was = 'a'.repeat(1600);
    const newV = 'b'.repeat(1600);

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}${removedOpen}${was}${spanClose}${addedOpen}${newV}${spanClose}${preClose}`);
  });

  it('handles empty inputs', () => {
    expect(makeDiffHtml('', '')).toBe(`${preOpen}${preClose}`);
    expect(makeDiffHtml('', 'abc')).toBe(`${preOpen}${addedOpen}abc${spanClose}${preClose}`);
  });

  it('keeps the untouched gap between two separate line edits plain', () => {
    const was = 'line one\nline two\nline three\nline four';
    const newV = 'line ONE\nline two\nline three\nline FOUR';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}line ${removedOpen}one${spanClose}${addedOpen}ONE${spanClose}\nline two\nline three\nline ${removedOpen}four${spanClose}${addedOpen}FOUR${spanClose}${preClose}`,
    );
  });

  it('marks a pure line insertion as one added block', () => {
    const was = 'alpha\nbeta\ngamma';
    const newV = 'alpha\ninserted\nbeta\ngamma';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}alpha\n${addedOpen}inserted\n${spanClose}beta\ngamma${preClose}`,
    );
  });

  it('marks a pure line deletion as one removed block', () => {
    const was = 'alpha\ninserted\nbeta\ngamma';
    const newV = 'alpha\nbeta\ngamma';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}alpha\n${removedOpen}inserted\n${spanClose}beta\ngamma${preClose}`,
    );
  });

  it('refines changed line pairs down to the changed characters', () => {
    const was = 'one\ntwo\nthree\nfour';
    const newV = 'one\nTWO\nTHREE\nfour';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}one\n${removedOpen}two${spanClose}${addedOpen}TWO${spanClose}\n${removedOpen}three${spanClose}${addedOpen}THREE${spanClose}\nfour${preClose}`,
    );
  });

  it('treats extra lines of an uneven changed block as fully removed', () => {
    const was = 'one\ntwo\nthree\nfour';
    const newV = 'one\nTWO\nfour';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}one\n${removedOpen}two\n${spanClose}${addedOpen}TWO${spanClose}${removedOpen}three${spanClose}\nfour${preClose}`,
    );
  });

  it('keeps a long untouched gap plain even when it exceeds the char LCS cap', () => {
    const gap = Array.from({ length: 100 }, (_, index) => `unchanged line ${index}`).join('\n');
    const was = `first old\n${gap}\nlast old`;
    const newV = `first new\n${gap}\nlast new`;

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}first ${removedOpen}old${spanClose}${addedOpen}new${spanClose}\n${gap}\nlast ${removedOpen}old${spanClose}${addedOpen}new${spanClose}${preClose}`,
    );
  });

  it('falls back to whole-middle blocks when the line count exceeds the line cap', () => {
    const was = Array.from({ length: 600 }, () => 'aaaa').join('\n');
    const newV = Array.from({ length: 600 }, () => 'bbbb').join('\n');

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}${removedOpen}${was}${spanClose}${addedOpen}${newV}${spanClose}${preClose}`,
    );
  });
});
