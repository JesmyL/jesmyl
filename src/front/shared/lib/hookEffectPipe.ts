import { itInvokeIt } from 'shared/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */
class EffectPipeMember {
  reset: () => void;
  constructor(reset: () => void) {
    this.reset = reset;
  }
}

type Elem = HTMLElement | typeof globalThis | Window | nil;
type EventListenerOptions = Parameters<(typeof window)['addEventListener']>[2];

export const addEventListenerPipe = <
  EventName extends keyof HTMLElementEventMap,
  Event extends HTMLElementEventMap[EventName],
>(
  elem: Elem,
  eventName: EventName,
  callback: (event: Event) => void,
  options?: EventListenerOptions,
) => {
  if (elem == null) return new EffectPipeMember(() => {});
  elem.addEventListener(eventName, callback as never, options);

  return new EffectPipeMember(() => elem.removeEventListener(eventName, callback as never, options));
};

export const addEventListenerWithDelayPipe = <
  EventName extends keyof HTMLElementEventMap,
  Event extends HTMLElementEventMap[EventName],
>(
  delayTime: number,
  elem: () => Elem,
  eventName: EventName,
  callback: (event: Event) => void,
  options?: EventListenerOptions,
) => {
  let realElem = elem();

  const timeout = setTimeout(() => {
    realElem = elem();
    realElem?.addEventListener(eventName, callback as never, options);
  }, delayTime);

  return new EffectPipeMember(() => {
    realElem?.removeEventListener(eventName, callback as never, options);
    clearTimeout(timeout);
  });
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
  options?: EventListenerOptions,
) => {
  let timeout: TimeOut;

  const debounceCallback = (event: Event) => {
    clearTimeout(timeout);
    timeout = setTimeout(callback, timerMs, event);
  };

  elem.addEventListener(eventName, debounceCallback as never, options);

  return new EffectPipeMember(() => elem.removeEventListener(eventName, debounceCallback as never, options));
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
    effect:
      (...cb: (() => void)[]) =>
      () => {
        resets.forEach(member => member?.reset());
        cb.forEach(itInvokeIt);
      },
  };

  return ret;
};
