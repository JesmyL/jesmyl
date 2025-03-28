import { EventerListenScope, smylib } from 'shared/utils';
import { SokiInvokerTranferDto } from './invocator.master.model';
import { InvocatorBaseEvent } from './soki.model';

export const makeSokiInvocatorBase = <
  Event extends InvocatorBaseEvent,
  ClassNamePostfix extends string,
  ToolParam = und,
  OnEachesRet = void,
>(
  isNeedCheckClassName: boolean,
  classNamePostfix: ClassNamePostfix,
  eventerValue: EventerListenScope<SokiInvokerTranferDto<Event, ToolParam>>,
  onEachInvoke?: (onEachesRet: OnEachesRet, data: { tool: ToolParam; name: string; method: string }) => void,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Methods = Record<string, (...args: any[]) => unknown>;

  type Invocator<M extends Methods> = {
    [K in keyof M]: (tool: ToolParam) => (...args: Parameters<M[K]>) => Promise<ReturnType<M[K]>> | ReturnType<M[K]>;
  };

  const registeredInvocators: PRecord<string, Invocator<Methods>> = {};
  const registeredOnEachInvocations: PRecord<string, OnEachOnvocations<Methods> | null> = {};
  const unregisteredWaiters: PRecord<string, () => void> = {};

  eventerValue.listen(async ({ invoke: { name, method, params }, sendResponse, tool, requestId }) => {
    const invokeMethod = async () => {
      try {
        if (registeredInvocators[name] === undefined) {
          throw new Error(`the name ${name} is not registered - ${method}()`);
        }

        if (!smylib.isFunc(registeredInvocators[name][method]))
          throw new Error(`the ${name} has no the ${method} method`);
        const invokedResult = await registeredInvocators[name][method](tool)(...params);

        if (
          onEachInvoke !== undefined &&
          registeredOnEachInvocations[name] != null &&
          registeredOnEachInvocations[name][method] != null
        ) {
          const retValue = registeredOnEachInvocations[name][method](invokedResult, ...params);
          onEachInvoke(retValue, { tool, method, name });
        }

        sendResponse({ invokedResult, requestId } as never, tool);
      } catch (error) {
        console.error(error);
        sendResponse({ errorMessage: '' + error, requestId } as never, tool);
      }
    };

    if (registeredInvocators[name] === undefined) {
      console.warn(`${name}.${method}() will invoke with delay`);

      unregisteredWaiters[name] = () => {
        console.warn(`${name}.${method}() invoked with delay`);
        invokeMethod();
      };

      setTimeout(() => {
        delete unregisteredWaiters[name];
        invokeMethod();
      }, 10_000);

      return;
    }

    invokeMethod();
  });

  type ClassName = `${string}${string}${typeof classNamePostfix}`;

  type OnEachOnvocations<M extends Methods> = {
    [K in keyof M]: ((value: ReturnType<M[K]>, ...args: Parameters<M[K]>) => OnEachesRet) | null;
  };

  type SokiInvocator = new <M extends Methods>(
    className: ClassName,
    methods: Invocator<M>,
    onEachInvocations?: OnEachOnvocations<M>,
  ) => Invocator<M> & { $$register: () => void };

  return function (
    this: unknown,
    className: ClassName,
    methods: Invocator<Methods>,
    onEachInvocations: OnEachOnvocations<Methods>,
  ) {
    const self = this as Methods;

    if (isNeedCheckClassName) {
      if (self.constructor.name !== className)
        throw new Error(`${self.constructor.name} error. constructor name and className must equal`);
    }

    Object.keys(methods).forEach(methodName => {
      self[methodName] = ((tool: ToolParam) =>
        (...params: unknown[]) =>
          methods[methodName](tool)(...params)) as never;
    });

    self.$$register = (() => {
      const name = className.slice(0, -classNamePostfix.length);

      if (registeredInvocators[name] !== undefined) {
        console.warn(`the ${className} is registered more then 1 times`);
      }

      registeredInvocators[name] = self as never;
      registeredOnEachInvocations[name] = onEachInvocations;

      unregisteredWaiters[name]?.();
    }) as never;

    return this;
  } as unknown as SokiInvocator;
};
