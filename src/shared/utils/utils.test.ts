// @vitest-environment node
import { describe, expect } from 'vitest';

import { checkIsEq } from './checkIsEq';
import { deepClone } from './clone';
import { declension } from './utils';

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

  it('throws only when all word forms are identical', () => {
    expect(() => declension(1, 'сөз', 'сөз')).toThrow('declension: duplicated word forms');
    expect(() => declension(1, 'сөз', 'сөз', 'сөз')).toThrow('declension: duplicated word forms');
    expect(() => declension(2, 'word', 'word')).toThrow('declension: duplicated word forms');
  });

  it('allows partial repetition of word forms', () => {
    expect(`5 ${declension(5, 'раз', 'раза', 'раз')}`).toBe('5 раз');
    expect(`11 ${declension(11, 'раз', 'раза', 'раз')}`).toBe('11 раз');
    expect(`2 ${declension(2, 'раз', 'раза', 'раз')}`).toBe('2 раза');
    expect(`5 ${declension(5, 'song', 'songs', 'songs')}`).toBe('5 songs');
    expect(`1 ${declension(1, 'song', 'songs', 'songs')}`).toBe('1 song');
    expect(declension(5, 'ась', 'ось', 'ось')).toBe('ось');
  });
});

export {};
