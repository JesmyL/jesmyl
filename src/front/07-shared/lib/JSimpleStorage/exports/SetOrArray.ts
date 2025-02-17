import { mylib } from 'front/utils';
import { AnySimpleValue, JStorageSimpleVal } from '../JStorageSimple';

export class JStorageSetOrArrayVal<
  Value extends AnySimpleValue[] | Set<AnySimpleValue>,
> extends JStorageSimpleVal<Value> {
  private value: Value | und;

  constructor(storageName: string, id: string, defaultValue: Value) {
    super(storageName, id, defaultValue);

    const key = this.key;

    this.setter = val => {
      this.value = val as never;
      localStorage[key] = JSON.stringify(Array.from(val));
    };

    this.getter = (isRetDef: boolean) => {
      if (this.value !== undefined) return this.value;
      const lsValue = localStorage[key];

      if (lsValue === undefined) return isRetDef ? defaultValue : null;

      const value = (this.value =
        defaultValue instanceof Set
          ? new Set(JSON.parse(lsValue))
          : mylib.isArr(defaultValue)
            ? JSON.parse(lsValue)
            : defaultValue);

      return value;
    };
  }
}
