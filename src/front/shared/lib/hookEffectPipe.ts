/* eslint-disable @typescript-eslint/no-explicit-any */
class EffectPipeMember {
  reset: () => void;
  constructor(reset: () => void) {
    this.reset = reset;
  }
}

export const addEventListenerPipe = <
  EventName extends keyof HTMLElementEventMap,
  Event extends HTMLElementEventMap[EventName],
>(
  elem: HTMLElement | typeof globalThis | Window | null,
  eventName: EventName,
  callback: (event: Event) => void,
  turn?: boolean,
) => {
  if (elem == null) return new EffectPipeMember(() => {});
  elem.addEventListener(eventName, callback as never, turn);

  return new EffectPipeMember(() => elem.removeEventListener(eventName, callback as never, turn));
};

export const addAbortControlledPipe = (callback: (aborter: AbortController) => void) => {
  const aborter = new AbortController();
  callback(aborter);
  return new EffectPipeMember(() => aborter.abort());
};

export const addDebouncedEventListenerPipe = <
  EventName extends keyof HTMLElementEventMap,
  Event extends HTMLElementEventMap[EventName],
>(
  timerMs: number,
  elem: HTMLElement | typeof globalThis | Window,
  eventName: EventName,
  callback: (event: Event) => void,
  turn?: boolean,
) => {
  let timeout: TimeOut;

  const debounceCallback = (event: Event) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, timerMs, event);
  };

  elem.addEventListener(eventName, debounceCallback as never, turn);

  return new EffectPipeMember(() => elem.removeEventListener(eventName, debounceCallback as never, turn));
};

export const setTimeoutPipe = <Args extends any[]>(cb: (...args: Args) => void, time?: number, ...args: Args) => {
  const timeout = setTimeout(cb, time, ...args);

  return new EffectPipeMember(() => clearTimeout(timeout));
};

export const setIntervalPipe = <Args extends any[]>(cb: (...args: Args) => void, time: number, ...args: Args) => {
  const interval = setInterval(cb, time, ...args);

  return new EffectPipeMember(() => clearInterval(interval));
};

export const clearTimeoutPipe = (timeout: TimeOut) => new EffectPipeMember(() => clearTimeout(timeout));

export const hookEffectPipe = () => {
  let resets: (EffectPipeMember | nil)[] = [];

  const ret = {
    pipe: (...args: (EffectPipeMember | nil)[]) => {
      resets = resets.concat(args);
      return ret;
    },
    effect: (cb?: () => void) => () => {
      resets.forEach(member => member?.reset());
      cb?.();
    },
  };

  return ret;
};
