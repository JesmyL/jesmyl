import { emptyFunc, smylib } from 'shared/utils';

export const setSharedPolyfills = () => {
  const setArrayProtoMethod = <Name extends keyof typeof Array.prototype>(
    name: Name,
    value: (typeof Array.prototype)[Name],
  ) => {
    if (!Array.prototype[name])
      Object.defineProperty(Array.prototype, name, {
        value,
        enumerable: false,
      });
  };

  const setStringProtoMethod = <Name extends keyof typeof String.prototype>(
    name: Name,
    value: (typeof String.prototype)[Name],
  ) => {
    if (!String.prototype[name])
      Object.defineProperty(String.prototype, name, {
        value,
        enumerable: false,
      });
  };

  Promise.withResolvers ??= <T>(): PromiseWithResolvers<T> => {
    let resolve: (value: T | PromiseLike<T>) => void = emptyFunc;
    let reject: (reason?: unknown) => void = emptyFunc;

    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });

    return { promise, reject, resolve };
  };

  setArrayProtoMethod('flat', function <Item>(this: unknown, depth?: number) {
    'use strict';
    if (depth === undefined) depth = 1;
    const flatten: (arr: Item[], depth: number) => Item[] = function (arr: Item[], depth: number) {
      if (depth < 1) return arr.slice();
      return arr.reduce((acc: Item[], val: Item) => {
        return acc.concat(Array.isArray(val) ? flatten(val, depth - 1) : val);
      }, []);
    };
    return flatten(this as [], depth);
  });

  setArrayProtoMethod('at', function (this: unknown[], pos) {
    return pos < 0 ? this[this.length + pos] : this[pos];
  });

  setArrayProtoMethod('merge', function (this: unknown[], array) {
    if (array !== undefined) for (let i = 0; i < array.length; i++) this.push(array[i]);

    return this;
  });

  setStringProtoMethod('reverse', function (this: string) {
    let res = '';
    for (let i = this.length - 1; i >= 0; i--) res += this[i];

    return res;
  });

  (globalThis as { setTimeoutEffect: unknown }).setTimeoutEffect = (
    handler: (...args: unknown[]) => void,
    timeout: number,
    ...args: unknown[]
  ) => {
    const timer = setTimeout(handler, timeout, ...args);

    return () => clearTimeout(timer);
  };

  ///////////////////////////////////
  // force resigns for unifications//
  ///////////////////////////////////

  Array.prototype.toSorted = function (compareFunction) {
    return smylib.toSorted(this, compareFunction);
  };

  Array.prototype.sort = function (compareFunction) {
    return smylib.sort(this, compareFunction);
  };

  (BigInt.prototype as never as { toJSON: unknown }).toJSON = function () {
    return +('' + this);
  };
};

declare global {
  function setTimeoutEffect<Args extends unknown[]>(
    handler: (...args: Args) => void,
    timeout?: number,
    ...args: Args
  ): () => void;

  interface Array<T> {
    toSorted: (compareFn?: (a: T, b: T) => number) => T[];
    merge: (array: T[] | und) => T[];
  }

  interface String {
    reverse: () => string;
  }
}

export {};
