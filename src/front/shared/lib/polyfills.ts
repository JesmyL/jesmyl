import { setSharedPolyfills } from 'shared/utils';

export const setPolyfills = () => {
  setSharedPolyfills();

  const remListens = (param: unknown[]) => {
    const [element, ...otherProps] = param;
    (element as { removeEventListener(...args: unknown[]): void }).removeEventListener(...otherProps);
  };

  const invokeEach = (cb: () => void) => cb();

  (globalThis as { hookEffectLine: unknown }).hookEffectLine = () => {
    const timeoutsSet = new Set<TimeOut>();
    const eventListeners = new Set<Parameters<EffectListener>>();
    const debounceTimers: TimeOut[] = [];
    let debounceTimersRegistered = 0;

    const setter = {
      addEventListener: (...args: Parameters<EffectListener>) => {
        eventListeners.add(args);
        const [element, ...otherArgs] = args;
        element.addEventListener(...otherArgs);

        return setter;
      },
      addEventDebouncedListener: (...args: Parameters<DebouncedEffectListener>) => {
        const timeri = debounceTimersRegistered++;
        const [timerMs, element, eventName, callback] = args;
        const debounceCallback = (event: Parameters<typeof callback>[0]) => {
          clearTimeout(debounceTimers[timeri]);
          debounceTimers[timeri] = setTimeout(callback, timerMs, event);
        };

        eventListeners.add([element, eventName, debounceCallback]);

        element.addEventListener(eventName, debounceCallback);

        return setter;
      },

      setTimeout: (cb: () => void, time?: number, ...args: unknown[]) => {
        timeoutsSet.add(setTimeout(cb, time, ...args));

        return setter;
      },

      clearTimeout: (timeout: TimeOut) => {
        timeoutsSet.add(timeout);

        return setter;
      },

      effect: (...onUnmounts: (() => void)[]) => {
        return () => {
          onUnmounts.forEach(invokeEach);
          timeoutsSet.forEach(clearTimeout);
          debounceTimers.forEach(clearTimeout);
          eventListeners.forEach(remListens);

          eventListeners.clear();
          timeoutsSet.clear();
        };
      },
    };

    return setter;
  };
};

type EffectListener = <EventName extends keyof HTMLElementEventMap, Event extends HTMLElementEventMap[EventName]>(
  elem: HTMLElement | typeof globalThis | Window,
  eventName: EventName,
  callback: (event: Event) => void,
  turn?: boolean,
) => HookEffectLineReturn;

type DebouncedEffectListener = <
  EventName extends keyof HTMLElementEventMap,
  Event extends HTMLElementEventMap[EventName],
>(
  timerMs: number,
  elem: HTMLElement | typeof globalThis | Window,
  eventName: EventName,
  callback: (event: Event) => void,
  turn?: boolean,
) => HookEffectLineReturn;

type HookEffectLineReturn = {
  addEventListener: EffectListener;
  addEventDebouncedListener: DebouncedEffectListener;
  setTimeout: <Args extends unknown[]>(
    cb: (...args: Args) => void,
    time?: number,
    ...args: Args
  ) => HookEffectLineReturn;
  clearTimeout: (timeout: TimeOut) => HookEffectLineReturn;
  effect: (...onUnmounts: (() => void)[]) => () => void;
};

const prev: Record<string, unknown> = {};
(globalThis as { inspectComponentProps: unknown }).inspectComponentProps = (
  curr: Record<string, unknown>,
  print?: boolean,
) => {
  for (const c in curr) {
    if (curr[c] === prev[c]) {
      console.warn('>>>>', curr[c] === prev[c] ? 'old' : 'NEW', c, ...(print ? [prev[c], curr[c]] : []));
      console.error('>>>>', curr[c] === prev[c] ? 'old' : 'NEW', c, ...(print ? [prev[c], curr[c]] : []));
    }

    prev[c] = curr[c];
  }
};

declare global {
  function setTimeoutEffect<Args extends unknown[]>(
    handler: (...args: Args) => void,
    timeout?: number,
    ...args: Args
  ): () => void;
  function inspectComponentProps(curr: Record<string, unknown>, print?: boolean): void;

  function hookEffectLine(): HookEffectLineReturn;

  interface Array<T> {
    toSorted: (compareFn?: (a: T, b: T) => number) => T[];
    merge: (array: T[] | und) => T[];
  }

  interface String {
    reverse: () => string;
  }

  interface OnMessageEvent extends OmitOwn<Event, 'currentTarget' | 'target' | 'srcElement'> {
    data: string;
    origin: '';
    lastEventId: '';
    source: null;
    ports: [];
    userActivation: null;
    type: 'message';
    currentTarget: PresentationConnection;
    srcElement: PresentationConnection;
    target: PresentationConnection;
  }

  interface PresentationConnection {
    binaryType: 'arraybuffer';
    id: string;
    onclose: null | ((event: Event) => void);
    onconnect: null | ((event: Event) => void);
    onmessage: null | ((event: OnMessageEvent) => void);
    onterminate: null | ((event: Event) => void);
    state: string | 'connected';
    url: string;
    send(text: string): void;
    terminate(): void;
    close(): void;
  }

  class PresentationRequest extends EventTarget {
    constructor(localUrl: string);

    getAvailability(): void;
    onconnectionavailable: null | ((event: unknown) => void);
    reconnect(): void;
    start(): Promise<PresentationConnection>;
  }

  interface PresentationConnectionList extends EventTarget {
    connections: PresentationConnection[];
    connectionavailable(event: unknown): void;
  }

  class PresentationReceiver {
    connectionList: Promise<PresentationConnectionList>;
  }

  interface Presentation {
    defaultRequest: null;
    receiver: PresentationReceiver;
  }

  interface Navigator {
    presentation: Presentation;
  }
}

export {};
