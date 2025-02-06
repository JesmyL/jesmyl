import { mylib } from 'front/utils';
import { emptyFunc } from 'shared/utils';

export class Atom<Value, Sunscriber extends (value: Value) => void = (value: Value) => void> {
  private value: Value;
  private subs = new Set<Sunscriber>();
  private save: (val: Value) => void = emptyFunc;
  private setInTopStorage: (value: Value) => void = () => {};

  onValueChange?: (value: Value) => void;
  onValueSetForServerUserStore?: (value: Value) => void;
  rem: () => void;
  getStorageValue: () => Promise<Value>;

  constructor(value: Value) {
    this.value = value;

    this.rem =
      value == null
        ? () => {
            this.value = null!;
            this.save(null!);
          }
        : emptyFunc;

    this.getStorageValue = async () => this.value;
  }

  get = () => this.value;

  invokeSubs = (sub: Sunscriber) => sub(this.value);

  justSet = (value: Value) => {
    this.value = value;
    this.subs.forEach(this.invokeSubs, this);
    this.setInTopStorage(value);
  };

  set = (
    value: Value | ((prev: Value) => Value),
    isPreventSave?: boolean,
    isRejectValueSetForServerUserStoreCallbackInvoke?: boolean,
  ) => {
    const val = mylib.isFunc(value) ? value(this.value) : value;
    if (val === this.value || val === undefined || (typeof val === 'number' && isNaN(val))) return;

    this.onValueChange?.(val);
    this.justSet(val);

    if (!isRejectValueSetForServerUserStoreCallbackInvoke) this.onValueSetForServerUserStore?.(val);

    if (isPreventSave === true) return;

    this.save(val);
  };

  toggle = (is?: boolean) => this.set((is ?? ((is: boolean) => !is)) as never);
  inkrement = (ink: number) => this.set((+this.value + ink) as never);

  subscribe = (sub: Sunscriber) => {
    this.subs.add(sub);
    return () => {
      this.subs.delete(sub);
    };
  };
}
