export class Atom<Value, Sunscriber extends (value: Value) => void = (value: Value) => void> {
  private value: Value;
  private subs = new Set<Sunscriber>();
  private save: (val: Value) => void = () => {};

  onValueChange?: (value: Value) => void;
  readonly rem: () => void = () => {};

  constructor(defaultValue: Value, storeKey: `${string}:${string}` | und) {
    if (storeKey !== undefined) {
      const key = `atom/${storeKey}`;

      this.value = key in localStorage ? JSON.parse(localStorage[key]) : defaultValue;
      this.save = value => {
        if (value === defaultValue) {
          this.rem();
          return;
        }
        localStorage[key] = JSON.stringify(value);
      };

      this.rem = () => {
        this.value = defaultValue;
        delete localStorage[key];
      };
    } else {
      this.value = defaultValue;
      this.rem = () => (this.value = defaultValue);
    }
  }

  readonly get = () => this.value;

  readonly invokeSubscriber = (sub: Sunscriber) => sub(this.value);

  readonly set = (value: Value | ((prev: Value) => Value), isPreventSave?: boolean) => {
    const val = typeof value === 'function' ? (value as (value: Value) => Value)(this.value) : value;
    if (val === this.value || val === undefined || (typeof val === 'number' && isNaN(val))) return;

    this.onValueChange?.(val);

    this.value = val;
    this.subs.forEach(this.invokeSubscriber, this);

    if (isPreventSave === true) return;

    this.save(val);
  };

  readonly toggle = (is?: boolean) => this.set((is ?? ((is: boolean) => !is)) as never);
  readonly inkrement = (ink: number) => this.set((+this.value + ink) as never);

  readonly subscribe = (sub: Sunscriber) => {
    this.subs.add(sub);
    return () => {
      this.subs.delete(sub);
    };
  };
}
