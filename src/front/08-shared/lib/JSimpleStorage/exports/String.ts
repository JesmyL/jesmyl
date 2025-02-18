import { JStorageSimpleVal } from '../JStorageSimple';

export class JStorageStringVal extends JStorageSimpleVal<string> {
  constructor(storageName: string, id: string, defaultValue: string) {
    super(storageName, id, defaultValue);

    const key = this.key;

    this.setter = (val: string) => {
      localStorage[key] = `"${val}`;
    };

    this.getter = (isRetDef: boolean) => {
      const value = localStorage[key];
      if (value != null && value[0] === '"') return value.slice(1);

      return isRetDef ? defaultValue : null;
    };
  }
}
