export interface EventerCallbackEvent<Value, StopValue> {
  value: Value;
  stopPropagation: (stopValue?: StopValue) => void;
  stoppedValue?: StopValue;
  preventDefault: () => void;
  preventedDefault: boolean;
  mute: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

export type EventerCallback<Value, Return = void, StopValue = Any> = (
  event: EventerCallbackEvent<Value, StopValue>,
) => Return;
export type EventerListeners<Value, Return = void, StopValue = Any> = EventerCallback<Value, Return, StopValue>[];

export type EventerValueCallback<Value, Return = void> = (value: Value) => Return;
export type EventerValueListeners<Value, Return = void> =
  | EventerValueCallback<Value, Return>[]
  | Set<EventerValueCallback<Value, Return>>;

export type EventerListenScope<Value = void, Return = void> = {
  listen: (cb: EventerValueCallback<Value, Return>, initValue?: Value) => () => void;
  listenFirst: (cb: EventerValueCallback<Value>) => () => void;
  mute: (cb: EventerValueCallback<Value>) => void;
  invoke: (value: Value) => Return;
};

export class Eventer {
  static listen = <
    Lis extends EventerListeners<Any, Return>,
    Value extends Lis extends EventerListeners<infer E, Return> ? E : never,
    Return,
    StopValue extends Lis extends EventerListeners<Value, Return, infer E> ? E : never,
  >(
    listeners: Lis,
    cb: EventerCallback<Value, Return, StopValue>,
    invokeInitValue?: Value,
  ) => {
    if (invokeInitValue !== undefined)
      cb({
        value: invokeInitValue,
        mute: () => {},
        preventDefault: () => {},
        preventedDefault: false,
        stopPropagation: () => {},
      });

    listeners.push(cb);

    return () => this.mute(listeners, cb);
  };

  static mute = <
    Lis extends EventerListeners<Any, Return>,
    Value extends Lis extends EventerListeners<infer E, Return> ? E : never,
    Return,
  >(
    listeners: Lis,
    cb: EventerCallback<Value, Return>,
  ) => {
    const index = listeners.indexOf(cb);
    listeners.splice(index, 1);
  };

  static invoke = async <
    Lis extends EventerListeners<Any, Return>,
    Value extends Lis extends EventerListeners<infer E, Return> ? E : never,
    Return,
    StopValue extends Lis extends EventerListeners<Value, Return, infer E> ? E : never,
  >(
    listeners: Lis,
    value: Value,
    onEachInvoke?: (ret: Return) => void,
  ) => {
    let i = listeners.length - 1;
    const event: EventerCallbackEvent<Value, StopValue> = {
      value,
      mute: () => listeners.splice(i, 1),
      preventDefault: () => (event.preventedDefault = true),
      preventedDefault: false,
      stopPropagation: stopValue => {
        event.stoppedValue = stopValue;
        i = -1;
      },
    };

    for (; i > -1; i--) {
      if (onEachInvoke === undefined) await listeners[i](event);
      else onEachInvoke(listeners[i](event));
    }

    return event;
  };

  static listenValue = <
    Lis extends EventerValueListeners<Any, Return>,
    Value extends Lis extends EventerValueListeners<infer E, Return> ? E : never,
    Return,
  >(
    listeners: Lis,
    cb: (value: Value) => Return,
    invokeInitValue?: Value,
  ) => {
    if (invokeInitValue !== undefined) cb(invokeInitValue);

    if (Array.isArray(listeners)) listeners.push(cb);
    else listeners.add(cb);

    return () => this.muteValue(listeners, cb);
  };

  static muteValue = <
    Lis extends EventerValueListeners<Any, Return>,
    Value extends Lis extends EventerValueListeners<infer E, Return> ? E : never,
    Return,
  >(
    listeners: Lis,
    cb: (value: Value) => Return,
  ) => {
    if (Array.isArray(listeners)) listeners.splice(listeners.indexOf(cb), 1);
    else listeners.delete(cb);
  };

  static invokeValue = <
    Lis extends EventerValueListeners<Any, Return>,
    Value extends Lis extends EventerValueListeners<infer E, Return> ? E : never,
    Return,
  >(
    listeners: Lis,
    value: Value,
    onEachInvoke?: (ret: Return) => void,
  ): Return => {
    let ret: Return = undefined!;

    if (Array.isArray(listeners))
      if (onEachInvoke === undefined) {
        for (let i = listeners.length - 1; i > -1; i--) listeners[i](value);
      } else {
        for (let i = listeners.length - 1; i > -1; i--) {
          const result = listeners[i](value);
          if (result !== undefined) ret = result;
          onEachInvoke(result);
        }
      }
    else
      listeners.forEach(cb => {
        const result = cb(value);
        if (result !== undefined) ret = result;
      });

    return ret;
  };

  static createValue<Value = void, Return = void>(): EventerListenScope<Value, Return> {
    const listeners: EventerValueListeners<Value, Return> = new Set();

    return {
      listen: (cb, initValue) => this.listenValue(listeners, cb, initValue),
      mute: cb => this.muteValue(listeners, cb),
      invoke: value => this.invokeValue(listeners, value),
      listenFirst: cb => {
        const rem = this.listenValue(listeners, value => {
          cb(value);
          rem();
        });

        return rem;
      },
    };
  }
}
