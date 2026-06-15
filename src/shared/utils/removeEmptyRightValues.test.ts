/* eslint-disable no-sparse-arrays */
import { removeEmptyRightValues } from './removeEmptyRightValues';

describe('removeEmptyRightValues', () => {
  it('default check func', () => {
    const obj = {
      a: {},
      b: [],
      c: 0,
      d: false,
      e: '',
      f: { a: '!' },
      g: new Set(),
      h: new Map(),
      i: {
        a: new Set([5, 3, 1, 0, '']),
        b: new Map([
          [{ it: 'it' }, '('],
          [{}, ''],
        ]),
      },
    };

    removeEmptyRightValues(obj);

    expect(obj).toEqual({
      d: false,
      f: { a: '!' },
      i: { a: new Set([5, 3, 1]), b: new Map([[{ it: 'it' }, '(']]) },
    });
  });

  it('string mapper + default check func', () => {
    const obj = {
      a: {},
      b: [NaN, , 1, 0],
      v: new Set([1, false, 0, null, 12]),
    };

    removeEmptyRightValues(obj, undefined, it => it || '');

    expect(obj).toEqual({
      b: ['', '', 1],
      v: new Set([1, '', 12]),
    });
  });
});
