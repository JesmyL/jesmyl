import { EventerListenScope, smylib } from 'shared/utils';
import { SokiInvokerData, SokiInvokerTranferDto } from './invocator.master.model';
import { InvocatorBaseEvent } from './soki.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Methods = Record<string, (args: any | void) => unknown>;

type OnEachFeedbackInvocations<M extends Methods, FeedbackRet> = {
  [K in keyof M]: ((args: Parameters<M[K]>[0], value: ReturnType<M[K]>) => FeedbackRet) | null;
};

type BeforeEaches<BeforeEachTool, Methods extends object> = Partial<{ [K in keyof Methods]: BeforeEachTool }>;

export const makeSokiInvocatorBase = <ToolParam = und, FeedbackRet = void, BeforeEachTool = void>(options: {
  eventerValue: EventerListenScope<SokiInvokerTranferDto<InvocatorBaseEvent, ToolParam>>;
  feedbackOnEach?: (props: { onEachesRet: FeedbackRet; invoke: SokiInvokerData; tool: ToolParam }) => void;
  onErrorMessage: (props: { errorMessage: string; invoke: SokiInvokerData; tool: ToolParam }) => void;
  beforeEach?: (props: {
    invoke: SokiInvokerData;
    tool: ToolParam;
    args: object | und;
    beforeEachTools?: BeforeEaches<BeforeEachTool, Methods> | und;
    defaultBeforeEachTool?: BeforeEachTool | und;
  }) => Promise<{ isStopPropagation: boolean }>;
}) => {
  const { eventerValue, beforeEach, feedbackOnEach, onErrorMessage } = options;

  type Invocator<M extends Methods> = {
    [K in keyof M]: (args: Parameters<M[K]>[0], tool: ToolParam) => Promise<ReturnType<M[K]>> | ReturnType<M[K]>;
  };

  const registeredMethods: PRecord<string, Invocator<Methods>> = {};
  const registeredOnEachFeedbacks: PRecord<string, OnEachFeedbackInvocations<Methods, FeedbackRet> | null> = {};
  const unregisteredWaiters: PRecord<string, () => void> = {};

  type Config<M extends Methods> = {
    scope: string;
    methods: Invocator<M>;
    onEachFeedback?: OnEachFeedbackInvocations<M, FeedbackRet>;
    beforeEachTools?: BeforeEaches<BeforeEachTool, M>;
    defaultBeforeEachTool?: BeforeEachTool;
  };

  type SokiInvocator = new <M extends Methods>(config: Config<M>) => Invocator<M> & { $$register: () => void };

  eventerValue.listen(async ({ invoke: { scope, method, args }, invoke, sendResponse, tool, requestId }) => {
    const invokeMethod = async () => {
      try {
        if (beforeEach !== undefined && (await beforeEach({ invoke, args, tool })).isStopPropagation) return;

        if (registeredMethods[scope] === undefined) {
          throw new Error(`the scope ${scope} is not registered - ${method}()`);
        }

        if (!smylib.isFunc(registeredMethods[scope][method]))
          throw new Error(`the ${scope} has no the ${method} method`);

        const invokedResult = await registeredMethods[scope][method](args, tool);

        if (
          feedbackOnEach !== undefined &&
          registeredOnEachFeedbacks[scope] != null &&
          registeredOnEachFeedbacks[scope][method] != null
        ) {
          const onEachesRet = registeredOnEachFeedbacks[scope][method](args, invokedResult);

          feedbackOnEach({ onEachesRet, invoke, tool });
        }

        sendResponse({ invokedResult, requestId }, tool);
      } catch (error) {
        sendResponse({ errorMessage: '' + error, requestId }, tool);
        onErrorMessage({ errorMessage: '' + error, invoke, tool });
      }
    };

    if (registeredMethods[scope] === undefined) {
      console.warn(`${scope}.${method}() will invoke with delay`);

      unregisteredWaiters[scope] = () => {
        console.warn(`${scope}.${method}() invoked with delay`);
        invokeMethod();
      };

      setTimeout(() => {
        delete unregisteredWaiters[scope];
        invokeMethod();
      }, 10_000);

      return;
    }

    invokeMethod();
  });

  return function (this: unknown, options: Config<Methods>) {
    const { scope, methods, beforeEachTools, onEachFeedback, defaultBeforeEachTool } = options;
    const self = this as Methods;

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
                invoke: { method, scope, args },
                tool,
                args,
                beforeEachTools,
                defaultBeforeEachTool,
              })
            ).isStopPropagation
          )
            return methods[method](args, tool);
        }) as never;
    });

    self.$$register = (() => {
      if (registeredMethods[scope] !== undefined) {
        console.warn(`the ${scope} is registered more then 1 times`);
      }

      registeredMethods[scope] = self as never;
      registeredOnEachFeedbacks[scope] = onEachFeedback;

      unregisteredWaiters[scope]?.();
    }) as never;

    return this;
  } as unknown as SokiInvocator;
};
