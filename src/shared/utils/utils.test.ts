// @vitest-environment node
import { describe, expect } from 'vitest';

import { checkIsEq } from './checkIsEq';
import { deepClone } from './clone';

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

export {};
