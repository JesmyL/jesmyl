import { EventerListenScope, smylib } from 'shared/utils';
import { SokiInvokerTranferDto } from './invocator.master.model';
import { InvocatorBaseEvent } from './soki.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Methods = Record<string, (args: any | void) => unknown>;

type OnEachFeedbackInvocations<M extends Methods, FeedbackRet> = {
  [K in keyof M]: ((args: Parameters<M[K]>[0], value: ReturnType<M[K]>) => FeedbackRet) | null;
};

type BeforeEaches<BeforeEachTool, Methods extends string | number | symbol> = Partial<Record<Methods, BeforeEachTool>>;

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
  feedbackOnEach?: (onEachesRet: FeedbackRet, data: { tool: ToolParam; name: string; method: string }) => void;
  beforeEach?: (
    data: { tool: ToolParam; name: string; method: string },
    tool: BeforeEaches<BeforeEachTool, string> | und,
    args: object | und,
  ) => Promise<{ isStopPropagation: boolean }>;
}) => {
  const { classNamePostfix, eventerValue, isNeedCheckClassName, beforeEach, feedbackOnEach } = options;

  type Invocator<M extends Methods> = {
    [K in keyof M]: (args: Parameters<M[K]>[0], tool: ToolParam) => Promise<ReturnType<M[K]>> | ReturnType<M[K]>;
  };

  const registeredInvocators: PRecord<string, Invocator<Methods>> = {};
  const registeredOnEachFeedbackInvocations: PRecord<string, OnEachFeedbackInvocations<Methods, FeedbackRet> | null> =
    {};
  const unregisteredWaiters: PRecord<string, () => void> = {};

  eventerValue.listen(async ({ invoke: { name, method, args }, sendResponse, tool, requestId }) => {
    const invokeMethod = async () => {
      try {
        if (registeredInvocators[name] === undefined) {
          throw new Error(`the name ${name} is not registered - ${method}()`);
        }

        if (!smylib.isFunc(registeredInvocators[name][method]))
          throw new Error(`the ${name} has no the ${method} method`);

        const methodProps = { tool, method, name };

        const invokedResult = await registeredInvocators[name][method](args, tool);

        if (
          feedbackOnEach !== undefined &&
          registeredOnEachFeedbackInvocations[name] != null &&
          registeredOnEachFeedbackInvocations[name][method] != null
        ) {
          const retValue = registeredOnEachFeedbackInvocations[name][method](args, invokedResult);

          feedbackOnEach(retValue, methodProps);
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

  type Options<M extends Methods> = {
    className: ClassName;
    methods: Invocator<M>;
    onEachFeedbackTools?: OnEachFeedbackInvocations<M, FeedbackRet>;
    beforeEacheTools?: BeforeEaches<BeforeEachTool, keyof M>;
  };

  type SokiInvocator = new <M extends Methods>(options: Options<M>) => Invocator<M> & { $$register: () => void };

  return function (this: unknown, options: Options<Methods>) {
    const { className, methods, beforeEacheTools: beforeEaches, onEachFeedbackTools: onEachInvocations } = options;
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
          if ((await beforeEach({ method, name, tool }, beforeEaches, args)).isStopPropagation) return;
          return methods[method](args, tool);
        }) as never;
    });

    self.$$register = (() => {
      if (registeredInvocators[name] !== undefined) {
        console.warn(`the ${className} is registered more then 1 times`);
      }

      registeredInvocators[name] = self as never;
      registeredOnEachFeedbackInvocations[name] = onEachInvocations;

      unregisteredWaiters[name]?.();
    }) as never;

    return this;
  } as unknown as SokiInvocator;
};
