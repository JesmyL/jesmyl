import { EventerListenScope, smylib } from 'shared/utils';
import { isDevelopmentMode } from './environments';
import { SokiInvokerTranferDto } from './soki';

export const makeSokiInvocatorBase = <ClassNamePostfix extends string, ToolParam = und, OnEachesRet = void>(
  classNamePostfix: ClassNamePostfix,
  eventerValue: EventerListenScope<SokiInvokerTranferDto<ToolParam>>,
  onEachInvoke?: (onEachesRet: OnEachesRet, data: { tool: ToolParam; name: string; method: string }) => void,
) => {
  type Methods = Record<string, (...args: any[]) => any>;

  type Invocator<M extends Methods> = {
    [K in keyof M]: (tool: ToolParam) => (...args: Parameters<M[K]>) => Promise<ReturnType<M[K]>>;
  };

  const registeredInvocators: Record<string, Invocator<any>> = {};
  const registeredOnEachInvocations: Record<string, OnEachOnvocations<any>> = {};

  eventerValue.listen(async ({ invoke: { name, method, params }, sendResponse, tool, requestId }) => {
    try {
      if (registeredInvocators[name] == null) throw new Error(`the name ${name} not registered`);
      if (!smylib.isFunc(registeredInvocators[name][method]))
        throw new Error(`the ${name} has no the ${method} method`);
      const invokedResult = await registeredInvocators[name][method](tool)(...params);

      if (
        onEachInvoke !== undefined &&
        registeredOnEachInvocations[name] !== undefined &&
        registeredOnEachInvocations[name][method] !== undefined
      ) {
        const retValue = registeredOnEachInvocations[name][method](invokedResult, ...params);
        onEachInvoke(retValue, { tool, method, name });
      }

      sendResponse({ invokedResult, requestId }, tool);
    } catch (error) {
      sendResponse({ errorMessage: '' + error, requestId }, tool);
    }
  });

  type ClassName = `${string}${string}${typeof classNamePostfix}`;

  type OnEachOnvocations<M extends Methods> = {
    [K in keyof M]: (value: ReturnType<M[K]>, ...args: Parameters<M[K]>) => OnEachesRet;
  };

  type SokiInvocator = new <M extends Methods>(
    className: ClassName,
    methods: Invocator<M>,
    onEachInvocations?: OnEachOnvocations<M>,
  ) => Invocator<M> & { $$register: () => void };

  return function (
    this: unknown,
    className: ClassName,
    methods: Invocator<any>,
    onEachInvocations: OnEachOnvocations<any>,
  ) {
    const self = this as any;

    if (isDevelopmentMode) {
      if (self.constructor.name !== className)
        throw new Error(`${self.constructor.name} error. constructor name and className must equal`);
    }

    Object.keys(methods).forEach(methodName => {
      self[methodName] =
        (tool: ToolParam) =>
        (...params: unknown[]) =>
          methods[methodName](tool)(...params);
    });

    self.$$register = () => {
      const name = className.slice(0, -classNamePostfix.length);

      if (registeredInvocators[name] !== undefined) throw new Error(`the ${className} is registered more then 1 times`);

      registeredInvocators[name] = self;
      registeredOnEachInvocations[name] = onEachInvocations;
    };

    return this;
  } as unknown as SokiInvocator;
};
