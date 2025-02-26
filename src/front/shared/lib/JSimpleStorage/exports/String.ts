import { JStorageSimpleVal } from '../JStorageSimple';

export class JStorageStringVal<Value = string> extends JStorageSimpleVal<Value> {
  constructor(storageName: string, id: string, defaultValue: Value) {
    super(storageName, id, defaultValue);

    const key = this.key;

    this.setter = (val: Value) => {
      localStorage[key] = `"${val}`;
    };

    this.getter = (isRetDef: boolean) => {
      const value = localStorage[key];
      if (value != null && value[0] === '"') return value.slice(1);

      return isRetDef ? defaultValue : null;
    };
  }
}
