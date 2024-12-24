import { mylib } from 'front/utils';
import { useEffect, useState } from 'react';
import { ServerStoreContent } from 'shared/api';
import { Eventer, EventerValueListeners, itIt, retUnd } from 'shared/utils';
import { IMoleculeFractionalStore } from '.';

export class FractionalServerStore<Key extends string | number, Value extends NonUndefined<any>>
  implements IMoleculeFractionalStore<Value>
{
  updateServerStoreContent: (content: ServerStoreContent<Value>) => void = retUnd;
  self = { [this.contentValuePrefix]: this };
  listeners: EventerValueListeners<{ key: Key; value: Value }> = [];

  private values = {} as Record<Key, Value>;
  private setters: Partial<Record<Key, (value: Value | ((value: Value) => Value)) => void>> = {};
  private setTimeouts = {} as Record<Key, TimeOut>;

  constructor(
    public contentValuePrefix: `${string}/${string}::`,
    public lastWriteTsPrefix: string,
    private defaultValue: Value,
    private valueParser: (strValue: string | und) => Value = itIt as never,
    private valueStringifier: (value: Value) => string = itIt as never,
  ) {}

  private lastWriteTs(key: Key, setTs?: number) {
    if (setTs !== undefined) localStorage[`${this.lastWriteTsPrefix}${key}`] = setTs;

    return +localStorage[`${this.lastWriteTsPrefix}${key}`] || 0;
  }

  private knownKeys: Set<Key> = (() => {
    const set = new Set<Key>();

    Object.keys(localStorage).forEach(lsKey => {
      if (!lsKey.startsWith(this.contentValuePrefix)) return;
      const key = lsKey.slice(this.contentValuePrefix.length);
      set.add((isNaN(+key) ? key : +key) as never);
    });

    return set;
  })();

  insertContents = (ts: number, contents: ServerStoreContent[]) => {
    this.knownKeys.forEach(key => {
      const localTs = this.lastWriteTs(key);

      if (!localTs || localTs <= ts) return;

      contents.push({
        key: `${this.contentValuePrefix}${key}` as never,
        ts: localTs,
        value: this.get(key),
      });
    });
  };

  onFreshServerStoreContentChange = (content: ServerStoreContent<Value>) => {
    if (!content.key.startsWith(this.contentValuePrefix)) return;
    const [, comwStr] = content.key.split('::');
    const key = (isNaN(+comwStr) ? comwStr : +comwStr) as Key;

    if (this.lastWriteTs(key) >= content.ts) return;

    this.set(key, content.value, content.ts, true);
  };

  get = (key: Key): Value => {
    if (this.values[key] === undefined)
      this.values[key] = this.valueParser(localStorage[`${this.contentValuePrefix}${key}`]) ?? this.defaultValue;

    return this.values[key];
  };

  set = (key: Key, valueScalar: Value | ((value: Value) => Value), forceTs?: number, isRejectServerSave?: boolean) => {
    const lsKey = `${this.contentValuePrefix}${key}` as const;
    const value = mylib.isFunc(valueScalar) ? valueScalar(this.get(key)) : valueScalar;
    const stringifiedValue = this.valueStringifier(value);

    this.values[key] = value;

    if (localStorage[lsKey] === stringifiedValue || (!localStorage[lsKey] && !stringifiedValue)) return;

    clearTimeout(this.setTimeouts[key]);
    this.setTimeouts[key] = setTimeout(() => {
      if (value == null) localStorage.removeItem(lsKey);
      else localStorage[lsKey] = stringifiedValue;

      this.knownKeys.add(key);

      const ts = this.lastWriteTs(key, forceTs ?? Date.now());

      Eventer.invokeValue(this.listeners, { value, key });

      if (isRejectServerSave) return;
      this.updateServerStoreContent({ ts, key: lsKey, value });
    });
  };

  useValue = (key: Key) => {
    const [value, setValue] = useState(this.get(key));

    useEffect(() => {
      setValue(this.get(key));

      return Eventer.listenValue(this.listeners, event => {
        if (event.key === key) setValue(event.value);
      });
    }, [key]);

    return [value, (this.setters[key] ??= valueScalar => this.set(key, valueScalar))] as const;
  };
}
