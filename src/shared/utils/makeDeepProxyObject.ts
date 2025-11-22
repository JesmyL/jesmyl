export const makeDeepProxyObject = <T extends object>(
  target: T,
  handler: ProxyHandler<T> & {
    afterGet?: <I extends object>(target: I, path: (string | number)[]) => void;
    onGetEach?: <I extends object>(target: I, path: (string | number)[]) => void;
    onSet?: <I extends object>(
      target: I,
      path: (string | number)[],
      setKey: number | string,
      value: unknown,
      prevValue: unknown,
    ) => boolean;
  },
) => {
  const { afterGet, onSet } = handler;
  let timeout: TimeOut;

  const proxer = <I extends object>(target: I, topKeys: (number | string)[], level: number) =>
    new Proxy(target, {
      get: (self, key, reciever) => {
        const keys = topKeys.concat(Array.isArray(self) ? +(key as never) : (key as never));
        handler.onGetEach?.(self, keys);

        const value =
          level === 0 && handler.get != null ? handler.get(self as never, key, reciever) : self[key as never];

        if (afterGet) {
          clearTimeout(timeout);
          timeout = setTimeout(() => afterGet(self, keys));
        }

        return typeof value === 'object' && value !== null ? proxer(value, keys, level + 1) : value;
      },
      set: onSet
        ? (self, key, value) => {
            if (!onSet(self, topKeys, key as never, value, self[key as never])) return true;
            self[key as never] = value as never;
            return true;
          }
        : undefined,
    });

  return proxer(target, [], 0);
};
