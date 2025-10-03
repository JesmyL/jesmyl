import { createContext, use } from 'react';

export const contextCreator = <Value>(value: Value) => {
  const Context = createContext(value);
  return [Context, () => use(Context)] as const;
};
