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

  getBasicOr<K extends keyof T>(fieldn: K, defaultValue: NonNullable<T[K]>): NonNullable<T[K]> {
    if (this.basics[fieldn] === undefined) {
      if (defaultValue !== undefined) this.basics[fieldn] = this.top[fieldn] ?? defaultValue;
      else return this.top[fieldn] as NonNullable<T[K]>;
    }
    return this.basics[fieldn] as NonNullable<T[K]>;
  }

  setExportable<K extends keyof T>(fieldn: K, val: T[K]) {
    this.basics[fieldn] = val;
  }
}
