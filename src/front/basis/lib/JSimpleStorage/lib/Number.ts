import { JStorageSimpleVal } from './JStorageSimple';

export class JStorageNumberVal extends JStorageSimpleVal<number> {
  constructor(storageName: string, id: string, defaultValue: number) {
    super(storageName, id, defaultValue);
    const key = this.key;

    this.setter = (val: number) => {
      localStorage[key] = val;
    };

    this.getter = (isRetDef: boolean) => {
      const value = +localStorage[key];
      if (isNaN(value)) return isRetDef ? defaultValue : null;

      return value;
    };
  }
}
