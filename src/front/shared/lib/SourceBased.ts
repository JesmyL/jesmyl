import { mylib } from './my-lib';

export class SourceBased<T> {
  top: T;
  basics: T;

  constructor(top: T) {
    this.top = top;
    this.basics = {} as never;
  }

  getBasic<K extends keyof T>(fieldn: K): T[K] {
    if (this.basics[fieldn] === undefined) {
      return this.top[fieldn];
    }
    return this.basics[fieldn] as T[K];
  }

  getBasicOr<K extends keyof T>(fieldn: K, typ: NonNullable<T[K]>): NonNullable<T[K]> {
    if (this.basics[fieldn] === undefined) {
      if (typ !== undefined) this.basics[fieldn] = mylib.typ(typ, this.top[fieldn] as never) as never;
      else return this.top[fieldn] as NonNullable<T[K]>;
    }
    return this.basics[fieldn] as NonNullable<T[K]>;
  }

  setExportable<K extends keyof T>(fieldn: K, val: T[K]) {
    this.basics[fieldn] = val;
  }
}
