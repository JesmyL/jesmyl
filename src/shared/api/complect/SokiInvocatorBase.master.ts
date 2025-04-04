import { EventerListenScope, smylib } from 'shared/utils';
import { SokiInvokerTranferDto } from './invocator.master.model';
import { InvocatorBaseEvent } from './soki.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Methods = Record<string, (args: any | void) => unknown>;

type OnEachFeedbackInvocations<M extends Methods, FeedbackRet> = {
  [K in keyof M]: ((args: Parameters<M[K]>[0], value: ReturnType<M[K]>) => FeedbackRet) | null;
};

type BeforeEaches<BeforeEachTool, Methods extends object> = Partial<{ [K in keyof Methods]: BeforeEachTool }>;
type InvokeData<ToolParam> = { tool: ToolParam; name: string; method: string };

export const makeSokiInvocatorBase = <
  Event extends InvocatorBaseEvent,
  ClassNamePostfix extends string,
  ToolParam = und,
  FeedbackRet = void,
  BeforeEachTool = void,
>(options: {
  isNeedCheckClassName: boolean;
  classNamePostfix: ClassNamePostfix;
  eventerValue: EventerListenScope<SokiInvokerTranferDto<Event, ToolParam>>;
  feedbackOnEach?: (onEachesRet: FeedbackRet, invoke: InvokeData<ToolParam>) => void;
  onErrorMessage: (props: { errorMessage: string; invokeData: InvokeData<ToolParam> }) => void;
  beforeEach?: (props: {
    invoke: InvokeData<ToolParam>;
    beforeTools: BeforeEaches<BeforeEachTool, Methods> | und;
    defaultTool: BeforeEachTool | und;
    args: object | und;
  }) => Promise<{ isStopPropagation: boolean }>;
}) => {
  const { classNamePostfix, eventerValue, isNeedCheckClassName, beforeEach, feedbackOnEach, onErrorMessage } = options;

  type Invocator<M extends Methods> = {
    [K in keyof M]: (args: Parameters<M[K]>[0], tool: ToolParam) => Promise<ReturnType<M[K]>> | ReturnType<M[K]>;
  };

  const registeredMethods: PRecord<string, Invocator<Methods>> = {};
  const registeredOnEachFeedbacks: PRecord<string, OnEachFeedbackInvocations<Methods, FeedbackRet> | null> = {};
  const unregisteredWaiters: PRecord<string, () => void> = {};

  eventerValue.listen(async ({ invoke: { name, method, args }, sendResponse, tool, requestId }) => {
    const invokeMethod = async () => {
      const invokeData = { tool, method, name };

      try {
        if (registeredMethods[name] === undefined) {
          throw new Error(`the name ${name} is not registered - ${method}()`);
        }

        if (!smylib.isFunc(registeredMethods[name][method])) throw new Error(`the ${name} has no the ${method} method`);

        const invokedResult = await registeredMethods[name][method](args, tool);

        if (
          feedbackOnEach !== undefined &&
          registeredOnEachFeedbacks[name] != null &&
          registeredOnEachFeedbacks[name][method] != null
        ) {
          const retValue = registeredOnEachFeedbacks[name][method](args, invokedResult);

          feedbackOnEach(retValue, invokeData);
        }

        sendResponse({ invokedResult, requestId } as never, tool);
      } catch (error) {
        sendResponse({ errorMessage: '' + error, requestId } as never, tool);
        onErrorMessage({ errorMessage: '' + error, invokeData });
      }
    };

    if (registeredMethods[name] === undefined) {
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

  type Config<M extends Methods> = {
    className: ClassName;
    methods: Invocator<M>;
    onEachFeedback?: OnEachFeedbackInvocations<M, FeedbackRet>;
    beforeEachTools?: BeforeEaches<BeforeEachTool, M>;
    beforeEachDefaultTool?: BeforeEachTool;
  };

  type SokiInvocator = new <M extends Methods>(config: Config<M>) => Invocator<M> & { $$register: () => void };

  return function (this: unknown, options: Config<Methods>) {
    const { className, methods, beforeEachTools, onEachFeedback, beforeEachDefaultTool } = options;
    const self = this as Methods;

    if (isNeedCheckClassName) {
      if (self.constructor.name !== className)
        throw new Error(`${self.constructor.name} error. constructor name and className must equal`);
    }
    const name = className.slice(0, -classNamePostfix.length);

    Object.keys(methods).forEach(method => {
      if (beforeEach === undefined) self[method] = methods[method] as never;
      else
        self[method] = (async (
          args: Parameters<(typeof methods)[typeof method]>[0],
          tool: Parameters<(typeof methods)[typeof method]>[1],
        ) => {
          if (
            !(
              await beforeEach({
                invoke: { method, name, tool },
                beforeTools: beforeEachTools,
                args,
                defaultTool: beforeEachDefaultTool,
              })
            ).isStopPropagation
          )
            return methods[method](args, tool);
        }) as never;
    });

    self.$$register = (() => {
      if (registeredMethods[name] !== undefined) {
        console.warn(`the ${className} is registered more then 1 times`);
      }

      registeredMethods[name] = self as never;
      registeredOnEachFeedbacks[name] = onEachFeedback;

      unregisteredWaiters[name]?.();
    }) as never;

    return this;
  } as unknown as SokiInvocator;
};
