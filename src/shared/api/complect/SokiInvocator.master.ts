import { isDevelopmentMode } from './environments';
import { SokiInvokerData } from './soki';

export const makeSokiInvocator = <ClassNamePostfix extends string, ToolParam = null>(
  classNamePostfix: ClassNamePostfix,
  send: (data: SokiInvokerData, tool: ToolParam) => Promise<unknown>,
) => {
  type Methods = Record<string, (...args: any[]) => unknown>;

  type ResultListeners<M extends Methods> = {
    [K in keyof M]: true | ((value: ReturnType<M[K]>) => void);
  };

  type RegisteredMethods<M extends Methods> = {
    [K in keyof M]: (tool: ToolParam, ...params: Parameters<M[K]>) => Promise<ReturnType<M[K]>>;
  };

  type ClassName = `${string}${string}${typeof classNamePostfix}`;

  type SokiInvocator = new <M extends Methods>(
    className: ClassName,
    listeners: ResultListeners<M>,
  ) => RegisteredMethods<M>;

  return function (this: unknown, className: ClassName, listeners: Methods) {
    const self = this as any;

    if (isDevelopmentMode && self.constructor.name !== className)
      throw new Error(`constructor name and className must equal`);

    const name = className.slice(0, -classNamePostfix.length);

    Object.keys(listeners).forEach(method => {
      self[method] = (tool: ToolParam, ...params: unknown[]) => {
        const { promise, reject, resolve } = Promise.withResolvers();

        send({ name, method, params }, tool).then(
          listeners[method] === (true as never)
            ? resolve
            : value => {
                resolve(value);
                listeners[method](value);
              },
          reject,
        );

        return promise;
      };
    });

    return this;
  } as unknown as SokiInvocator;
};
