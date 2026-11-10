import { describe, expect, it } from 'vitest';
import { makeDiffHtml, stringifyDiffValue } from './tsjrpc.diff';

const preOpen = '<pre style="white-space:pre-wrap">';
const preClose = '</pre>';

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
  it('keeps the changed word as plain removed-then-added text', () => {
    expect(makeDiffHtml('hello world foo', 'hello world bar')).toBe(`${preOpen}hello world foobar${preClose}`);
  });

  it('renders an insertion without markup', () => {
    expect(makeDiffHtml('abc', 'abXYc')).toBe(`${preOpen}abXYc${preClose}`);
  });

  it('renders a deletion without markup', () => {
    expect(makeDiffHtml('abXYc', 'abc')).toBe(`${preOpen}abXYc${preClose}`);
  });

  it('interleaves equal and changed characters on substitution', () => {
    expect(makeDiffHtml('cat', 'cut')).toBe(`${preOpen}caut${preClose}`);
    expect(makeDiffHtml('foo hello bar', 'foo hallo bar')).toBe(`${preOpen}foo heallo bar${preClose}`);
  });

  it('keeps word edits below the 60% threshold fine-grained', () => {
    expect(makeDiffHtml('foo hello world bar', 'foo hallo wurld bar')).toBe(
      `${preOpen}foo heallo wourld bar${preClose}`,
    );
  });

  it('replaces a whole word when 1 - equalChars / max(oldLen, newLen) reaches 0.6', () => {
    // 'red' -> 'green': равных символов 2 ('re'), максимальная длина 5 -> 1 - 2 / 5 === 0.6
    // 'four' -> 'five': равных символов 1 ('f'), максимальная длина 4 -> 0.75
    expect(makeDiffHtml('foo red bar one two three four', 'foo green bar one two three five')).toBe(
      `${preOpen}foo redgreen bar one two three fourfive${preClose}`,
    );
  });

  it('replaces whole lines when a paired line is heavily changed despite common characters', () => {
    // 'aXbcYd' -> 'eXfgYh': равных символов 2 ('X', 'Y'), максимальная длина 6 -> ~0.67
    expect(makeDiffHtml('start\naXbcYd\nend', 'start\neXfgYh\nend')).toBe(
      `${preOpen}start\naXbcYdeXfgYh\nend${preClose}`,
    );
  });

  it('replaces whole lines at exactly the 60% line threshold (1 - equalChars / max(oldLen, newLen))', () => {
    // 'aXbYd' -> 'eXfYh': равных символов 2 ('X', 'Y'), максимальная длина 5 -> 1 - 2 / 5 === 0.6
    expect(makeDiffHtml('zero\naXbYd', 'ZERO\neXfYh')).toBe(`${preOpen}zeroZERO\naXbYdeXfYh${preClose}`);
  });

  it('refines a line pair that stays under the 60% threshold', () => {
    expect(makeDiffHtml('zero\none two hello world\nend', 'ZERO\none two hallo wurld\nend')).toBe(
      `${preOpen}zeroZERO\none two heallo wourld\nend${preClose}`,
    );
  });

  it('keeps unchanged multiline JSON-ish lines intact', () => {
    const was = '{\n  "name": "Ivan",\n  "email": "ivan@mail.ru"\n}';
    const newV = '{\n  "name": "Ivan",\n  "email": "ivan@mail.com"\n}';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}{\n  "name": "Ivan",\n  "email": "ivan@mail.rucom"\n}${preClose}`,
    );
  });

  it('escapes every segment', () => {
    expect(makeDiffHtml('a<b', 'a>c')).toBe(`${preOpen}a&lt;b&gt;c${preClose}`);
  });

  it('treats UTF-16 code units as diff units', () => {
    expect(makeDiffHtml('привет мир', 'привет год')).toBe(`${preOpen}привет миргод${preClose}`);
  });

  it('falls back to whole-middle blocks when the middle exceeds the LCS cap', () => {
    const was = 'a'.repeat(1600);
    const newV = 'b'.repeat(1600);

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}${was}${newV}${preClose}`);
  });

  it('handles empty inputs', () => {
    expect(makeDiffHtml('', '')).toBe(`${preOpen}${preClose}`);
    expect(makeDiffHtml('', 'abc')).toBe(`${preOpen}abc${preClose}`);
  });

  it('emits no highlight markup or colors', () => {
    // Дифф теперь отдаёт простой текст: цветных span'ов и их фонов быть не должно.
    const html = makeDiffHtml('foo red bar', 'foo green bar');

    expect(html).not.toContain('<span');
    expect(html).not.toContain('#fee');
    expect(html).not.toContain('#efe');
  });

  it('keeps the untouched gap between two separate line edits plain', () => {
    const was = 'line one\nline two\nline three\nline four';
    const newV = 'line ONE\nline two\nline three\nline FOUR';

    expect(makeDiffHtml(was, newV)).toBe(
      `${preOpen}line oneONE\nline two\nline three\nline fourFOUR${preClose}`,
    );
  });

  it('renders a pure line insertion as one block', () => {
    const was = 'alpha\nbeta\ngamma';
    const newV = 'alpha\ninserted\nbeta\ngamma';

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}alpha\ninserted\nbeta\ngamma${preClose}`);
  });

  it('renders a pure line deletion as one block', () => {
    const was = 'alpha\ninserted\nbeta\ngamma';
    const newV = 'alpha\nbeta\ngamma';

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}alpha\ninserted\nbeta\ngamma${preClose}`);
  });

  it('refines changed line pairs down to the changed characters', () => {
    const was = 'one\ntwo\nthree\nfour';
    const newV = 'one\nTWO\nTHREE\nfour';

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}one\ntwoTWO\nthreeTHREE\nfour${preClose}`);
  });

  it('treats extra lines of an uneven changed block as fully removed', () => {
    const was = 'one\ntwo\nthree\nfour';
    const newV = 'one\nTWO\nfour';

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}one\ntwo\nTWOthree\nfour${preClose}`);
  });

  it('keeps a long untouched gap plain even when it exceeds the char LCS cap', () => {
    const gap = Array.from({ length: 100 }, (_, index) => `unchanged line ${index}`).join('\n');
    const was = `first old\n${gap}\nlast old`;
    const newV = `first new\n${gap}\nlast new`;

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}first oldnew\n${gap}\nlast oldnew${preClose}`);
  });

  it('falls back to whole-middle blocks when the line count exceeds the line cap', () => {
    const was = Array.from({ length: 600 }, () => 'aaaa').join('\n');
    const newV = Array.from({ length: 600 }, () => 'bbbb').join('\n');

    expect(makeDiffHtml(was, newV)).toBe(`${preOpen}${was}${newV}${preClose}`);
  });
});
