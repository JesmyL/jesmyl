import { Eventer } from 'shared/utils';
import { JStorageSimpleVal } from '../JStorageSimple';

export class JStorageBooleanVal extends JStorageSimpleVal<boolean> {
  constructor(storageName: string, id: string, defaultValue: boolean) {
    super(storageName, id, defaultValue);

    const key = this.key;

    this.setter = (val: boolean) => {
      localStorage[key] = val;
    };

    this.getter = (isRetDef: boolean) => {
      const value = localStorage[key];
      if (value === 'true') return true;
      if (value === 'false') return false;

      return isRetDef ? defaultValue : null;
    };
  }

  switch = () => {
    const val = this.getter(true);
    this.setter(!val);
    Eventer.invokeValue(this.listeners, !val);

    return !val;
  };
}
