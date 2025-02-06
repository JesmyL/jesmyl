import { Eventer, EventerValueCallback, EventerValueListeners } from 'shared/utils';

const keysSet = new Set();

type simpleValue = boolean | number | string | nil;

type AnyValue = simpleValue | simpleValue[] | Record<string | number, simpleValue>;
export type AnySimpleValue = AnyValue | AnyValue[] | Record<string | number, AnyValue>;

export class JStorageSimpleVal<Value> {
  protected key: string;
  protected setter: (val: Value) => void;
  protected getter: (isRetDef: boolean) => Value | null;
  protected listeners: EventerValueListeners<Value> = [];

  constructor(
    storageKey: string,
    id: string,
    protected defaultValue: Value,
  ) {
    this.key = `simpleValue:${storageKey}:${id}`;

    if (keysSet.has(this.key)) throw Error(`Обнаружены одинаковые ключи для JStorageSimpleVal ${this.key}`);
    keysSet.add(this.key);

    this.setter = () => {};
    this.getter = () => defaultValue;
  }

  listen(cb: EventerValueCallback<Value>) {
    cb(this.get());
    return Eventer.listenValue(this.listeners, cb);
  }

  mute(cb: EventerValueCallback<Value>) {
    Eventer.muteValue(this.listeners, cb);
  }

  get = (): Value => {
    if (!(this.key in localStorage)) return this.defaultValue;
    return this.getter(true)!;
  };

  getOrNull = () => {
    if (!(this.key in localStorage)) return null;
    return this.getter(false);
  };

  set = (value: Value) => {
    this.setter(value);
    Eventer.invokeValue(this.listeners, value);
  };

  has = () => {
    return this.key in localStorage;
  };

  remove = () => {
    localStorage.removeItem(this.key);
  };
}
