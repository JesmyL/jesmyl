import { EventerListenScope, smylib } from 'shared/utils';
import { isDevelopmentMode } from './environments';
import { SokiInvokerTranferDto } from './soki';

export const makeSokiInvocatorBase = <ClassNamePostfix extends string, ToolParam = und>(
  classNamePostfix: ClassNamePostfix,
  eventerValue: EventerListenScope<SokiInvokerTranferDto<ToolParam>>,
) => {
  type Methods = Record<string, (...args: any[]) => any>;

  type Invocator<M extends Methods> = {
    [K in keyof M]: (tool: ToolParam) => (...args: Parameters<M[K]>) => Promise<ReturnType<M[K]>>;
  };

  const registeredInvocators: Record<string, Invocator<any>> = {};

  eventerValue.listen(async ({ invoke: { name, method, params }, send, tool }) => {
    try {
      if (registeredInvocators[name] == null) throw new Error(`the name ${name} not registered`);
      if (!smylib.isFunc(registeredInvocators[name][method]))
        throw new Error(`the ${name}${classNamePostfix} has no the ${method} method`);

      send({ invokedResult: await registeredInvocators[name][method](tool)(...params) }, tool);
    } catch (error) {
      send({ errorMessage: '' + error }, tool);
    }
  });

  type ClassName = `${string}${string}${typeof classNamePostfix}`;

  type SokiInvocator = new <M extends Methods>(
    className: ClassName,
    methods: Invocator<M>,
  ) => Invocator<M> & { $$register: () => void };

  return function (this: unknown, className: ClassName, methods: Invocator<any>) {
    const self = this as any;

    if (isDevelopmentMode) {
      if (self.constructor.name !== className)
        throw new Error(`${self.constructor.name} error. constructor name and className must equal`);
    }

    Object.keys(methods).forEach(methodName => {
      self[methodName] =
        (tool: ToolParam) =>
        (...params: unknown[]) => {
          console.log(methodName, params);
          return methods[methodName](tool)(...params);
        };
    });

    self.$$register = () => {
      const prefix = className.slice(0, -classNamePostfix.length);

      if (registeredInvocators[prefix] !== undefined)
        throw new Error(`the ${className} is registered more then 1 times`);

      registeredInvocators[prefix] = self;
    };

    return this;
  } as unknown as SokiInvocator;
};
