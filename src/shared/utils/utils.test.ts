// @vitest-environment node
import { describe, expect } from 'vitest';

import { checkIsEq } from './checkIsEq';
import { deepClone } from './clone';
import {
  convertSecondsInStrTime,
  declension,
  extractNumber,
  sliceStringIfEndsWith,
  sliceStringIfStartsWith,
} from './utils';

describe('utils', () => {
  it('checkIsEq', () => {
    const a = { a: '', b: 71237, n: undefined };
    const b = { a: '', b: 71237 };
    expect(checkIsEq(a, b)).toBe(true);
  });

  it('deepClone', () => {
    const a = { a: { b: { c: { d: [':)'] } } } };
    const b = deepClone(a);

    expect(a.a.b.c.d === b.a.b.c.d).toBe(false);
    expect(checkIsEq(a.a.b.c.d, b.a.b.c.d)).toBe(true);
  });

  // ADD THIS TESTS
  it('convertSecondsInStrTime', () => {
    expect(convertSecondsInStrTime(0)).toBe('00:00');
    expect(convertSecondsInStrTime(59)).toBe('00:59');
    expect(convertSecondsInStrTime(60)).toBe('01:00');
    expect(convertSecondsInStrTime(754)).toBe('12:34');
  });

  it('sliceStringIfEndsWith / sliceStringIfStartsWith', () => {
    expect(sliceStringIfEndsWith('file.test.ts', '.ts')).toBe('file.test');
    expect(sliceStringIfEndsWith('abc', 'x')).toBe('abc');
    expect(sliceStringIfStartsWith('prefix-name', 'prefix-')).toBe('name');
    expect(sliceStringIfStartsWith('abc', 'x')).toBe('abc');
  });

  it('extractNumber', () => {
    expect(extractNumber('42')).toBe(42);
    expect(extractNumber('3.14')).toBe(3.14);
    expect(extractNumber('abc')).toBe('abc');
    expect(extractNumber(7)).toBe(7);
  });
});

describe('declension', () => {
  it('uses the only form for any number', () => {
    expect(declension(1, 'сөз')).toBe('сөз');
    expect(declension(2, 'сөз')).toBe('сөз');
    expect(declension(5, 'сөз')).toBe('сөз');
    expect(declension(11, 'сөз')).toBe('сөз');
  });

  it('falls back to the plural form when only two are passed', () => {
    expect(declension(1, 'song', 'songs')).toBe('song');
    expect(declension(2, 'song', 'songs')).toBe('songs');
    expect(declension(5, 'song', 'songs')).toBe('songs');
  });

  it('handles fractional numbers and the 11-19 two-form fallback', () => {
    expect(declension(1.5, 'минута', 'минуты', 'минут')).toBe('минуты');
    expect(declension(11, 'song', 'songs')).toBe('songs');
  });

  it('allows partial repetition of word forms', () => {
    expect(`5 ${declension(5, 'раз', 'раза', 'раз')}`).toBe('5 раз');
    expect(`11 ${declension(11, 'раз', 'раза', 'раз')}`).toBe('11 раз');
    expect(`2 ${declension(2, 'раз', 'раза', 'раз')}`).toBe('2 раза');
    expect(`5 ${declension(5, 'song', 'songs')}`).toBe('5 songs');
    expect(`1 ${declension(1, 'song', 'songs')}`).toBe('1 song');
    expect(declension(5, 'ась', 'ось')).toBe('ось');
  });

  it('mirrors the type-block argument combinations', () => {
    expect(declension(1, '1', '2', '3')).toBe('1');
    // @ts-expect-error five must be undefined when it equals two
    declension(1, '1', '2', '2');
    // @ts-expect-error two must be undefined when it equals one and five is omitted
    declension(1, '1', '1');
    expect(declension(1, '1', '1', '3')).toBe('1');
    expect(declension(1, '3', '1', '3')).toBe('3');
  });
});

export {};
