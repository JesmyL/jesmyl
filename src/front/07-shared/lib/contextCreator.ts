import { createContext, useContext } from 'react';

export const contextCreator = <Value>(value: Value) => {
  const Context = createContext(value);
  return [Context, () => useContext(Context)] as const;
};
