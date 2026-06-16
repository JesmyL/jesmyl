/* eslint-disable @typescript-eslint/no-explicit-any */
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

  setArrayProtoMethod('with', function (this: unknown[], pos, value) {
    const arrayClone = this.slice(0);
    arrayClone[pos < 0 ? this.length + pos : pos] = value;

    return arrayClone;
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

  (function () {
    if (typeof globalThis.Map === 'function') return;

    function Map(this: any) {
      this._keys = [];
      this._values = [];
    }

    Map.prototype.set = function (key: any, value: any) {
      const index = this._keys.indexOf(key);
      if (index === -1) {
        this._keys.push(key);
        this._values.push(value);
      } else {
        this._values[index] = value;
      }
      return this;
    };

    Map.prototype.get = function (key: any) {
      const index = this._keys.indexOf(key);
      return index === -1 ? undefined : this._values[index];
    };

    Map.prototype.has = function (key: any) {
      return this._keys.indexOf(key) !== -1;
    };

    Map.prototype.delete = function (key: any) {
      const index = this._keys.indexOf(key);
      if (index !== -1) {
        this._keys.splice(index, 1);
        this._values.splice(index, 1);
        return true;
      }
      return false;
    };

    Map.prototype.clear = function () {
      this._keys = [];
      this._values = [];
    };

    Map.prototype.size = function () {
      return this._keys.length;
    };

    Map.prototype.forEach = function (callback: (...args: any[]) => any, thisArg: any) {
      for (let i = 0; i < this._keys.length; i++) {
        callback.call(thisArg, this._values[i], this._keys[i], this);
      }
    };

    (globalThis as any).Map = Map;
  })();

  (function () {
    function Set(this: any) {
      this._values = [];
    }

    let setPrototype = (globalThis as any).Set?.prototype ?? Set.prototype;

    if (typeof (globalThis as any).Set !== 'function') {
      setPrototype = Set.prototype;

      setPrototype.add = function (value: any) {
        if (!this.has(value)) {
          this._values.push(value);
        }
        return this;
      };

      setPrototype.delete = function (value: any) {
        const index = this._values.indexOf(value);
        if (index !== -1) {
          this._values.splice(index, 1);
          return true;
        }
        return false;
      };

      setPrototype.has = function (value: any) {
        return this._values.indexOf(value) !== -1;
      };

      setPrototype.clear = function () {
        this._values = [];
      };

      setPrototype.size = function () {
        return this._values.length;
      };

      setPrototype.forEach = function (callback: any, thisArg: any) {
        for (let i = 0; i < this._values.length; i++) {
          callback.call(thisArg, this._values[i], this._values[i], this);
        }
      };

      (globalThis as any).Set = Set;
    }

    if (!setPrototype.difference) {
      setPrototype.difference = function (otherSet: Set<unknown>) {
        const differenceSet = new (globalThis as any).Set();
        for (const elem of this) if (!otherSet.has(elem)) differenceSet.add(elem);
        return differenceSet;
      };
    }

    if (!setPrototype.symmetricDifference) {
      setPrototype.symmetricDifference = function (otherSet: Set<unknown>) {
        const differenceSet = new (globalThis as any).Set();
        for (const elem of this) if (!otherSet.has(elem)) differenceSet.add(elem);
        for (const elem of otherSet as never as []) if (!this.has(elem)) differenceSet.add(elem);
        return differenceSet;
      };
    }

    if (!setPrototype._clone) {
      const clearSet = new (globalThis as any).Set();

      setPrototype._clone = function () {
        return this.union(clearSet);
      };
    }

    setPrototype._toggle ??= function (value: any) {
      if (this.has(value)) this.delete(value);
      else this.add(value);
    };
  })();

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

  interface Set<T> {
    _clone: () => Set<T>;
    _toggle: (value: T) => void;
  }
}

export {};
