// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithHook = <Args extends any[], HookReturn>({
  args,
  children,
  hook,
}: {
  args: Args;
  hook: (...args: Args) => HookReturn;
  children: (result: HookReturn) => React.ReactNode;
}) => children(hook(...args));
