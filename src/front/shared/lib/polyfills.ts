/* eslint-disable @typescript-eslint/no-explicit-any */
import { setSharedPolyfills } from 'shared/utils';

export const setPolyfills = () => {
  setSharedPolyfills();

  (function () {
    if (typeof window.Map === 'function') return;

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
  })();
};

const prev: Record<string, unknown> = {};
(globalThis as { inspectComponentProps: unknown }).inspectComponentProps = (
  curr: Record<string, unknown>,
  print?: boolean,
) => {
  for (const c in curr) {
    if (curr[c] === prev[c]) {
      console.warn('>>>>', curr[c] === prev[c] ? 'old' : 'NEW', c, ...(print ? [prev[c], curr[c]] : []));
      console.error('>>>>', curr[c] === prev[c] ? 'old' : 'NEW', c, ...(print ? [prev[c], curr[c]] : []));
    }

    prev[c] = curr[c];
  }
};

declare global {
  function setTimeoutEffect<Args extends unknown[]>(
    handler: (...args: Args) => void,
    timeout?: number,
    ...args: Args
  ): () => void;
  function inspectComponentProps(curr: Record<string, unknown>, print?: boolean): void;

  interface Array<T> {
    toSorted: (compareFn?: (a: T, b: T) => number) => T[];
    merge: (array: T[] | und) => T[];
  }

  interface String {
    reverse: () => string;
  }

  interface OnMessageEvent extends OmitOwn<Event, 'currentTarget' | 'target' | 'srcElement'> {
    data: string;
    origin: '';
    lastEventId: '';
    source: null;
    ports: [];
    userActivation: null;
    type: 'message';
    currentTarget: PresentationConnection;
    srcElement: PresentationConnection;
    target: PresentationConnection;
  }

  interface PresentationConnection {
    binaryType: 'arraybuffer';
    id: string;
    onclose: null | ((event: Event) => void);
    onconnect: null | ((event: Event) => void);
    onmessage: null | ((event: OnMessageEvent) => void);
    onterminate: null | ((event: Event) => void);
    state: string | 'connected';
    url: string;
    send(text: string): void;
    terminate(): void;
    close(): void;
  }

  class PresentationRequest extends EventTarget {
    constructor(localUrl: string);

    getAvailability(): void;
    onconnectionavailable: null | ((event: unknown) => void);
    reconnect(): void;
    start(): Promise<PresentationConnection>;
  }

  interface PresentationConnectionList extends EventTarget {
    connections: PresentationConnection[];
    connectionavailable(event: unknown): void;
  }

  class PresentationReceiver {
    connectionList: Promise<PresentationConnectionList>;
  }

  interface Presentation {
    defaultRequest: null;
    receiver: PresentationReceiver;
  }

  interface Navigator {
    presentation: Presentation;
  }
}

export {};
