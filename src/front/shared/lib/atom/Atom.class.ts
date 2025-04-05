type Sunscriber<Value> = (value: Value) => void;

export class Atom<Value> {
  private value: Value;
  private readonly subscribers = new Set<Sunscriber<Value>>();
  private readonly save: (val: Value) => void = () => {};
  private readonly invokeSubscriber = (sub: Sunscriber<Value>) => sub(this.value);

  constructor(defaultValue: Value, storeKey: `${string}${string}:${string}${string}` | und) {
    if (storeKey !== undefined) {
      const key = `atom/${storeKey}`;

      this.value = key in localStorage ? JSON.parse(localStorage[key]) : defaultValue;
      this.save = value => {
        if (value === defaultValue) {
          this.reset();
          return;
        }
        localStorage[key] = JSON.stringify(value);
      };

      this.reset = () => {
        this.value = defaultValue;
        delete localStorage[key];
      };
    } else {
      this.value = defaultValue;
      this.reset = () => (this.value = defaultValue);
    }
  }

  readonly get = () => this.value;
  readonly reset: () => void;
  readonly toggle = (is?: boolean) => this.set((is ?? ((is: boolean) => !is)) as never);
  readonly inkrement = (ink: number) => this.set((+this.value + ink) as never);

  readonly subscribe = (sub: Sunscriber<Value>) => {
    this.subscribers.add(sub);
    return () => this.subscribers.delete(sub);
  };

  readonly set = (value: Value | ((prev: Value) => Value), isPreventSave?: boolean) => {
    const val = typeof value === 'function' ? (value as (value: Value) => Value)(this.value) : value;
    if (val === this.value || val === undefined || (typeof val === 'number' && isNaN(val))) return;

    this.value = val;
    this.subscribers.forEach(this.invokeSubscriber, this);

    if (isPreventSave !== true) this.save(val);
  };
}
