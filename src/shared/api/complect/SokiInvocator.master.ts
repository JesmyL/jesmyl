/* eslint-disable @typescript-eslint/no-explicit-any */
import { SokiInvokerData } from './invocator.master.model';

const registeredClasses = new Set<string>();

export const makeSokiInvocator = <ClassNamePostfix extends string, ToolParam = null>(options: {
  isNeedCheckClassName: boolean;
  classNamePostfix: ClassNamePostfix;
  send: (data: SokiInvokerData, tool: ToolParam) => Promise<unknown>;
}) => {
  const { classNamePostfix, isNeedCheckClassName, send } = options;

  type Methods = Record<string, (args: any | void, tool: ToolParam) => unknown>;

  type ResultListeners<M extends Methods> = {
    [K in keyof M]: true | ((value: ReturnType<M[K]>) => void);
  };

  type RegisteredMethods<M extends Methods> = {
    [K in keyof M]: (
      args: Parameters<M[K]>[0] extends void ? void : Parameters<M[K]>[0],
      tool: ToolParam,
    ) => Promise<ReturnType<M[K]>>;
  };

  type ClassName = `${string}${string}${typeof classNamePostfix}`;

  type Config<M extends Methods> = {
    className: ClassName;
    methods: ResultListeners<M>;
  };
  type SokiInvocator = new <M extends Methods>(config: Config<M>) => RegisteredMethods<M>;

  return function (this: unknown, { className, methods }: Config<Methods>) {
    const self = this as Methods;

    if (isNeedCheckClassName) {
      if (self.constructor.name !== className) throw new Error(`constructor name and className must equal`);
      if (registeredClasses.has(className)) throw new Error(`The invoker class ${className} was created again`);
      registeredClasses.add(className);
    }

    const name = className.slice(0, -classNamePostfix.length);

    Object.keys(methods).forEach(method => {
      self[method] = (args: any, tool: ToolParam) => {
        const { promise, reject, resolve } = Promise.withResolvers();

        send({ name, method, args }, tool).then(
          methods[method] === true
            ? resolve
            : value => {
                resolve(value);
                (methods[method] as (value: unknown) => void)(value);
              },
          reject,
        );

        return promise;
      };
    });

    return this;
  } as unknown as SokiInvocator;
};
