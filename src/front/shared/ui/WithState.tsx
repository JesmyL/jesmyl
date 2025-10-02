import { Dispatch, SetStateAction, useState } from 'react';

export const WithState = <Value,>({
  init,
  children,
}: {
  init: Value;
  children: (value: Value, set: Dispatch<SetStateAction<Value>>) => React.ReactNode;
}) => {
  const state = useState(init);
  return children(state[0], state[1]);
};
